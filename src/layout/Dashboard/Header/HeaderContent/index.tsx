import { useMemo } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project import
import Profile from 'src/layout/Dashboard/Header/HeaderContent/Profile';
import FullScreen from 'src/layout/Dashboard/Header/HeaderContent/FullScreen';
import MobileSection from 'src/layout/Dashboard/Header/HeaderContent/MobileSection';
import Search from 'src/layout/Dashboard/Header/HeaderContent/Search';

import {useConfig} from 'src/hooks/useConfig';
import { MenuOrientation } from 'src/config';
import DrawerHeader from 'src/layout/Dashboard/Drawer/DrawerHeader';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));


  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {!downLG && <FullScreen />}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
