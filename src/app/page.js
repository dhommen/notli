import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-10 sm:px-10 bg-background text-foreground">
      <Navbar />

      <main className="max-w-5xl mx-auto mt-16">
        <section className="text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Rate mit: Aprilscherz oder echte EU‑Regel?
          </h1>
          <p className="mt-4 text-base sm:text-lg text-foreground/80">
            Im Quiz bekommst du kurze Aussagen zu vermeintlichen EU‑Vorschriften. Deine Aufgabe: Entscheide, ob sie echt sind – oder nur gut erfunden.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/quiz"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-foreground px-6 text-base font-medium text-background shadow-sm hover:opacity-90"
            >
              Quiz starten
            </Link>
            <a
              href="#wie-funktioniert"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-foreground/20 px-6 text-base font-medium hover:bg-foreground/5"
            >
              Mehr erfahren
            </a>
          </div>
        </section>

        <section id="wie-funktioniert" className="mt-20 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Kurz & knackig",
              text: "Jede Frage besteht aus einer einzigen Aussage – du wählst Wahr oder Aprilscherz.",
            },
            {
              title: "Direktes Feedback",
              text: "Nach jeder Antwort erfährst du sofort, was stimmt – inklusive kurzer Erklärung.",
            },
            {
              title: "Teile dein Ergebnis",
              text: "Am Ende bekommst du eine Auswertung, die du mit Freund*innen teilen kannst.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-foreground/15 p-5 bg-background/60">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-foreground/80">{f.text}</p>
            </div>
          ))}
        </section>

        <section id="beispiele" className="mt-20">
          <h2 className="text-xl font-bold">Beispiele</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {["Brot darf nur noch in sechseckiger Form gebacken werden.", "Alle Ladegeräte müssen denselben Anschluss verwenden.", "Zahnbürsten brauchen eine EU‑Lizenznummer.", "Kinder unter 14 dürfen keine Limonade mehr trinken."].map(
              (ex, i) => (
                <li key={i} className="rounded-xl border border-foreground/15 p-4 text-sm text-foreground/90">
                  {ex}
                </li>
              )
            )}
          </ul>
          <p className="mt-3 text-sm text-foreground/70">
            Einige davon sind echt, andere frei erfunden – findest du heraus, welche?
          </p>
        </section>

        <section id="faq" className="mt-20">
          <h2 className="text-xl font-bold">FAQ</h2>
          <details className="mt-4 rounded-xl border border-foreground/15 p-4">
            <summary className="font-medium cursor-pointer">Wer erstellt die Fragen?</summary>
            <p className="mt-2 text-sm text-foreground/80">Die Fragen werden kuratiert und mit Quellenangaben versehen. Ziel ist spielerische Aufklärung ohne Langeweile.</p>
          </details>
          <details className="mt-3 rounded-xl border border-foreground/15 p-4">
            <summary className="font-medium cursor-pointer">Brauche ich ein Konto?</summary>
            <p className="mt-2 text-sm text-foreground/80">Nein. Du kannst sofort loslegen. Optional kannst du dein Ergebnis teilen.</p>
          </details>
        </section>

        <div className="mt-16 text-center">
          <Link
            href="/quiz"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-foreground px-6 text-base font-medium text-background shadow-sm hover:opacity-90"
          >
            Jetzt quizzen
          </Link>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto mt-20 border-t border-foreground/10 pt-6 text-sm text-foreground/60 flex items-center justify-between">
        <span>© {new Date().getFullYear()} notli</span>
        <nav className="flex items-center gap-4">
          <a className="hover:text-foreground" href="/impressum">Impressum</a>
          <a className="hover:text-foreground" href="/datenschutz">Datenschutz</a>
        </nav>
      </footer>
    </div>
  );
}
