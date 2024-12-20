import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';

// utils
import axiosServices, { fetcher } from 'src/utils/axios';

// types
import { Address } from 'src/types/e-commerce';

export const endpoints = {
  key: 'users',
  list: '/list', // server URL
  insert: (userId: string | number) => `/users/${userId}/addresses`,
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

export function useGetAddress() {
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
      address: data?.addresses as Address[],
      addressLoading: isLoading,
      addressError: error,
      addressValidating: isValidating,
      addressEmpty: !isLoading && (!data?.addresses || data?.addresses.length === 0)
    }),
    [data, error, isLoading, isValidating]
  );
  console.log('Memoized Address Value:', memoizedValue);

  return memoizedValue;
}

export function usePostAddress() {
  const userId = getUserIdFromLocalStorage();

  async function postAddress(newAddress: Address) {
    if (!userId) {
      console.error('User ID not found. Unable to post address.');
      return;
    }
    console.log('Attempting to post address:', newAddress);

    try {
      const response = await axiosServices.post(endpoints.insert(userId), newAddress);
      console.log('Server response:', response);
      
      // Refrescar los datos directamente desde el servidor
      await mutate(endpoints.userById(userId));
      console.log('Address successfully added:', response.data);
    } catch (error) {
      console.error('Error posting address:', error);
    }
  }

  return { postAddress };
}

export async function updateAddress(addressId: string | number | undefined, updatedAddress: Address) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentAddress: any) => {
      const newAddress: Address[] = currentAddress.address.map((address: Address) =>
        address.id === addressId ? { ...address, ...updatedAddress } : address
      );

      return {
        ...currentAddress,
        address: newAddress
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { list: updatedAddress };
  //   await axios.post(endpoints.key + endpoints.update, data);
}
