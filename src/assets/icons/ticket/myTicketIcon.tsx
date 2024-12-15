import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const MyTicketIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 10V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 1 0 0 4v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 1 0 0-4m3-2v8h14V8zm2 2h10v4H7z"
    />
  </SvgIcon>
);

export default MyTicketIcon;