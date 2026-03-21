import dotenv from 'dotenv'

dotenv.config()
const config = {
    port: process.env.PORT,
    mongoURI: process.env.mongoDB,
    redisUser: process.env.redisUserName,
    redisPassword: process.env.redisPassword,
    redisHost: process.env.redisHost,
    redisPort: process.env.redisPort
}

export default config