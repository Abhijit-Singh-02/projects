import urlModel from '../models/urlModel.mjs'
import crypto from 'crypto'
import config from '../../config.mjs'
import { createClient } from 'redis';

const client = createClient({
    username: config.redisUser,
    password: config.redisPassword,
    socket: {
        host: config.redisHost,
        port: config.redisPort
    }
});
client.on('error', err => console.log('Redis Client Error', err));
client.connect().then(() => {
    console.log("Connected to Redis");
}).catch((err) => {
    console.log(err);
});

const getURL = async (req, res)=>{
    try {
        let {urlCode} = req.params;
        if(!urlCode){
            return res.status(400).send({status: false, message: "enter url"})
        }
        urlCode= urlCode.toLowerCase()
        const cacheUrl = await client.get(urlCode);
        if(cacheUrl){
            return res.status(301).redirect(cacheUrl)
        }
        
        const exist = await urlModel.findOne({urlCode})
        if(exist==null){
            return res.status(404).send({status: false, message: "url not found"})
        }
        return res.status(301).redirect(exist.longUrl)
    } catch (error) {
        return res.status(500).send({message: "internal server error", err: error.message})
    }
}


const shortCode = (url)=>{
    return crypto.createHash("sha256").update(url).digest("base64url").slice(0,8)
}
const createURL = async (req, res)=>{
    try {
        let { url } = req.body
        if(!url){
            return res.status(400).send({status: false, message: "enter url"})
        }
        if(url[url.length-1]==="/"){
            url=url.slice(0,(url.length-1))
        } 
        let short = shortCode(url)
        short=short.toLowerCase()
        const shortURL= req.protocol+"://"+req.get('host')+"/"+short

        const exist= await urlModel.findOne({urlCode: short})
        if(exist==null){
            let data={}
            data.urlCode=short
            data.longUrl=url
            data.shortUrl=shortURL
            const create = await urlModel.create(data)

            if(create==null){
                return res.status(500).send({status: false,message: "failed"})
            }
            
            await client.set(short, url, { EX: 86400});
            return res.status(201).send({status: true, data: {longUrl:url, shortUrl:shortURL, urlCode:short}})
        }

        return res.status(200).send({status: true, data: {longUrl:url, shortUrl:shortURL, urlCode:short} })
    } catch (error) {
        return res.status(500).send({message: "internal server error", err: error.message})
    }
}

export { createURL, getURL }