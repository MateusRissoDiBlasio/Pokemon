import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../../Context/theme';
import { useContext } from 'react';

// eslint-disable-next-line react/prop-types
export function DelayedLink({ to, children, delay = 500 }) {
  const navigate = useNavigate();
  
  const { theme } = useContext(ThemeContext)
  const handleClick = (event) => {
    event.preventDefault();
    setTimeout(() => {
      navigate(to);
    }, delay);
  };

  return (
    <Link style={{color: theme.color}} to={to} onClick={handleClick}>
      {children}
    </Link>
  );
}

// eslint-disable-next-line react/prop-types
export function DelayedLinkMega({ to, children, delay = 2200 }) {
  const navigate = useNavigate();
  
  const { theme } = useContext(ThemeContext)
  const handleClick = (event) => {
    event.preventDefault();
    setTimeout(() => {
      navigate(to);
    }, delay);
  };

  return (
    <Link style={{color: theme.color}} to={to} onClick={handleClick}>
      {children}
    </Link>
  );
}