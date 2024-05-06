
import {sql} from "@vercel/postgres";
import cookie from 'cookie';

export default async function handler(
    req, res
) {
    const cookies = cookie.parse(req.headers.cookie || '');
    console.log('updating')
    await sql`CREATE TABLE IF NOT EXISTS userhistory (login varchar(256), history json)`
    let  login  = cookies.login
    let history = (await sql`SELECT * FROM userhistory WHERE login = ${login}`)
    console.log(JSON.stringify([
        {
            date: req.body.date,
            value: req.body.cigs
        }
    ]))
    if (history.rowCount === 0) {
        console.log('inserting')
        await sql`INSERT INTO userhistory (login, history) VALUES (${login}, ${JSON.stringify([
            {
                Date: req.body.date,
                value: req.body.cigs
            }
        ])})`
    }
    else {
        await sql`UPDATE userhistory SET history = ${JSON.stringify(history.rows[0].history.concat({
            date: req.body.date,
            value: req.body.cigs
        }))} WHERE login = ${login}`
    }
    return res.status(200).json({ status: "success", history: history.rows[0].history.concat() });
}