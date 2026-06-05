import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CODE_LINES = [
  { text: "interface Developer {", color: "#22D3EE", indent: 0 },
  { text: "  name: string;", color: "#94A3B8", indent: 0 },
  { text: "  role: string;", color: "#94A3B8", indent: 0 },
  { text: "  stack: string[];", color: "#94A3B8", indent: 0 },
  { text: "  focus: string;", color: "#94A3B8", indent: 0 },
  { text: "  available: boolean;", color: "#94A3B8", indent: 0 },
  { text: "}", color: "#22D3EE", indent: 0 },
  { text: "", color: "", indent: 0 },
  { text: "const me: Developer = {", color: "#6D5DFC", indent: 0 },
  { text: '  name: "Gonçalo Azevedo",', color: "#a8f0c6", indent: 0 },
  { text: '  role: "Software Engineer",', color: "#a8f0c6", indent: 0 },
  { text: "  stack: [", color: "#F5F7FA", indent: 0 },
  { text: '    "React", "TypeScript", "Tailwind",', color: "#a8f0c6", indent: 0 },
  { text: '    "Node.js", "PostgreSQL",', color: "#a8f0c6", indent: 0 },
  { text: "  ],", color: "#F5F7FA", indent: 0 },
  { text: '  focus: "software systems",', color: "#6D5DFC", indent: 0 },
  { text: "  available: true,", color: "#34D399", indent: 0 },
  { text: "};", color: "#22D3EE", indent: 0 },
];

const CHAR_DELAY = 28;
const LINE_GAP = 80;

export function TerminalWidget() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (currentLine >= CODE_LINES.length) {
      setDone(true);
      return;
    }

    const line = CODE_LINES[currentLine];

    if (currentChar === 0) {
      setDisplayedLines((prev) => [...prev, ""]);
    }

    if (currentChar < line.text.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[currentLine] = line.text.slice(0, currentChar + 1);
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, CHAR_DELAY);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }, LINE_GAP);
    return () => clearTimeout(timer);
  }, [currentLine, currentChar, done]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="overflow-hidden rounded-xl border border-white/10 bg-black/70 shadow-2xl backdrop-blur-md"
      style={{ fontFamily: "'Courier New', monospace" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        <span className="ml-3 text-[10px] tracking-wider text-white/30">~/portfolio/src/me.ts</span>
      </div>

      {/* Code */}
      <div className="space-y-0.5 p-4 text-[11px] leading-5">
        {displayedLines.map((line, i) => (
          <div key={i} style={{ color: CODE_LINES[i]?.color || "#F5F7FA" }}>
            <span className="mr-4 select-none text-white/15">{String(i + 1).padStart(2, "0")}</span>
            {line}
            {i === currentLine && !done && (
              <span className="ml-px inline-block w-1.5 animate-pulse bg-accent">&nbsp;</span>
            )}
          </div>
        ))}
        {done && (
          <div className="mt-2 text-green-400/70">
            <span className="text-white/20">{">"}</span> compiled successfully ✓
          </div>
        )}
      </div>
    </motion.div>
  );
}
