// UserManagement.tsx
import { useMemo, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import GenericTable from 'src/components/GenericTable';
import { ColumnDef } from '@tanstack/react-table';
import { Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AlertDelete from './AlertDelete';
import { getAllUsers } from 'src/api/admin/usuarios';
import { ModalUser } from './ModalUser';
import { ModalAddUser } from './ModalAddUser';
export const UserManagement = () => {
  const [openModalEdit, setOpenModalEdit] = useState(false); // Estado para el modal de edición
  const [openModalAdd, setOpenModalAdd] = useState(false);  // Estado para el modal de agregar
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'warning' as 'warning' | 'error' | 'info' | 'success'
  });

  // Cierra el modal de edición
  const handleModalEditClose = () => {
    setOpenModalEdit(false);
    setSelectedRowData(null);
  };

  // Cierra el modal de agregar
  const handleModalAddClose = () => {
    setOpenModalAdd(false);
  };

  // Abre el modal de edición con los datos seleccionados
  const handleEdit = (data: any) => {
    if (data.role === 'ADMIN') {
      setSnackbar({
        open: true,
        message: 'No tienes permisos para editar usuarios administradores',
        severity: 'warning'
      });
      return;
    }

    setSelectedRowData(data);
    setOpenModalEdit(true);
  };

  // Abre el modal de agregar
  const handleAddUserClick = () => {
    setOpenModalAdd(true);
  };

  // Maneja la eliminación
  const handleDelete = (data: any) => {
    if (data.role === 'ADMIN') {
      setSnackbar({
        open: true,
        message: 'No tienes permisos para eliminar usuarios administradores',
        severity: 'warning'
      });
      return;
    }

    setSelectedRowData(data);
    setOpenDeleteDialog(true);
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      header: '#',
      accessorKey: null,
      cell: ({ row }) => <Typography variant="body2">{row.index + 1}</Typography>
    },
    {
      header: 'ID',
      accessorKey: 'userId',
      hidden: true,
      cell: ({ getValue }) => <Typography variant="body2">{getValue() as number}</Typography>
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: ({ getValue }) => <Typography variant="body2">{getValue() as string}</Typography>
    },
    {
      header: 'Nombre',
      accessorKey: 'fullName',
      cell: ({ getValue }) => <Typography variant="body2">{getValue() as string}</Typography>
    },
    {
      header: 'Activo',
      accessorKey: 'isActive',
      cell: ({ getValue }) => {
        const isActive = getValue() as boolean;
        return (
          <Chip
            label={isActive ? 'Sí' : 'No'}
            size="small"
            sx={{
              width: 'fit-content',
              borderRadius: '4px',
              color: isActive ? 'success.main' : 'error.main',
              bgcolor: isActive ? 'success.lighter' : 'error.lighter'
            }}
          />
        );
      }
    },
    {
      header: 'Rol',
      accessorKey: 'role',
      cell: ({ getValue }) => {
        const role = getValue() as string;
        return (
          <Chip
            label={role}
            size="small"
            color={role === 'ADMIN' ? 'primary' : 'default'}
            sx={{ width: 'fit-content', borderRadius: '4px' }}
          />
        );
      }
    },
    {
      header: 'Creado el',
      accessorKey: 'createdAt',
      cell: ({ getValue }) => (
        <Typography variant="body2">
          {new Date(getValue() as string).toLocaleString()}
        </Typography>
      )
    },
    {
      header: 'Acciones',
      accessorKey: 'actions',
      cell: ({ row }) => {
        const isAdmin = row.original.role === 'ADMIN';

        return (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            <Tooltip title={isAdmin ? 'No puedes editar administradores' : 'Editar'}>
              <span>
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(row.original)}
                  disabled={isAdmin}
                >
                  <EditOutlined />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={isAdmin ? 'No puedes eliminar administradores' : 'Eliminar'}>
              <span>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(row.original)}
                  disabled={isAdmin}
                >
                  <DeleteOutlined />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        );
      }
    }
  ], []);

  return (
    <>
      <GenericTable
        onFunction={getAllUsers}
        columns={columns}
        title="ADMINISTRAR USUARIOS"
        button={true}
        buttonName="Agregar"
        onClickAdd={handleAddUserClick}
        isSearchable={true}
        expandable={false}
        columnResizing={false}
        emptyTableMessage="No hay usuarios que mostrar"
        bottomPagination={true}
        isDownloaded={true}
      />

      <AlertDelete
        id={selectedRowData?.userId}
        title={selectedRowData?.fullName}
        open={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
      />

      <ModalUser
        id={selectedRowData?.userId}
        open={openModalEdit}
        modalToggler={handleModalEditClose}
        userData={selectedRowData}
      />

      <ModalAddUser
        open={openModalAdd}
        modalToggler={handleModalAddClose}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
