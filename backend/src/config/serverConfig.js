const dotenv=require('dotenv')

dotenv.config();

module.exports={
    PORT:process.env.PORT,
    MONGO_URL:process.env.MONGO_URL,
    ADMIN_EMAIL:process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD:process.env.ADMIN_PASSWORD
}