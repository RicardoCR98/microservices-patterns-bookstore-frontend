// index.ts
import Items from './Items';
// types
import { NavItemType } from 'src/types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  // Aquí solo tenemos el “menu-level” (Items).
  items: [Items]
};

export default menuItems;
