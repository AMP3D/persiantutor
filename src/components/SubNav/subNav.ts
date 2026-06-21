import type { IconName } from '../Icon/icon';

interface NavItem {
  icon: IconName;
  label: string;
  path: string;
}

export const navItems: NavItem[] = [
  { icon: 'rectangle-stack', label: 'Flash Cards', path: '/flash-cards' },
  { icon: 'academic-cap', label: 'Alphabet', path: '/alphabet' },
  { icon: 'hashtag', label: 'Numbers', path: '/numbers' },
];
