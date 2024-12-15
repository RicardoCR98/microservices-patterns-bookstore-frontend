import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import SortOptions from './SortOptions';
import MainCard from '@components/organisms/bookstore/MainCard';

// types
import { ProductsFilter } from 'src/types/e-commerce';

// assets
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';

interface ProductHeaderProps {
  handleDrawerOpen: () => void;
  setFilter: (filter: ProductsFilter) => void;
  filter: ProductsFilter;
}

export default function ProductsHeader({ filter, handleDrawerOpen, setFilter }: ProductHeaderProps) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  // sort options
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openSort = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // search filter
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setFilter({ ...filter, search: newSearch });
  };

  // sort filter
  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, value: string) => {
    setFilter({ ...filter, sort: value });
    setAnchorEl(null);
  };

  const sortLabel = SortOptions.find((item) => item.value === filter.sort)?.label || 'Ordenar por';

  return (
    <MainCard content={false}>
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        alignItems={matchDownSM ? 'center' : 'center'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        sx={{ p: 2 }}
        spacing={2}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            disableRipple
            onClick={handleDrawerOpen}
            color="secondary"
            startIcon={<FilterOutlined style={{ color: theme.palette.secondary[800] }} />}
          >
            <Typography variant="h6" color="text.primary">
              Filtro
            </Typography>
          </Button>

          <TextField
            sx={{ '& .MuiOutlinedInput-input': { pl: 0 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined style={{ fontSize: 'small' }} />
                </InputAdornment>
              )
            }}
            value={filter.search || ''} // Asegurar valor predeterminado
            placeholder="Buscar producto"
            size="medium"
            onChange={handleSearch}
          />
        </Stack>
        <Button
          id="demo-positioned-button"
          aria-controls="demo-positioned-menu"
          aria-haspopup="true"
          aria-expanded={openSort ? 'true' : undefined}
          onClick={handleClickListItem}
          variant="outlined"
          size="large"
          color="secondary"
          endIcon={<DownOutlined style={{ fontSize: 'small' }} />}
          sx={{ color: 'text.primary' }}
        >
          {sortLabel}
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={openSort}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: matchDownSM ? 'center' : 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: matchDownSM ? 'center' : 'right'
          }}
        >
          {SortOptions.map((option) => (
            <MenuItem
              sx={{ p: 1.5 }}
              key={option.value}
              selected={option.value === filter.sort}
              onClick={(event) => handleMenuItemClick(event, option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </MainCard>
  );
}
