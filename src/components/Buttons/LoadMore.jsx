import { Button } from './Button.jsx'

export function LoadMoreButton({ onClick }) {

  return (
    <div>
      <Button onClick={onClick}>Click to load more Pokemons</Button>
    </div>
  )
}

export const LoadMoreTypes = ({ renderAmount, setRenderAmount, setOffset, offset, disabled, buttonText }) => {
  
  return (
        <div>
          <Button onClick={() => { setRenderAmount(renderAmount + 10); setOffset(offset + 100)}} disabled={disabled} >{buttonText}</Button>
        </div>
  )
}