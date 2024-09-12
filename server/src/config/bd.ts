import mysql from '../../node_modules/mysql2/index'

import { config } from '../../node_modules/dotenv/lib/main'

config()

export const db = mysql.createConnection({
    host: process.env.DB_HOST || '10.12.100.14',
    user: process.env.DB_USER || 'sysweb',
    password: process.env.DB_PASSWORD || 'ZqkNUCy9DnPjGuSG',
    database: process.env.DATABASE || 'defects_aoi'
})

export const dbPPA = mysql.createConnection({
    host: process.env.DB_HOST || '10.12.100.14',
    user: process.env.DB_USER || 'sysweb',
    password: process.env.DB_PASSWORD || 'ZqkNUCy9DnPjGuSG',
    database: 'ppa'
})