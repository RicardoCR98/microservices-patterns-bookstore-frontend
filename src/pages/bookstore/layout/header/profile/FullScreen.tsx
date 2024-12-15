import IconButton from "@components/@extended/IconButton";
import { useTheme } from "@mui/material/styles";
import { Box, Tooltip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ThemeMode } from "src/config";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";

export const FullScreen = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    if (document && !document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setOpen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const iconBackColorOpen =
    theme.palette.mode === ThemeMode.DARK ? "background.default" : "grey.100";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Tooltip title={open ? "Exit Fullscreen" : "Fullscreen"}>
        <IconButton
          color="secondary"
          variant="light"
          sx={{
            color: "text.primary",
            bgcolor: open ? iconBackColorOpen : "transparent",
          }}
          aria-label="fullscreen toggler"
          onClick={handleToggle}
        >
          {open ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};
