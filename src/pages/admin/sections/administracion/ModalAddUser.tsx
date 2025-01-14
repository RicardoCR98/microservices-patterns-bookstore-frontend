import React, { useMemo } from 'react';
import { Modal } from '@mui/material';
import MainCard from 'src/components/organisms/bookstore/MainCard';
import SimpleBarScroll from 'src/components/third-party/SimpleBar';
import { RegisterRequest } from 'src/api/admin/authInterfaces';
import { registerAdmin } from 'src/api/admin/usuarios';
import FormAddUser from './FormAddUser';

interface Props {
  open: boolean;
  modalToggler: (state: boolean) => void;
}

export const ModalAddUser: React.FC<Props> = ({ open, modalToggler,}) => {
  const closeModal = () => modalToggler(false);

  // Valores iniciales según si es edición o creación
  const initialValues = useMemo(() => {
    
      return {
        email: '',
        fullName: '',
        password: ''
      } as RegisterRequest;
    
  }, []);

  const handleSubmit = async (values: RegisterRequest) => {
    try {
        await registerAdmin(values);
        console.log('Administrador creado exitosamente');

    } catch (error) {
      console.error('Error:', error);
    }
    closeModal();
  };

  const userAddForm = useMemo(() => {
    return (
      <FormAddUser
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
      aria-labelledby="modal-user-edit-label"
      aria-describedby="modal-user-edit-description"
    >
      <MainCard sx={{ width: 'calc(100% - 48px)', maxWidth: 700 }} modal content={false}>
        <SimpleBarScroll
          sx={{
            maxHeight: 'calc(100vh - 48px)',
            '& .simplebar-content': { display: 'flex', flexDirection: 'column' }
          }}
        >
          {userAddForm}
        </SimpleBarScroll>
      </MainCard>
    </Modal>
  );
};