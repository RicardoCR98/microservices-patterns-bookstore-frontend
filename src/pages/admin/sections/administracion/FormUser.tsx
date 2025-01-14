import React from 'react';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  DialogContent,
  DialogActions,
  DialogTitle
} from '@mui/material';

import { UpdateUserRequest } from 'src/api/admin/authInterfaces';

interface FormUserProps {
  initialValues: UpdateUserRequest;
  onSubmit: (values: UpdateUserRequest) => void;
  closeModal: () => void;
}

const FormUser: React.FC<FormUserProps> = ({ initialValues, onSubmit, closeModal }) => {
  // Validation schema with proper email format and required fields
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Ingrese un correo electrónico válido')
      .required('El correo electrónico es obligatorio')
      .max(100, 'El correo electrónico no puede exceder los 100 caracteres'),
    fullName: Yup.string()
      .required('El nombre es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(100, 'El nombre no puede exceder los 100 caracteres'),
    isActive: Yup.boolean()
      .required('El estado es requerido')
      .nullable(),
    role: Yup.string()
      .oneOf(['USER', 'ADMIN'], 'Seleccione un rol válido')
      .required('El rol es requerido')
  });

  // Transform initial values to ensure proper types
  const transformedInitialValues: UpdateUserRequest = {
    email: initialValues.email || '',
    fullName: initialValues.fullName || '',
    isActive: initialValues.isActive ?? true,
    role: initialValues.role || 'USER'
  };

  const formik = useFormik<UpdateUserRequest>({
    initialValues: transformedInitialValues,
    validationSchema,
    onSubmit: (values) => {
      // Transform boolean string back to actual boolean before submitting
      const transformedValues = {
        ...values,
        isActive: String(values.isActive) === 'true'
      };
      onSubmit(transformedValues);
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {initialValues.email ? 'Editar Usuario' : 'Crear Usuario'}
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

            <Grid item xs={12} md={6}>
              <FormControl 
                fullWidth 
                error={Boolean(touched.role && errors.role)}
              >
                <InputLabel id="role-label">Rol</InputLabel>
                <Select
                  labelId="role-label"
                  label="Rol"
                  {...getFieldProps('role')}
                >
                  <MenuItem value="USER">Usuario</MenuItem>
                  <MenuItem value="ADMIN">Administrador</MenuItem>
                </Select>
                {touched.role && errors.role && (
                  <FormHelperText>{errors.role}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl 
                fullWidth 
                error={Boolean(touched.isActive && errors.isActive)}
              >
                <InputLabel id="status-label">Estado</InputLabel>
                <Select
                  labelId="status-label"
                  label="Estado"
                  {...getFieldProps('isActive')}
                >
                  <MenuItem value="true">Activo</MenuItem>
                  <MenuItem value="false">Inactivo</MenuItem>
                </Select>
                {touched.isActive && errors.isActive && (
                  <FormHelperText>{errors.isActive}</FormHelperText>
                )}
              </FormControl>
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
            {initialValues.email ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </form>
    </FormikProvider>
  );
};

export default FormUser;