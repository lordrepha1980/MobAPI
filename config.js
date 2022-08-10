
const dotenv            = require('dotenv')
dotenv.config({ path: './.env' })

const config = {
    "database": {
        "type": "MongoDB",
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "crediantials": {
            "username": process.env.DB_USERNAME,
            "password": process.env.DB_PASSWORD
        },
        "name": "MobAPI"
    },
    "serverPort": process.env.SERVER_PORT,
    "auth": {
        "enabled": true,
        "secret": process.env.AUTH_SECRET,
        "options": { 
            "expiresIn": "24h" 
        }
    },
    "bcrypt": {
        "saltRounds": 10 
    },
    "debug": {
        "extend": false
    },
    "module": {
        "useSignin":    true,
        "useRegister":  true
    }
}

module.exports = config;