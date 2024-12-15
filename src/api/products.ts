import axios from '@utils/axios';
import { Products, ProductsFilter } from 'src/types/e-commerce';

// ⬇️ Carga inicial de productos (antes `loader`)
export async function fetchInitialProducts(): Promise<Products[]> {
  try {
    const response = await axios.get('/api/products');
    return response.data.products as Products[]; // Especificamos el tipo de retorno
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Could not fetch products'); // Lanzamos un error manejable
  }
}

// ⬇️ Carga inicial de productos (antes `loader`)
// export async function fetchInitialProducts(): Promise<Products[]> {
//   try {
//     const response = await axios.get('/api/products');
//     return response.data.products; 
//   } catch (error) {
//     console.error('Error al cargar los productos:', error);
//     throw error; 
//   }
// }

// ⬇️ Filtrar productos
// export async function filterProducts(filter: ProductsFilter): Promise<{ Products[] }> {
//   try {
//     const response = await axios.post('/api/products/filter', {filter} );
//     console.log("Filter data", response);
//     return response.data; // Asegúrate de que `response.data` contenga los datos esperados
//   } catch (error) {
//     console.error('Error filtering products:', error);
//     throw new Error('Could not filter products');
//   }
// }

export async function filterProducts(filter: ProductsFilter): Promise<Products[]> {
  try {
    const response = await axios.post('/api/products/filter', filter);

    // Ajusta dependiendo de la estructura que devuelva el backend
    console.log("Filter response", response.data);

    if (Array.isArray(response.data)) {
      // Si el backend devuelve directamente un array
      return response.data;
    } else if (response.data?.data) {
      // Si el backend devuelve un objeto con "data"
      return response.data.data;
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error('Error filtering products:', error);
    throw new Error('Could not filter products');
  }
}



// ⬇️ Cargar detalles de un producto
export async function productLoader({ params }: { params: { id: string } }): Promise<Products> {
  try {
    const response = await axios.post('/api/product/details', { id: params.id });
    return response.data as Products; // Asegúrate de que los datos sean del tipo Products
  } catch (error) {
    console.error('Error loading product details:', error);
    throw new Error('Could not load product details');
  }
}

// ⬇️ Obtener productos relacionados
export async function getRelatedProducts(id: string | undefined): Promise<Products[]> {
  try {
    const response = await axios.post('/api/product/related', { id });
    return response.data as Products[]; // Asegúrate de que los datos sean un arreglo de productos
  } catch (error) {
    console.error('Error fetching related products:', error);
    throw new Error('Could not fetch related products');
  }
}

// ⬇️ Obtener reseñas de productos
// export async function getProductReviews(): Promise<any> {
//   try {
//     const response = await axios.get('/api/review/list');
//     return response.data; // Ajusta el tipo según el formato esperado de las reseñas
//   } catch (error) {
//     console.error('Error fetching product reviews:', error);
//     throw new Error('Could not fetch product reviews');
//   }
// }
