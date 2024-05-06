
import {sql} from "@vercel/postgres";
import cookie from 'cookie';

export default async function handler(
    req, res
) {
    const cookies = cookie.parse(req.headers.cookie || '');

    await sql`CREATE TABLE IF NOT EXISTS userhistory (login varchar(256), history jsonb)`
    console.log(cookies)
    let  login  = cookies.login
    console.log(login)
    let history = await sql`SELECT * FROM userhistory WHERE login = ${login}`
    if (history.rowCount === 0) {
        res.status(200).json({ history: [] });
        return
    }
    res.status(200).json({ history: history.rows[0].history });
}