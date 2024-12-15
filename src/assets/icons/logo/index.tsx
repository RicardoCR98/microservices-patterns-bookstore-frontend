import { To } from 'history';

// material-ui
import { SxProps } from '@mui/material/styles';

// project import
import LogoMain from './LogoMain';
import LogoIcon from './LogoIcon';
import { ButtonBase } from '@mui/material';
import { APP_DEFAULT_PATH } from 'src/config';
import { Link } from 'react-router-dom';
//import useAuth from 'hooks/useAuth';

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  reverse?: boolean;
  isIcon?: boolean;
  sx?: SxProps;
  to?: To;
}

export const Logo = ({ reverse, isIcon, sx, to }: Props) => {
  //const { isLoggedIn } = useAuth();
  const isLoggedIn: any = true;

  return (
    <ButtonBase disableRipple {...(isLoggedIn && { component: Link, to: !to ? APP_DEFAULT_PATH : to, sx })}>
      {isIcon ? <LogoIcon /> : <LogoMain reverse={reverse} />}
    </ButtonBase>
  );
};
