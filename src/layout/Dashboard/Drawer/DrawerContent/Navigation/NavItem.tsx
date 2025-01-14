import { Link, useLocation, matchPath } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Dot from 'src/components/@extended/Dot';
import IconButton from 'src/components/@extended/IconButton';

import { MenuOrientation, ThemeMode, NavActionType } from 'src/config';
import { useConfig } from 'src/hooks/useConfig';
import { LinkTarget, NavItemType } from 'src/types/menu';

interface Props {
  item: NavItemType;
  level: number;
  isParents?: boolean;
  setSelectedID?: Function;
}

export default function NavItem({ item, level, isParents = false, setSelectedID }: Props) {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const [drawerOpen] = [true]; // Esto debería venir de tu estado global o context
  const { mode, menuOrientation } = useConfig();

  let itemTarget: LinkTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  const itemHandler = () => {
    if (downLG) {
      // setDrawerOpen(false); // Si necesitas cerrar el drawer en mobile
    }
    if (isParents && setSelectedID) {
      setSelectedID();
    }
  };

  const Icon = item.icon!;
  const itemIcon = item.icon ? (
    <Icon
      style={{
        fontSize: drawerOpen ? '1rem' : '1.25rem',
        ...(menuOrientation === MenuOrientation.HORIZONTAL && isParents && { fontSize: 20, stroke: '1.5' })
      }}
    />
  ) : (
    false
  );

  const { pathname } = useLocation();
  const isSelected = !!matchPath({ path: item?.link ? item.link : item.url!, end: false }, pathname);

  const textColor = mode === ThemeMode.DARK ? 'grey.400' : 'text.primary';
  const iconSelectedColor = mode === ThemeMode.DARK && drawerOpen ? 'text.primary' : 'primary.main';

  return (
    <Box sx={{ position: 'relative' }}>
      <ListItemButton
        component={Link}
        to={item.url!}
        target={itemTarget}
        disabled={item.disabled}
        selected={isSelected}
        sx={{
          zIndex: 1201,
          pl: drawerOpen ? `${level * 28}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          ...(drawerOpen && {
            '&:hover': { bgcolor: mode === ThemeMode.DARK ? 'divider' : 'primary.lighter' },
            '&.Mui-selected': {
              bgcolor: mode === ThemeMode.DARK ? 'divider' : 'primary.lighter',
              borderRight: '2px solid',
              borderColor: 'primary.main',
              color: iconSelectedColor,
              '&:hover': { color: iconSelectedColor, bgcolor: mode === ThemeMode.DARK ? 'divider' : 'primary.lighter' }
            }
          }),
          ...(!drawerOpen && {
            justifyContent: 'center', // Centrar el icono cuando está colapsado
            px: 1.5, // Padding horizontal uniforme
            minWidth: 'auto', // Permitir que el botón se ajuste al contenido
            '&:hover': { bgcolor: 'transparent' },
            '&.Mui-selected': {
              '&:hover': { bgcolor: 'transparent' },
              bgcolor: 'transparent'
            }
          })
        }}
        onClick={itemHandler}
      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: drawerOpen ? 28 : 36,
              color: isSelected ? iconSelectedColor : textColor,
              ...(!drawerOpen && {
                minWidth: 36,
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto', // Centrar cuando está colapsado
                '&:hover': {
                  bgcolor: mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter'
                }
              }),
              ...(!drawerOpen &&
                isSelected && {
                  bgcolor: mode === ThemeMode.DARK ? 'primary.900' : 'primary.lighter',
                  '&:hover': {
                    bgcolor: mode === ThemeMode.DARK ? 'primary.darker' : 'primary.lighter'
                  }
                })
            }}
          >
            {itemIcon}
          </ListItemIcon>
        )}
        
        {/* Solo mostrar el texto cuando el drawer está expandido */}
        {drawerOpen && (
          <ListItemText
            primary={
              <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                {item.title}
              </Typography>
            }
          />
        )}
        
        {/* Solo mostrar el chip cuando el drawer está expandido */}
        {drawerOpen && item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </ListItemButton>

      {item?.actions?.map((action, index) => {
        const ActionIcon = action.icon!;
        const callAction = action?.function;
        return drawerOpen && (
          <IconButton
            key={index}
            onClick={(event) => {
              event.stopPropagation();
              if (action.type === NavActionType.FUNCTION) callAction();
            }}
            color="secondary"
            variant="outlined"
            sx={{
              position: 'absolute',
              top: 12,
              right: 20,
              zIndex: 1202,
              width: 20,
              height: 20,
              mr: -1,
              ml: 1,
              color: 'secondary.dark',
              borderColor: isSelected ? 'primary.light' : 'secondary.light',
              '&:hover': { borderColor: isSelected ? 'primary.main' : 'secondary.main' }
            }}
          >
            <ActionIcon style={{ fontSize: '0.625rem' }} />
          </IconButton>
        );
      })}
    </Box>
  );
}