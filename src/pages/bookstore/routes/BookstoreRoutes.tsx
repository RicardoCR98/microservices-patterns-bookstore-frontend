import { Navigate, Route, Routes } from "react-router-dom";
import { BookstoreLayout } from "../layout/BookstoreLayout";
import { HomePage } from "../pages/HomePage";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import { ProductAdd } from "../sections/product-seller/ProductAdd";

export const BookstoreRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BookstoreLayout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="my-books" element={<ProductAdd />} />

        {/* Ruta por defecto para rutas no válidas */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
};
