// material-ui
import { Box } from "@mui/material";
import { HeaderStyled } from "./HeaderStyled";
import { Logo } from "@assets/icons";
import { Profile } from "./profile";

export const HeaderContent = () => {
  const open: boolean = true;
  return (
    <>
      <HeaderStyled>
        <Logo isIcon={!open} sx={{ width: open ? "auto" : 35, height: 35 }} />
      </HeaderStyled>
      <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}></Box>
      <Profile/>
    </>
  );
};
