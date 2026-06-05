import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, Terminal } from "lucide-react";
import { siteConfig, socialLinks } from "../data/site";
import { AnimatedSection } from "./animated-section";
import { SectionTitle } from "./section-title";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

const contactLines = [
  { prompt: "$", text: "contact goncalo", color: "#a8f0c6" },
  { prompt: ">", text: 'role: "Software Engineer"', color: "#6D5DFC" },
  { prompt: ">", text: `base: "${siteConfig.location}"`, color: "#94A3B8" },
  { prompt: ">", text: 'focus: "software and web applications"', color: "#22D3EE" },
  { prompt: ">", text: 'status: "personal portfolio"', color: "#34D399" },
];

export function ContactSection() {
  return (
    <AnimatedSection id="contacto" className="section-spacing">
      <div className="container-shell">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left: info */}
          <div>
            <SectionTitle
              eyebrow="Contact"
              title="If you want to reach me, here is where to do it."
              description="You can contact me by email or on LinkedIn. I kept this section simple and direct."
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-black/80"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
                <Terminal className="h-3 w-3 text-accent" />
                <span className="ml-1 text-[10px] tracking-wider text-white/30">contact</span>
              </div>
              <div className="space-y-1.5 p-5 text-[11px] leading-5">
                {contactLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    className="flex gap-2"
                  >
                    <span className="text-white/25">{line.prompt}</span>
                    <span style={{ color: line.color }}>{line.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <Card className="mt-4 p-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-muted">Email</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 block font-display text-xl text-foreground transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>

              <div className="mt-5 flex flex-wrap gap-2">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.label as keyof typeof socialIcons];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                    >
                      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                      {social.label}
                    </a>
                  );
                })}
              </div>
            </Card>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <Card className="p-5 sm:p-6 lg:p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-muted">Message</p>
                  <h3 className="mt-2 font-display text-2xl text-foreground">Get in touch</h3>
                </div>
                <div className="rounded-xl border border-white/10 bg-accent/10 p-3 text-accent">
                  <Send className="h-4 w-4" />
                </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <Input placeholder="Your name" aria-label="Name" />
                <Input type="email" placeholder="Your email" aria-label="Email" />
                <Input placeholder="Subject" aria-label="Subject" />
                <Textarea placeholder="Your message" aria-label="Message" />
                <Button type="button" className="w-full gap-2 rounded-2xl">
                  Send message
                  <Send className="h-4 w-4" />
                </Button>
              </form>

              <p className="mt-4 text-[11px] leading-5 text-muted/60">
                This form is visual only. Real contact happens by email or LinkedIn.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
