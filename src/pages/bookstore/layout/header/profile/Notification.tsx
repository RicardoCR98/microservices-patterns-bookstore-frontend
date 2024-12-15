import { BellOutlined } from "@ant-design/icons";
import IconButton from "@components/@extended/IconButton";
import { Badge, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRef, useState } from "react";
import { ThemeMode } from "src/config";

export const Notification = () => {
  const theme = useTheme();
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [read, setRead] = useState(0);

  const handleToggle = () => {
    if (read > 0) setOpen((prevOpen: boolean) => !prevOpen);
  };

  const iconBackColorOpen =
    theme.palette.mode === ThemeMode.DARK ? "background.default" : "grey.100";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={{
          color: "text.primary",
          bgcolor: open ? iconBackColorOpen : "transparent",
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={read} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
    </Box>
  );
};
