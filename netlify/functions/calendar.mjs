import { getStore } from "@netlify/blobs";
import { createHash } from "node:crypto";

export default async function calendar(request) {
  const headers = { "Cache-Control": "no-store" };
  const reply = (body, status = 200) => Response.json(body, { status, headers });
  const token = request.headers.get("Authorization")?.match(/^Bearer ([a-f0-9]{64})$/)?.[1];
  if (!token) return reply({}, 401);
  const key = createHash("sha256").update(token).digest("hex");
  const store = getStore({ name: "family-calendars", consistency: "strong" });
  if (request.method === "GET") {
    const result = await store.getWithMetadata(key, { type: "json" });
    return result ? reply({ items: result.data, revision: result.etag }) : reply({}, 404);
  }
  if (request.method !== "PUT") return reply({}, 405);
  const raw = await request.text();
  if (raw.length > 1000000) return reply({}, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return reply({}, 400); }
  if (!Array.isArray(body?.items) || body.items.length > 5000) return reply({}, 400);
  const items = [];
  const ids = new Set();
  for (const item of body.items) {
    if (!item || typeof item.id !== "string" || item.id.length > 64 || ids.has(item.id)
      || !/^\d{4}-\d{2}-\d{2}$/.test(item.date) || !["Event","Reminder"].includes(item.kind)
      || typeof item.title !== "string" || !item.title.trim() || item.title.length > 180
      || !(item.time === "" || /^([01]\d|2[0-3]):[0-5]\d$/.test(item.time))) return reply({}, 400);
    ids.add(item.id);
    items.push({ id:item.id, date:item.date, kind:item.kind, title:item.title, time:item.time, important:item.important === true });
  }
  const options = body.revision ? { onlyIfMatch:body.revision } : { onlyIfNew:true };
  const saved = await store.setJSON(key, items, options);
  return saved.modified ? reply({ revision:saved.etag }) : reply({}, 409);
}
