export function GradientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020202]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(29,185,84,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_100%_0%,rgba(139,92,246,0.14),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_80%,rgba(56,189,248,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(236,72,153,0.08),transparent_55%)]" />

      <div
        className="absolute inset-0 opacity-70 animate-aurora"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 50%, rgba(29,185,84,0.08), rgba(139,92,246,0.06), rgba(56,189,248,0.07), rgba(29,185,84,0.08))",
        }}
      />

      <div className="absolute -top-[15%] left-[5%] h-[60vh] w-[60vh] rounded-full bg-spotify-green/30 blur-[110px] animate-orb" />
      <div className="absolute top-[30%] -right-[10%] h-[50vh] w-[50vh] rounded-full bg-violet-500/20 blur-[100px] animate-orb-delayed" />
      <div className="absolute top-[55%] left-[5%] h-[42vh] w-[48vh] rounded-full bg-cyan-400/15 blur-[95px] animate-orb-slow" />
      <div className="absolute -bottom-[5%] right-[20%] h-[38vh] w-[45vh] rounded-full bg-fuchsia-500/12 blur-[90px] animate-orb" />

      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 35%, black 15%, transparent 78%)",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020202_78%)]" />
    </div>
  );
}
