import {sql} from "@vercel/postgres";
import cookie from 'cookie';

export default async function handler(
    req, res
) {
    const cookies = cookie.parse(req.headers.cookie || '');
    await sql`CREATE TABLE IF NOT EXISTS userhistory (login varchar(256), history json)`
    let  login  = cookies.login
    let mockhistory = []
    for(let i = 2; i < 15 + Math.floor(Math.random() * 20); i++){
        if(Math.random() < 0.2) continue
        let time = new Date()
        time.setDate(time.getDate() - i)
       console.log(time)
        mockhistory.push({
            Date: time.toISOString(),
            value: Math.floor(Math.random() * 20)
        })
    }
    await sql`DELETE FROM userhistory WHERE login = ${login}`
    await sql`INSERT INTO userhistory (login, history) VALUES (${login}, ${JSON.stringify(mockhistory)})`
    res.status(200).json({ history: mockhistory });
}