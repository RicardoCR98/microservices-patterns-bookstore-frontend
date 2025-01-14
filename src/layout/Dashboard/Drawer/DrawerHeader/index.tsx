import DrawerHeaderStyled from './DrawerHeaderStyled';
import { Logo } from 'src/assets/icons/logo';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface DrawerHeaderProps {
  open: boolean;
}

export default function DrawerHeader({ open }: DrawerHeaderProps) {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled
      open={open}
      sx={{
        minHeight: '64px',
        paddingLeft: theme.spacing(open ? 2 : 1),
        paddingRight: theme.spacing(open ? 2 : 1)
      }}
    >
      {/* Tu logo. Muestra versión “icon” cuando colapsa */}
      {open ? (
          <Logo isIcon={!open} sx={{ width: open ? 'auto' : 35, height: 35 }} />
      ) : (
        <Typography variant="h5">M</Typography>
      )}
    </DrawerHeaderStyled>
  );
}
