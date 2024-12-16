// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Products } from 'src/types/e-commerce';

// ==============================|| PRODUCT DETAILS - SPECIFICATIONS ||============================== //

// Función para formatear el texto
const formatText = (text: string): string => {
  const formatted = text.replace(/_/g, ' ').toLowerCase(); 
  return formatted.charAt(0).toUpperCase() + formatted.slice(1); 
};

export default function ProductSpecifications({product}: {product: Products}) {
  return (
    <Grid container spacing={2.5}>

      <Grid item xs={12} md={6}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Typography variant="h5">Ficha Técnica</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography color="text.secondary">ISBN:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{product.isbn}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">Fecha de Publicación:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{product.publicationDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">Categoría:</Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography>{formatText(product.category ?? '')}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">Género:</Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography>{formatText(product.genre ?? '')}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Typography variant="h5">Información Editorial</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">Editorial:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{product.publisher}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">Disponible:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{product.stockQuantity}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">Precio de Venta:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{product.salePrice}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">Oferta:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{product.offer}%</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
