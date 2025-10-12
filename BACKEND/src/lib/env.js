import 'dotenv/config'


 const ENV={
  PORT:process.env.PORT,
  MONGODB_URI:process.env.MONGODB_URI,
  JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
  NODE_ENV:process.env.NODE_ENV,
  RESEND_API_KEY:process.env.RESEND_API_KEY,
  EMAIL_FROM:process.env.EMAIL_FROM,
  CLIENT_URL:process.env.CLIENT_URL,
  EMAIL_FROM_NAME:process.env.EMAIL_FROM_NAME

}

export default ENV;