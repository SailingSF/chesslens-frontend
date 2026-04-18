// Stylized evaluation curve — static, decorative. Highlights a blunder
// around index 20 with the "17…h6?" label to match the narration card.

const EVAL_POINTS = [
  0.1, 0.2, 0.15, 0.3, 0.4, 0.35, 0.5, 0.45, 0.6, 0.55, 0.65, 0.7, 0.6, 0.7,
  0.85, 0.8, 0.7, 0.6, 0.4, 0.2, -0.1, -0.3, -0.2, -0.4, -0.3, -0.5, -0.7,
  -0.9, -0.7, -0.8, -1.0, -0.9, -1.2, -1.4, -1.1, -0.9, -1.0, -0.8, -0.6, -0.7,
]
const W = 320
const H = 96
const MAX = 1.5
const BLUNDER_IDX = 20

export function EvalGraph() {
  const dx = W / (EVAL_POINTS.length - 1)
  const y = (v: number) => H / 2 - (v / MAX) * (H / 2 - 6)
  const line = EVAL_POINTS
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * dx} ${y(v)}`)
    .join(' ')
  const area = `${line} L ${W} ${H / 2} L 0 ${H / 2} Z`
  const bx = BLUNDER_IDX * dx
  const by = y(EVAL_POINTS[BLUNDER_IDX])

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="cl-evalgraph">
      <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="rgba(232,225,204,0.12)" strokeDasharray="2 3" />
      <path d={area} fill="rgba(212,161,74,0.08)" />
      <path d={line} fill="none" stroke="#D4A14A" strokeWidth="1.4" />
      <circle cx={bx} cy={by} r="3" fill="#E8E1CC" />
      <circle cx={bx} cy={by} r="6" fill="none" stroke="#D4A14A" strokeOpacity="0.6" />
      <text x={bx + 10} y={by - 6} fontFamily="JetBrains Mono" fontSize="9" fill="#E8E1CC">
        17…h6?
      </text>
    </svg>
  )
}
