import React from 'react';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  DialogContent,
  DialogActions,
  DialogTitle
} from '@mui/material';

import { RegisterRequest } from 'src/api/admin/authInterfaces';

interface FormUserProps {
  initialValues: RegisterRequest;
  onSubmit: (values: RegisterRequest) => void;
  closeModal: () => void;
}

const FormAddUser: React.FC<FormUserProps> = ({initialValues, onSubmit, closeModal }) => {
  // Esquema de validación para creación
  const createValidationSchema = Yup.object({
    email: Yup.string()
      .email('Ingrese un correo electrónico válido')
      .required('El correo electrónico es obligatorio')
      .max(100, 'El correo electrónico no puede exceder los 100 caracteres'),
    fullName: Yup.string()
      .required('El nombre es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(100, 'El nombre no puede exceder los 100 caracteres'),
    password: Yup.string()
      .required('La contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
  });

  const formik = useFormik({
    initialValues: {
          email: initialValues.email || '',
          fullName: initialValues.fullName || '',
          password:initialValues.password || ''
        } as RegisterRequest,
    validationSchema: createValidationSchema,
    onSubmit: (values) => {
        // Para creación, enviar directamente
        onSubmit(values as RegisterRequest);

    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          Crear Usuario
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Correo Electrónico"
                fullWidth
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Nombre Completo"
                fullWidth
                {...getFieldProps('fullName')}
                error={Boolean(touched.fullName && errors.fullName)}
                helperText={touched.fullName && errors.fullName}
              />
            </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contraseña"
                  type="password"
                  fullWidth
                  {...getFieldProps('password')}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={closeModal}
            color="secondary"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            color="primary"
          >
            Crear
          </Button>
        </DialogActions>
      </form>
    </FormikProvider>
  );
};

export default FormAddUser;