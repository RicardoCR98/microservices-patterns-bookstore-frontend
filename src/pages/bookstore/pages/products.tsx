import { useEffect, useState, ReactElement } from 'react';

// material-ui
import { styled, useTheme, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project import
import ProductCard from '../components/c-bookstore/ProductCard';
import FloatingCart from '../components/c-bookstore/FloatingCart';
import SkeletonProductPlaceholder from '../components/skeleton/ProductPlaceholder';
import ProductFilterDrawer from '../sections/products/ProductFilterDrawer';
import ProductsHeader from '../sections/products/ProductsHeader';
import ProductEmpty from '../sections/products/ProductEmpty';

import { useConfig2 } from 'src/hooks/useConfig';
import { resetCart, useGetCart } from 'src/api/cart';
import { filterProducts, fetchInitialProducts } from 'src/api/products';

// types
import { Products as ProductsTypo, ProductsFilter } from 'src/types/e-commerce';

const Main = styled('main', { 
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'container' 
})<{ open: boolean; container?: boolean }>(({ open, container }) => ({
  flexGrow: 1,
  transition: 'margin 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  marginLeft: -320,
  
  ...(container && {
    '@media (min-width: 1200px) and (max-width: 1535px)': {
      marginLeft: !open ? -240 : 0
    }
  }),
  
  '@media (max-width: 1199px)': {
    paddingLeft: 0,
    marginLeft: 0
  },
  
  ...(open && {
    transition: 'margin 0.2s cubic-bezier(0, 0, 0.2, 1)',
    marginLeft: 0
  })
}));


export default function ProductsPage() {
  const theme = useTheme();

  // Estados locales
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductsTypo[]>([]);

  const { cart } = useGetCart();
  const { container } = useConfig2();

// Carga inicial de productos
useEffect(() => {
  async function fetchProducts() {
    try {
      setLoading(true); 
      const response = await fetch('http://localhost:8088/api/products'); 
      const data = await response.json(); 

      if (Array.isArray(data)) {
        setProducts(data); 
      } else {
        console.error('Invalid data format received:', data); 
      }
    } catch (error) {
      console.error('Error fetching products:', error); 
    } finally {
      setLoading(false); 
    }
  }

  fetchProducts();
}, []); 


// useEffect(() => {
//   async function fetchProducts() {
//     try {
//       setLoading(true);
//       const data = await fetchInitialProducts();

//       if (Array.isArray(data)) {
//         setProducts(data); 
//       } else {
//         console.error('Formato de datos no válido recibido:', data);
//       }
//     } catch (error) {
//       console.error('Error al cargar los productos:', error);
//     } finally {
//       setLoading(false); 
//     }
//   }

//   fetchProducts();
// }, []); 


  // Limpieza del carrito si el pedido está completo
  useEffect(() => {
    if (cart && cart.step > 2) {
      resetCart();
    }
  }, [cart]);

  const [openFilterDrawer, setOpenFilterDrawer] = useState(true);
  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
  };

  // Estados para el filtro
  const initialState: ProductsFilter = {
    search: '',
    sort: 'low',
    gender: [],
    categories: ['all'],
    // colors: [],
    price: '',
    rating: 0
  };
  const [filter, setFilter] = useState(initialState);

  useEffect(() => {
    async function fetchFilteredProducts() {
      try {
        setLoading(true);
        const response = await filterProducts(filter);
        setProducts(response);
      } catch (error) {
        console.error('Error filtering products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFilteredProducts();
  }, [filter]);

  // Renderizado de productos
  let productResult: ReactElement | ReactElement[] = <></>;
  if (products.length > 0) {
    productResult = products.map((product: ProductsTypo, index: number) => (
      <Grid key={index} item xs={12} sm={6} md={4}>
        <ProductCard
          id={product.id}
          image={product.cover}
          name={product.title}
          publisher={product.publisher}
          offer={product.offer}
          isStock={product.isAvailable}
          description={product.description}
          offerPrice={product.offerPrice}
          salePrice={product.salePrice}
          rating={product.rating}
          author = {product.author}
        />
      </Grid>
    ));
  } else {
    productResult = (
      <Grid item xs={12} sx={{ mt: 3 }}>
        <ProductEmpty handelFilter={() => setFilter(initialState)} />
      </Grid>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductFilterDrawer
        filter={filter}
        setFilter={setFilter}
        openFilterDrawer={openFilterDrawer}
        handleDrawerOpen={handleDrawerOpen}
        setLoading={setLoading}
        initialState={initialState}
      />
      <Main open={openFilterDrawer} container={container}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <ProductsHeader filter={filter} handleDrawerOpen={handleDrawerOpen} setFilter={setFilter} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {isLoading
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <Grid key={item} item xs={12} sm={6} md={4} lg={4}>
                      <SkeletonProductPlaceholder />
                    </Grid>
                  ))
                : productResult}
            </Grid>
          </Grid>
        </Grid>
      </Main>
      <FloatingCart />
    </Box>
  );
}
