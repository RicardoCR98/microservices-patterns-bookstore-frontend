import { ReactNode } from 'react';

// material-ui
import { alpha, styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { MUIStyledCommonProps } from '@mui/system';

import SimpleBar, { Props } from 'simplebar-react';
import { BrowserView, MobileView } from 'react-device-detect';
import { ThemeMode } from 'src/config';

// root style
const RootStyle = styled(BrowserView)({
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden'
  });
  


// scroll bar wrapper
const SimpleBarStyle = styled(SimpleBar)(({ theme }) => ({
    maxHeight: '100%',
    '& .simplebar-scrollbar': {
      '&:before': {
        background: alpha(theme.palette.grey[theme.palette.mode === ThemeMode.DARK ? 200 : 500], 0.48)
      },
      '&.simplebar-visible:before': {
        opacity: 1
      }
    },
    '& .simplebar-track.simplebar-vertical': {
      width: 10
    },
    '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
      height: 6
    },
    '& .simplebar-mask': {
      zIndex: 'inherit'
    }
  }));

export const SimpleBarScroll=({ children, sx, ...other }: MUIStyledCommonProps<Theme> & Props) => {
    return (
      <>
        <RootStyle>
          <SimpleBarStyle clickOnTrack={false} sx={sx} {...other}>
            {children as ReactNode}
          </SimpleBarStyle>
        </RootStyle>
        <MobileView>
          <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
            {children as ReactNode}
          </Box>
        </MobileView>
      </>
    );
  }