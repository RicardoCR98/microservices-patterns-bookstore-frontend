import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Grid2 from '@mui/material/Grid2';
import { Box, Button, Divider, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Stack, Typography } from '@mui/material';
import AnimateButton from '@components/@extended/AnimateButton';
import ReCAPTCHA from 'react-google-recaptcha';
import React, { useState, SyntheticEvent, useEffect} from 'react';
import { KEY_CAPTCHA } from 'src/config';
import { strengthColor, strengthIndicator } from '@utils/password-strength';
import { StringColorProps } from '../../../../types/password';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { AuthSocial } from './AuthSocial';
import { useAuth } from '@hooks/auth/useAuth';
import { useSimpleSnackbar } from '@components/SimpleSnackbarProvider';
const validationSchema = Yup.object({
  fullName: Yup.string()
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, 'El nombre solo puede contener letras y espacios')
    .required('El nombre completo es obligatorio'),

  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'El correo electrónico no es válido')
    .max(255)
    .required('El correo electrónico es obligatorio'),

    password: Yup.string()
    .required('La contraseña es obligatoria')
    .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,50}$/, 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número')
    .test('Sin espacios iniciales ni finales', 'La contraseña no puede comenzar ni terminar con espacios', (value) => value === value.trim())
});

// Ejemplo de contraseña mala
// 12345678

export const AuthRegister = () => {
  const [level, setLevel] = useState<StringColorProps>();
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);
  const { registerUser } = useAuth();
  const { showError, showSuccess } = useSimpleSnackbar(); 
  const navigate = useNavigate();
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
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const fullName = values.fullName.trim();
            const email = values.email.trim();
            const pass = values.password.trim();

            await registerUser(fullName, email, pass);

            // Redirige a la pantalla de login
            navigate("/auth/login");
            // showError("El email ya está registrado");
            showSuccess('Usuario registrado con éxito');
          } catch (error) {
            console.error("Error en el registro:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid2 container spacing={3}>
              {/* Campo FullName */}
              <Grid2 size={{ xs: 12 }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="fullName-register">
                    Nombre Completo <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <OutlinedInput
                    id="fullName-register"
                    type="text"
                    value={values.fullName}
                    name="fullName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Ejemplo: Juan Carlos Perez"
                    fullWidth
                    error={Boolean(touched.fullName && errors.fullName)}
                  />
                </Stack>
                {touched.fullName && errors.fullName && (
                  <FormHelperText error id="standard-weight-helper-text-fullname-register">
                    {errors.fullName}
                  </FormHelperText>
                )}
              </Grid2>

              {/* Campo Email */}
              <Grid2 size={{ xs: 12 }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-register">
                    Correo electrónico <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <OutlinedInput
                    id="email-register"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Ejemplo: usuario@dominio.com"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-register">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid2>

              {/* Campo contraseña */}
              <Grid2 size={{ xs: 12 }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Contraseña <span style={{ color: 'red' }}>*</span></InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
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
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid2 container spacing={2} alignItems="center">
                    <Grid2>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid2>
                    <Grid2>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid2>
                  </Grid2>
                </FormControl>
              </Grid2>
              {/* Captcha */}
              <Grid2 size={{ xs: 12 }} container justifyContent="center" alignItems="center">
                <ReCAPTCHA sitekey={KEY_CAPTCHA} onChange={(value) => setCaptchaValue(value)} />
              </Grid2>

              {/* Botón de envío */}
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
                    Crear Cuenta
                  </Button>
                </AnimateButton>
              </Grid2>
              {/* <Grid2 size={{xs:12}}>
                <Divider>
                  <Typography variant="caption">Regístrate con</Typography>
                </Divider>
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <AuthSocial />
              </Grid2> */}
            </Grid2>
          </form>
        )}
      </Formik>
    </>
  );
};
