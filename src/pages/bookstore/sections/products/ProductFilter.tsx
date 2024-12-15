import { useEffect, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import Colors from './Colors';

// types
import { ProductsFilter } from 'src/types/e-commerce';

// ==============================|| PRODUCT GRID GENDER FILTER ||============================== //

function Gender({ gender, handelFilter }: { gender: string[]; handelFilter: (type: string, params: string) => void }) {
  const [isGenderLoading, setGenderLoading] = useState(true);

  useEffect(() => {
    setGenderLoading(false);
  }, []);

  return (
    <Stack>
      {isGenderLoading ? (
        <Skeleton variant="rectangular" width="100%" height={42} />
      ) : (
        <>
          <Typography variant="h5">Género</Typography>
          <Box sx={{ pl: 0.5 }}>
            <Stack>
              <FormControlLabel
                control={<Checkbox checked={gender.some((item) => item === 'AVENTURA')} />}
                onChange={() => handelFilter('gender', 'AVENTURA')}
                label="Aventura"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={gender.some((item) => item === 'ROMANCE')} onChange={() => handelFilter('gender', 'ROMANCE')} />
                }
                label="Romance"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={gender.some((item) => item === 'SUSPENSO')} onChange={() => handelFilter('gender', 'SUSPENSO')} />
                }
                label="Suspenso"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={gender.some((item) => item === 'FANTASIA')} onChange={() => handelFilter('gender', 'FANTASIA')} />
                }
                label="Fantasía"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gender.some((item) => item === 'CIENCIA FICCION')}
                    onChange={() => handelFilter('gender', 'CIENCIA_FICCION')}
                  />
                }
                label="Ciencia Ficción"
              />
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
}

// ==============================|| PRODUCT GRID - CATEGORIES FILTER ||============================== //

function Categories({ categories, handelFilter }: { categories: string[]; handelFilter: (type: string, params: string) => void }) {
  const [isCategoriesLoading, setCategoriesLoading] = useState(true);
  useEffect(() => {
    setCategoriesLoading(false);
  }, []);

  return (
    <Stack>
      {isCategoriesLoading ? (
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width="100%" height={96} />
        </Grid>
      ) : (
        <>
          <Typography variant="h5">Categorias</Typography>
          <Box sx={{ pl: 0.5 }}>
            <Stack>
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'FICCION')} />}
                onChange={() => handelFilter('categories', 'FICCION')}
                label="Ficción"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'NO_FICCION')} />}
                onChange={() => handelFilter('categories', 'NO_FICCION')}
                label="No Ficción"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'LIBROS_INFANTILES')} />}
                onChange={() => handelFilter('categories', 'LIBROS_INFANTILES')}
                label="Libros Infantiles"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'JUVENIL')} />}
                onChange={() => handelFilter('categories', 'JUVENIL')}
                label="Juevenil"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'BIOGRAFIA_Y_MEMORIAS')} />}
                onChange={() => handelFilter('categories', 'BIOGRAFIA_Y_MEMORIAS')}
                label="Biofrafía y Memorias"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'AUTOAYUDA')} />}
                onChange={() => handelFilter('categories', 'AUTOAYUDA')}
                label="Autoayuda"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'LIBROS_DE_TEXTO')} />}
                onChange={() => handelFilter('categories', 'LIBROS_DE_TEXTO')}
                label="Libro de Texto"
              />
              <FormControlLabel
                control={<Checkbox checked={categories.some((item) => item === 'COMICS_Y_NOVELAS_GRAFICAS')} />}
                onChange={() => handelFilter('categories', 'COMICS_Y_NOVELAS_GRAFICAS')}
                label="Comics y Novelas Gráficas"
              />
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
}

// ==============================|| PRODUCT GRID - PRICE FILTER ||============================== //

function Price({ handelFilter }: { price: string; handelFilter: (type: string, params: string) => void }) {
  const [isPriceLoading, setPriceLoading] = useState(true);
  useEffect(() => {
    setPriceLoading(false);
  }, []);

  const valuetext = (value: number) => `${value}`;

  const [value, setValue] = useState<number[]>([0, 100]);
  const handleSlider = (event: Event, newValue: any) => {
    setValue(newValue);
    const data = `${newValue[0]}-${newValue[1]}`;
    handelFilter('price', data);
  };

  return (
    <>
      {isPriceLoading ? (
        <Skeleton variant="rectangular" width="100%" height={172} />
      ) : (
        <Stack spacing={1}>
          <Typography variant="h5">Precio</Typography>
          <Stack direction="row" spacing={2}>
            <Stack spacing={1}>
              <Typography color="text.secondary">Min</Typography>
              <TextField
                value={value[0]}
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography color="text.secondary">Max</Typography>
              <TextField
                value={value[1]}
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
          </Stack>
          <Box sx={{ px: 0.75 }}>
            <Slider min={0} max={200} value={value} onChange={handleSlider} valueLabelDisplay="auto" getAriaValueText={valuetext} />
          </Box>
        </Stack>
      )}
    </>
  );
}

// ==============================|| PRODUCT GRID - RATING FILTER ||============================== //

function RatingSection({ rating, handelFilter }: { rating: number; handelFilter: (type: string, params: string, rating: number) => void }) {
  const [isRatingLoading, setRatingLoading] = useState(true);
  useEffect(() => {
    setRatingLoading(false);
  }, []);

  return (
    <>
      {isRatingLoading ? (
        <Skeleton variant="rectangular" width="100%" height={172} />
      ) : (
        <Stack spacing={1}>
          <Typography variant="h5">Calificación</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating
              precision={0.5}
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => handelFilter('rating', '', newValue!)}
            />
            <Typography component="legend">({rating})</Typography>
          </Stack>
        </Stack>
      )}
    </>
  );
}

// ==============================|| PRODUCT GRID - FILTER ||============================== //

export default function ProductFilter({
  filter,
  handelFilter
}: {
  filter: ProductsFilter;
  handelFilter: (type: string, params: string, rating?: number) => void;
}) {
  return (
    <Grid container direction="column" rowSpacing={3}>
      <Grid item>
        <Gender gender={filter.gender} handelFilter={handelFilter} />
      </Grid>
      <Grid item>
        <Categories categories={filter.categories} handelFilter={handelFilter} />
      </Grid>
      {/* <Grid item>
        <Colors colors={filter.colors} handelFilter={handelFilter} />
      </Grid> */}
      <Grid item>
        <Price price={filter.price} handelFilter={handelFilter} />
      </Grid>
      <Grid item>
        <RatingSection rating={filter.rating} handelFilter={handelFilter} />
      </Grid>
    </Grid>
  );
}
