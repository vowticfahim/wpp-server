import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path: path.join(process.cwd(), '.env')})

export default {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    salt_rounds: process.env.SALT_ROUNDS,
    node_env: process.env.NODE_ENV,
    access_secret: process.env.ACCESS_SECRET,
    expires_in: process.env.ACCESS_EXPIRES_IN,
    refresh_secret: process.env.REFRESH_SECRET,
    refresh_expires_in: process.env.REFRESH_EXPIRES_IN,
    server_api: process.env.SERVER_API,
    store_id: process.env.STORE_ID,
    store_pass: process.env.STORE_PASS
}