import { SyntheticEvent, useState } from "react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import Grid from "@mui/material/Grid2";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import AnimateButton from "@components/@extended/AnimateButton";
import { KEY_CAPTCHA } from "src/config";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "@hooks/auth/useAuth";

export const AuthAdminLogin = () => {
  const {loginAdmin} = useAuth();
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };
  return (
    <>
      <Formik
        initialValues={{
          email: "jlsuarez.2183@gmail.com",
          password: "123456",
          submit: null,
        }}
        onSubmit={async (values) => {
          const email = values.email.trim();
          const pass = values.password.trim();
          loginAdmin(email,pass);
        }}
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
              <Grid size={{ xs: 12 }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login-admin">
                    Correo electrónico
                  </InputLabel>
                  <OutlinedInput
                    id="email-login-admin"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Introduzca la dirección de correo electrónico"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-email-login"
                  >
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Contraseña</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                    placeholder="Ingresa la contraseña"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-password-login"
                  >
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        Mantener sesión iniciada
                      </Typography>
                    }
                  />
                  <Link
                    variant="body2"
                    component={RouterLink}
                    to={"/auth/forgotPassword"}
                    color="text.primary"
                  >
                    ¿Ha olvidado su contraseña?
                  </Link>
                </Stack>
              </Grid>
              {/* Captcha */}
              <Grid
                size={{ xs: 12 }}
                container
                justifyContent="center"
                alignItems="center"
              >
                <ReCAPTCHA
                  sitekey={KEY_CAPTCHA}
                  onChange={(value) => setCaptchaValue(value)}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <AnimateButton>
                  <Button
                    disabled={!captchaValue || isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      cursor:
                        !captchaValue || isSubmitting
                          ? "not-allowed"
                          : "pointer",
                      "&.Mui-disabled": {
                        backgroundColor: "#e0e0e0",
                        color: "#18171c",
                        opacity: 1,
                      },
                    }}
                  >
                    Ingresar
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};
