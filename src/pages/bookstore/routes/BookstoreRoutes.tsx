import { Navigate, Route, Routes } from 'react-router-dom';
import { BookstoreLayout } from '../layout/BookstoreLayout';
import { HomePage } from '../pages/HomePage';

export const BookstoreRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BookstoreLayout />}>
        <Route path="home" element={<HomePage />} />

        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
};
