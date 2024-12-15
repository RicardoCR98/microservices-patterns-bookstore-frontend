import { useEffect, useState, SyntheticEvent } from "react";
import Grid from "@mui/material/Grid2";
// material-ui
import {
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Box,
  Typography,
  FormControl,
} from "@mui/material";
// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import AnimateButton from "@components/@extended/AnimateButton";

import {
  strengthColor,
  strengthIndicator,
} from "@utils/password-strength";

// types
import { StringColorProps } from "src/types/password";

// assets
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import EyeInvisibleOutlined from "@ant-design/icons/EyeInvisibleOutlined";

// ============================|| AUTH0 - RESET PASSWORD ||============================ //

const validationSchema = Yup.object().shape({
  FullName: Yup.string()
    .matches(
      /^[A-Za-zÀ-ÿ\s]+$/,
      "El nombre solo puede contener letras y espacios"
    )
    .required("El nombre completo es obligatorio"),

  password: Yup.string().max(255).required("La contraseña es obligatoria"),

  confirmPassword: Yup.string()
    .required("Confirmar su contraseña es obligatorio")
    .test(
      "confirmPassword",
      "Las contraseñas deben de coincidir",
      (confirmPassword, yup) => yup.parent.password === confirmPassword
    ),
});

export const AuthResetPassword = () => {
  const [level, setLevel] = useState<StringColorProps>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("");
  }, []);

  return (
    <Formik
      initialValues={{
        FullName:"",
        password: "",
        confirmPassword: "",
        submit: null,
      }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
      // onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
      //   try {
      //     // password reset
      //     if (scriptedRef.current) {
      //       setStatus({ success: true });
      //       setSubmitting(false);
      //       openSnackbar({
      //         open: true,
      //         message: 'Successfully reset password.',
      //         variant: 'alert',
      //         alert: {
      //           color: 'success'
      //         }
      //       } as SnackbarProps);

      //       setTimeout(() => {
      //         navigate(isLoggedIn ? '/auth/login' : auth ? `/${auth}/login?auth=auth0` : '/login', { replace: true });
      //       }, 1500);
      //     }
      //   } catch (err: any) {
      //     console.error(err);
      //     if (scriptedRef.current) {
      //       setStatus({ success: false });
      //       setErrors({ submit: err.message });
      //       setSubmitting(false);
      //     }
      //   }
      // }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>

              {/* Campo FullName */}
              <Grid size={{ xs: 12 }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="FullName-register">
                    Nombre Completo <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <OutlinedInput
                    id="FullName-register"
                    type="text"
                    value={values.FullName}
                    name="FullName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Ejemplo: Juan Carlos Perez"
                    fullWidth
                    error={Boolean(touched.FullName && errors.FullName)}
                  />
                </Stack>
                {touched.FullName && errors.FullName && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-fullname-register"
                  >
                    {errors.FullName}
                  </FormHelperText>
                )}
              </Grid>


            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-reset">Nueva Contraseña <span style={{ color: "red" }}>*</span></InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-reset"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? (
                          <EyeOutlined />
                        ) : (
                          <EyeInvisibleOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Ingrese la nueva contraseña"
                />
              </Stack>
              {touched.password && errors.password && (
                <FormHelperText error id="helper-text-password-reset">
                  {errors.password}
                </FormHelperText>
              )}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid>
                    <Box
                      sx={{
                        bgcolor: level?.color,
                        width: 85,
                        height: 8,
                        borderRadius: "7px",
                      }}
                    />
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="confirm-password-reset">
                  Vuelva a escribir la nueva contraseña <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  id="confirm-password-reset"
                  type="password"
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Ingrese de nuevo la nueva contraseña"
                />
              </Stack>
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText error id="helper-text-confirm-password-reset">
                  {errors.confirmPassword}
                </FormHelperText>
              )}
            </Grid>

            {errors.submit && (
              <Grid size={{ xs: 12 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid size={{ xs: 12 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                Activar e Iniciar Sesión
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};
