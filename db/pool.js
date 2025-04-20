const { Pool } = require("pg")
require('dotenv').config();
module.exports = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: true },
    max: 3, 
    idleTimeoutMillis: 30000, 
    connectionTimeoutMillis: 5000,
})