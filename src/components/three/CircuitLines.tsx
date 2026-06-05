// Static decorative SVG — minimal CSS animations to stay performant

export function CircuitLines({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 200"
      className={`overflow-visible ${className}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* Base static traces */}
      <path d="M 0 60 H 80 V 20 H 200 V 80 H 350"  fill="none" stroke="#6D5DFC" strokeWidth="0.7" opacity="0.18" />
      <path d="M 50 0 V 40 H 130 V 100 H 280 V 50 H 400" fill="none" stroke="#22D3EE" strokeWidth="0.7" opacity="0.18" />
      <path d="M 100 120 H 220 V 60 H 320 V 140 H 500"   fill="none" stroke="#6D5DFC" strokeWidth="0.7" opacity="0.15" />
      <path d="M 0 100 H 60 V 160 H 180 V 100 H 260"     fill="none" stroke="#A78BFA" strokeWidth="0.7" opacity="0.15" />
      <path d="M 200 0 V 80 H 300 V 30 H 500"            fill="none" stroke="#22D3EE" strokeWidth="0.7" opacity="0.15" />

      {/* Junction nodes — static, no animation */}
      {([
        [80,60],[200,20],[200,80],[130,40],[130,100],[280,50],
        [220,60],[320,60],[60,100],[60,160],[180,100],[260,100],[300,30],
      ] as [number,number][]).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2"
          fill={i % 2 === 0 ? "#6D5DFC" : "#22D3EE"}
          opacity="0.35"
        />
      ))}
    </svg>
  );
}
