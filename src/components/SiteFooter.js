export default function SiteFooter() {
  return (
    <footer className="max-w-5xl mx-auto mt-20 border-t border-foreground/10 pt-6 text-sm text-foreground/60 flex items-center justify-between">
      <span>© {new Date().getFullYear()} notli</span>
      <nav className="flex items-center gap-4">
        <a className="hover:text-foreground" href="/impressum">Impressum</a>
        <a className="hover:text-foreground" href="/datenschutz">Datenschutz</a>
      </nav>
    </footer>
  );
}
