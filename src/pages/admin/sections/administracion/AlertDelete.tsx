// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import Avatar from 'src/components/@extended/Avatar';
import { PopupTransition } from 'src/components/@extended/Transitions';

// import { deleteCustomer } from 'api/customer';
// import { openSnackbar } from 'api/snackbar';

// assets
import DeleteFilled from '@ant-design/icons/DeleteFilled';
import { deleteUser } from 'src/api/admin/usuarios';
import { useSimpleSnackbar } from '@components/SimpleSnackbarProvider';

// types
// import { SnackbarProps } from 'types/snackbar';

interface Props {
  id: number;
  title: string;
  open: boolean;
  handleClose: () => void;
}

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function AlertDelete({ id, title, open, handleClose }: Props) {
  const { showSuccess } = useSimpleSnackbar();
  const deletehandler = async () => {
    await deleteUser(id).then(() => {
      showSuccess('Usuario eliminado correctamente');
      handleClose();
    });
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      aria-labelledby="column-delete-title"
      aria-describedby="column-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <DeleteFilled />
          </Avatar>
          <Stack spacing={2}>
          <Typography variant="h4" align="center">
            ¿Estás seguro que deseas eliminar el usuario {' '}&quot;{title}&quot;{' '}?
            </Typography>
            <Typography align="center">
            Al eliminar 
              <Typography variant="subtitle1" component="span">
                {' '}
                &quot;{title}&quot;{' '}
              </Typography>
              esta acción no se podrá deshacer.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button fullWidth onClick={handleClose} color="secondary" variant="outlined">
              Cancelar
            </Button>
            <Button fullWidth color="error" variant="contained" onClick={deletehandler} autoFocus>
              Eliminar
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
