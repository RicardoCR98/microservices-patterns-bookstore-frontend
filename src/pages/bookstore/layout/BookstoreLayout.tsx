import { Box, Container } from "@mui/material";
// import { MainHeader } from "./header";
import { useConfig } from "@hooks/useConfig";
import { Outlet } from "react-router-dom";
import { MainHeader } from "./header";

export const BookstoreLayout = () => {
  const { container } = useConfig();

 
  return (
    <Box sx={{ width: "100%" }}>
      <MainHeader />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          p: { xs: 2, sm: 3 },
          marginTop: "70px",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <Container
          maxWidth={container ? "xl" : false}
          sx={{
            ...(container && { px: { xs: 0, sm: 2 } }),
            position: "relative",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
