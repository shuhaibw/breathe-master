import {sql} from "@vercel/postgres";
import { NextResponse } from "next/server";
export const config = {
    matcher: ['/logged/(.*)', '/api/logged/(.*)']
}
export default async function middleware(req) {
    console.log('middleware')
    const url = req.nextUrl
    
    if (!req.cookies.get('token')) {
        url.pathname = '/login'
        console.log('no token')
        return NextResponse.rewrite(url)
    }
    console.log('token')
    let logged = await sql`SELECT * FROM users WHERE hash = ${req.cookies.get('token').value}`
    if(logged.rowCount === 0) {
    url.pathname = '/login'
    console.log('bad token')
        return NextResponse.rewrite(url)
    }
    return NextResponse.next()
}