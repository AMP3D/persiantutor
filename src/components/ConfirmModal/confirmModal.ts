import { closeConfirm, type ConfirmConfig } from '../../state/ui';

export const runConfirm = async (config: ConfirmConfig): Promise<void> => {
  await config.onConfirm();
  closeConfirm();
};
