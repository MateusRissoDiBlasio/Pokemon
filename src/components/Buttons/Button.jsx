import { useContext, useState } from 'react';
import { ThemeContext } from '../../Context/theme';
import styled from 'styled-components';


export function Button(props) {

  const [hover, setHover] = useState(-1);
  const { theme } = useContext(ThemeContext);

  return (
   <BtnGeneral  
   {...props}
   style={{color: hover === -1 ? theme.color : theme.revcolor , backgroundColor: hover === -1 ? theme.btnBackground : theme.revBtnBackground, border: theme.btnBorder}}
  
   onMouseEnter={() => setHover(0)}
   onMouseLeave={() => setHover(-1)}

   /> 
  )
}

const BtnGeneral  = styled.button`
  
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 1rem; 
  margin: 10px;
  min-width: 120.5px;
  
  &:focus {
    outline: none
  }
`