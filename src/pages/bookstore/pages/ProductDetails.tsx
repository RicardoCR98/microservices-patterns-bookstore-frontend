// ProductDetails.jsx
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import axios from 'axios';

// material-ui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from '@components/organisms/bookstore/MainCard';
import FloatingCart from '../components/c-bookstore/FloatingCart';
// import ProductFeatures from 'sections/apps/e-commerce/product-details/ProductFeatures';
import ProductImages from '../sections/product-details/ProductImages';
import ProductInfo from '../sections/product-details/ProductInfo';
// import ProductReview from '../sections/product-details/ProductReview';
import ProductSpecifications from '../sections/product-details/ProductSpecifications';
import RelatedProducts from '../sections/product-details/RelatedProducts';

import { resetCart, useGetCart } from 'src/api/bookstore/cart';

// types
import { Products, TabsProps } from 'src/types/e-commerce';
import { productLoader } from 'src/api/bookstore/products';

function TabPanel({ children, value, index, ...other }: TabsProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-details-tabpanel-${index}`}
      aria-labelledby={`product-details-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `product-details-tab-${index}`,
    'aria-controls': `product-details-tabpanel-${index}`
  };
}

// ==============================|| PRODUCT DETAILS - MAIN ||============================== //

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { cart } = useGetCart();

  const [product, setProduct] = useState<Products | null>({} as Products);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // product description tabs
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    // clear cart if complete order
    if (cart && cart.step > 2) {
      resetCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
  
        // Llamar a la función productLoader y pasar el id como parámetro
        const data = await productLoader({ params: { id } });
        console.log('Respuesta del detalle:', data);
        setProduct(data); // Actualiza el estado con el producto recibido
      } catch (err) {
        console.error('Error loading product details:', err);
        setError('No se pudo cargar los detalles del producto');
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const productImages = useMemo(() => product && <ProductImages product={product} />, [product]);
  const relatedProducts = useMemo(() => <RelatedProducts id={id} />, [id]);


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MainCard>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                {productImages}
              </Grid>
              <Grid item xs={12} sm={6}>
                {product && <ProductInfo product={product} />}
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={7} xl={8}>
          <MainCard>
            <Stack spacing={3}>
              <Stack>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  onChange={handleChange}
                  aria-label="product description tabs example"
                  variant="scrollable"
                >
                  {/* <Tab component={Link} to="#" label="Features" {...a11yProps(0)} /> */}
                  <Tab component={Link} to="#" label="Especificaciones" {...a11yProps(0)} />
                  <Tab component={Link} to="#" label="Resumen" {...a11yProps(1)} />
                  {/* <Tab
                    component={Link}
                    to="#"
                    label={
                      <Stack direction="row" alignItems="center">
                        Reviews{' '}
                        <Chip
                          label={String(product.offerPrice?.toFixed(0))}
                          size="small"
                          sx={{
                            ml: 0.5,
                            color: value === 3 ? 'primary.main' : 'grey.0',
                            bgcolor: value === 3 ? 'primary.lighter' : 'grey.400',
                            borderRadius: '10px'
                          }}
                        />
                      </Stack>
                    }
                    {...a11yProps(3)}
                  /> */}
                </Tabs>
                <Divider />
              </Stack>
              {/* <TabPanel value={value} index={0}>
                <ProductFeatures />
              </TabPanel> */}
              <TabPanel value={value} index={0}>
                {product && <ProductSpecifications product={product} />}
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Stack spacing={2.5}>
                  <Typography color="text.secondary">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard
                    dummy text ever since the 1500s,{' '}
                    <Typography component="span" variant="subtitle1">
                      {' '}
                      &ldquo;When an unknown printer took a galley of type and scrambled it to make a type specimen book.&rdquo;
                    </Typography>{' '}
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                    more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </Typography>
                  <Typography color="text.secondary">
                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </Typography>
                </Stack>
              </TabPanel>
              {/* <TabPanel value={value} index={3}>
                <ProductReview product={product} />
              </TabPanel> */}
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} xl={4} sx={{ position: 'relative' }}>
          <MainCard
            title="Libros Relacionados"
            sx={{
              height: 'calc(100% - 16px)',
              position: { xs: 'relative', md: 'absolute' },
              top: '16px',
              left: { xs: 0, md: 16 },
              right: 0
            }}
            content={false}
          >
            {relatedProducts}
          </MainCard>
        </Grid>
      </Grid>
      <FloatingCart />
    </>
  );
}
