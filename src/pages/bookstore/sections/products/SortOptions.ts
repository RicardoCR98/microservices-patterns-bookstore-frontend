// types
import { SortOptionsProps } from 'src/types/e-commerce';

// ==============================|| PRODUCT GRID - SORT FILTER ||============================== //

const SortOptions: SortOptionsProps[] = [
  {
    value: 'alto',
    label: 'Precio: Alto a Bajo'
  },
  {
    value: 'bajo',
    label: 'Precio: Bajo a Alto'
  },
  {
    value: 'rating',
    label: 'Popularidad'
  },
  {
    value: 'descuento',
    label: 'Descuento'
  },
  {
    value: 'nuevo',
    label: 'Recién llegado'
  }
];

export default SortOptions;
