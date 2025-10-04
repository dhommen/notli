"use client";

import { useEffect, useMemo, useState } from "react";
import { QUESTIONS as LOCAL_QUESTIONS } from "@/data/questions";
import Navbar from "@/components/Navbar";

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/questions/random?limit=10", { cache: "no-store" });
        if (!res.ok) throw new Error("bad status");
        const data = await res.json();
        if (mounted) setQuestions(Array.isArray(data) ? data.slice(0, 10) : []);
      } catch {
        if (mounted) setQuestions(shuffle(LOCAL_QUESTIONS).slice(0, 10));
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const q = questions[index];
  const total = questions.length || 10;
  const progress = Math.round(((index) / total) * 100);

  const onAnswer = (userThinksTrue) => {
    if (answered) return;
    const correct = userThinksTrue === q.isTrue;
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) setScore((s) => s + 1);
  };

  const onNext = () => {
    if (!answered) return;
    if (index + 1 < total) {
      setIndex((i) => i + 1);
      setAnswered(false);
      setIsCorrect(null);
    }
  };

  const onRestart = () => {
    // Simple restart by reloading the page to reshuffle
    if (typeof window !== "undefined") window.location.reload();
  };

  const finished = index >= total - 0 && answered && index === total - 1;

  return (
    <main className="min-h-screen px-6 py-10 sm:px-10 bg-background text-foreground">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Quiz</h1>
          <span className="text-sm text-foreground/70">
            Frage {Math.min(index + 1 + (answered ? 0 : 0), total)} von {total}
          </span>
        </header>

        {/* Progress bar */}
        <div className="mt-4 h-2 w-full rounded-full bg-foreground/10 overflow-hidden">
          <div
            className="h-2 bg-foreground transition-all"
            style={{ width: `${answered ? Math.min(progress + 100 / total, 100) : progress}%` }}
          />
        </div>

        {/* Question card */}
        {!finished && q && (
          <div className="mt-8 rounded-2xl border border-foreground/15 p-6 bg-background/60">
            <p className="text-lg font-medium leading-snug">{q.text}</p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => onAnswer(true)}
                disabled={answered}
                className={`h-11 rounded-lg px-5 font-medium transition-colors ${
                  answered
                    ? q.isTrue
                      ? "bg-green-600 text-white"
                      : "bg-foreground/20 text-foreground"
                    : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                Echt
              </button>
              <button
                onClick={() => onAnswer(false)}
                disabled={answered}
                className={`h-11 rounded-lg px-5 font-medium transition-colors border ${
                  answered
                    ? !q.isTrue
                      ? "border-green-600 text-green-700"
                      : "border-foreground/20 text-foreground"
                    : "border-foreground/20 hover:bg-foreground/5"
                }`}
              >
                Aprilscherz
              </button>
            </div>

            {answered && (
              <div className="mt-6 rounded-xl border border-foreground/15 p-4">
                <p className={`text-sm font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                  {isCorrect ? "Richtig!" : "Leider falsch."}
                </p>
                <p className="mt-2 text-sm text-foreground/80">{q.explanation}</p>
                {q.sourceUrl && (
                  <p className="mt-2 text-xs">
                    Quelle: {" "}
                    <a className="underline hover:opacity-80" href={q.sourceUrl} target="_blank" rel="noreferrer">
                      {q.sourceUrl}
                    </a>
                  </p>
                )}
                <div className="mt-4">
                  <button
                    onClick={onNext}
                    className="h-10 rounded-lg bg-foreground px-4 text-background text-sm font-medium hover:opacity-90"
                  >
                    Weiter
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Result screen */}
        {finished && (
          <div className="mt-12 rounded-2xl border border-foreground/15 p-6 text-center">
            <h2 className="text-xl font-bold">Geschafft!</h2>
            <p className="mt-2 text-foreground/80">
              Dein Ergebnis: {score} von {total}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator
                      .share({
                        title: "notli – EU‑Quiz",
                        text: `Ich habe ${score}/${total} Punkte erzielt – schaffst du mehr?`,
                        url: typeof window !== "undefined" ? window.location.origin : undefined,
                      })
                      .catch(() => {});
                  } else if (typeof window !== "undefined") {
                    navigator.clipboard
                      .writeText(`${window.location.origin} — Ich habe ${score}/${total} Punkte erzielt!`)
                      .catch(() => {});
                  }
                }}
                className="h-11 rounded-lg border border-foreground/20 px-5"
              >
                Ergebnis teilen
              </button>
              <button onClick={onRestart} className="h-11 rounded-lg bg-foreground px-5 text-background">
                Nochmal spielen
              </button>
            </div>
          </div>
        )}
        {!q && (
          <div className="mt-12 text-center text-foreground/70">Lade Fragen…</div>
        )}
      </div>
    </main>
  );
}
