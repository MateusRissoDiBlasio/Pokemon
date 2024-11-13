import {FaArrowCircleUp} from 'react-icons/fa'; 
import styled from 'styled-components';  
import  { useContext, useState } from 'react';
import { ThemeContext } from '../../Context/theme';


export const ScrollButton = () =>{ 
  const { theme } = useContext(ThemeContext)
  const [visible, setVisible] = useState(false) 
  
  const toggleVisible = () => { 
    const scrolled = document.documentElement.scrollTop; 
    if (scrolled > 1000){ 
      setVisible(true) 
    }  
    else if (scrolled <= 1000){ 
      setVisible(false) 
    } 
  }; 
  
  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    }); 
  }; 
  
  window.addEventListener('scroll', toggleVisible); 

  const [hover, setHover] = useState(-1);
  
  return ( 
    <ScrollButtonDiv style={{display: visible ? 'flex' : 'none', color: hover === -1 ? theme.scroll : theme.color, backgroundColor: hover === -1 ? theme.color : theme.scroll , border: hover === -1 ? theme.btnBorder : theme.revBtnBorder }}
                    onMouseEnter={() => setHover(0)}
                    onMouseLeave={() => setHover(-1)}
    > 
        <FaArrowCircleUp onClick={scrollToTop}  
     style={{display: visible ? 'flex' : 'none'}} /> 
    </ScrollButtonDiv> 
  ); 
} 
  

const ScrollButtonDiv = styled.div`
  
  display: flex;
  font-size: 50px;
  border-radius: 50%;
  cursor: pointer;
`