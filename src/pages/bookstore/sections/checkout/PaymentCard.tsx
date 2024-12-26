// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from '@components/organisms/bookstore/MainCard';

// assets
import visa from 'src/assets/images/bookstore/visa.png';
import mastercard from 'src/assets/images/bookstore/mastercard.png';
import { PaymentMethod } from 'src/types/users';

// ==============================|| CHECKOUT PAYMENT - CARD METHOD ||============================== //

interface PaymentCardProps {
  pay: PaymentMethod;
  type?: string;
  paymentType?: string;
  cardHandler: (card: string) => void;
}

const cardOculter = (card: string) => {
  return card.replace(/\d(?=\d{4})/g, ' ');
}

export default function PaymentCard({ pay, type, paymentType, cardHandler }: PaymentCardProps) {
  const theme = useTheme();
  const card = type === 'visa' ? visa : mastercard;

  return (
    <MainCard
      content={false}
      sx={{
        overflow: 'hidden',
        opacity: paymentType === 'cod' ? 0.5 : 1,
        bgcolor: 'grey.A50',
        maxWidth: 380,
        '&:hover': {
          boxShadow: paymentType === 'cod' ? 'none' : theme.customShadows.primary,
          cursor: paymentType === 'cod' ? 'text' : 'pointer'
        }
      }}
    >
      <Stack
        spacing={8}
        sx={{
          p: 2
        }}
        onClick={() => type && cardHandler(type)}
      >
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Stack spacing={0}>
            <Typography variant="h5">{pay.cardHolderName}</Typography>
            <Stack direction="row" alignItems="flex-start" spacing={1}>
              <Typography variant="h2" color="inherit" sx={{ lineHeight: '0.5rem', fontFamily: 'auto' }}>
                .... .... ....
              </Typography>
              <Typography variant="h5" color="inherit">
                {cardOculter(pay.cardNumber)}
              </Typography>
            </Stack>
          </Stack>
          <Box
            sx={{
              backgroundImage: `url(${card})`,
              backgroundSize: 'contain',
              backgroundPosition: 'right',
              width: type === 'visa' ? 24 : 42,
              height: type === 'visa' ? 24 : 36.5
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack spacing={1} direction="row">
            <Typography variant="caption" color="inherit" sx={{ opacity: 0.3 }}>
              CVV
            </Typography>
            <Typography variant="body2" color="inherit">
              {pay.last4}
            </Typography>
          </Stack>
          <Stack spacing={1} direction="row">
            <Typography variant="caption" color="inherit" sx={{ opacity: 0.3 }}>
              Expire Date
            </Typography>
            <Typography variant="body2" color="inherit">
              {pay.expirationMonth}/{pay.expirationYear}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </MainCard>
  );
}
