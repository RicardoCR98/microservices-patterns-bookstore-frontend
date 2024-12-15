import { AuthWrapper } from '../layout/AuthWrapper'
import Grid from "@mui/material/Grid2";
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
  Box
} from "@mui/material";
import AnimateButton from "@components/@extended/AnimateButton";
export const CheckMailPage = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
          <Box sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Hola, revisa tu correo</Typography>
            <Typography color="secondary" sx={{ mb: 0.5, mt: 1.25 }}>
            Le hemos enviado instrucciones para recuperar su contraseña a su correo electrónico.
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <AnimateButton>
            <Button
              component={Link}
              to={'auth/login'}
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Iniciar Sesión
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}
