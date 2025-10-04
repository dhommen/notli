"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";

function EmptyQuestion() {
  return { text: "", isTrue: false, explanation: "", sourceUrl: "" };
}

export default function AdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EmptyQuestion());

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (debouncedQ) params.set("q", debouncedQ);
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));
      const res = await fetch(`/api/questions?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Status " + res.status);
      const data = await res.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      setError("Fehler beim Laden der Fragen.");
    } finally {
      setLoading(false);
    }
  }, [debouncedQ, page, pageSize]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);

  const startCreate = () => {
    setEditingId("new");
    setForm(EmptyQuestion());
  };

  const startEdit = (q) => {
    setEditingId(q.id);
    setForm({ text: q.text, isTrue: q.isTrue, explanation: q.explanation, sourceUrl: q.sourceUrl || "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EmptyQuestion());
  };

  const save = async () => {
    const payload = {
      text: form.text?.trim(),
      explanation: form.explanation?.trim(),
      isTrue: !!form.isTrue,
      sourceUrl: form.sourceUrl?.trim() || null,
    };
    try {
      if (editingId === "new") {
        const res = await fetch("/api/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
      } else {
        const res = await fetch(`/api/questions/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
      }
      await load();
      cancelEdit();
    } catch (e) {
      alert("Speichern fehlgeschlagen. Bitte Eingaben prüfen.");
    }
  };

  const remove = async (id) => {
    if (!confirm("Wirklich löschen?")) return;
    try {
      const res = await fetch(`/api/questions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await load();
    } catch (e) {
      alert("Löschen fehlgeschlagen.");
    }
  };

  return (
    <main className="min-h-screen px-6 py-10 sm:px-10 bg-background text-foreground">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-8">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Admin – Fragen</h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                className="h-10 w-full rounded-lg border border-foreground/20 bg-background pl-9 pr-3"
                placeholder="Suchen…"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" aria-hidden>🔍</span>
            </div>
            <button
              onClick={startCreate}
              className="h-10 shrink-0 rounded-lg bg-foreground px-4 text-background text-sm font-medium hover:opacity-90"
            >
              Neue Frage
            </button>
          </div>
        </header>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {loading && <p className="mt-4 text-sm text-foreground/70">Lade…</p>}

        {!loading && items.length === 0 && (
          <p className="mt-6 text-sm text-foreground/70">Keine Fragen vorhanden.</p>
        )}

        {!loading && items.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border border-foreground/15 text-sm">
              <thead className="bg-foreground/5">
                <tr>
                  <th className="text-left px-4 py-3 border-b border-foreground/15 w-[50%]">Aussage</th>
                  <th className="text-left px-4 py-3 border-b border-foreground/15 whitespace-nowrap">Typ</th>
                  <th className="text-left px-4 py-3 border-b border-foreground/15">Quelle</th>
                  <th className="text-left px-4 py-3 border-b border-foreground/15 whitespace-nowrap">Erstellt</th>
                  <th className="px-4 py-3 border-b border-foreground/15 text-right">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {items.map((q) => (
                  <tr key={q.id} className="odd:bg-background/60">
                    <td className="align-top px-4 py-3">
                      <div className="max-w-[70ch] truncate" title={q.text}>{q.text}</div>
                    </td>
                    <td className="align-top px-4 py-3 whitespace-nowrap">
                      {q.isTrue ? (
                        <span className="inline-flex items-center rounded-md bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 text-xs">Echt</span>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 text-xs">Aprilscherz</span>
                      )}
                    </td>
                    <td className="align-top px-4 py-3">
                      {q.sourceUrl ? (
                        <a className="underline hover:opacity-80 break-all" href={q.sourceUrl} target="_blank" rel="noreferrer">
                          {q.sourceUrl}
                        </a>
                      ) : (
                        <span className="text-foreground/50">—</span>
                      )}
                    </td>
                    <td className="align-top px-4 py-3 whitespace-nowrap text-foreground/70">
                      {q.createdAt ? new Date(q.createdAt).toLocaleDateString("de-DE") : "—"}
                    </td>
                    <td className="align-top px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => startEdit(q)}
                          aria-label="Bearbeiten"
                          title="Bearbeiten"
                          className="h-9 w-9 grid place-items-center rounded-md border border-foreground/20 hover:bg-foreground/5"
                        >
                          <span aria-hidden>✏️</span>
                        </button>
                        <button
                          onClick={() => remove(q.id)}
                          aria-label="Löschen"
                          title="Löschen"
                          className="h-9 w-9 grid place-items-center rounded-md border border-red-300 text-red-700 hover:bg-red-50"
                        >
                          <span aria-hidden>🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 flex items-center justify-between text-xs text-foreground/60">
              <span>
                {items.length} von {total} Einträgen
              </span>
              <div className="flex items-center gap-2">
                <button
                  className="h-8 w-8 grid place-items-center rounded-md border border-foreground/20 disabled:opacity-40"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  aria-label="Vorherige Seite"
                  title="Vorherige Seite"
                >
                  ◀
                </button>
                <span>
                  Seite {page} von {Math.max(1, Math.ceil(total / pageSize))}
                </span>
                <button
                  className="h-8 w-8 grid place-items-center rounded-md border border-foreground/20 disabled:opacity-40"
                  onClick={() => setPage((p) => (p < Math.ceil(total / pageSize) ? p + 1 : p))}
                  disabled={page >= Math.ceil(total / pageSize) || total === 0}
                  aria-label="Nächste Seite"
                  title="Nächste Seite"
                >
                  ▶
                </button>
                <select
                  className="h-8 rounded-md border border-foreground/20 bg-background"
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                >
                  {[10, 25, 50, 100].map((n) => (
                    <option key={n} value={n}>{n}/Seite</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {editingId && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={cancelEdit}
              aria-hidden
            />
            {/* Dialog */}
            <div className="absolute inset-0 grid place-items-center p-4">
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="admin-edit-title"
                className="w-full max-w-2xl rounded-2xl border border-foreground/15 bg-background p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 id="admin-edit-title" className="text-lg font-semibold">
                    {editingId === "new" ? "Neue Frage" : "Frage bearbeiten"}
                  </h2>
                  <button
                    onClick={cancelEdit}
                    aria-label="Schließen"
                    title="Schließen"
                    className="h-9 w-9 grid place-items-center rounded-md border border-foreground/20 hover:bg-foreground/5"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-4 grid gap-4">
                  <label className="grid gap-2">
                    <span className="text-sm">Aussage</span>
                    <textarea
                      value={form.text}
                      onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                      className="min-h-24 rounded-lg border border-foreground/20 p-3 bg-background"
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.isTrue}
                      onChange={(e) => setForm((f) => ({ ...f, isTrue: e.target.checked }))}
                    />
                    <span className="text-sm">Echt (wenn deaktiviert: Aprilscherz)</span>
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm">Erklärung</span>
                    <textarea
                      value={form.explanation}
                      onChange={(e) => setForm((f) => ({ ...f, explanation: e.target.value }))}
                      className="min-h-24 rounded-lg border border-foreground/20 p-3 bg-background"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm">Quelle (optional)</span>
                    <input
                      value={form.sourceUrl}
                      onChange={(e) => setForm((f) => ({ ...f, sourceUrl: e.target.value }))}
                      placeholder="https://…"
                      className="h-10 rounded-lg border border-foreground/20 px-3 bg-background"
                    />
                  </label>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={cancelEdit} className="h-10 rounded-lg border border-foreground/20 px-4 text-sm">Abbrechen</button>
                  <button onClick={save} className="h-10 rounded-lg bg-foreground px-4 text-background text-sm font-medium">Speichern</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
