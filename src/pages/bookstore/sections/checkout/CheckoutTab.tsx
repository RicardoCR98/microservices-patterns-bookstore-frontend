import { useEffect, useState, ReactNode } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from '@components/organisms/bookstore/MainCard';
import Avatar from '@components/@extended/Avatar';
import BillingAddress from './BillingAddress';
import Cart from './Cart';
import CartEmpty from './CartEmpty';
import Payment from './Payment';

import { updateAddress } from 'src/api/bookstore/address';
import { openSnackbar } from 'src/api/snackbar';
import { removeCartProduct, setBackStep, setBillingAddress, setCheckoutStep, setNextStep, updateCartProduct } from 'src/api/bookstore/cart';

// types
import { SnackbarProps } from 'src/types/snackbar';
import { CartCheckoutStateProps } from 'src/types/cart';
import { TabsProps } from 'src/types/e-commerce';
import { Address } from 'src/types/cart';

// assets
import CheckOutlined from '@ant-design/icons/CheckOutlined';

interface TabOptionProps {
  label: string;
}

interface StyledTabProps {
  cart: CartCheckoutStateProps;
}

const StyledTab = styled(Tab)<StyledTabProps>(({ theme }) => ({
  minHeight: 'auto',
  minWidth: 250,
  padding: 16,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  textAlign: 'left',
  justifyContent: 'flex-start',
  '&:after': {
    background: 'transparent !important'
  },
  '& > svg': {
    marginBottom: '0px !important',
    marginRight: 10,
    marginTop: 2,
    height: 20,
    width: 20
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 'auto'
  }
}));

// tabs option
const tabsOption: TabOptionProps[] = [
  {
    label: 'Carrito de compras'
  },
  {
    label: 'Información de envío'
  },
  {
    label: 'Pago'
  }
];

// tabs
function TabPanel({ children, value, index, ...other }: TabsProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

// ==============================|| PRODUCT - CHECKOUT MAIN ||============================== //

export default function CheckoutTab({ cart }: { cart: CartCheckoutStateProps }) {
  const isCart = cart.products && cart.products.length > 0;

  const [value, setValue] = useState(cart.step > 2 ? 2 : cart.step);
  const [billing, setBilling] = useState(cart.billing);

  const editBillingAddress = (addressEdit: Address) => {
    updateAddress(addressEdit.id, addressEdit).then(() => setBillingAddress(addressEdit));
  };

  const handleChange = (newValue: number) => {
    setValue(newValue);
    setCheckoutStep(newValue);
  };

  useEffect(() => {
    setValue(cart.step > 2 ? 2 : cart.step);
  }, [cart.step]);

  const removeProduct = (id: string | number | undefined) => {
    removeCartProduct(id!, cart.products);
    openSnackbar({
      open: true,
      message: 'Update Cart Success',
      variant: 'alert',
      alert: {
        color: 'success'
      }
    } as SnackbarProps);
  };

  const updateQuantity = (id: string | number | undefined, quantity: number) => {
    updateCartProduct(id!, quantity, cart.products);
  };

  const onNext = () => {
    setNextStep();
  };

  const onBack = () => {
    setBackStep();
  };

  const billingAddressHandler = (addressBilling: Address | null) => {
    if (billing !== null || addressBilling !== null) {
      if (addressBilling !== null) {
        setBilling(addressBilling);
      }

      setBillingAddress(addressBilling !== null ? addressBilling : billing);
      onNext();
    } else {
      openSnackbar({
        open: true,
        message: 'Please select delivery address',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      } as SnackbarProps);
    }
  };

  return (
    <Stack spacing={2}>
      <MainCard content={false}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Tabs
              value={value}
              onChange={(e, newValue) => handleChange(newValue)}
              aria-label="icon label tabs example"
              variant="scrollable"
              sx={{
                '& .MuiTabs-flexContainer': {
                  borderBottom: 'none'
                },
                '& .MuiTabs-indicator': {
                  display: 'none'
                },
                '& .MuiButtonBase-root + .MuiButtonBase-root': {
                  position: 'relative',
                  overflow: 'visible',
                  ml: 2,
                  '&:after': {
                    content: '""',
                    bgcolor: '#ccc',
                    width: 1,
                    height: 'calc(100% - 16px)',
                    position: 'absolute',
                    top: 8,
                    left: -8
                  }
                }
              }}
            >
              {tabsOption.map((tab, index) => (
                <StyledTab
                  key={index}
                  value={index}
                  cart={cart}
                  disabled={index > cart.step}
                  label={
                    <Grid container>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar
                          type={index !== cart.step ? 'combined' : 'filled'}
                          size="xs"
                          color={index > cart.step ? 'secondary' : 'primary'}
                        >
                          {index === cart.step ? index + 1 : <CheckOutlined />}
                        </Avatar>
                        <Typography color={index > cart.step ? 'text.secondary' : 'inherit'}>{tab.label}</Typography>
                      </Stack>
                    </Grid>
                  }
                />
              ))}
            </Tabs>
          </Grid>
        </Grid>
      </MainCard>
      <Grid container>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            {isCart && <Cart checkout={cart} onNext={onNext} removeProduct={removeProduct} updateQuantity={updateQuantity} />}
            {!isCart && <CartEmpty />}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BillingAddress checkout={cart} onBack={onBack} removeProduct={removeProduct} billingAddressHandler={billingAddressHandler} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Payment checkout={cart} onBack={onBack} onNext={onNext} removeProduct={removeProduct} editAddress={editBillingAddress} />
          </TabPanel>
        </Grid>
      </Grid>
    </Stack>
  );
}
