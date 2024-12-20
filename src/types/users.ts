// src/types/user.ts

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
    id: string;
    type: string;
    cardHolderName: string;
    cardBrand: string;
    last4: string;
    expirationMonth: string;
    expirationYear: string;
    defaultMethod: boolean;
    token: string;
  }
  
  export interface User {
    id: string;
    userId: number;
    email: string;
    fullName: string;
    addresses: Address[];
    paymentMethods: PaymentMethod[];
    // Añade otros campos según la respuesta de tu API
  }
  