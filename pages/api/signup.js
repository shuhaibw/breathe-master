
 import * as crypto from 'crypto';
import {sql} from "@vercel/postgres";
export default async function handler(
    req,
    res
  ) {
    await sql`CREATE TABLE IF NOT EXISTS users (login varchar(256), hash varchar(256), salt varchar(256))`
    let { login, pass } = req.body;
    let salt = crypto.randomBytes(16).toString('hex');
    let hash =crypto.createHash('sha256')
    hash.update(salt + pass )
    let hashedPassword = hash.digest('hex')
    await sql`INSERT INTO users (login, hash, salt) VALUES (${login}, ${hashedPassword}, ${salt})`
    res.setHeader('Set-Cookie', [`login=${login}; HttpOnly; SameSite=Strict; Path=/;`, `token=${hashedPassword}; HttpOnly; SameSite; Path=/;`] )
    res.status(200).json({ status: "success" });
  }
  