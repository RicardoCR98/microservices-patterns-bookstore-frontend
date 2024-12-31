import axios from '@utils/axios';
import { Products, ProductsFilter  } from 'src/types/e-commerce';


// ⬇️ Obtener userId de localStorage
function getUserIdFromLocalStorage(): string | null {
  try {
    const reduxState = localStorage.getItem('reduxState');
    if (reduxState) {
      const parsedState = JSON.parse(reduxState);
      return parsedState?.auth?.user?.id || null;
    }
    return null;
  } catch (error) {
    console.error('Error reading userId from localStorage:', error);
    return null;
  }
}

// ⬇️ Carga inicial de productos (antes `loader`)
export async function fetchInitialProducts(): Promise<Products[]> {
  try {
    const response = await axios.get('/api/products');
    // console.log('Respuesta crudassss del backend:', response.data); 
    return response.data as Products[]; 
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Could not fetch products'); 
  }
}

// ⬇️ Crear o publicar un nuevo libro (POST /api/products)
export async function createNewProduct(productData: Omit<Products, 'userId'>): Promise<Products> {
  try {
    // 1. Recuperamos el userId del localStorage
    const userId = getUserIdFromLocalStorage();
    if (!userId) {
      throw new Error('No userId found in localStorage');
    }

    // 2. Creamos el payload que enviará al backend
    const payload: Products = {
      ...productData,
      userId: Number(userId) 
    };

    // 3. Llamamos al backend
    const response = await axios.post('/api/products', payload);

    // 4. Retornamos el producto creado 
    return response.data as Products;

  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Could not create product');
  }
}

// ⬇️ Obtener todos los productos de un usuario (GET /api/products/user/${userId})
export async function fetchUserProducts(): Promise<Products[]> {
  try {
    // 1. Recuperamos el userId del localStorage
    const userId = getUserIdFromLocalStorage();
    if (!userId) {
      throw new Error('No se encontró userId en localStorage');
    }

    // 2. Llamamos al backend para obtener los productos del usuario
    const response = await axios.get(`/api/products/user/${userId}`);

    // 3. Retornamos la lista de productos
    return response.data as Products[];
  } catch (error) {
    console.error('Error al obtener productos del usuario:', error);
    throw new Error('No se pudo obtener la lista de productos del usuario');
  }
}

// ⬇️ Filtrar productos
export async function filterProducts(filter: ProductsFilter): Promise<{ data: Products[] }> {
  try {
    const response = await axios.post('/api/products/filter', filter );
    // console.log('Respuesta cruda del backend:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error filtering products:', error);
    throw new Error('Could not filter products');
  }
}

// export async function filterProducts(filter: ProductsFilter): Promise<Products[]> {
//   try {
//     const response = await axios.post('/api/products/filter', filter);

//     // Ajusta dependiendo de la estructura que devuelva el backend
//     console.log("Filter response", response.data);

//     if (Array.isArray(response.data)) {
//       // Si el backend devuelve directamente un array
//       return response.data;
//     } else if (response.data?.data) {
//       // Si el backend devuelve un objeto con "data"
//       return response.data.data;
//     } else {
//       throw new Error('Unexpected response structure');
//     }
//   } catch (error) {
//     console.error('Error filtering products:', error);
//     throw new Error('Could not filter products');
//   }
// }

// ⬇️ Cargar detalles de un producto 
export async function productLoader({ params }: { params: { id?: string } }): Promise<Products> {
  try {
    const response = await axios.get(`/api/products/${params.id}`);
    // console.log('Respuesta del detalle:', response.data);
    return response.data as Products; 
  } catch (error) {
    console.error('Error loading product details:', error);
    throw new Error('Could not load product details');
  }
}

// ⬇️ Obtener productos relacionados
export async function getRelatedProducts(id?: string): Promise<Products[]> {
  try {
    const response = await axios.get(`/api/products/${id}/related`); 
    // console.log('Respuesta de productos relacionados:', response.data);
    return response.data as Products[]; 
  } catch (error) {
    console.error('Error fetching related products:', error);
    throw new Error('Could not fetch related products');
  }
}


// ⬇️ Obtener reseñas de productos 
export async function getProductReviews(): Promise<any> {
  try {
    const response = await axios.get('/api/review/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    throw new Error('Could not fetch product reviews');
  }
}
