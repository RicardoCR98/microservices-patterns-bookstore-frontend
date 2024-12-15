import Box from "@mui/material/Box";

import { SxProps } from "@mui/system";
import MyTicketIcon from "./myTicketIcon";

interface CustomerServiceIconProps {
    sx?: SxProps; // Permite que el componente reciba la prop `sx`
  }

  export const TicketIcon: React.FC<CustomerServiceIconProps> = ({ sx }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <MyTicketIcon sx={sx}/>
    </Box>
  );
};