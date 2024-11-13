import React from 'react'
import { ThemeContext, themes } from '../../Context/theme.jsx'
import { Button } from '../Buttons/Button.jsx'


export function ThemeToggleButton() {

  const { theme, toggle }  = React.useContext(ThemeContext)

return (
  <div>
    <Button onClick = {toggle} style={(theme === themes.light ? themes.dark : themes.light)}>Switch to {theme === themes.light ? "Dark Mode" : "Light Mode" } </Button>
  </div>
  )
}
