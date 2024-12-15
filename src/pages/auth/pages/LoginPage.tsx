import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
// material-ui
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { AuthWrapper } from "../layout/AuthWrapper";
import { AuthLogin } from "../sections";
import { CustomerServiceIcon } from "@assets/icons";

export const LoginPage = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={2}>
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
              to={"/auth/register"}
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              ¿No tienes una cuenta?
            </Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <AuthLogin />
        </Grid>

        <Grid
          container 
          spacing={1} 
          alignItems="center"
          justifyContent="center"
          size={{ xs: 12 }}
        >
          <CustomerServiceIcon  sx={{fontSize:20}}/>
          <Typography variant="caption">¿Es usted administrador? </Typography>
          <Typography
            component={Link}
            to={"/auth/a/login"}
            variant="body1"
            sx={{ textDecoration: "none" }}
            color="primary"
          >
            Inicie sesión aquí
          </Typography>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};
//Captcha

//juntar el inicio sesion admin
