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

export type Products = {
  id: string;
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
  offer?: number|string; //añadir en backend
  cover: string;
  condition?: string;
  rating?: number;
  isAvailable?: boolean;
  npages?: number | null;
};



// checkout-cart billing address
export type Address = {
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
