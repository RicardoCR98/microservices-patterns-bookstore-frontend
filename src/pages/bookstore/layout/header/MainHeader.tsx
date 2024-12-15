import { ReactNode, useMemo } from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppBar, AppBarProps, Tab, Tabs, Toolbar } from "@mui/material";
import { HeaderContent } from "./HeaderContent";
import AppBarStyled from "./AppBarStyled";
import { MenuOrientation } from "src/config";
import { useConfig } from "@hooks/useConfig";
// import { TabPageContent } from "./TabPageContent";

export const MainHeader = () => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));
  const { menuOrientation } = useConfig();

  const headerContent = useMemo(() => <HeaderContent />, []);
//   const tabPageContent = useMemo(() => <TabPageContent />, []);

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const mainHeader: ReactNode = <Toolbar>{headerContent}</Toolbar>;
//   const mainTabPage: ReactNode = <Toolbar>{tabPageContent}</Toolbar>;

  const appBar: AppBarProps = {
    position: "fixed",
    color: "inherit",
    elevation: 0,
    sx: {
      borderBottom: "1px solid",
      borderBottomColor: "divider",
      zIndex: 1200,
      width: isHorizontal
        ? "100%"
        : {
            xs: "100%",
            lg: "100%",
          },
    },
  };

  // const tapBar: AppBarProps = {
  //   position: "fixed",
  //   color: "inherit",
  //   elevation: 0,
  //   sx: {
  //     top: 61,
  //     height: 48,
  //     borderBottom: "1px solid",
  //     borderBottomColor: "divider",
  //     zIndex: 1199,
  //     justifyContent: "center",
  //     width: "100%",
  //   },
  // };

  return (
    <>
      <AppBarStyled {...appBar}>{mainHeader}</AppBarStyled>
      {/* <AppBarStyled {...tapBar}>{mainTabPage}</AppBarStyled> */}
    </>
  );
};
