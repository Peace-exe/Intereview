import { NextResponse } from "next/server";

export async function GET(){
    const res = NextResponse.json({
        "msg": "hello from route /hello"
    });
    return res;
}