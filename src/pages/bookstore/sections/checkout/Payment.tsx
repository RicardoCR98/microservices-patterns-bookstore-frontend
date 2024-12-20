import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import RadioGroup from '@mui/material/RadioGroup';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

// project imports
import AddAddress from './AddAddress';
import AddressCard from './AddressCard';
import CartDiscount from './CartDiscount';
import OrderComplete from './OrderComplete';
import OrderSummary from './OrderSummery';
import PaymentCard from './PaymentCard';
import PaymentOptions from './PaymentOptions';
import PaymentSelect from './PaymentSelect';
import MainCard from '@components/organisms/bookstore/MainCard';
import Avatar from '@components/@extended/Avatar';
import IconButton from '@components/@extended/IconButton';

import { setPaymentCard, setPaymentMethod } from 'src/api/bookstore/cart';
import { openSnackbar } from 'src/api/snackbar';
import { getImageUrl, ImagePath } from 'src/utils/getImageUrl';

// assets
import CreditCardOutlined from '@ant-design/icons/CreditCardOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

import master from 'src/assets/images/bookstore/master-card.png';
import paypalcard from 'src/assets/images/bookstore/paypal.png';

// types
import { SnackbarProps } from 'src/types/snackbar';
import { CartCheckoutStateProps } from 'src/types/cart';
import { Address, PaymentOptionsProps } from 'src/types/e-commerce';

// ==============================|| CHECKOUT PAYMENT - MAIN ||============================== //

interface PaymentProps {
  checkout: CartCheckoutStateProps;
  onBack: () => void;
  onNext: () => void;
  removeProduct: (id: string | number | undefined) => void;
  editAddress: (address: Address) => void;
}

export default function Payment({ checkout, onBack, onNext, removeProduct, editAddress }: PaymentProps) {
  const theme = useTheme();

  const [payment, setPayment] = useState(checkout.payment.method);
  const [rows, setRows] = useState(checkout.products);
  const [tokens, setTokens] = useState(checkout.payment.token);
  const [select, setSelect] = useState<Address | null>(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (billingAddress: Address | null) => {
    setOpen(true);
    billingAddress && setSelect(billingAddress!);
  };

  const handleClose = () => {
    setOpen(false);
    setSelect(null);
  };

  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (checkout.step > 2) {
      setComplete(true);
    }
  }, [checkout.step]);

  useEffect(() => {
    setRows(checkout.products);
  }, [checkout.products]);

  const cardHandler = (card: string) => {
    if (payment === 'card') {
      setTokens(card);
      setPaymentCard(card);
    }
  };

  const handlePaymentMethod = (value: string) => {
    setPayment(value);
    setPaymentMethod(value);
  };

  const handleApprove = (orderId: string) => {
    console.log("Payment successful with order ID:", orderId);
    onNext();
  };

  const completeHandler = () => {
    if (payment === 'card' && (tokens === '' || tokens === null)) {
      openSnackbar({
        open: true,
        message: 'Select Payment Card',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      } as SnackbarProps);
    } else {
      onNext();
      setComplete(true);
    }
  };

  const getImage = (cardType: string) => {
    if (cardType === 'visa') {
      return <img src={master} alt="card-visa" />;
    }
    if (cardType === 'mastercard') {
      return <img src={paypalcard} alt="card-master" />;
    }
    return null;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={8} xl={9}>
        <Stack spacing={2} alignItems="flex-end">
          <MainCard title="Método de pago">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AddressCard change address={checkout.billing} handleClickOpen={handleClickOpen} />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup
                    aria-label="payment-options"
                    value={payment}
                    onChange={(e) => handlePaymentMethod(e.target.value)}
                    name="payment-options"
                  >
                    <Grid container spacing={2} alignItems="center">
                      {PaymentOptions.map((item: PaymentOptionsProps, index: number) => (
                        <Grid item xs={12} sm={6} lg={6} key={index}>
                          <PaymentSelect item={item} />
                        </Grid>
                      ))}
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>

              {payment === 'card' && (
                <Grid item xs={12}>
                  <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={5}>
                          <Stack>
                            <InputLabel>Card Number :</InputLabel>
                            <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                              Enter the 16 digit card number on the card
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={7}>
                          <TextField
                            fullWidth
                            InputProps={{
                              startAdornment: payment === 'card' ? <InputAdornment position="start">{getImage(payment)}</InputAdornment> : null,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <CheckOutlined />
                                </InputAdornment>
                              )
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={5}>
                          <Stack>
                            <InputLabel>Expiry Date :</InputLabel>
                            <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                              Enter the expiration on the card
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={7}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Stack direction="row" spacing={2} alignItems="center">
                                <TextField fullWidth placeholder="12" />
                                <Typography color="text.secondary">/</Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField fullWidth placeholder="2021" />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={5}>
                          <Stack>
                            <InputLabel>CVV Number :</InputLabel>
                            <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                              Enter the 3 or 4 digit number on the card
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={7}>
                          <TextField
                            fullWidth
                            type="password"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                                  <CreditCardOutlined style={{ fontSize: '1.15rem', color: 'inherit' }} />
                                </InputAdornment>
                              )
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={5}>
                          <Stack>
                            <InputLabel>Password :</InputLabel>
                            <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                              Enter your dynamic password
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={7}>
                          <TextField
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                                  <LockOutlined style={{ fontSize: '1.15rem', color: 'inherit' }} />
                                </InputAdornment>
                              )
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {payment === 'card' && (
                <Grid item xs={12}>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button variant="outlined" color="secondary">
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary">
                      Save
                    </Button>
                  </Stack>
                </Grid>
              )}

              {payment === 'paypal' && (
                <Grid item xs={12}>
                  <PayPalScriptProvider options={{ "clientId": "Achq-oXU9dHDIxdPA6cG9IulSSVUHz6xTRGndeS1O7puGXC4s4rY-uxeuGUpnyU86JG8fl3MbZghKg_r", currency: "USD" }}>
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={(data, actions) => {
                        if (!actions.order) {
                          throw new Error("actions.order is undefined");
                        }
                        return actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [
                            {
                              amount: {
                                currency_code: "USD",
                                value: checkout.total.toFixed(2), 
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        if (!actions.order) {
                          throw new Error("actions.order is undefined");
                        }
                        return actions.order.capture().then((details) => {
                          const orderId = data.orderID;
                          console.log("Payment successful for order ID:", orderId);
                          handleApprove(orderId);
                        });
                      }}
                      onError={(err) => {
                        console.error("PayPal Checkout error", err);
                        openSnackbar({
                          open: true,
                          message: 'Hubo un error con PayPal. Por favor, intenta de nuevo.',
                          variant: 'alert',
                          alert: {
                            color: 'error'
                          }
                        } as SnackbarProps);
                      }}
                    />
                  </PayPalScriptProvider>
                </Grid>
              )}

              <Grid item xs={12}>
                <Stack direction="row" spacing={0} alignItems="center">
                  <Grid item xs={6}>
                    <Divider />
                  </Grid>
                  {/* <Typography sx={{ px: 1 }}>OR</Typography>
                  <Grid item xs={6}>
                    <Divider />
                  </Grid> */}
                </Stack>
              </Grid>

              {/* <Grid item xs={12} sm={12} lg={10}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} lg={5}>
                    <PaymentCard type="mastercard" paymentType={payment} cardHandler={cardHandler} />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={5}>
                    <PaymentCard type="visa" paymentType={payment} cardHandler={cardHandler} />
                  </Grid>
                </Grid>
              </Grid> */}
            </Grid>
          </MainCard>
          <Button variant="text" color="secondary" startIcon={<LeftOutlined />} onClick={onBack}>
            <Typography variant="h6" color="text.primary">
            Volver a la información de envío
            </Typography>
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Stack>
          {/* <MainCard sx={{ mb: 3 }}>
            <CartDiscount />
          </MainCard> */}
          <MainCard title="Resumen de la orden" sx={{ borderRadius: '4px 4px 0 0', borderBottom: 'none' }} content={false}>
            {rows.map((row, index) => (
              <List
                key={index}
                component="nav"
                sx={{
                  '& .MuiListItemButton-root': {
                    '& .MuiListItemSecondaryAction-root': {
                      alignSelf: 'flex-start',
                      ml: 1,
                      position: 'relative',
                      right: 'auto',
                      top: 'auto',
                      transform: 'none'
                    },
                    '& .MuiListItemAvatar-root': { mr: '7px' },
                    py: 0.5,
                    pl: '15px',
                    pr: '8px'
                  },
                  p: 0
                }}
              >
                <ListItemButton divider>
                  <ListItemAvatar>
                    <Avatar
                      alt="Avatar"
                      size="lg"
                      variant="rounded"
                      color="secondary"
                      type="combined"
                      src={row.image ? getImageUrl(`thumbs/${row.image}`, ImagePath.ECOMMERCE) : ''}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        component={Link}
                        to={`/apps/e-commerce/product-details/${row.id}`}
                        target="_blank"
                        variant="subtitle1"
                        color="text.primary"
                        sx={{ textDecoration: 'none' }}
                      >
                        {row.name}
                      </Typography>
                    }
                    secondary={
                      <Stack spacing={1}>
                        <Typography color="text.secondary">{row.description}</Typography>
                        <Stack direction="row" alignItems="center" spacing={3}>
                          <Typography>${row.offerPrice}</Typography>
                          <Typography color="text.secondary">{row.quantity} items</Typography>
                        </Stack>
                      </Stack>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      size="medium"
                      color="secondary"
                      sx={{ opacity: 0.5, '&:hover': { bgcolor: 'transparent' } }}
                      onClick={() => removeProduct(row.itemId)}
                    >
                      <DeleteOutlined style={{ color: theme.palette.grey[500] }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItemButton>
              </List>
            ))}
          </MainCard>
          <OrderSummary checkout={checkout} show={false} />
          <Button variant="contained" sx={{ textTransform: 'none', mt: 3 }} onClick={completeHandler} fullWidth>
            Proceder al pago
          </Button>
          <OrderComplete open={complete} />
        </Stack>
      </Grid>
      <AddAddress open={open} handleClose={handleClose} address={select!} editAddress={editAddress} />
    </Grid>
  );
}
