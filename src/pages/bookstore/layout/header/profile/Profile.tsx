import { useRef, useState } from "react";
import{ Link } from "react-router-dom";
// material-ui
import {
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";

import { ThemeMode } from "src/config";
import Avatar from "@components/@extended/Avatar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons'; 
// assets
import avatar1 from "@assets/images/users/avatar-1.png";
import Transitions from "@components/@extended/Transitions";
import { MainCard } from "@components/molecules";
import { LogoutOutlined, UserOutlined  } from "@ant-design/icons";
import { useAuth } from "@hooks/auth/useAuth";

export const Profile = () => {
  const theme = useTheme();
  const {logoutAdmin} = useAuth();

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);

  const data = localStorage.getItem("reduxState");

  //const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  const handleToggle = () => {
    console.log(open);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = ()=>{
    logoutAdmin();
  }

  const iconBackColorOpen =
    theme.palette.mode === ThemeMode.DARK ? "background.default" : "grey.100";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": {
            bgcolor:
              theme.palette.mode === ThemeMode.DARK
                ? "secondary.light"
                : "secondary.lighter",
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2,
          },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          sx={{ p: 0.5 }}
        >
          <Avatar alt="profile user" src={avatar1} size="sm" />
          <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
            {data && JSON.parse(data).auth.user.name}
          </Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            type="grow"
            position="top-right"
            in={open}
            {...TransitionProps}
          >
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: 277,
                minWidth: 227,
                maxWidth: { xs: 237, md: 277 },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 2, pb:2 }}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack>
                        <Typography variant="h6">{data && JSON.parse(data).auth.user.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                        {data && JSON.parse(data).auth.user.email}
                        </Typography>
                      </Stack>
                    </Grid>
                  </CardContent>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box>
                  <List
                    component="nav"
                    sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32 } }}
                  >
                    <ListItemButton component={Link} to="/my-books">
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faBook} />
                      </ListItemIcon>
                      <ListItemText primary="Mis libros" />
                    </ListItemButton>
                    {/* <ListItemButton>
                      <ListItemIcon>
                        <UserOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Configuración del perfil" />
                    </ListItemButton>  */}
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Cerrar sesión" />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};
