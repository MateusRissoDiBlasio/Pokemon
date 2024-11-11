import { useState } from 'react'
import { Button } from './Button.jsx'

export function LoadMoreButton({ onClick }) {

  return (
    <div>
      <Button onClick={onClick}>Click to load more Pokemons</Button>
    </div>
  )
}

export const LoadMoreTypes = ({ renderAmount, setRenderAmount, setOffset, offset, disabled, buttonText }) => {
  // const [disabled, setDisabled] = useState(false);
  // const [buttonText, setButtonText] = useState('Load More');

  // function handleClick () {

  //   setDisabled(true); setButtonText('Wait...'); setTimeout(() => {setDisabled(false); setButtonText('Load More') }, 1200);

  // }

  return (
        <div>
          <Button onClick={() => { setRenderAmount(renderAmount + 10); setOffset(offset + 100)}} disabled={disabled} >{buttonText}</Button>
        </div>
  )
}