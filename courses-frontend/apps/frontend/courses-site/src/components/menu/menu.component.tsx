import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import LayersIcon from '@mui/icons-material/Layers';
import AddIcon from '@mui/icons-material/Add';
import './menu.component.styles.scss';

const hideText = false;

const menuItems = [
  {
    id: 1,
    to: '/courses',
    text: 'Courses',
    icon: <LayersIcon />,
    hideText,
    isBottom: false
  },
  {
    id: 2,
    to: '/courses/add',
    text: 'Add',
    icon: <AddIcon />,
    hideText,
    isBottom: false
  }
];

export const MenuItemsComponent = () => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleClick = (value: string) => {
    setActiveMenuItem(value);
  };

  return (
    <div className="menu-item-sup-container">
      <List>
        {menuItems.map((item) => {
          return (
            <div key={item.id} className="menu-item-container">
              <ListItemButton
                onClick={() => handleClick(item.to)}
                component={Link}
                to={item.to}
              >
                <div className="menu-items">
                  <div className="menu-items-icon">{item.icon}</div>
                  <div className="menu-items-text">
                    {hideText ? '' : item.text}
                  </div>
                </div>
              </ListItemButton>
              {activeMenuItem === item.to ? (
                <div className="menu-items-active"></div>
              ) : (
                <div></div>
              )}
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default MenuItemsComponent;
