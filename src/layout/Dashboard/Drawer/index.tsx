import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import MiniDrawerStyled from './MiniDrawerStyled';
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import { DRAWER_WIDTH } from 'src/config';

interface MainDrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  window?: () => Window;
}

export default function MainDrawer({ drawerOpen, setDrawerOpen, window }: MainDrawerProps) {
  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: 0, zIndex: 1200 }} aria-label="sidebar">
      {/* Versión Desktop */}
      {!downLG ? (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          <DrawerHeader open={drawerOpen} />
          <DrawerContent />
        </MiniDrawerStyled>
      ) : (
        // Versión Mobile
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: drawerOpen ? 'block' : 'none', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH
            }
          }}
        >
          <DrawerHeader open={drawerOpen} />
          <DrawerContent />
        </Drawer>
      )}
    </Box>
  );
}
