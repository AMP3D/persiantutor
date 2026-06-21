import { NavLink } from 'react-router-dom';
import Icon from '../Icon/Icon.tsx';
import { navItems } from './subNav';
import './subNav.scss';

const SubNav = () => (
  <nav className="sub-nav" aria-label="Learning tools">
    {navItems.map((item) => (
      <NavLink
        className={({ isActive }) =>
          isActive ? 'sub-nav__link sub-nav__link--active' : 'sub-nav__link'
        }
        key={item.path}
        to={item.path}
      >
        <Icon name={item.icon} />
        <span>{item.label}</span>
      </NavLink>
    ))}
  </nav>
);

export default SubNav;
