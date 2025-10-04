import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "Datenschutz – notli" };

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-10 bg-background text-foreground">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-2xl font-bold">Datenschutzerklärung</h1>

        <section className="mt-6 space-y-4 text-sm text-foreground/85">
          <p>
            Wir nehmen den Schutz Ihrer persönlichen Daten ernst. Diese Webseite verarbeitet personenbezogene Daten ausschließlich im Rahmen der geltenden Datenschutzgesetze, insbesondere der Datenschutz-Grundverordnung (DSGVO).
          </p>

          <h2 className="text-lg font-semibold mt-6">1. Verantwortliche Stelle</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist Daniel Hommen. Die Kontaktangaben finden Sie im <a className="underline" href="/impressum">Impressum</a>.
          </p>

          <h2 className="text-lg font-semibold mt-6">2. Erhobene Daten und Zwecke</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Technische Protokolldaten (z. B. IP-Adresse, Datum/Uhrzeit, abgerufene Seiten), um die Website bereitzustellen und Sicherheit/Fehleranalyse zu ermöglichen (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse).
            </li>
            <li>
              Nutzungsdaten im Rahmen des Quiz (z. B. Antworten, Punktzahlen) ausschließlich zur Darstellung des Ergebnisses und zur Verbesserung des Angebots (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse).
            </li>
            <li>
              Kontaktaufnahme per E‑Mail nur auf Ihre Initiative hin (Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO – Einwilligung bzw. lit. b – vorvertragliche Kommunikation).
            </li>
          </ul>

          <h2 className="text-lg font-semibold mt-6">3. Cookies und Tracking</h2>
          <p>
            Diese Website setzt derzeit keine Tracking‑Cookies ein. Technisch notwendige Cookies können verwendet werden, um grundlegende Funktionen bereitzustellen. Sofern zukünftig Analyse‑/Marketing‑Cookies eingesetzt werden, holen wir Ihre Einwilligung ein und informieren hierüber gesondert.
          </p>

          <h2 className="text-lg font-semibold mt-6">4. Empfänger und Drittlandübermittlung</h2>
          <p>
            Eine Weitergabe personenbezogener Daten an Dritte erfolgt nur, soweit dies zur Erfüllung der Zwecke erforderlich ist oder eine gesetzliche Pflicht besteht. Eine Übermittlung in Drittländer findet ohne geeignete Garantien nicht statt.
          </p>

          <h2 className="text-lg font-semibold mt-6">5. Speicherdauer</h2>
          <p>
            Protokolldaten werden in der Regel kurzfristig gelöscht. Nutzungsdaten des Quiz werden nur so lange gespeichert, wie es zur Anzeige der Ergebnisse und zur Verbesserung des Angebots erforderlich ist; anschließend werden sie anonymisiert oder gelöscht.
          </p>

          <h2 className="text-lg font-semibold mt-6">6. Ihre Rechte</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung</li>
            <li>Widerspruch gegen die Verarbeitung aus Gründen, die sich aus Ihrer besonderen Situation ergeben (Art. 21 DSGVO)</li>
            <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft</li>
            <li>Beschwerderecht bei einer Aufsichtsbehörde</li>
          </ul>

          <h2 className="text-lg font-semibold mt-6">7. Kontakt</h2>
          <p>
            Bei Fragen zum Datenschutz wenden Sie sich bitte per E‑Mail an <a className="underline" href="mailto:contact@dhommen.dev">contact@dhommen.dev</a>.
          </p>

          <p className="mt-4 text-foreground/60 text-xs">
            Hinweis: Diese Datenschutzerklärung stellt eine allgemeine Vorlage dar und muss ggf. an die tatsächlichen Prozesse (z. B. Hosting‑Provider, eingesetzte Dienste) angepasst werden.
          </p>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
