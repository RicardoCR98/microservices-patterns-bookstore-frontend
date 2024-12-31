// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project imports
import MainCard from '@components/organisms/bookstore/MainCard';
import IconButton from '@components/@extended/IconButton';
import AnimateButton from '@components/@extended/AnimateButton';
import { PopupTransition } from '@components/@extended/Transitions';
// import { openSnackbar } from 'src/api/snackbar';

// types
// import { SnackbarProps } from 'src/types/snackbar';
import { Address } from 'src/types/e-commerce';

// assets
import CloseCircleTwoTone from '@ant-design/icons/CloseCircleTwoTone';
import { useSimpleSnackbar } from '@components/SimpleSnackbarProvider';

const validationSchema = yup.object({
  destination: yup.string().required('Color selection is required'),
  name: yup.string().required('Name is required'),
  building: yup.string().required('Building no/name is required'),
  // street: yup.string().required('Street Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  post: yup.string().required('Area code is required'),
  phone: yup.string().required('Contact no is required')
});

interface AddAddressProps {
  address: Address;
  open: boolean;
  handleClose: () => void;
  editAddress: (address: Address) => void;
}

// ==============================|| CHECKOUT - ADD NEW ADDRESS ||============================== //

export default function AddAddress({ address, open, handleClose, editAddress }: AddAddressProps) {
  const edit = address && address.id;
  const { showSuccess, showInfo } = useSimpleSnackbar(); 
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      line1: edit ? address.line1 : '',
      label: edit ? address.label: '',
      line2: edit ? address.line2 : '',
      // street: edit ? address.line1 : '',
      city: edit ? address.city : '',
      state: edit ? address.state : '',
      country: edit ? address.country : '',
      zipCode: edit ? address.zipCode : '',
      phoneNumber: edit ? address.phoneNumber : '',
      defaultAddress: edit ? address.defaultAddress : false
    },
    validationSchema,
    onSubmit: (values) => {
      editAddress({ ...values, id: address.id });
      handleClose();
      showSuccess('Dirección añadida con éxito');
    }
  });

  return (
    <Dialog
      open={open}
      TransitionComponent={PopupTransition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      sx={{
        '& .MuiDialog-paper': {
          p: 0
        }
      }}
    >
      <MainCard
        sx={{ overflowY: 'auto' }}
        title="Edit Billing Address"
        secondary={
          <IconButton onClick={handleClose} size="large">
            <CloseCircleTwoTone style={{ fontSize: 'small' }} />
          </IconButton>
        }
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="address-name">Name</InputLabel>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formik.values.label}
                  onChange={formik.handleChange}
                  error={formik.touched.label && Boolean(formik.errors.label)}
                  helperText={formik.touched.label && formik.errors.label}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="address-destination">Destination</InputLabel>
                <FormControl>
                  <RadioGroup
                    row
                    aria-label="destination"
                    value={formik.values.line1}
                    onChange={formik.handleChange}
                    name="destination"
                    id="destination"
                  >
                    <FormControlLabel
                      value="home"
                      control={<Radio sx={{ color: 'primary.main', '&.Mui-checked': { color: 'primary.main' } }} />}
                      label="Home"
                    />
                    <FormControlLabel
                      value="office"
                      control={<Radio sx={{ color: 'secondary.main', '&.Mui-checked': { color: 'secondary.main' } }} />}
                      label="Office"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
              {formik.errors.line1 && (
                <FormHelperText error id="standard-weight-helper-text-name-login">
                  {formik.errors.line1}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="address-building">Building No./Name</InputLabel>
                <TextField
                  fullWidth
                  id="building"
                  name="building"
                  placeholder="Building No./Name"
                  value={formik.values.line2}
                  onChange={formik.handleChange}
                  error={formik.touched.line2 && Boolean(formik.errors.line2)}
                  helperText={formik.touched.line2 && formik.errors.line2}
                />
              </Stack>
            </Grid>
            {/* <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="address-street">Street</InputLabel>
                <TextField
                  fullWidth
                  id="street"
                  name="street"
                  placeholder="Street"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  error={formik.touched.building && Boolean(formik.errors.street)}
                  helperText={formik.touched.street && formik.errors.street}
                />
              </Stack>
            </Grid> */}
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="address-city">City</InputLabel>
                <TextField
                  fullWidth
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.line2 && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="address-state">State</InputLabel>
                <TextField
                  fullWidth
                  id="state"
                  name="state"
                  placeholder="State"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.line2 && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="address-country">Country</InputLabel>
                <TextField
                  fullWidth
                  id="country"
                  name="country"
                  placeholder="Country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={formik.touched.line2 && Boolean(formik.errors.country)}
                  helperText={formik.touched.country && formik.errors.country}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="address-area-code">Area Code</InputLabel>
                <TextField
                  fullWidth
                  id="post"
                  name="post"
                  placeholder="Area Code"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  error={formik.touched.line2 && Boolean(formik.errors.zipCode)}
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="address-contact">Contact</InputLabel>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  placeholder="Contact"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.line2 && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    id="isDefault"
                    name="isDefault"
                    checked={formik.values.defaultAddress}
                    onChange={formik.handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label="Default"
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <AnimateButton>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </MainCard>
    </Dialog>
  );
}
