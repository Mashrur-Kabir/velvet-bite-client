import { LegalPageProps } from "@/types";

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <div className="max-w-3xl mx-auto py-20 space-y-12">
      <header className="border-b border-caramel/10 pb-10">
        <h1 className="text-4xl font-serif font-bold text-cream mb-2">
          {title}
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-caramel font-bold">
          Last Updated: {lastUpdated}
        </p>
      </header>

      <div className="prose prose-invert prose-caramel max-w-none text-muted-foreground leading-relaxed font-sans">
        {children}
      </div>
    </div>
  );
}
