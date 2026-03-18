import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const STORE_PATH = path.join(process.cwd(), "src/data/admin-store.json");

type StoreData = Record<string, unknown>;

function readStore(): StoreData {
  const raw = fs.readFileSync(STORE_PATH, "utf-8");
  return JSON.parse(raw) as StoreData;
}

function writeStore(data: StoreData) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function checkAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get("admin-auth")?.value;
  return cookie === "true";
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ section: string; id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section, id } = await params;
  const body = await req.json();
  const store = readStore();

  if (section === "profile") {
    store.profile = { ...(store.profile as Record<string, unknown> || {}), ...body, id };
    writeStore(store);
    return NextResponse.json(store.profile);
  }

  const arr = (store[section] as Array<Record<string, unknown>>) || [];
  const idx = arr.findIndex((item) => String(item.id) === String(id));
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  arr[idx] = { ...arr[idx], ...body, id };
  store[section] = arr;
  writeStore(store);
  return NextResponse.json(arr[idx]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ section: string; id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section, id } = await params;
  const store = readStore();

  const arr = (store[section] as Array<Record<string, unknown>>) || [];
  store[section] = arr.filter((item) => String(item.id) !== String(id));
  writeStore(store);
  return NextResponse.json({ ok: true });
}
