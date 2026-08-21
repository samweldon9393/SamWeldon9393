/**
 * Ambient background: two slow-drifting colour washes over near-black, with the
 * old starfield kept as a faint texture and faded out down the page so content
 * lower down sits on flat colour.
 */
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink" />

      <div
        className="absolute inset-x-0 top-0 h-[70vh] animate-drift bg-[url('/images/sky1.png')]
                   bg-[length:900px_680px] opacity-[0.18]"
        style={{
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />

      <div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute -right-32 top-1/4 h-[32rem] w-[32rem] rounded-full bg-indigo-500/10 blur-[130px]" />

      {/* Grain keeps the large flat areas from banding. */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
