import { socialLinks } from "../data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-8">
      <div className="container-shell flex flex-col gap-4 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-white/20">{"// "}</span>
          © 2026 Gonçalo Azevedo. Madeira, Portugal.
        </p>
        <div className="flex flex-wrap items-center gap-5">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 hover:text-foreground"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
