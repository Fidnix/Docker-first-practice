import express from "express";
import { createPool } from "mysql2";

const app = express();
const pool = createPool({
    host: process.env.MYSQLDB_HOST,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    port: process.env.MYSQLDB_PORT
});
const promisePool = pool.promise();

app.get("/", (req, res)=>{
    res.send("Hello world");
});

app.get("/ping", async (req, res)=>{
    const [rows, fields] = await promisePool.execute("SELECT NOW()");
    res.json(rows[0]);
});

app.listen(3000);
console.log("Server on port ", 3000);