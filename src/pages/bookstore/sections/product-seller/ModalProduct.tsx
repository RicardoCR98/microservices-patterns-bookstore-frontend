import React, { useMemo } from 'react';
import { Modal } from '@mui/material';
import MainCard from 'src/components/organisms/bookstore/MainCard';
import SimpleBarScroll from 'src/components/third-party/SimpleBar';
import FormProductAdd from './FormProductAdd';
import { Products } from 'src/types/e-commerce';
import { createNewProduct } from 'src/api/bookstore/products'; // Ajusta la ruta según tu carpeta real

interface Props {
  open: boolean;
  modalToggler: (state: boolean) => void;
  product?: Products | null;
}

export const ModalProduct: React.FC<Props> = ({ open, modalToggler, product }) => {
  const closeModal = () => modalToggler(false);

  // Valores iniciales (si no hay "product", usamos default)
  const initialValues: Products = product || {
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publicationDate: '',
    category: '',
    genre: '',
    description: '',
    stockQuantity: 0,
    salePrice: 0,
    offer: 0,
    cover: '',
    condition: '',
    rating: 0,
    npages: 0,
  };

  // Se llama cuando el usuario hace "submit" en el formulario
  const handleSubmit = async (values: Products) => {
    console.log('VALORES enviados desde Form:', values);
    try {
      await createNewProduct(values);
      console.log('Producto creado exitosamente');
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
    closeModal();
  };

  const productForm = useMemo(() => {
    return (
      <FormProductAdd
        initialValues={initialValues}
        onSubmit={handleSubmit}
        closeModal={closeModal}
      />
    );
  }, [initialValues]);

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-product-add-label"
      aria-describedby="modal-product-add-description"
    >
      <MainCard sx={{ width: 'calc(100% - 48px)', maxWidth: 880 }} modal content={false}>
        <SimpleBarScroll
          sx={{
            maxHeight: 'calc(100vh - 48px)',
            '& .simplebar-content': { display: 'flex', flexDirection: 'column' }
          }}
        >
          {productForm}
        </SimpleBarScroll>
      </MainCard>
    </Modal>
  );
};
