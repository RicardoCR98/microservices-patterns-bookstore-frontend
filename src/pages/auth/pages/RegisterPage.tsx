import { Link } from "react-router-dom";

// material-ui
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AuthWrapper } from "../layout/AuthWrapper";
import { AuthRegister } from "../sections";

// import useAuth from 'hooks/useAuth';

// ================================|| AUTH0 - REGISTER ||================================ //

export const RegisterPage = () => {
  // const { isLoggedIn } = useAuth();

  // const [searchParams] = useSearchParams();
  // const auth = searchParams.get('auth');

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }} >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Registrarse</Typography>
            <Typography
              component={Link}
              // to={
              //   isLoggedIn
              //     ? "/auth/login"
              //     : auth
              //     ? `/${auth}/login?auth=auth0`
              //     : "/login"
              // }
              to={"/auth/login"}
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              ¿Ya tienes una cuenta?
            </Typography>
          </Stack>
          <Stack>
            {/* <Typography variant="body2" sx={{ textDecoration: "none" }}>
            </Typography> */}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <AuthRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};
//mover captcha y termino y condiciones no muy separado