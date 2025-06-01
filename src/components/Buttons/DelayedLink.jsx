import { useNavigate, Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export function DelayedLink({ to, children, delay = 2200 }) {
  const navigate = useNavigate();
  

  const handleClick = (event) => {
    event.preventDefault();
    setTimeout(() => {
      navigate(to);
    }, delay);
  };

  return (
    <Link to={to} onClick={handleClick}>
      {children}
    </Link>
  );
}