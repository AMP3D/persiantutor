import { signal } from '@preact/signals-react';

export interface ConfirmConfig {
  title: string;
  message: string;
  warning?: string;
  confirmLabel: string;
  onConfirm: () => void | Promise<void>;
}

export const confirm = signal<ConfirmConfig | null>(null);

export const menuOpen = signal(false);

export const closeConfirm = (): void => {
  confirm.value = null;
};

export const closeMenu = (): void => {
  menuOpen.value = false;
};

export const openConfirm = (config: ConfirmConfig): void => {
  confirm.value = config;
};

export const toggleMenu = (): void => {
  menuOpen.value = !menuOpen.value;
};
