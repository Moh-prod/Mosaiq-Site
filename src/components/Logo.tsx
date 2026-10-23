import { cx } from '@/lib/cx';
import styles from './Logo.module.css';

type Variant = 'dark' | 'light';

/**
 * Le « Q » de MOSAIQ dessiné en tuiles de mosaïque :
 * 8 pièces forment le cercle, la tuile orange en forme la queue.
 */
const TILES: { x: number; y: number; shade: 0 | 1 | 2 }[] = [
  { x: 1, y: 1, shade: 0 },
  { x: 15, y: 1, shade: 1 },
  { x: 29, y: 1, shade: 0 },
  { x: 1, y: 15, shade: 1 },
  { x: 29, y: 15, shade: 2 },
  { x: 1, y: 29, shade: 0 },
  { x: 15, y: 29, shade: 2 },
  { x: 29, y: 29, shade: 0 },
];

const SHADES: Record<Variant, [string, string, string]> = {
  dark: ['#252f85', '#4a58c6', '#a5aeef'],
  light: ['#ffffff', '#a5aeef', '#5b69d3'],
};

export function LogoMark({ variant = 'dark', className }: { variant?: Variant; className?: string }) {
  const shades = SHADES[variant];
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true" focusable="false">
      {TILES.map((tile) => (
        <rect key={`${tile.x}-${tile.y}`} x={tile.x} y={tile.y} width="11" height="11" rx="3" fill={shades[tile.shade]} />
      ))}
      <rect x="43" y="43" width="11" height="11" rx="3" fill="#e4612b" />
    </svg>
  );
}

export default function Logo({ variant = 'dark', className }: { variant?: Variant; className?: string }) {
  return (
    <span className={cx(styles.logo, variant === 'light' && styles.light, className)}>
      <LogoMark variant={variant} className={styles.mark} />
      <span className={styles.wordmark}>MOSAIQ</span>
    </span>
  );
}
