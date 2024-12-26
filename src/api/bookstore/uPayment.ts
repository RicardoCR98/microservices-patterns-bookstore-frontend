import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// utils
import axiosServices, { fetcher } from 'src/utils/axios';

// types
import { Payment } from 'src/types/e-commerce';
import { PaymentMethod } from 'src/types/users';

export const endpoints = {
  key: 'users',
  list: '/list', // server URL
  insert: (userId: string | number) => `/users/${userId}/payment-methods`,
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

export function useGetPayment() {
  const userId = getUserIdFromLocalStorage();
  console.log('User ID from localStorage:', userId);
  const { data, isLoading, error, isValidating } =  useSWR(
    userId ? endpoints.userById(userId) : null,
    fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  console.log('SWR Response Data:', data);

  const memoizedValue = useMemo(
    () => ({
      pay: data?.paymentMethods as PaymentMethod[],
      paymentLoading: isLoading,
      paymentError: error,
      paymentValidating: isValidating,
      paymentEmpty: !isLoading && (!data?.paymentMethods || data?.paymentMethods.length === 0)
    }),
    [data, error, isLoading, isValidating]
  );
  console.log('Memoized payments Value:', memoizedValue);

  return memoizedValue;
}

export function usePostPayment() {
  const userId = getUserIdFromLocalStorage();

  async function postPayments(newPayment: PaymentMethod) {
    if (!userId) {
      console.error('User ID not found. Unable to post payment.');
      return;
    }
    console.log('Attempting to post payment:', newPayment);

    try {
      const response = await axiosServices.post(endpoints.insert(userId), newPayment);
      console.log('Server response:', response);
      
      // Refrescar los datos directamente desde el servidor
      await mutate(endpoints.userById(userId));
      console.log('Payment successfully added:', response.data);
    } catch (error) {
      console.error('Error posting payments:', error);
    }
  }

  return { postPayments };
}
  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { list: updatedAddress };
  //   await axios.post(endpoints.key + endpoints.update, data);
