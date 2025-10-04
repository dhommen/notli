import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "Impressum – notli" };

export default function ImpressumPage() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-10 bg-background text-foreground">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-2xl font-bold">Impressum</h1>
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Kontaktinformationen</h2>
          <address className="not-italic mt-2 text-sm text-foreground/80 leading-6">
            Daniel Hommen
            <br />
            Postfach 300610
            <br />
            53186 Bonn
            <br />
            Deutschland
          </address>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Kontakt</h2>
          <p className="mt-2 text-sm text-foreground/80">
            E‑Mail: <a className="underline hover:opacity-80" href="mailto:contact@dhommen.dev">contact@dhommen.dev</a>
          </p>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
