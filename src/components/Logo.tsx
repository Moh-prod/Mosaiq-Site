import { useId } from 'react';
import { cx } from '@/lib/cx';
import styles from './Logo.module.css';

type Variant = 'dark' | 'light';
type MarkVariant = 'badge' | 'plain';

/**
 * Le « M » de MOSAIQ, redessiné en vectoriel d'après le logo officiel :
 * deux rubans pliés (celui de gauche passe par-dessus) posés sur deux jambes biseautées.
 * Repère : 743,5 × 655,5, coin haut gauche du M en (0, 0).
 */
const SHAPES = {
  legLeft: 'M0 78.9L201.9 278.9L201.9 552.2A40 40 0 0 1 179.2 588.3L45.8 652.2A32 32 0 0 1 0 623.4Z',
  legRight: 'M542 278.9L743.5 218.9L743.5 623.9A32 32 0 0 1 697.7 652.8L564.7 589A40 40 0 0 1 542 552.9Z',
  bandRight:
    'M344.7 274.2L585.9 30.6C608.2 8 616.2 0 664.7 0L726.5 0A17 17 0 0 1 743.5 17L743.5 254.9C742.8 254.4 739 245 714.7 245C632.5 245 563.8 316 489.1 385.5L444.7 368.9Z',
  bandLeft:
    'M0 116.9L0 17A17 17 0 0 1 17 0L79.7 0C126.7 0 135.4 5.6 184.7 56.7L370.1 248.6L489.1 385.5L374.6 494.3L214.7 313.3C103.4 187.1 0 160.4 0 116.9Z',
};

/** Arêtes éclairées (reflets cyan) */
const EDGES = {
  bandLeftTop: 'M44.7 0L79.7 0C126.7 0 135.4 5.6 184.7 56.7L370.1 248.6L489.1 385.5',
  bandLeftFold: 'M0 116.9C0 160.4 103.4 187.1 214.7 313.3L374.6 494.3',
  bandRightTop: 'M419.9 199.4L585.9 30.6C608.2 8 616.2 0 664.7 0L704.7 0',
  wave: 'M489.1 385.5C563.8 316 632.5 245 714.7 245C739 245 742.8 254.4 743.5 254.9',
  legRightInner: 'M542 368.9L542 563.9',
};

type Stop = [offset: number, color: string];

const GRADIENTS: Record<string, { from: [number, number]; to: [number, number]; stops: Stop[] }> = {
  bandLeft: {
    from: [18.5, 23.3],
    to: [385.6, 485.2],
    stops: [
      [0, '#3ef2f8'], [0.12, '#21e6f7'], [0.215, '#13d6f7'], [0.31, '#05bdf4'], [0.405, '#009fef'], [0.5, '#0180ec'],
      [0.6, '#0168eb'], [0.69, '#0057ea'], [0.79, '#0046dc'], [0.88, '#003acf'], [1, '#0040d6'],
    ],
  },
  bandRight: {
    from: [-115.3, 221.1],
    to: [-55.3, 453.5],
    stops: [[0, '#2af3f8'], [0.25, '#1ce4f8'], [0.45, '#14cdf8'], [0.63, '#0bacf9'], [0.82, '#0990f6'], [1, '#077cf2']],
  },
  legLeft: {
    from: [128.2, 87],
    to: [415.8, 393.1],
    stops: [[0, '#08b4f7'], [0.214, '#0398f7'], [0.395, '#0082f7'], [0.571, '#0466ee'], [0.738, '#004ad8'], [0.905, '#003cc9'], [1, '#0038c3']],
  },
  legRight: {
    from: [618.2, 185.9],
    to: [921, 361.5],
    stops: [[0, '#00c8f9'], [0.2, '#00aaf8'], [0.391, '#017fea'], [0.571, '#0060dc'], [0.743, '#0045c0'], [0.914, '#002ea3'], [1, '#002a9e']],
  },
};

const BLURS = { shadow: 42, glow: 16, rim: 2.5 };
const SHADOW = '#00145f';

/** Le « M » seul (fonds sombres) ou dans son badge bleu nuit (fonds clairs, favicon). */
export function LogoMark({ variant = 'badge', className }: { variant?: MarkVariant; className?: string }) {
  const uid = useId().replace(/[^\w-]/g, '');
  const ref = (name: string) => `${uid}-${name}`;
  const url = (name: string) => `url(#${ref(name)})`;
  const badge = variant === 'badge';

  const edge = (d: string, color: string, width: number, opacity: number, blur: keyof typeof BLURS) => (
    <path d={d} fill="none" stroke={color} strokeWidth={width} opacity={opacity} filter={url(blur)} />
  );

  return (
    <svg viewBox={badge ? '0 0 100 100' : '0 0 743.5 655.5'} className={className} aria-hidden="true" focusable="false">
      <defs>
        {Object.entries(GRADIENTS).map(([name, { from, to, stops }]) => (
          <linearGradient key={name} id={ref(name)} gradientUnits="userSpaceOnUse" x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]}>
            {stops.map(([offset, color]) => (
              <stop key={offset} offset={offset} stopColor={color} />
            ))}
          </linearGradient>
        ))}
        {Object.entries(BLURS).map(([name, deviation]) => (
          <filter key={name} id={ref(name)} filterUnits="userSpaceOnUse" x="-160" y="-175" width="1070" height="1010">
            <feGaussianBlur stdDeviation={deviation} />
          </filter>
        ))}
        {Object.entries(SHAPES).map(([name, d]) => (
          <clipPath key={name} id={ref(`clip-${name}`)}>
            <path d={d} />
          </clipPath>
        ))}
        {badge && (
          <>
            <radialGradient id={ref('bg')} gradientUnits="userSpaceOnUse" cx="50" cy="40" r="74">
              <stop offset="0" stopColor="#0a2b8e" />
              <stop offset="0.45" stopColor="#041659" />
              <stop offset="0.8" stopColor="#020b30" />
              <stop offset="1" stopColor="#01071f" />
            </radialGradient>
            <linearGradient id={ref('rim-badge')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8fc4ff" stopOpacity="0.55" />
              <stop offset="0.45" stopColor="#8fc4ff" stopOpacity="0" />
            </linearGradient>
            <filter id={ref('floor')} x="-50%" y="-300%" width="200%" height="700%">
              <feGaussianBlur stdDeviation="1.6" />
            </filter>
          </>
        )}
      </defs>

      {badge && (
        <>
          <rect width="100" height="100" rx="23" fill={url('bg')} />
          <rect x="0.6" y="0.6" width="98.8" height="98.8" rx="22.4" fill="none" stroke={url('rim-badge')} strokeWidth="1.2" />
          <ellipse cx="50" cy="77.4" rx="19" ry="1.5" fill="#2a6ef2" opacity="0.75" filter={url('floor')} />
        </>
      )}

      <g transform={badge ? 'translate(18 20.3) scale(0.0861)' : undefined}>
        <path d={SHAPES.legLeft} fill={url('legLeft')} />
        <g clipPath={url('clip-legLeft')}>
          <path d={SHAPES.bandLeft} fill={SHADOW} opacity="0.97" filter={url('shadow')} transform="translate(6 72)" />
        </g>

        {/* data-piece : la jambe droite peut « s'échapper » (page 404) */}
        <g data-piece="">
          <path d={SHAPES.legRight} fill={url('legRight')} />
          <g clipPath={url('clip-legRight')}>
            {edge(EDGES.legRightInner, '#3fe0ff', 40, 0.45, 'glow')}
            <path d={SHAPES.bandRight} fill={SHADOW} opacity="0.97" filter={url('shadow')} transform="translate(-4 60)" />
          </g>
        </g>

        <path d={SHAPES.bandRight} fill={url('bandRight')} />
        <g clipPath={url('clip-bandRight')}>
          {edge(EDGES.bandRightTop, '#3fe8fb', 64, 0.55, 'glow')}
          {edge(EDGES.bandRightTop, '#b8fcff', 8, 0.45, 'rim')}
          <path d={SHAPES.bandLeft} fill={SHADOW} opacity="0.95" filter={url('shadow')} transform="translate(30 -6)" />
          {edge(EDGES.wave, '#3fd0ff', 8, 0.35, 'rim')}
        </g>

        <path d={SHAPES.bandLeft} fill={url('bandLeft')} />
        <g clipPath={url('clip-bandLeft')}>
          {edge(EDGES.bandLeftTop, '#3fe8fb', 80, 0.6, 'glow')}
          {edge(EDGES.bandLeftTop, '#b8fcff', 8, 0.45, 'rim')}
          {edge(EDGES.bandLeftFold, '#5fdcff', 9, 0.55, 'rim')}
        </g>
      </g>
    </svg>
  );
}

export default function Logo({ variant = 'dark', className }: { variant?: Variant; className?: string }) {
  return (
    <span className={cx(styles.logo, variant === 'light' && styles.light, className)}>
      <LogoMark variant={variant === 'light' ? 'plain' : 'badge'} className={styles.mark} />
      <span className={styles.wordmark}>MOSAIQ</span>
    </span>
  );
}
