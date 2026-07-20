interface RingPoint {
  label: string;
  /** Position on the ring, 0–1 clockwise from 12 o'clock */
  t: number;
}

interface HashRingProps {
  servers?: RingPoint[];
  keyPoint?: RingPoint;
  /** Index into `servers` for the clockwise owner of the key */
  ownerIndex?: number;
}

function ringCoords(cx: number, cy: number, r: number, t: number) {
  const angle = t * 2 * Math.PI - Math.PI / 2;
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function labelCoords(
  cx: number,
  cy: number,
  x: number,
  y: number,
  offset: number,
) {
  const dx = x - cx;
  const dy = y - cy;
  const len = Math.hypot(dx, dy) || 1;
  return {
    x: x + (dx / len) * offset,
    y: y + (dy / len) * offset,
  };
}

function clockwiseArc(
  cx: number,
  cy: number,
  r: number,
  tFrom: number,
  tTo: number,
) {
  let span = tTo - tFrom;
  if (span <= 0) span += 1;

  const from = ringCoords(cx, cy, r, tFrom);
  const to = ringCoords(cx, cy, r, tTo);
  const largeArc = span > 0.5 ? 1 : 0;

  return `M ${from.x} ${from.y} A ${r} ${r} 0 ${largeArc} 1 ${to.x} ${to.y}`;
}

const DEFAULT_SERVERS: RingPoint[] = [
  { label: 'Server C', t: 0.62 },
  { label: 'Server B', t: 0.38 },
  { label: 'Server A (owner)', t: 0.07 },
];

const DEFAULT_KEY: RingPoint = { label: 'key-X', t: 0.82 };

/**
 * Circular hash-ring diagram — servers and keys on a ring with clockwise ownership.
 */
export function HashRing({
  servers = DEFAULT_SERVERS,
  keyPoint = DEFAULT_KEY,
  ownerIndex = 2,
}: HashRingProps) {
  const cx = 130;
  const cy = 130;
  const r = 72;
  const owner = servers[ownerIndex];

  return (
    <div className="hash-ring-diagram not-prose my-8 w-full min-w-0">
      <div className="mx-auto w-full max-w-sm overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
        <svg
          viewBox="0 0 260 260"
          role="img"
          aria-label="Hash ring: key maps to the next server clockwise"
          className="mx-auto block h-auto w-full max-w-[260px]"
        >
          {/* Ring track */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            className="stroke-gray-300 dark:stroke-gray-600"
            strokeWidth={2}
            strokeDasharray="4 4"
          />

          {/* Clockwise lookup arc: key → owner */}
          {owner && (
            <path
              d={clockwiseArc(cx, cy, r - 2, keyPoint.t, owner.t)}
              fill="none"
              className="stroke-blue-500 dark:stroke-blue-400"
              strokeWidth={2}
              markerEnd="url(#hash-ring-arrow)"
            />
          )}

          {/* Server nodes */}
          {servers.map((server) => {
            const { x, y } = ringCoords(cx, cy, r, server.t);
            const label = labelCoords(cx, cy, x, y, 22);
            const isOwner = server === owner;

            return (
              <g key={server.label}>
                <circle
                  cx={x}
                  cy={y}
                  r={isOwner ? 6 : 5}
                  className={
                    isOwner
                      ? 'fill-blue-500 stroke-blue-600 dark:fill-blue-400 dark:stroke-blue-300'
                      : 'fill-gray-100 stroke-gray-700 dark:fill-gray-800 dark:stroke-gray-300'
                  }
                  strokeWidth={2}
                />
                <text
                  x={label.x}
                  y={label.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-700 text-[10px] dark:fill-gray-200"
                  style={{ fontFamily: 'inherit' }}
                >
                  {server.label}
                </text>
              </g>
            );
          })}

          {/* Key on the ring */}
          {(() => {
            const { x, y } = ringCoords(cx, cy, r, keyPoint.t);
            const label = labelCoords(cx, cy, x, y, 22);
            return (
              <g>
                <circle
                  cx={x}
                  cy={y}
                  r={5}
                  className="fill-amber-400 stroke-amber-600 dark:fill-amber-300 dark:stroke-amber-500"
                  strokeWidth={2}
                />
                <text
                  x={label.x}
                  y={label.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-amber-700 text-[10px] dark:fill-amber-200"
                  style={{ fontFamily: 'inherit' }}
                >
                  {keyPoint.label}
                </text>
              </g>
            );
          })()}

          <defs>
            <marker
              id="hash-ring-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path
                d="M0,0 L8,4 L0,8 Z"
                className="fill-blue-500 dark:fill-blue-400"
              />
            </marker>
          </defs>
        </svg>
        <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
          Walk clockwise from the key to the first server — that server owns it.
        </p>
      </div>
    </div>
  );
}
