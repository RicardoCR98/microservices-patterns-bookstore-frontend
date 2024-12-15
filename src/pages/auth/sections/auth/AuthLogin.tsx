import { SyntheticEvent, useState } from 'react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Grid2 from '@mui/material/Grid2';
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import AnimateButton from '@components/@extended/AnimateButton';
import { KEY_CAPTCHA } from 'src/config';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAuth } from '@hooks/auth/useAuth';
import { AuthSocial } from './AuthSocial';

const validationSchema = Yup.object({
  password: Yup.string().max(50).required('La contraseña es obligatoria'),

  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'El correo electrónico no es válido')
    .max(100)
    .required('El correo electrónico es obligatorio')
});

export const AuthLogin = () => {
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useAuth();

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
          email: 'jane@example.com',
          password: 'password123',
          submit: null
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const email = values.email.trim();
          const pass = values.password.trim();
          loginUser(email, pass);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid2 container spacing={1}>
              <Grid2 size={{ xs: 12 }}>
                <AuthSocial />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Divider>
                  <Typography variant="caption"> o ingrese con el Email </Typography>
                </Divider>
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Correo electrónico</InputLabel>
                  <OutlinedInput
                    id="email-login"
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
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Contraseña</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
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
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Ingresa la contraseña"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
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
                    label={<Typography variant="body2">Mantener sesión iniciada</Typography>}
                  />
                  <Link variant="body2" component={RouterLink} to={'/auth/forgotPassword'} color="text.primary">
                    ¿Ha olvidado su contraseña?
                  </Link>
                </Stack>
              </Grid2>
              {/* Captcha */}
              <Grid2 size={{ xs: 12 }} container justifyContent="center" alignItems="center" sx={{ mt: -0.5 }}>
                <ReCAPTCHA sitekey={KEY_CAPTCHA} onChange={(value) => setCaptchaValue(value)} />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <AnimateButton>
                  <Button
                    disabled={!captchaValue || isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      cursor: !captchaValue || isSubmitting ? 'not-allowed' : 'pointer',
                      '&.Mui-disabled': {
                        backgroundColor: '#e0e0e0',
                        color: '#18171c',
                        opacity: 1
                      }
                    }}
                  >
                    Ingresar
                  </Button>
                </AnimateButton>
              </Grid2>
            </Grid2>
          </form>
        )}
      </Formik>
    </>
  );
};
