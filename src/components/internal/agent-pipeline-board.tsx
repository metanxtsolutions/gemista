"use client";

import { useState, useSyncExternalStore } from "react";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import styles from "./agent-pipeline-board.module.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

type Status = "none" | "progress" | "blocked" | "done";

interface StageEntry {
  status: Status;
  note: string;
  updated: number | null;
}

interface Stage {
  id?: string;
  key: string;
  name: string;
  role: string;
  gate?: boolean;
}

const STORE_KEY = "gemista-agent-pipeline-v1";
const STATES: Status[] = ["none", "progress", "blocked", "done"];
const STATE_LABEL: Record<Status, string> = {
  none: "Not started",
  progress: "In progress",
  blocked: "Blocked",
  done: "Done",
};

const PIPELINE: Stage[] = [
  { id: "01", key: "catalog-ingestion", name: "catalog-ingestion", role: "Loads and normalizes products from source." },
  { id: "02", key: "product-qualifier", name: "product-qualifier", role: "LIST / HOLD / REJECT gate on India fit and margin.", gate: true },
  { id: "03", key: "listing-copywriter", name: "listing-copywriter", role: "Names, descriptions, meta, keywords for LIST items." },
  { id: "04", key: "schema-markup", name: "schema-markup", role: "Product, Offer, Review JSON-LD for listed pages." },
  { id: "05", key: "seo-strategist", name: "seo-strategist", role: "On-page audit, internal links, ranking plan." },
];

const TRACKS: Stage[] = [
  { key: "ui-ux-engineer", name: "ui-ux-engineer", role: "Layout, components, accessibility, responsiveness." },
  { key: "user-journey-designer", name: "user-journey-designer", role: "Browse-to-checkout flow and conversion friction." },
  { key: "performance-optimizer", name: "performance-optimizer", role: "Core Web Vitals: LCP, CLS, INP, bundle size." },
];

const GATE: Stage[] = [
  { key: "qa-reviewer", name: "qa-reviewer", role: "Read-only pass/fail check before anything ships." },
];

const ALL_STAGES = [...PIPELINE, ...TRACKS, ...GATE];

function emptyEntry(): StageEntry {
  return { status: "none", note: "", updated: null };
}

type PipelineData = Record<string, StageEntry>;
const EMPTY_DATA: PipelineData = {};
const listeners = new Set<() => void>();
let cache: PipelineData = EMPTY_DATA;

function readFromStorage(): PipelineData {
  if (typeof window === "undefined") return EMPTY_DATA;
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as PipelineData) : EMPTY_DATA;
  } catch {
    return EMPTY_DATA;
  }
}

if (typeof window !== "undefined") {
  cache = readFromStorage();
}

function writeToStorage(next: PipelineData) {
  cache = next;
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (private browsing, quota) — board still works for the session
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return cache;
}

function getServerSnapshot() {
  return EMPTY_DATA;
}

function cycleStage(data: PipelineData, key: string) {
  const current = data[key] ?? emptyEntry();
  const idx = STATES.indexOf(current.status);
  const next = STATES[(idx + 1) % STATES.length];
  writeToStorage({ ...data, [key]: { ...current, status: next, updated: Date.now() } });
}

function updateStageNote(data: PipelineData, key: string, value: string) {
  const current = data[key] ?? emptyEntry();
  writeToStorage({ ...data, [key]: { ...current, note: value, updated: Date.now() } });
}

function resetBoard() {
  writeToStorage({});
}

function fmtTime(ts: number | null) {
  if (!ts) return "not updated";
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function chipStyle(status: Status) {
  const map: Record<Status, [string, string]> = {
    none: ["var(--st-none)", "var(--st-none-bg)"],
    progress: ["var(--st-progress)", "var(--st-progress-bg)"],
    blocked: ["var(--st-blocked)", "var(--st-blocked-bg)"],
    done: ["var(--st-done)", "var(--st-done-bg)"],
  };
  const [color, background] = map[status];
  return { color, background };
}

export function AgentPipelineBoard() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});

  function entry(key: string): StageEntry {
    return data[key] ?? emptyEntry();
  }

  function cycle(key: string) {
    cycleStage(data, key);
    setOpenNotes((prev) => ({ ...prev, [key]: true }));
  }

  function updateNote(key: string, value: string) {
    updateStageNote(data, key, value);
  }

  function reset() {
    resetBoard();
    setOpenNotes({});
  }

  const doneCount = ALL_STAGES.filter((s) => entry(s.key).status === "done").length;

  function NoteBlock({ stageKey }: { stageKey: string }) {
    const e = entry(stageKey);
    const open = openNotes[stageKey] ?? Boolean(e.note);
    return (
      <div className={`${styles.noteWrap} ${open ? styles.noteWrapOpen : ""}`}>
        <textarea
          placeholder="Notes, blockers, output summary..."
          value={e.note}
          onClick={(ev) => ev.stopPropagation()}
          onChange={(ev) => updateNote(stageKey, ev.target.value)}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.board} ${plexSans.variable} ${plexMono.variable}`} style={{ fontFamily: "var(--font-plex-sans), -apple-system, sans-serif" }}>
      <h2 className={styles.srOnly}>
        Gemista agent pipeline tracker: a manual status board for the nine e-commerce build agents, grouped into a
        five-stage sequential pipeline, three independent tracks, and one final review gate.
      </h2>

      <div className={styles.hd}>
        <div className={styles.hdTitle}>
          <p className={styles.hdEyebrow}>Gemista &middot; agent pipeline</p>
          <h1>Product listing &amp; SEO build</h1>
          <p className={styles.hdSub}>
            Manual status board. Update each stage yourself as you run it in Claude Code, nothing here connects to a
            live session.
          </p>
        </div>
        <div className={styles.meter}>
          <div className={styles.meterTop}>
            <span>Board progress</span>
            <strong>
              {doneCount} / {ALL_STAGES.length} done
            </strong>
          </div>
          <div className={styles.meterTrack}>
            {ALL_STAGES.map((s) => (
              <div key={s.key} className={`${styles.meterSeg} ${entry(s.key).status === "done" ? styles.meterSegOn : ""}`} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.legend}>
        <span>
          <i className={styles.dot} style={{ background: "var(--st-none)" }} />
          Not started
        </span>
        <span>
          <i className={styles.dot} style={{ background: "var(--st-progress)" }} />
          In progress
        </span>
        <span>
          <i className={styles.dot} style={{ background: "var(--st-blocked)" }} />
          Blocked
        </span>
        <span>
          <i className={styles.dot} style={{ background: "var(--st-done)" }} />
          Done
        </span>
      </div>

      <section className={styles.group}>
        <p className={styles.groupLabel}>Sequential pipeline &middot; runs in order</p>
        <div className={styles.rail}>
          {PIPELINE.map((item, i) => {
            const e = entry(item.key);
            return (
              <div key={item.key} className={styles.railItem}>
                <div
                  className={`${styles.railConnector} ${i === 0 ? styles.railConnectorHidden : ""} ${
                    e.status === "progress" ? styles.railConnectorFlow : ""
                  }`}
                />
                <div style={{ width: "100%" }}>
                  <button
                    type="button"
                    className={`${styles.node} ${item.gate ? styles.nodeGate : ""}`}
                    aria-label={`${item.name}, status ${STATE_LABEL[e.status]}. Click to change.`}
                    onClick={() => cycle(item.key)}
                  >
                    <div className={styles.nodeTop}>
                      <span className={styles.nodeId}>
                        [{item.id}]{item.gate && <span className={styles.gateTag}> &middot; gate</span>}
                      </span>
                      <span className={styles.chip} style={chipStyle(e.status)}>
                        {STATE_LABEL[e.status]}
                      </span>
                    </div>
                    <div className={styles.nodeName}>{item.name}</div>
                    <div className={styles.nodeRole}>{item.role}</div>
                    <div className={styles.nodeMeta}>
                      <span>updated {fmtTime(e.updated)}</span>
                    </div>
                  </button>
                  <NoteBlock stageKey={item.key} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.group}>
        <p className={styles.groupLabel}>Independent tracks &middot; run anytime</p>
        <div className={styles.rows}>
          {TRACKS.map((item) => {
            const e = entry(item.key);
            return (
              <div key={item.key}>
                <button
                  type="button"
                  className={styles.row}
                  aria-label={`${item.name}, status ${STATE_LABEL[e.status]}. Click to change.`}
                  onClick={() => cycle(item.key)}
                >
                  <div className={styles.rowMain}>
                    <span className={styles.rowName}>{item.name}</span>
                    <span className={styles.rowRole}>{item.role}</span>
                  </div>
                  <span className={styles.chip} style={chipStyle(e.status)}>
                    {STATE_LABEL[e.status]}
                  </span>
                  <span className={styles.rowMeta}>{fmtTime(e.updated)}</span>
                </button>
                <NoteBlock stageKey={item.key} />
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.group}>
        <p className={styles.groupLabel}>Final gate &middot; reviews all output</p>
        <div className={styles.rows}>
          {GATE.map((item) => {
            const e = entry(item.key);
            return (
              <div key={item.key}>
                <button
                  type="button"
                  className={styles.row}
                  aria-label={`${item.name}, status ${STATE_LABEL[e.status]}. Click to change.`}
                  onClick={() => cycle(item.key)}
                >
                  <div className={styles.rowMain}>
                    <span className={styles.rowName}>{item.name}</span>
                    <span className={styles.rowRole}>{item.role}</span>
                  </div>
                  <span className={styles.chip} style={chipStyle(e.status)}>
                    {STATE_LABEL[e.status]}
                  </span>
                  <span className={styles.rowMeta}>{fmtTime(e.updated)}</span>
                </button>
                <NoteBlock stageKey={item.key} />
              </div>
            );
          })}
        </div>
      </section>

      <div className={styles.ft}>
        <p className={styles.ftNote}>Click a stage to cycle its status and jot a note. Saved to this browser only.</p>
        <button className={styles.resetBtn} type="button" onClick={reset}>
          Reset board
        </button>
      </div>
    </div>
  );
}
