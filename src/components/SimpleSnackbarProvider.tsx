// src/components/SimpleSnackbarProvider.tsx

import React, { ReactNode } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

export const SimpleSnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      {children}
    </SnackbarProvider>
  );
};

export const useSimpleSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  return {
    showSuccess: (message: string) => enqueueSnackbar(message, { variant: 'success' }),
    showError: (message: string) => enqueueSnackbar(message, { variant: 'error' }),
    showInfo: (message: string) => enqueueSnackbar(message, { variant: 'info' }),
    showWarning: (message: string) => enqueueSnackbar(message, { variant: 'warning' }),
  };
};
