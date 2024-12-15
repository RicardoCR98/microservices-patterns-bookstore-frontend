import * as Yup from "yup";
import { Formik } from "formik";
import Grid from "@mui/material/Grid2";
import {
  Button,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import AnimateButton from "@components/@extended/AnimateButton";

interface AuthForgotPasswordProps {
  setCheckMail: (value: boolean) => void;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "El correo electrónico no es válido"
    )
    .max(255)
    .required("El email es obligatorio"),
});

export const AuthForgotPassword = ({ setCheckMail }: AuthForgotPasswordProps) => {

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          submit: null,
        }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
        // onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        //   try {
        //     await resetPassword?.(values.email).then(
        //       () => {
        //         setStatus({ success: true });
        //         setSubmitting(false);
        //         openSnackbar({
        //           open: true,
        //           message: "Check mail for reset password link",
        //           variant: "alert",
        //           alert: {
        //             color: "success",
        //           },
        //         } as SnackbarProps);
        //         setTimeout(() => {
        //           navigate(
        //             isLoggedIn
        //               ? "/auth/check-mail"
        //               : auth
        //               ? `/${auth}/check-mail?auth=auth0`
        //               : "/check-mail",
        //             { replace: true }
        //           );
        //         }, 1500);

        //         // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
        //         // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
        //         // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        //         // github issue: https://github.com/formium/formik/issues/2430
        //       },
        //       (err: any) => {
        //         setStatus({ success: false });
        //         setErrors({ submit: err.message });
        //         setSubmitting(false);
        //       }
        //     );
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
              <Grid size={{ xs: 12 }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-forgot">
                    Correo electrónico
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-forgot"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Introduzca la dirección de correo electrónico"
                    inputProps={{}}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-forgot">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              {errors.submit && (
                <Grid size={{ xs: 12 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid size={{ xs: 12 }} sx={{ mt: -1 }}>
                <Typography variant="caption">
                  No olvide revisar la carpeta de SPAM.
                </Typography>
              </Grid>
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
                    onClick={() => setCheckMail(true)}
                  >
                    Restablecer contraseña
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
