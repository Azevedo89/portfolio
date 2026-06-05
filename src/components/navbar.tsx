import { Code2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "../data/site";

export function Navbar() {
  const [active, setActive] = useState<string>(siteConfig.nav[0]?.href ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const navIds = siteConfig.nav.map((n) => n.href.replace("#", ""));
    const allIds = Array.from(new Set([...navIds, "contacto"]));
    const sections = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const visibility = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visibility.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        }
        let topId = "";
        let topRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > topRatio) { topRatio = ratio; topId = id; }
        }
        if (topId) setActive(`#${topId}`);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => io.observe(s));

    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (nearBottom) setActive("#contacto");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open + close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const mobileItems = [...siteConfig.nav, { label: "Contact", href: "#contacto" }];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="container-shell pt-4">
          <div className="glass-panel flex items-center justify-between rounded-full px-4 py-2.5 shadow-soft sm:px-6">
            <a
              className="flex items-center gap-2 sm:gap-3"
              href="#inicio"
              onClick={() => setOpen(false)}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent sm:h-9 sm:w-9">
                <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground sm:text-xs sm:tracking-[0.22em]">
                <span className="min-[420px]:hidden">G. Azevedo</span>
                <span className="hidden min-[420px]:inline">Gonçalo Azevedo</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-6 md:flex">
              {siteConfig.nav.map((item) => {
                const isActive = item.href === active;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative font-mono text-xs transition-colors duration-300 ${
                      isActive ? "text-accent" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`pointer-events-none absolute -bottom-1.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-accent transition-all duration-300 ${
                        isActive ? "w-5 opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Desktop Contact button */}
            <a
              href="#contacto"
              aria-current={active === "#contacto" ? "page" : undefined}
              className={`hidden rounded-full border px-4 py-1.5 font-mono text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 md:inline-flex ${
                active === "#contacto"
                  ? "border-accent/60 bg-accent/15 text-accent shadow-[0_0_18px_rgba(109,93,252,0.35)]"
                  : "border-white/10 bg-white/5 text-foreground hover:bg-accent/10 hover:border-accent/40 hover:text-accent"
              }`}
            >
              Contact
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`relative z-[60] inline-flex items-center justify-center rounded-full border p-2 transition-colors duration-300 md:hidden ${
                open
                  ? "border-accent/60 bg-accent/15 text-accent"
                  : "border-white/10 bg-white/5 text-foreground"
              }`}
            >
              <Menu
                className={`h-4 w-4 transition-all duration-200 ${
                  open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <X
                className={`absolute h-4 w-4 transition-all duration-200 ${
                  open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-background/85 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <div
          className={`absolute inset-x-0 top-0 px-4 pt-24 transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <nav className="glass-panel mx-auto flex max-w-md flex-col gap-1 rounded-2xl p-3 shadow-soft">
            {mobileItems.map((item, i) => {
              const isActive = item.href === active;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  style={{ transitionDelay: open ? `${i * 35}ms` : "0ms" }}
                  className={`group flex items-center justify-between rounded-xl px-4 py-3.5 font-mono text-sm transition-all duration-300 ${
                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  } ${
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-muted hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`font-mono text-[10px] ${
                        isActive ? "text-accent" : "text-muted/40"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    {item.label}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      isActive ? "bg-accent shadow-[0_0_8px_rgba(109,93,252,0.7)]" : "bg-transparent"
                    }`}
                  />
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
