// project imports
import { PaymentOptionsProps } from 'src/types/e-commerce';

// assets
import paypal from 'src/assets/images/bookstore/paypal.png';
import card from 'src/assets/images/bookstore/card.png';

// ==============================|| CHECKOUT - PAYMENT OPTIONS ||============================== //

const PaymentOptions: PaymentOptionsProps[] = [
  // {
  //   id: 2,
  //   value: "card",
  //   title: "Tarjeta",
  //   caption: "Tarjeta de crédito o débito",
  //   image: card,
  //   size: {
  //     width: 70,
  //     height: 24,
  //   },
  // },
  {
    id: 1,
    value: "paypal",
    title: "PayPal",
    caption: "Paga con tu cuenta de PayPal",
    image: paypal,
    size: {
      width: 70,
      height: 24,
    },
  }
  // Otros métodos de pago
];


export default PaymentOptions;
