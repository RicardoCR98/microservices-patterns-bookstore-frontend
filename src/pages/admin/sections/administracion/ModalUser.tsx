import React, { useMemo } from 'react';
import { Modal } from '@mui/material';
import MainCard from 'src/components/organisms/bookstore/MainCard';
import SimpleBarScroll from 'src/components/third-party/SimpleBar';
import FormUser from './FormUser';
import { UpdateUserRequest } from 'src/api/admin/authInterfaces';
import { updateUser } from 'src/api/admin/usuarios';

interface Props {
  id?: number;
  open: boolean;
  modalToggler: (state: boolean) => void;
  userData?: any;  // Agregamos userData para recibir los datos del usuario
}

export const ModalUser: React.FC<Props> = ({ open, modalToggler, userData, id }) => {
  const closeModal = () => modalToggler(false);

  // Inicializamos los valores con los datos del usuario si existen
  const initialValues: UpdateUserRequest = useMemo(() => ({
    email: userData?.email || '',
    fullName: userData?.fullName || '',
    isActive: userData?.isActive ?? true,
    role: userData?.role || 'USER'
  }), [userData]);

  const handleSubmit = async (values: UpdateUserRequest) => {
    try {
      if (id) {
        await updateUser(id, values);
        console.log('Usuario actualizado exitosamente');
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
    closeModal();
  };

  const userForm = useMemo(() => {
    return (
      <FormUser
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
      <MainCard sx={{ width: 'calc(100% - 48px)', maxWidth: 880 }} modal content={false}>
        <SimpleBarScroll
          sx={{
            maxHeight: 'calc(100vh - 48px)',
            '& .simplebar-content': { display: 'flex', flexDirection: 'column' }
          }}
        >
          {userForm}
        </SimpleBarScroll>
      </MainCard>
    </Modal>
  );
};