"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Spinner } from "./spinner";

const CLIENT_CONFIG_KEY = "leaseflow-client-config";

const DAYS = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

function emptyProperty() {
  return {
    id: crypto.randomUUID(),
    unitType: "",
    bedrooms: "",
    bathrooms: "",
    rentPrice: "",
    address: "",
    availableDate: "",
  };
}

function defaultForm() {
  return {
    businessName: "",
    propertyManagerName: "",
    businessPhone: "",
    businessEmail: "",
    officeAddress: "",
    properties: [emptyProperty()],
    tourDays: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: false },
    tourTimeStart: "09:00",
    tourTimeEnd: "17:00",
    petPolicyAllowed: "yes",
    petPolicyDetails: "",
    parkingAvailable: "yes",
    parkingDetails: "",
    utilitiesWater: true,
    utilitiesHeat: true,
    utilitiesElectric: false,
    utilitiesGas: false,
    utilitiesInternet: false,
    applicationFee: "",
    securityDepositPolicy: "",
    customInstructions: "",
  };
}

function normalizeLoaded(raw) {
  const base = defaultForm();
  if (!raw || typeof raw !== "object") return base;
  const tourDays = { ...base.tourDays, ...(typeof raw.tourDays === "object" && raw.tourDays ? raw.tourDays : {}) };
  let properties = Array.isArray(raw.properties) ? raw.properties : base.properties;
  properties = properties
    .filter((p) => p && typeof p === "object")
    .map((p) => ({
      id: typeof p.id === "string" ? p.id : crypto.randomUUID(),
      unitType: String(p.unitType ?? ""),
      bedrooms: String(p.bedrooms ?? ""),
      bathrooms: String(p.bathrooms ?? ""),
      rentPrice: String(p.rentPrice ?? ""),
      address: String(p.address ?? ""),
      availableDate: String(p.availableDate ?? ""),
    }));
  if (properties.length === 0) properties = [emptyProperty()];
  return {
    ...base,
    ...raw,
    tourDays,
    properties,
    petPolicyAllowed: raw.petPolicyAllowed === "no" ? "no" : "yes",
    parkingAvailable: raw.parkingAvailable === "no" ? "no" : "yes",
    utilitiesWater: Boolean(raw.utilitiesWater),
    utilitiesHeat: Boolean(raw.utilitiesHeat),
    utilitiesElectric: Boolean(raw.utilitiesElectric),
    utilitiesGas: Boolean(raw.utilitiesGas),
    utilitiesInternet: Boolean(raw.utilitiesInternet),
  };
}

function loadConfig() {
  if (typeof window === "undefined") return defaultForm();
  try {
    const raw = localStorage.getItem(CLIENT_CONFIG_KEY);
    if (!raw) return defaultForm();
    return normalizeLoaded(JSON.parse(raw));
  } catch {
    return defaultForm();
  }
}

function fieldClass() {
  return "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-[#0f2744] shadow-inner outline-none focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b2]/25";
}

function labelClass() {
  return "text-xs font-bold uppercase tracking-wider text-[#0f2744]/80";
}

/**
 * @param {{ embedIntro?: boolean }} props
 */
export default function ClientSettingsForm({ embedIntro = false }) {
  const [form, setForm] = useState(() => defaultForm());
  const [hydrated, setHydrated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(loadConfig());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 5000);
    return () => clearTimeout(t);
  }, [saved]);

  const update = useCallback((patch) => {
    setForm((f) => ({ ...f, ...patch }));
  }, []);

  const updateProperty = useCallback((id, patch) => {
    setForm((f) => ({
      ...f,
      properties: f.properties.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  }, []);

  const addProperty = useCallback(() => {
    setForm((f) => ({ ...f, properties: [...f.properties, emptyProperty()] }));
  }, []);

  const removeProperty = useCallback((id) => {
    setForm((f) => ({
      ...f,
      properties: f.properties.length <= 1 ? f.properties : f.properties.filter((p) => p.id !== id),
    }));
  }, []);

  const toggleTourDay = useCallback((id) => {
    setForm((f) => ({
      ...f,
      tourDays: { ...f.tourDays, [id]: !f.tourDays[id] },
    }));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 350));
      localStorage.setItem(CLIENT_CONFIG_KEY, JSON.stringify(form));
      setSaved(true);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("leaseflow-client-config-updated", { detail: form }));
      }
    } catch {
      alert("Could not save settings. Your browser may be blocking storage.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">Configure client assistant</h1>
        <p className="mt-1 text-sm font-medium text-[#0f2744]/75">
          Lucas — save a profile per client. Tenant chat in the{" "}
          {embedIntro ? (
            <span className="font-semibold text-[#0891b2]">Live Chat Preview</span>
          ) : (
            <Link className="text-[#0891b2] hover:underline" href="/chat">
              /chat
            </Link>
          )}{" "}
          uses this data immediately after save.
        </p>
      </div>

      {saved ? (
        <div
          className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 shadow-sm"
          role="status"
        >
          Settings saved. The tenant chatbot will use this configuration on the next message.
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md sm:p-7">
          <h2 className="font-serif text-lg font-semibold text-[#0f2744]">Business</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass()} htmlFor="businessName">
                Business name
              </label>
              <input
                id="businessName"
                className={fieldClass()}
                value={form.businessName}
                onChange={(e) => update({ businessName: e.target.value })}
                placeholder={"e.g. Mike's Rentals"}
                autoComplete="organization"
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="propertyManagerName">
                Property manager name
              </label>
              <input
                id="propertyManagerName"
                className={fieldClass()}
                value={form.propertyManagerName}
                onChange={(e) => update({ propertyManagerName: e.target.value })}
                placeholder="Contact name tenants may hear"
                autoComplete="name"
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="businessPhone">
                Business phone number
              </label>
              <input
                id="businessPhone"
                className={fieldClass()}
                value={form.businessPhone}
                onChange={(e) => update({ businessPhone: e.target.value })}
                placeholder="(978) 555-0100"
                autoComplete="tel"
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="businessEmail">
                Business email
              </label>
              <input
                id="businessEmail"
                type="email"
                className={fieldClass()}
                value={form.businessEmail}
                onChange={(e) => update({ businessEmail: e.target.value })}
                placeholder="leasing@example.com"
                autoComplete="email"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass()} htmlFor="officeAddress">
                Office address
              </label>
              <input
                id="officeAddress"
                className={fieldClass()}
                value={form.officeAddress}
                onChange={(e) => update({ officeAddress: e.target.value })}
                placeholder="Street, city, state, ZIP"
                autoComplete="street-address"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-serif text-lg font-semibold text-[#0f2744]">Available properties</h2>
            <button
              type="button"
              onClick={addProperty}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-[#0f2744] shadow-sm transition hover:border-[#0891b2]/50 hover:bg-slate-50"
            >
              Add property
            </button>
          </div>
          <div className="mt-4 space-y-5">
            {form.properties.map((p, idx) => (
              <div
                key={p.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-inner sm:p-5"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0891b2]">Property {idx + 1}</p>
                  {form.properties.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeProperty(p.id)}
                      className="text-xs font-semibold text-red-700 hover:underline"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className={labelClass()}>Unit type</label>
                    <input
                      className={fieldClass()}
                      value={p.unitType}
                      onChange={(e) => updateProperty(p.id, { unitType: e.target.value })}
                      placeholder="Apartment, townhouse, etc."
                    />
                  </div>
                  <div>
                    <label className={labelClass()}>Bedrooms</label>
                    <input
                      className={fieldClass()}
                      value={p.bedrooms}
                      onChange={(e) => updateProperty(p.id, { bedrooms: e.target.value })}
                      placeholder="2"
                    />
                  </div>
                  <div>
                    <label className={labelClass()}>Bathrooms</label>
                    <input
                      className={fieldClass()}
                      value={p.bathrooms}
                      onChange={(e) => updateProperty(p.id, { bathrooms: e.target.value })}
                      placeholder="1.5"
                    />
                  </div>
                  <div>
                    <label className={labelClass()}>Rent price</label>
                    <input
                      className={fieldClass()}
                      value={p.rentPrice}
                      onChange={(e) => updateProperty(p.id, { rentPrice: e.target.value })}
                      placeholder="$1,800 / month"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass()}>Address</label>
                    <input
                      className={fieldClass()}
                      value={p.address}
                      onChange={(e) => updateProperty(p.id, { address: e.target.value })}
                      placeholder="Unit / building address"
                    />
                  </div>
                  <div>
                    <label className={labelClass()}>Available date</label>
                    <input
                      type="date"
                      className={fieldClass()}
                      value={p.availableDate}
                      onChange={(e) => updateProperty(p.id, { availableDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md sm:p-7">
          <h2 className="font-serif text-lg font-semibold text-[#0f2744]">Tour hours</h2>
          <p className="mt-1 text-xs font-medium text-slate-500">Select days and the time window you offer tours.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {DAYS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => toggleTourDay(d.id)}
                className={`min-h-[40px] min-w-[48px] rounded-xl border px-3 text-xs font-bold transition ${
                  form.tourDays[d.id]
                    ? "border-[#0891b2] bg-[#0891b2]/15 text-[#0f2744]"
                    : "border-slate-300 bg-white text-slate-500 hover:border-slate-400"
                }`}
                aria-pressed={form.tourDays[d.id]}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass()} htmlFor="tourTimeStart">
                Start time
              </label>
              <input
                id="tourTimeStart"
                type="time"
                className={fieldClass()}
                value={form.tourTimeStart}
                onChange={(e) => update({ tourTimeStart: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor="tourTimeEnd">
                End time
              </label>
              <input
                id="tourTimeEnd"
                type="time"
                className={fieldClass()}
                value={form.tourTimeEnd}
                onChange={(e) => update({ tourTimeEnd: e.target.value })}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md sm:p-7">
          <h2 className="font-serif text-lg font-semibold text-[#0f2744]">Policies</h2>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <fieldset className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <legend className={labelClass()}>Pet policy</legend>
              <div className="mt-3 flex gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#0f2744]">
                  <input
                    type="radio"
                    name="pets"
                    checked={form.petPolicyAllowed === "yes"}
                    onChange={() => update({ petPolicyAllowed: "yes" })}
                  />
                  Pets allowed
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#0f2744]">
                  <input
                    type="radio"
                    name="pets"
                    checked={form.petPolicyAllowed === "no"}
                    onChange={() => update({ petPolicyAllowed: "no" })}
                  />
                  No pets
                </label>
              </div>
              <label className={`${labelClass()} mt-3 block`} htmlFor="petDetails">
                Details
              </label>
              <textarea
                id="petDetails"
                rows={3}
                className={fieldClass()}
                value={form.petPolicyDetails}
                onChange={(e) => update({ petPolicyDetails: e.target.value })}
                placeholder="Breed restrictions, fees, deposit, etc."
              />
            </fieldset>

            <fieldset className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <legend className={labelClass()}>Parking</legend>
              <div className="mt-3 flex gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#0f2744]">
                  <input
                    type="radio"
                    name="parking"
                    checked={form.parkingAvailable === "yes"}
                    onChange={() => update({ parkingAvailable: "yes" })}
                  />
                  Yes
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#0f2744]">
                  <input
                    type="radio"
                    name="parking"
                    checked={form.parkingAvailable === "no"}
                    onChange={() => update({ parkingAvailable: "no" })}
                  />
                  No
                </label>
              </div>
              <label className={`${labelClass()} mt-3 block`} htmlFor="parkingDetails">
                Details
              </label>
              <textarea
                id="parkingDetails"
                rows={3}
                className={fieldClass()}
                value={form.parkingDetails}
                onChange={(e) => update({ parkingDetails: e.target.value })}
                placeholder="Off-street, permit, garage fee, etc."
              />
            </fieldset>
          </div>

          <div className="mt-6">
            <p className={labelClass()}>Utilities included</p>
            <div className="mt-3 flex flex-wrap gap-4">
              {[
                ["utilitiesWater", "Water"],
                ["utilitiesHeat", "Heat"],
                ["utilitiesElectric", "Electric"],
                ["utilitiesGas", "Gas"],
                ["utilitiesInternet", "Internet"],
              ].map(([key, label]) => (
                <label key={key} className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#0f2744]">
                  <input
                    type="checkbox"
                    checked={Boolean(form[key])}
                    onChange={(e) => update({ [key]: e.target.checked })}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md sm:p-7">
          <h2 className="font-serif text-lg font-semibold text-[#0f2744]">Fees</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass()} htmlFor="applicationFee">
                Application fee
              </label>
              <input
                id="applicationFee"
                className={fieldClass()}
                value={form.applicationFee}
                onChange={(e) => update({ applicationFee: e.target.value })}
                placeholder="$50 non-refundable"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass()} htmlFor="securityDepositPolicy">
                Security deposit policy
              </label>
              <textarea
                id="securityDepositPolicy"
                rows={3}
                className={fieldClass()}
                value={form.securityDepositPolicy}
                onChange={(e) => update({ securityDepositPolicy: e.target.value })}
                placeholder="e.g. First month + one month deposit; certified funds only."
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md sm:p-7">
          <h2 className="font-serif text-lg font-semibold text-[#0f2744]">Custom instructions for AI</h2>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Tone, escalation rules, neighborhoods to mention, or anything else the assistant should follow.
          </p>
          <label className="sr-only" htmlFor="customInstructions">
            Additional instructions
          </label>
          <textarea
            id="customInstructions"
            rows={5}
            className={`${fieldClass()} mt-3`}
            value={form.customInstructions}
            onChange={(e) => update({ customInstructions: e.target.value })}
            placeholder="Example: Always mention we are pet-friendly for cats under 15 lbs. Never promise same-day approval."
          />
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-slate-500">
            {hydrated ? "Stored in this browser only (localStorage)." : "Loading saved settings…"}
          </p>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#0f2744] px-8 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0a1f36] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {saving ? (
              <>
                <Spinner className="h-4 w-4 text-white" />
                <span>Saving…</span>
                <span className="sr-only">Saving configuration</span>
              </>
            ) : (
              "Save configuration"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
