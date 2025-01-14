import React, { ChangeEvent, useEffect, useState } from 'react';
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
  DialogTitle,
  Typography,
  Stack,
  Avatar,
  Box,
  useTheme
} from '@mui/material';

import { Products } from 'src/types/e-commerce';
import { CameraOutlined } from '@ant-design/icons';
import { FormLabel } from '@mui/material';
import { ThemeMode } from 'src/config';

// Imagen por defecto, si no hay portada
import defaultImages from 'src/assets/images/users/default.png';

type BookFormProps = {
  initialValues: Products;
  onSubmit: (values: Products) => void;
  closeModal: () => void;
};

const FormProductAdd: React.FC<BookFormProps> = ({ initialValues, onSubmit, closeModal }) => {
  const theme = useTheme();

  // Validaciones con Yup
  const validationSchema = Yup.object({
    title: Yup.string().required('El título es requerido'),
    author: Yup.string().required('El autor es requerido'),
    isbn: Yup.string().required('El ISBN es requerido'),
    publisher: Yup.string().required('La editorial es requerida'),
    publicationDate: Yup.date().required('La fecha de publicación es requerida'),
    category: Yup.string().required('La categoría es requerida'),
    genre: Yup.string().required('El género es requerido'),
    npages: Yup.number().required('El número de páginas es requerido').positive().integer(),
    description: Yup.string().required('La descripción es requerida'),
    stockQuantity: Yup.number().required('La cantidad en stock es requerida').positive().integer(),
    salePrice: Yup.number().required('El precio de venta es requerido').positive(),
    offer: Yup.number().min(0, 'La oferta debe ser al menos 0').max(100, 'La oferta no puede exceder 100').optional(),
    cover: Yup.mixed()
      .required('La portada es requerida')
      .test(
        'fileSize',
        'El archivo es demasiado grande (máximo 2MB)',
        (value) => !value || (value instanceof File && value.size <= 2 * 1024 * 1024)
      )
      .test(
        'fileType',
        'Solo se permiten imágenes (JPG, PNG)',
        (value) => !value || (value instanceof File && ['image/jpeg', 'image/png'].includes(value.type))
      ),
    condition: Yup.string().required('La condición es requerida'),
    rating: Yup.number().min(0).max(5).required('La calificación es requerida')
  });

  // Formik
  const formik = useFormik<Products>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('Formulario enviado con valores:', values);
      onSubmit(values);
    }
  });

  const { errors, touched, handleSubmit, setFieldValue, getFieldProps, values } = formik;

  // Para previsualizar la portada seleccionada
  const [avatar, setAvatar] = useState<string>(defaultImages);

  useEffect(() => {
    if (values.cover) {
      if (typeof values.cover === 'string') {
        // Si cover es un string (URL o base64), lo asignamos tal cual
        setAvatar(values.cover);
      } else {
        // Si cover es un File, creamos un Object URL para previsualizar
        const file = values.cover as File;
        const objectUrl = URL.createObjectURL(file);
        setAvatar(objectUrl);

        // Cleanup: revocar el URL cuando se desmonte
        return () => {
          URL.revokeObjectURL(objectUrl);
        };
      }
    } else {
      setAvatar(defaultImages);
    }
  }, [values.cover]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] || null;
    setFieldValue('cover', file);
  };

  // Función de debug (opcional)
  // const handleDebug = () => {
  //   console.log('Errores de Formik:', errors);
  //   console.log('Campos tocados:', touched);
  //   console.log('Valores actuales:', values);
  // };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initialValues.id ? 'Editar Libro' : 'Nuevo Libro'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>

            {/* Selector de Imagen / Portada */}
            <Grid item xs={12}>
              <Stack spacing={2.5} alignItems="center" sx={{ m: 3 }}>
                <FormLabel
                  htmlFor="change-book"
                  sx={{
                    position: 'relative',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&:hover .MuiBox-root': { opacity: 1 }
                  }}
                >
                  <Avatar alt="Portada" src={avatar} sx={{ width: 100, height: 100 }} />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      background: theme.palette.mode === ThemeMode.DARK
                        ? 'rgba(255, 255, 255, 0.75)'
                        : 'rgba(0, 0, 0, 0.65)',
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'opacity 0.3s'
                    }}
                  >
                    <Stack spacing={0.5} alignItems="center">
                      <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '1.5rem' }} />
                      <Typography sx={{ color: 'secondary.lighter' }} variant="caption">
                        Cambiar
                      </Typography>
                    </Stack>
                  </Box>
                </FormLabel>
                <input
                  type="file"
                  id="change-book"
                  accept="image/jpeg,image/png"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {touched.cover && errors.cover && <FormHelperText error>{errors.cover}</FormHelperText>}
              </Stack>
            </Grid>

            {/* Campos de texto */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Título"
                fullWidth
                {...getFieldProps('title')}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Autor"
                fullWidth
                {...getFieldProps('author')}
                error={Boolean(touched.author && errors.author)}
                helperText={touched.author && errors.author}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="ISBN"
                fullWidth
                {...getFieldProps('isbn')}
                error={Boolean(touched.isbn && errors.isbn)}
                helperText={touched.isbn && errors.isbn}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Editorial"
                fullWidth
                {...getFieldProps('publisher')}
                error={Boolean(touched.publisher && errors.publisher)}
                helperText={touched.publisher && errors.publisher}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Fecha de Publicación"
                type="date"
                fullWidth
                {...getFieldProps('publicationDate')}
                InputLabelProps={{ shrink: true }}
                error={Boolean(touched.publicationDate && errors.publicationDate)}
                helperText={touched.publicationDate && errors.publicationDate}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={Boolean(touched.category && errors.category)}>
                <InputLabel>Categoría</InputLabel>
                <Select {...getFieldProps('category')}>
                  <MenuItem value="FICCION">Ficción</MenuItem>
                  <MenuItem value="NO_FICCION">No Ficción</MenuItem>
                  <MenuItem value="LIBROS_INFANTILES">Infantil</MenuItem>
                  <MenuItem value="JUVENIL">Juvenil</MenuItem>
                  <MenuItem value="BIOGRAFIA_Y_MEMORIAS">Biografía</MenuItem>
                  <MenuItem value="AUTOAYUDA">Autoayuda</MenuItem>
                  <MenuItem value="LIBROS_DE_TEXTO">Libros de texto</MenuItem>
                  <MenuItem value="COMICS_Y_NOVELAS_GRAFICAS">Cómics</MenuItem>
                </Select>
                {touched.category && errors.category && (
                  <FormHelperText>{errors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={Boolean(touched.genre && errors.genre)}>
                <InputLabel>Género</InputLabel>
                <Select {...getFieldProps('genre')}>
                  <MenuItem value="AVENTURA">Aventura</MenuItem>
                  <MenuItem value="ROMANCE">Romance</MenuItem>
                  <MenuItem value="SUSPENSO">Suspenso</MenuItem>
                  <MenuItem value="FANTASIA">Fantasía</MenuItem>
                  <MenuItem value="CIENCIA_FICCION">Ciencia Ficción</MenuItem>
                </Select>
                {touched.genre && errors.genre && (
                  <FormHelperText>{errors.genre}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Número de Páginas"
                type="number"
                fullWidth
                {...getFieldProps('npages')}
                error={Boolean(touched.npages && errors.npages)}
                helperText={touched.npages && errors.npages}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Descripción"
                fullWidth
                multiline
                rows={3}
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Cantidad en Stock"
                type="number"
                fullWidth
                {...getFieldProps('stockQuantity')}
                error={Boolean(touched.stockQuantity && errors.stockQuantity)}
                helperText={touched.stockQuantity && errors.stockQuantity}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Precio de Venta"
                type="number"
                fullWidth
                {...getFieldProps('salePrice')}
                error={Boolean(touched.salePrice && errors.salePrice)}
                helperText={touched.salePrice && errors.salePrice}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Oferta (%)"
                type="number"
                fullWidth
                {...getFieldProps('offer')}
                error={Boolean(touched.offer && errors.offer)}
                helperText={touched.offer && errors.offer}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={Boolean(touched.condition && errors.condition)}>
                <InputLabel>Condición</InputLabel>
                <Select {...getFieldProps('condition')}>
                  <MenuItem value="NUEVO">Nuevo</MenuItem>
                  <MenuItem value="USADO">Usado</MenuItem>
                </Select>
                {touched.condition && errors.condition && (
                  <FormHelperText>{errors.condition}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Rating"
                type="number"
                fullWidth
                {...getFieldProps('rating')}
                error={Boolean(touched.rating && errors.rating)}
                helperText={touched.rating && errors.rating}
              />
            </Grid>
          </Grid>

          {/* Sección de Depuración (opcional) */}
          {/* <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Depuración</Typography>
            <Button variant="outlined" onClick={handleDebug} sx={{ mb: 2 }}>
              Mostrar Logs en Consola
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            <pre>{JSON.stringify(touched, null, 2)}</pre>
          </Box> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </FormikProvider>
  );
};

export default FormProductAdd;
