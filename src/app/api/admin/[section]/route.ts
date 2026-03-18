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

const VALID_SECTIONS = ["profile", "projects", "experience", "volunteering", "certificates"];

function checkAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get("admin-auth")?.value;
  return cookie === "true";
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section } = await params;
  if (!VALID_SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const store = readStore();
  return NextResponse.json(store[section] ?? (section === "profile" ? {} : []));
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section } = await params;
  if (!VALID_SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const body = await req.json();
  const store = readStore();

  if (section === "profile") {
    // Profile is a single object — merge
    store.profile = { ...(store.profile as Record<string, unknown> || {}), ...body };
    writeStore(store);
    return NextResponse.json(store.profile);
  }

  // For array sections, add a new item with generated id
  const arr = (store[section] as Array<Record<string, unknown>>) || [];
  const newItem = { ...body, id: `${section[0]}${Date.now()}` };
  arr.unshift(newItem);
  store[section] = arr;
  writeStore(store);
  return NextResponse.json(newItem);
}
