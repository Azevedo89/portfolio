import { motion } from "framer-motion";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <motion.div
      className="max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      <h2 className="font-display text-3xl leading-tight text-balance text-foreground min-[420px]:text-4xl sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted sm:mt-5 sm:text-lg">{description}</p>
    </motion.div>
  );
}
