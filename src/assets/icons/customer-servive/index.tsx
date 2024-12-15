import Box from "@mui/material/Box";
import CustomerIcon from "./customerIcon";
import { SxProps } from "@mui/system";

interface CustomerServiceIconProps {
    sx?: SxProps; // Permite que el componente reciba la prop `sx`
  }

  export const CustomerServiceIcon: React.FC<CustomerServiceIconProps> = ({ sx }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CustomerIcon sx={sx}/>
    </Box>
  );
};
