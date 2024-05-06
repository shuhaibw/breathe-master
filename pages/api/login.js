

import { NextApiRequest, NextApiResponse } from 'next'
 import * as crypto from 'crypto';
import {sql} from "@vercel/postgres";
export default async function handler(
    req,
    res
  ) {
    await sql`CREATE TABLE IF NOT EXISTS users (login varchar(256), hash varchar(256), salt varchar(256))`
    let { login, pass } = req.body;
    let user = await sql`SELECT * FROM users WHERE login = ${login}`
    if (user.rows.length == 0) {
        res.status(401).json({ status: "no user with that name" });
        return
    }
    else{
        let salt = user.rows[0].salt
        let hash = crypto.createHash('sha256')
        console.log(pass)
        hash.update(salt + pass)

        let hashedPassword = hash.digest('hex')
        console.log('hash', hashedPassword)
        if (hashedPassword != user.rows[0].hash) {
            res.status(401).json({ status: "wrong password" });
            return
        }
    }
    console.log('login', user.rows[0].login)
    res.setHeader('Set-Cookie', [`login=${login}; HttpOnly; SameSite=Strict; Path=/;`, `token=${user.rows[0].hash}; HttpOnly; SameSite; Path=/;`] )
    res.status(200).json({ status: "success" });
  }