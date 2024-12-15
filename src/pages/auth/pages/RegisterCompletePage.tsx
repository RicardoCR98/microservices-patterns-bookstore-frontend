import { useEffect } from "react";
import { useParams } from "react-router-dom";
// material-ui
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project import
import { AuthWrapper } from "../layout/AuthWrapper";
import { AuthResetPassword } from "../sections";

export const RegisterCompletePage = () => {
  const { token } = useParams();
  useEffect(() => {
    console.log(token);
  }, []);

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }} spacing={1}>
            <Typography variant="h3">Active Su Cuenta</Typography>
            <Typography color="secondary">
              Confirme sus datos y establezca una contraseña para su cuenta
            </Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <AuthResetPassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};
