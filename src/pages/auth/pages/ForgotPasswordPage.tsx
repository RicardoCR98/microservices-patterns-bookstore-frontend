import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
  Stack,
  Typography,
} from "@mui/material";
import { AuthWrapper } from "../layout/AuthWrapper";
import { AuthForgotPassword } from "../sections";
import { useState } from "react";
import { CheckMailPage } from "../pages";

export const ForgotPasswordPage = () => {

  const [checkMail, setCheckMail] = useState<boolean>(false)
  
  if(checkMail){
    return <CheckMailPage/>
  }

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
            <Typography variant="h3">Olvidé mi contraseña</Typography>
            <Typography
              component={Link}
              // to={
              //   isLoggedIn
              //     ? "/auth/login"
              //     : auth
              //     ? `/${auth}/login?auth=firebase`
              //     : "/login"
              // }
              to={"/auth/login"}
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              Volver al inicio
            </Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12 }} >
          <AuthForgotPassword setCheckMail={setCheckMail}/>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};
