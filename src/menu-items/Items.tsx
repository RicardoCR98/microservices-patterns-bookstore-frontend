// third-party
import { FormattedMessage } from 'react-intl';

// assets
import UserOutlined from '@ant-design/icons/UserOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';

// type
import { NavItemType } from 'src/types/menu';

// icons
const icons = {
  UserOutlined,
  BookOutlined 
};

const Items : NavItemType = {
  id: 'other',
  type: 'group',
  children: [
    {
      id: 'Admin',
      title: <FormattedMessage id="Administración" />,
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          id: 'Admin-1.1',
          title: <FormattedMessage id="Usuarios" />,
          type: 'item',
          url: '/a/dashboard/usuarios'
        },
      ]
    },
    {    
      id: 'Libros',
      title: <FormattedMessage id="Tienda" />,
      type: 'collapse',
      icon: icons.BookOutlined,
      children: [
        {
          id: 'Libros-1.1',
          title: <FormattedMessage id="Libros" />,
          type: 'collapse',
          children: [
            {
              id: 'Libros-1.2.1',
              title: <FormattedMessage id="Ordenes" />,
              type: 'item',
              url: '#'
            },
            {
              id: 'Libros-1.2.2',
              title: <FormattedMessage id="Pagos" />,
              type: 'item',
              url: '#'
            }
          ]
        },
        {
          id: 'Libros-1.2',
          title: <FormattedMessage id="Emails" />,
          type: 'item',
          url: '#'
        }
      ]
    }

  ]
};

export default Items;
