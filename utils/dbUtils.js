import mysql from 'mysql2/promise';

const dbPool = mysql.createPool({
    host: "103.56.148.155", 
    user:"db_prakerja", 
    password: 'GKxb6REzbjGs7ns4',
    database: "db_prakerja",
    port: 3306
})

export default dbPool;