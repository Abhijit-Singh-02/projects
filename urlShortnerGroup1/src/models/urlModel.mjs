import mongoose from "mongoose"
const urlSchema = new mongoose.Schema({
    urlCode: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    }, 
    longUrl: {
        type: String,
        required: true,
        match: [/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/]
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    }
})

const urlModel = mongoose.model('urls', urlSchema)
export default urlModel;