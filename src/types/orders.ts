export interface Address {
    id: string;
    label: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phoneNumber: string;
    defaultAddress: boolean;
  }
  
  export interface PaymentMethod {
    id?: string | number | undefined;
    type: string; // E.g., "paypal", "creditCard"
    token: string; // Token del método de pago
  }
  
  export interface CheckoutProduct {
    id: string; // productId
    name: string;
    image: string;
    salePrice: number;
    offerPrice?: number; // Puede ser opcional
    quantity: number;
    description?: string; // Descripción opcional
  }
  
  export interface CheckoutAddress {
    label: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phoneNumber: string;
    defaultAddress: boolean;
  }
  
  export interface CheckoutPayment {
    type: string; // Tipo de pago, e.g., "paypal", "creditCard"
    token: string; // Token del método de pago
  }
  
  export interface CheckoutRequest {
    userId: string | number;
    products: CheckoutProduct[];
    billing: CheckoutAddress; // Dirección de facturación
    payment: CheckoutPayment; // Método de pago
  }
  