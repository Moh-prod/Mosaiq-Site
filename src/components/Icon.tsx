import {
  Bot,
  Captions,
  Clapperboard,
  Clock,
  Eye,
  Gauge,
  Globe,
  GraduationCap,
  Headset,
  Inbox,
  Languages,
  Layers,
  MessagesSquare,
  MonitorSmartphone,
  Palette,
  PenTool,
  Phone,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Video,
  Workflow,
  type LucideProps,
} from 'lucide-react';

/** Icônes référencées par leur nom dans les fichiers de données (/src/data). */
const icons = {
  bot: Bot,
  captions: Captions,
  clapperboard: Clapperboard,
  clock: Clock,
  eye: Eye,
  gauge: Gauge,
  globe: Globe,
  graduation: GraduationCap,
  headset: Headset,
  inbox: Inbox,
  languages: Languages,
  layers: Layers,
  messages: MessagesSquare,
  monitor: MonitorSmartphone,
  palette: Palette,
  pen: PenTool,
  phone: Phone,
  rocket: Rocket,
  search: Search,
  shield: ShieldCheck,
  smartphone: Smartphone,
  trending: TrendingUp,
  video: Video,
  workflow: Workflow,
};

export type IconName = keyof typeof icons;

export default function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" {...props} />;
}
