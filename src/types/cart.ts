// import { KeyedObject } from 'types';
export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export interface CartCheckoutStateProps {
  step: number;
  products: CartProductStateProps[];
  // subtotal: number;
  total: number;
  // discount: number;
  // shipping: number;
  billing: Address | null;
  payment: CartPaymentStateProps;
}

export interface CartProductStateProps {
  itemId?: string | number;
  id: string | number;
  name: string;
  image: string;
  salePrice: number;
  offerPrice: number;
  // color: string;
  // size: string | number;
  quantity: number;
  description?: string;
}

// Tipo de dato que viene del backend
export type Address = {
  id?: string | number | undefined;
  label: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string | number;
  phoneNumber: string | number;
  defaultAddress: boolean;
};

export type Addresssss = {
  id?: string | number | undefined;
  name: string;
  destination: string;
  building: string;
  street: string;
  city: string;
  state: string;
  country: string;
  post: string | number;
  phone: string | number;
  isDefault: boolean;
};

export interface CartPaymentStateProps {
  type: string;
  token: string;
}

export interface ProductCardProps extends KeyedObject {
  id?: string | number;
  name: string;
  image: string;
  description?: string;
  offerPrice?: number;
  salePrice?: number;
  rating?: number;
}
