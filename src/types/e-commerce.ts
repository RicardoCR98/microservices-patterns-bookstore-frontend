// product shop list
// export type Products = {
//   id: string | number;
//   image: string;
//   title: string;
//   brand: string;
//   offer?: string;
//   description?: string;
//   about?: string;
//   quantity?: number;
//   rating?: number;
//   discount?: number;
//   salePrice?: number;
//   offerPrice?: number;
//   gender?: string;
//   categories?: string[];
//   popularity?: number;
//   date?: number;
//   created: Date;
//   isStock?: boolean;
//   new?: number;
// };

export enum Category {
  FICCION = 'FICCION',
  NO_FICCION = 'NO_FICCION',
  LIBROS_INFANTILES = 'LIBROS_INFANTILES',
  JUVENIL = 'JUVENIL',
  BIOGRAFIA_Y_MEMORIAS = 'BIOGRAFIA_Y_MEMORIAS',
  AUTOAYUDA = 'AUTOAYUDA',
  LIBROS_DE_TEXTO = 'LIBROS_DE_TEXTO',
  COMICS_Y_NOVELAS_GRAFICAS = 'COMICS_Y_NOVELAS_GRAFICAS'
}

export enum Genre {
  AVENTURA = 'AVENTURA',
  ROMANCE = 'ROMANCE',
  SUSPENSO = 'SUSPENSO',
  FANTASIA = 'FANTASIA',
  CIENCIA_FICCION = 'CIENCIA_FICCION'
}

export enum Condition {
  NUEVO = 'NUEVO',
  USADO = 'USADO'
}

export type Products = {
  id?: string;
  userId?: string | number;
  title: string;
  author?: string;
  isbn?: string;
  publisher?: string;
  publicationDate?: string;
  category?: string;
  genre?: string;
  description?: string;
  stockQuantity?: number;
  salePrice?: number;
  offerPrice?: number;
  offer?: number|string; 
  cover: string| File;
  condition?: string;
  rating?: number;
  isAvailable?: boolean;
  npages?: number | null;
  datePublish?: Date; 
};



// checkout-cart billing address
export type Addresss = {
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

export type Payment = {
  id?: string | number | undefined;
  cardType: string;
  CardHolderName: string;
  CardNumber: string;
  ExpiryMonth: string;
  ExpiryYear: string;
  Cvv: string;
};


// product reviews list
export type Reviews = {
  id: string | number | undefined;
  rating: number;
  review: string;
  date: Date | string;
  profile: {
    avatar: string;
    name: string;
    status: boolean;
  };
};

// product shop filter
export type ProductsFilter = {
  length?: number;
  search: string;
  sort: string;
  gender: string[];
  categories: string[];
  // colors: string[];
  price: string;
  rating: number;
};

// product shop filter - sort options
export type SortOptionsProps = {
  value: string;
  label: string;
};

// product shop filter - colors options
export type ColorsOptionsProps = {
  label: string;
  value: string;
  bg: string;
};

export type PaymentOptionsProps = {
  id: number;
  value: string;
  title: string;
  caption: string;
  image?: string;
  size: {
    width: number;
    height: number;
  };
};

export interface TabsProps {
  children?: React.ReactElement | React.ReactNode | string;
  value: string | number;
  index: number;
}
