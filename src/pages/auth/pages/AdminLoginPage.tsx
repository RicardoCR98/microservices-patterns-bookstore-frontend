import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
// material-ui
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { AuthWrapper } from "../layout/AuthWrapper";
import { AuthAdminLogin } from "../sections";

export const AdminLoginPage = () => {
  return (
    <AuthWrapper isLoginPageAdmin={true}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Iniciar sesión</Typography>
            <Typography
              component={Link}
              //to={isLoggedIn ? '/auth/register' : auth ? `/${auth}/register?auth=jwt` : '/register'}
              to={"/auth/login"}
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              Regresar al inicio
            </Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <AuthAdminLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};
//Captcha