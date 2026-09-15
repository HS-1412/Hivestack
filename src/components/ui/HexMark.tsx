type HexMarkProps = {
  size?: number
  className?: string
  title?: string
}

const HEX_PATH = 'M24 3.5 41.7 13.75v20.5L24 44.5 6.3 34.25v-20.5Z'

/**
 * The Hivestack mark: three hexagons stacked on a diagonal, front to back.
 * Front plate is solid, the two behind it step back in opacity.
 */
export default function HexMark({ size = 40, className = '', title }: HexMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <g transform="translate(16 16)">
        <path d={HEX_PATH} fill="currentColor" opacity={0.35} />
      </g>
      <g transform="translate(8 8)">
        <path d={HEX_PATH} fill="currentColor" opacity={0.65} />
      </g>
      <g transform="translate(0 0)">
        <path d={HEX_PATH} fill="currentColor" />
      </g>
    </svg>
  )
}

/** Outline-only variant, used where the mark sits behind text. */
export function HexOutline({ size = 40, className = '' }: HexMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(16 16)">
        <path d={HEX_PATH} stroke="currentColor" strokeWidth={1.25} opacity={0.3} />
      </g>
      <g transform="translate(8 8)">
        <path d={HEX_PATH} stroke="currentColor" strokeWidth={1.25} opacity={0.55} />
      </g>
      <g transform="translate(0 0)">
        <path d={HEX_PATH} stroke="currentColor" strokeWidth={1.5} />
      </g>
    </svg>
  )
}
