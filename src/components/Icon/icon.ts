import type { FunctionComponent, SVGProps } from 'react';
import AcademicCap from '../../assets/icon/academic-cap.svg?react';
import ArrowDownTray from '../../assets/icon/arrow-down-tray.svg?react';
import ArrowLeft from '../../assets/icon/arrow-left.svg?react';
import ArrowPath from '../../assets/icon/arrow-path.svg?react';
import ArrowUpTray from '../../assets/icon/arrow-up-tray.svg?react';
import Check from '../../assets/icon/check.svg?react';
import ChevronLeft from '../../assets/icon/chevron-left.svg?react';
import ChevronRight from '../../assets/icon/chevron-right.svg?react';
import Clipboard from '../../assets/icon/clipboard.svg?react';
import EllipsisVertical from '../../assets/icon/ellipsis-vertical.svg?react';
import ExclamationTriangle from '../../assets/icon/exclamation-triangle.svg?react';
import Hashtag from '../../assets/icon/hashtag.svg?react';
import MagnifyingGlass from '../../assets/icon/magnifying-glass.svg?react';
import Moon from '../../assets/icon/moon.svg?react';
import RectangleStack from '../../assets/icon/rectangle-stack.svg?react';
import Sparkles from '../../assets/icon/sparkles.svg?react';
import Sun from '../../assets/icon/sun.svg?react';
import Trash from '../../assets/icon/trash.svg?react';
import XMark from '../../assets/icon/x-mark.svg?react';

export type IconName =
  | 'academic-cap'
  | 'arrow-down-tray'
  | 'arrow-left'
  | 'arrow-path'
  | 'arrow-up-tray'
  | 'check'
  | 'chevron-left'
  | 'chevron-right'
  | 'clipboard'
  | 'ellipsis-vertical'
  | 'exclamation-triangle'
  | 'hashtag'
  | 'magnifying-glass'
  | 'moon'
  | 'rectangle-stack'
  | 'sparkles'
  | 'sun'
  | 'trash'
  | 'x-mark';

export const icons: Record<IconName, FunctionComponent<SVGProps<SVGSVGElement>>> = {
  'academic-cap': AcademicCap,
  'arrow-down-tray': ArrowDownTray,
  'arrow-left': ArrowLeft,
  'arrow-path': ArrowPath,
  'arrow-up-tray': ArrowUpTray,
  check: Check,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  clipboard: Clipboard,
  'ellipsis-vertical': EllipsisVertical,
  'exclamation-triangle': ExclamationTriangle,
  hashtag: Hashtag,
  'magnifying-glass': MagnifyingGlass,
  moon: Moon,
  'rectangle-stack': RectangleStack,
  sparkles: Sparkles,
  sun: Sun,
  trash: Trash,
  'x-mark': XMark,
};
