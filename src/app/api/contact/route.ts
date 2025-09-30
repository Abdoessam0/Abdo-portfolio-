import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();
        if (!name || !email || !message) {
            return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
        }
        // TODO: switch to Prisma + Supabase (persist Message)
        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}


