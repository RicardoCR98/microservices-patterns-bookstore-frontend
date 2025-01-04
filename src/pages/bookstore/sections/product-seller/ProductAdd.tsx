import { useMemo, useState } from 'react';
import GenericTable from 'src/components/GenericTable';
import { ColumnDef } from '@tanstack/react-table';
import { Products } from 'src/types/e-commerce';

import {  Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import AlertDelete from './AlertDelete';
import { fetchUserProducts } from 'src/api/bookstore/products';
import { ModalProduct } from './ModalProduct';

// Componente de la página
export const ProductAdd = () => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleModalClose = () => {
    setOpenModalEdit(false);
    setIsEdit(false);
  };

  const handleEdit = (data: any) => {
    setSelectedRowData(data);
    // setOpenModalEdit(true);
    setIsEdit(true);
  };

  const handleDelete = (data: any) => {
    setSelectedRowData(data);
    setOpenDeleteDialog(true);
  };


  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleAddUserClick = () => {
    setOpenModalEdit(true);
    setIsEdit(false);
  };

  const columns = useMemo<ColumnDef<Products>[]>(
    () => [
      {
        header: '#',
        accessorKey: null,
        cell: ({ row }) => <Typography variant="body2">{row.index + 1}</Typography>
      },
      {
        header: 'Título',
        accessorKey: 'title'
      },
      {
        header: 'Categoría',
        accessorKey: 'category'
      },
      {
        header: 'Precio de venta',
        accessorKey: 'salePrice',
        cell: ({ getValue }) => <Typography variant="body2">${getValue() as number}</Typography>
      },
      {
        header: 'Precio de oferta',
        accessorKey: 'offerPrice',
        cell: ({ getValue }) => <Typography variant="body2">${getValue() as number}</Typography>
      },
      {
        header: 'Stock disponible',
        accessorKey: 'stockQuantity',
        cell: ({ getValue }) => <Typography variant="body2">{getValue() as number}</Typography>
      },
      {
        header: 'Disponibilidad',
        accessorKey: 'isAvailable',
        cell: ({ getValue }) => {
          const isAvailable = getValue() as boolean; 
          return (
            <Chip
              label={isAvailable ? 'Disponible' : 'No disponible'}
              size="small"
              sx={{
                width: 'fit-content',
                borderRadius: '4px',
                color: isAvailable ? 'success.main' : 'error.main',
                bgcolor: isAvailable ? 'success.lighter' : 'error.lighter'
              }}
            />
          );
        }
      },
      {
        header: 'Acciones',
        accessorKey: 'actions',
        cell: ({ row }) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              {/* <Tooltip title="Editar">
                <IconButton
                  color="primary"
                  onClick={() => {
                    handleEdit(row.original);
                  }}
                >
                  <EditOutlined />
                </IconButton>
              </Tooltip> */}
              <Tooltip title="Eliminar">
                <IconButton
                  color="error"
                  onClick={() => {
                    handleDelete(row.original);
                  }}
                >
                  <DeleteOutlined />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    []
  );

  /*
** Data 
columns={columns}
urlTable= "string" -> URL de toda la lista de datos
urlModalEdit="string" -> URL de la fila seleccionada (no implmentado aun)

props disponibles:
- title -> String (Titulo general de la tabla)
- button -> bool (¿Desea tener un boton para abrir un modal?)
- buttonName -> String (Titulo del boton)
- onClickAdd -> funcion (a donde se lo va a dirigir el boton cuando se lo pulse)
- isSearchable -> bool (¿Desea el input de filtrado?)
- expandable -> bool (¿Desea ver detalles de las filas?)
- columnResizing -> bool (¿Desea cambiar de tamaño a las columnas?)
- topPagination -> bool (¿Desea ver la paginación en el top de la tabla?)
- bottomPagination -> bool (¿Desea ver la paginación abajo de la tabla?)
- emptyTableMessage -> string (Mensaje de la tabla cuando no haya datos)
- actions -> bool (¿Desea poder eliminar las filas o editar las filas?)
- setOpenModalEdit -> funcion (Ejecutar la funcion para abrir el modal)
- isDownloaded -> bool (¿Desea el boton de descarag?)
- isBackButton -> bool (Desea regresar hacia atrás? (suponiendo que hay una pantalla antes que la tabla))
- onClickBackButton -> funcion (funcion para regresar a la pantalla anterior)
- isFiltreable -> bool (stack de botones para filtrar y buscar)
*/

  return (
    <>
      <GenericTable
        // datas={datas}
        // urlTable='http://localhost:8080/api/products/user/1'
        onFunction={fetchUserProducts}
        columns={columns}
        title="MIS LIBROS"
        button={true}
        buttonName="Agregar"
        onClickAdd={handleAddUserClick}
        isSearchable={true}
        expandable={false}
        columnResizing={false}
        emptyTableMessage="No tienes libros registrados"
        bottomPagination={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDownloaded={true}
      />

      {/* AlertDelete  */}
      <AlertDelete
        id={selectedRowData?.id}
        title={selectedRowData?.title}
        open={openDeleteDialog}
        handleClose={handleCancelDelete}
      />

      {/* ModalProduct */}
      <ModalProduct
        open={openModalEdit} 
        modalToggler={handleModalClose}
      />
    </>
  );
};
