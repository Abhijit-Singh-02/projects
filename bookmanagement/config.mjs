const config = {
  port: process.env.PORT || 3000,

  JWTSecret: process.env.JWT_SECRET,

  mongodb: {
    uri: process.env.MONGODB_URI
  },

  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_BUCKET_NAME
  }
};

export default config;