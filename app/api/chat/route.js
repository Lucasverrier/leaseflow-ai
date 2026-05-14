import { NextResponse } from "next/server";

const MODEL = "gpt-4o-mini";
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

const MAX_SYSTEM_CHARS = 12000;
const MAX_PROP = 25;
const MAX_STR = 2000;
const MAX_NAME = 200;
const MAX_CUSTOM = 8000;

/** Used when no usable client profile is supplied. */
const DEFAULT_SYSTEM_PROMPT = `You are the LeaseFlow leasing assistant for a professional property management company serving the North Shore of Massachusetts.

Your role:
- Be warm, concise, and helpful. Answer questions about rentals, pricing, availability (in general terms), tours, and how to apply.
- You represent a small property management team—sound human, not robotic.
- If asked about fair housing, discrimination, or legal advice, stay neutral and suggest speaking with the management team directly.
- When you do not know a specific fact about a unit or building, say you will connect them with the team and give the phone number.

Property details you may share:
- Two-bedroom (2BR) units rent for $1,800 per month.
- One-bedroom (1BR) units rent for $1,400 per month.
- In-person tours are available Monday through Saturday, 9:00 AM to 5:00 PM.
- For scheduling or questions that need a human, the main office line is (978) 646-7715.

Keep replies brief unless the tenant asks for more detail.`;

const DAY_IDS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const DAY_LABELS = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

function clip(s, max) {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

function sanitizeBool(v) {
  return Boolean(v);
}

function sanitizeTourDays(raw) {
  const out = {};
  for (const id of DAY_IDS) {
    out[id] = raw && typeof raw === "object" && raw[id] === true;
  }
  return out;
}

function sanitizeProperties(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const p of raw) {
    if (out.length >= MAX_PROP) break;
    if (!p || typeof p !== "object") continue;
    out.push({
      unitType: clip(String(p.unitType ?? ""), 120),
      bedrooms: clip(String(p.bedrooms ?? ""), 40),
      bathrooms: clip(String(p.bathrooms ?? ""), 40),
      rentPrice: clip(String(p.rentPrice ?? ""), 120),
      address: clip(String(p.address ?? ""), MAX_STR),
      availableDate: clip(String(p.availableDate ?? ""), 40),
    });
  }
  return out;
}

function sanitizeClientConfig(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const tourDays = sanitizeTourDays(raw.tourDays);
  return {
    businessName: clip(String(raw.businessName ?? ""), MAX_NAME),
    propertyManagerName: clip(String(raw.propertyManagerName ?? ""), MAX_NAME),
    businessPhone: clip(String(raw.businessPhone ?? ""), 80),
    businessEmail: clip(String(raw.businessEmail ?? ""), 120),
    officeAddress: clip(String(raw.officeAddress ?? ""), MAX_STR),
    properties: sanitizeProperties(raw.properties),
    tourDays,
    tourTimeStart: clip(String(raw.tourTimeStart ?? ""), 16),
    tourTimeEnd: clip(String(raw.tourTimeEnd ?? ""), 16),
    petPolicyAllowed: raw.petPolicyAllowed === "no" ? "no" : "yes",
    petPolicyDetails: clip(String(raw.petPolicyDetails ?? ""), MAX_STR),
    parkingAvailable: raw.parkingAvailable === "no" ? "no" : "yes",
    parkingDetails: clip(String(raw.parkingDetails ?? ""), MAX_STR),
    utilitiesWater: sanitizeBool(raw.utilitiesWater),
    utilitiesHeat: sanitizeBool(raw.utilitiesHeat),
    utilitiesElectric: sanitizeBool(raw.utilitiesElectric),
    utilitiesGas: sanitizeBool(raw.utilitiesGas),
    utilitiesInternet: sanitizeBool(raw.utilitiesInternet),
    applicationFee: clip(String(raw.applicationFee ?? ""), 200),
    securityDepositPolicy: clip(String(raw.securityDepositPolicy ?? ""), MAX_STR),
    customInstructions: clip(String(raw.customInstructions ?? ""), MAX_CUSTOM),
  };
}

function propertyHasContent(p) {
  return [p.unitType, p.bedrooms, p.bathrooms, p.rentPrice, p.address, p.availableDate].some((x) => String(x || "").trim());
}

function hasMeaningfulClientProfile(c) {
  if (!c) return false;
  if (c.businessName.trim()) return true;
  if (c.businessPhone.trim() || c.businessEmail.trim()) return true;
  if (c.officeAddress.trim()) return true;
  if (c.propertyManagerName.trim()) return true;
  if (c.properties.some(propertyHasContent)) return true;
  if (c.customInstructions.trim()) return true;
  if (c.applicationFee.trim() || c.securityDepositPolicy.trim()) return true;
  if (c.petPolicyDetails.trim() || c.parkingDetails.trim()) return true;
  return false;
}

function formatTourDays(tourDays) {
  const names = DAY_IDS.filter((id) => tourDays[id]).map((id) => DAY_LABELS[id]);
  if (names.length === 0) return "No tour days selected in the client profile.";
  return names.join(", ");
}

function formatUtilities(c) {
  const parts = [];
  if (c.utilitiesWater) parts.push("Water");
  if (c.utilitiesHeat) parts.push("Heat");
  if (c.utilitiesElectric) parts.push("Electric");
  if (c.utilitiesGas) parts.push("Gas");
  if (c.utilitiesInternet) parts.push("Internet");
  return parts.length ? parts.join(", ") : "None listed as included.";
}

function buildSystemPromptFromClient(c) {
  const lines = [];
  lines.push(
    "You are the AI leasing assistant for the property management business described below. Speak on behalf of that business to prospective tenants. Be warm, concise, and accurate—only state facts that appear in the client profile (or reasonable paraphrases). If something is not specified, say you will confirm with the office."
  );
  lines.push("");
  lines.push("=== Client business ===");
  lines.push(`Business name: ${c.businessName.trim() || "(not specified)"}`);
  lines.push(`Property manager / contact name: ${c.propertyManagerName.trim() || "(not specified)"}`);
  lines.push(`Office phone: ${c.businessPhone.trim() || "(not specified)"}`);
  lines.push(`Office email: ${c.businessEmail.trim() || "(not specified)"}`);
  lines.push(`Office address: ${c.officeAddress.trim() || "(not specified)"}`);
  lines.push("");
  lines.push("=== Listings ===");
  const filled = c.properties.filter(propertyHasContent);
  if (filled.length === 0) {
    lines.push("No individual units were provided. Answer availability questions in general terms and offer to connect the prospect with the office.");
  } else {
    filled.forEach((p, i) => {
      lines.push(`Property ${i + 1}:`);
      lines.push(`  - Unit type: ${p.unitType || "—"}`);
      lines.push(`  - Bedrooms: ${p.bedrooms || "—"}`);
      lines.push(`  - Bathrooms: ${p.bathrooms || "—"}`);
      lines.push(`  - Rent: ${p.rentPrice || "—"}`);
      lines.push(`  - Address: ${p.address || "—"}`);
      lines.push(`  - Available: ${p.availableDate || "—"}`);
    });
  }
  lines.push("");
  lines.push("=== Tours ===");
  lines.push(`Tour days: ${formatTourDays(c.tourDays)}`);
  lines.push(
    `Tour hours window: ${c.tourTimeStart.trim() || "?"} to ${c.tourTimeEnd.trim() || "?"}. Express times in friendly 12-hour form when talking to tenants.`
  );
  lines.push("");
  lines.push("=== Policies ===");
  lines.push(`Pets: ${c.petPolicyAllowed === "yes" ? "Allowed (see details)." : "Not allowed (see details)."}`);
  lines.push(`Pet policy details: ${c.petPolicyDetails.trim() || "None specified."}`);
  lines.push(`Parking: ${c.parkingAvailable === "yes" ? "Yes (see details)." : "No / not included (see details)."}`);
  lines.push(`Parking details: ${c.parkingDetails.trim() || "None specified."}`);
  lines.push(`Utilities included in rent: ${formatUtilities(c)}`);
  lines.push("");
  lines.push("=== Fees ===");
  lines.push(`Application fee: ${c.applicationFee.trim() || "Not specified."}`);
  lines.push(`Security deposit: ${c.securityDepositPolicy.trim() || "Not specified."}`);
  lines.push("");
  if (c.customInstructions.trim()) {
    lines.push("=== Additional instructions from the property manager ===");
    lines.push(c.customInstructions.trim());
    lines.push("");
  }
  lines.push("=== Compliance ===");
  lines.push(
    "- Follow fair housing principles. Do not discriminate or steer. If asked for legal advice or sensitive screening criteria, stay neutral and direct them to the office."
  );
  lines.push(
    "- When a human is needed (exact availability, applications, holding a unit), give the office phone and/or email from the profile."
  );
  lines.push("- Keep replies brief unless the tenant asks for more detail.");

  let text = lines.join("\n");
  if (text.length > MAX_SYSTEM_CHARS) {
    text = text.slice(0, MAX_SYSTEM_CHARS) + "\n[Profile truncated for length.]";
  }
  return text;
}

function resolveSystemPrompt(clientConfigRaw) {
  const safe = sanitizeClientConfig(clientConfigRaw);
  if (safe && hasMeaningfulClientProfile(safe)) {
    return buildSystemPromptFromClient(safe);
  }
  return DEFAULT_SYSTEM_PROMPT;
}

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return null;
  const out = [];
  for (const m of messages) {
    if (!m || typeof m !== "object") continue;
    const role = m.role;
    if (role !== "user" && role !== "assistant") continue;
    const content = m.content;
    if (typeof content !== "string") continue;
    const trimmed = content.trim();
    if (!trimmed) continue;
    out.push({ role, content: trimmed.slice(0, 12000) });
  }
  return out;
}

export async function POST(request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is missing OPENAI_API_KEY. Add it to .env.local and restart the dev server." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const sanitized = sanitizeMessages(body.messages);
  if (!sanitized || sanitized.length === 0) {
    return NextResponse.json(
      { error: "Provide a non-empty messages array with user and/or assistant entries (role + content strings)." },
      { status: 400 }
    );
  }

  const last = sanitized[sanitized.length - 1];
  if (last.role !== "user") {
    return NextResponse.json(
      { error: "The last message in the conversation must be from the user." },
      { status: 400 }
    );
  }

  const systemPrompt = resolveSystemPrompt(body.clientConfig);

  const payload = {
    model: MODEL,
    messages: [{ role: "system", content: systemPrompt }, ...sanitized],
    temperature: 0.65,
    max_tokens: 1024,
  };

  try {
    const res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const raw = await res.text();
    let data;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = null;
    }

    if (!res.ok) {
      const openaiMsg =
        data?.error?.message ||
        (raw && raw.length < 500 ? raw : "Upstream request failed.");
      console.error("[chat] OpenAI error", res.status, openaiMsg);
      return NextResponse.json(
        { error: "The AI service returned an error. Please try again in a moment." },
        { status: 502 }
      );
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      console.error("[chat] Empty choices", JSON.stringify(data)?.slice(0, 800));
      return NextResponse.json(
        { error: "No reply was returned from the AI. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[chat] Network or server error", err);
    return NextResponse.json(
      { error: "Could not reach the AI service. Check your connection and try again." },
      { status: 500 }
    );
  }
}
