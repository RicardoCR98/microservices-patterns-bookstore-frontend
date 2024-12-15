// material-ui
import { styled } from "@mui/material/styles";
import AppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";


// ==============================|| HEADER - APP BAR STYLED ||============================== //

const AppBarStyled = styled(AppBar)<MuiAppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: '100%',
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export default AppBarStyled;
