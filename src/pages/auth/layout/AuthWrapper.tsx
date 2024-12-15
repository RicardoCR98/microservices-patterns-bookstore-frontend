import { ReactElement } from "react";
//import { Link } from "react-router-dom";
// material-ui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
//import Alert from "@mui/material/Alert";
//import Typography from "@mui/material/Typography";
//import Link from "@mui/material/Link";
//import Divider from "@mui/material/Divider";
//import { Divider, Typography } from "@mui/material";
import { AuthCard } from "@components/organisms/auth/AuthCard";
import {Logo} from "@assets/icons/logo";
import { AuthBackground } from "@components/organisms/auth/AuthBackground";

interface Props {
  children: ReactElement;
  // isLoginPage?: boolean;
  isLoginPageAdmin?: boolean;
}

export const AuthWrapper = ({
  children,
  // isLoginPage,
  isLoginPageAdmin,
}: Props) => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AuthBackground />
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        // sx={{ minHeight: "100vh" }}
      >
        <Grid
          size={{ xs: 12 }}
          sx={{ ml: 3, mt: 3, maxWidth: "none", width: "auto" }}
        >
          <Logo />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Grid
            size={{ xs: 12 }}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: {
                xs: "calc(100vh - 210px)",
                sm: "calc(100vh - 134px)",
                md: "calc(100vh - 112px)",
              },
            }}
          >
            <Grid>
              <Box sx={{ position: "relative" }}>
                <AuthCard>{children}</AuthCard>

                {isLoginPageAdmin && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 20,
                      backgroundColor: "primary.main",
                      color: "white",
                      padding: "4px 12px",
                      borderBottomLeftRadius: "12px",
                      fontWeight: "bold",
                      fontSize: "0.875rem",
                    }}
                  >
                    Administrador
                  </Box>
                )}
              </Box>
              {/* {isLoginPage && (
                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ mb: 3 }}>
                    <Typography variant="caption">
                      ¿Es usted un administrador?{" "}
                    </Typography>
                    <Typography
                      component={Link}
                      to={"/auth/a/login"}
                      variant="body1"
                      sx={{ textDecoration: "none" }}
                      color="primary"
                    >
                      Inicie sesión aquí
                    </Typography>
                  </Divider>
                </Grid>
              )} */}
            </Grid>
          </Grid>
        </Grid>
        {/*<Grid size={{xs:12}} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>*/}
      </Grid>
    </Box>
  );
};
