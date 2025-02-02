import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import Avatar from '@components/@extended/Avatar';
import IconButton from '@components/@extended/IconButton';
import SimpleBar from '@components/third-party/SimpleBar';

import { getRelatedProducts } from 'src/api/bookstore/products';
import { openSnackbar } from 'src/api/snackbar';
import { getImageUrl, ImagePath } from 'src/utils/getImageUrl';

// assets
import HeartFilled from '@ant-design/icons/HeartFilled';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import StarFilled from '@ant-design/icons/StarFilled';
import StarOutlined from '@ant-design/icons/StarOutlined';

// types
import { SnackbarProps } from 'src/types/snackbar';
import { Products } from 'src/types/e-commerce';
import { useSimpleSnackbar } from '@components/SimpleSnackbarProvider';

function ListProduct({ product }: { product: Products }) {
  const [wishlisted, setWishlisted] = useState<boolean>(false);
  const { showInfo } = useSimpleSnackbar();
  const addToFavourite = () => {
    setWishlisted(!wishlisted);
    showInfo(!wishlisted ? 'Añadido a favoritos' : 'Removido de favoritos');
  };
  const base64Image = typeof product.cover === "string" ? product.cover : "";
  const imageSrc = base64Image.startsWith("data:image")
    ? base64Image
    : `data:image/png;base64,${base64Image}`; // Asegurarse del formato de la imagen

  return (
    <ListItemButton divider component={Link} to={`/product/${product.id}`}>
      <ListItemAvatar>
        <Avatar
          alt="Avatar"
          size="xl"
          color="secondary"
          variant="rounded"
          type="combined"
          src={imageSrc}
          sx={{ borderColor: 'divider', mr: 1 }}
        />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={<Typography variant="h5">{product.title}</Typography>}
        secondary={
          <Stack spacing={1}>
            <Typography color="text.secondary">{product.description}</Typography>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="h5">{product.salePrice ? `$${product.salePrice}` : `$${product.offerPrice}`}</Typography>
                {product.salePrice && (
                  <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    ${product.offerPrice}
                  </Typography>
                )}
              </Stack>
              <Rating
                name="simple-controlled"
                value={product.rating! < 4 ? product.rating! + 1 : product.rating}
                icon={<StarFilled style={{ fontSize: 'small' }} />}
                emptyIcon={<StarOutlined style={{ fontSize: 'small' }} />}
                readOnly
                precision={0.1}
              />
            </Stack>
          </Stack>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          size="medium"
          color={wishlisted ? 'error' : 'secondary'}
          sx={{ opacity: wishlisted ? 1 : 0.5, '&:hover': { bgcolor: 'transparent' } }}
          onClick={addToFavourite}
        >
          {wishlisted ? <HeartFilled style={{ fontSize: '1.15rem' }} /> : <HeartOutlined style={{ fontSize: '1.15rem' }} />}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemButton>
  );
}

// ==============================|| PRODUCT DETAILS - RELATED PRODUCTS ||============================== //

export default function RelatedProducts({ id }: { id?: string }) {
  const [related, setRelated] = useState<Products[]>([]);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      await getRelatedProducts(id).then((response) => {
        setRelated(response);
        setLoader(false);
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  let productResult: ReactElement | ReactElement[] = (
    <List>
      {[1, 2, 3].map((index: number) => (
        <ListItem key={index}>
          <ListItemAvatar sx={{ minWidth: 72 }}>
            <Skeleton variant="rectangular" width={62} height={62} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton animation="wave" height={22} />}
            secondary={
              <>
                <Skeleton animation="wave" height={14} width="60%" />
                <Skeleton animation="wave" height={18} width="20%" />
                <Skeleton animation="wave" height={14} width="35%" />
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );

  if (related && !loader) {
    productResult = (
      <List
        component="nav"
        sx={{
          '& .MuiListItemButton-root': {
            '& .MuiListItemSecondaryAction-root': {
              alignSelf: 'flex-start',
              ml: 1,
              position: 'relative',
              right: 'auto',
              top: 'auto',
              transform: 'none'
            },
            '& .MuiListItemAvatar-root': { mr: '7px' },
            py: 0.5,
            pl: '15px',
            pr: '8px'
          },
          p: 0
        }}
      >
        {related.map((product: Products, index) => (
          <ListProduct key={index} product={product} />
        ))}
      </List>
    );
  }

  return (
    <SimpleBar sx={{ height: { xs: '100%', md: 'calc(100% - 62px)' } }}>
      <Grid item>
        <Stack>
          {productResult}
          <Button component={Link}  to="/home" color="secondary" variant="outlined" sx={{ mx: 2, my: 4, textTransform: 'none' }}>
            Ver todos los Productos
          </Button>
        </Stack>
      </Grid>
    </SimpleBar>
  );
}
