import { Box, Breadcrumbs, Container, Toolbar, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Theme } from '@mui/material/styles';

import { MenuOrientation } from "src/config";
// import { MainSidebar } from "./sidebar";
// import { MainHeader } from "./header";
import { useConfig } from "@hooks/useConfig";


export const AdminLayout = () => {
  //const { menuMasterLoading } = useGetMenuMaster();
  //const downXL = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));
  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const { container, menuOrientation } = useConfig();

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {/* <MainHeader />
      <MainSidebar />  */}
      <Box
        component="main"
        sx={{ width: "calc(100% - 260px)", flexGrow: 1, p: { xs: 2, sm: 3 } }}
      >
        <Toolbar sx={{ mt: isHorizontal ? 8 : "inherit" }} />
        <Container
          maxWidth={container ? "xl" : false}
          sx={{
            ...(container && { px: { xs: 0, sm: 2 } }),
            position: "relative",
            minHeight: "calc(100vh - 110px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Breadcrumbs />
          <Outlet />
          
        </Container>
      </Box>
    </Box>
  );
};
