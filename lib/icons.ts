import {
  Mail,
  Users,
  Target,
  Lightbulb,
  Heart,
  ArrowRight,
  Brain,
  Rocket,
  Newspaper,
  Calendar,
  Download,
  ShieldCheck,
  Github,
  Twitter,
  Linkedin,
} from 'lucide-react';

// Export all icons as a single object
export const Icons = {
  Mail,
  Users,
  Target,
  Lightbulb,
  Heart,
  ArrowRight,
  Brain,
  Rocket,
  Newspaper,
  Calendar,
  Download,
  ShieldCheck,
  Github,
  Twitter,
  Linkedin,
} as const;

// Type for icon names
export type IconName = keyof typeof Icons;

// Helper function to get an icon by name
export function getIcon(name: IconName) {
  return Icons[name];
} 