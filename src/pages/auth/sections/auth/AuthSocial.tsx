// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// project import
// import useAuth from 'hooks/useAuth';

// assets
import Google from '@assets/icons/auth/google.svg';
import Facebook from '@assets/icons/auth/facebook.svg';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //
export const AuthSocial = () => {
    const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    //@ts-ignore
    // const { firebaseFacebookSignIn, firebaseGoogleSignIn, firebaseTwitterSignIn } = useAuth();
  const googleHandler = async () => {
    try {
    //   await GoogleSignIn();
    } catch (err) {
      console.error(err);
    }
  };

  const facebookHandler = async () => {
    try {
    //   await FacebookSignIn();
    } catch (err) {
      console.error(err);
    }
  };

  
  return (
    <Stack
      direction="row"
      spacing={{ xs: 1 }}
      justifyContent={{ xs: 'space-around' }}
      sx={{ '& .MuiButton-startIcon': { mr: 0 } }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!downSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={googleHandler}
      ></Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!downSM}
        startIcon={<img src={Facebook} alt="Facebook" />}
        onClick={facebookHandler}
      ></Button>
    </Stack>
  );
};
