import { useState } from 'react';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import MainDrawer from './Drawer';

export default function DashboardLayout() {
  // Estado para colapsar/expandir
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <MainDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

      {/* Contenido principal donde van las rutas anidadas */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
