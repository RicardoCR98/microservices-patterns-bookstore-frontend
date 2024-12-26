import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// utils
import axiosServices, { fetcher } from 'src/utils/axios';
import { CheckoutRequest } from 'src/types/orders';

// types


export const endpoints = {
  key: 'api',
  list: '/list', // server URL
  insert: '/api/orders/checkout',
  update: '/edit', // server URL
  delete: '/delete', // server URL
  userById: (userId: string | number) => `/users/${userId}`
};

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

function buildCheckoutRequest(): CheckoutRequest | null {
    try {
      const reduxState = localStorage.getItem('reduxState');
      const bookstoreCart = localStorage.getItem('bookstore-cart');
  
      if (!reduxState || !bookstoreCart) {
        console.error('No se encontraron datos necesarios en el localStorage.');
        return null;
      }
  
      const userId = JSON.parse(reduxState)?.auth?.user?.id;
      const cartData = JSON.parse(bookstoreCart);
  
      if (!userId || !cartData) {
        console.error('Datos insuficientes para construir la solicitud.');
        return null;
      }
  
      const checkoutRequest: CheckoutRequest = {
        userId,
        products: cartData.products.map((product: any) => ({
          id: product.id,
          name: product.name,
          image: product.image,
          salePrice: product.salePrice,
          offerPrice: product.offerPrice || null,
          quantity: product.quantity || 1,
          description: product.description || null,
        })),
        billing: {
          label: cartData.billing.label,
          line1: cartData.billing.line1,
          line2: cartData.billing.line2,
          city: cartData.billing.city,
          state: cartData.billing.state,
          country: cartData.billing.country,
          zipCode: cartData.billing.zipCode,
          phoneNumber: cartData.billing.phoneNumber,
          defaultAddress: cartData.billing.defaultAddress,
        },
        payment: {
          type: cartData.payment.type,
          token: cartData.payment.token,
        },
      };
  
      return checkoutRequest;
    } catch (error) {
      console.error('Error construyendo la solicitud de checkout:', error);
      return null;
    }
  }
  

export function usePostOrders() {
  async function postOrder() {
    const checkoutRequest = buildCheckoutRequest();
  
    if (!checkoutRequest) {
      console.error('No se pudo construir la solicitud de checkout.');
      return;
    }
  
    try {
      const response = await axiosServices.post(endpoints.insert, checkoutRequest);
      console.log('Respuesta del servidor:', response.data);
  
      await mutate(endpoints.userById(checkoutRequest.userId));
      console.log('Orden agregada exitosamente.');
    } catch (error) {
      console.error('Error al enviar la orden:', error);
    }
  }

  return { postOrder };
}
