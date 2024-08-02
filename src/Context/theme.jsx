import React from "react";

export const themes = {
    light: {
        color: "#000000",
        revcolor: "#F5F5F5",
        background: "#F5F5F5",
        btnBackground:"#F5F5F5",
        revBtnBackground:"#000000",
        btnBorder:'2px solid #000000',
        revBtnBorder:'2px solid #F5F5F5',
        btnBorderHover:'2px solid #FF0000',
        cardBackground: '#708090',
        cardBorder: '4px solid #000000',
        cardBorderHover: '4px solid #FF0000',
        detailsHeaderColor: "lightgrey",
        detail: "#F5F5F5",
        hover: '#FF0000',
        scroll:"#F5F5F5",
        typesBorder: '5px solid #000000',
        shaddow: '0 0 0.6rem #ff0000'
    },

    dark: {
        color: "#FFFFFF",
        revcolor: "#000000",
        background: "#000000",
        btnBackground: "#000000",
        revBtnBackground:"#FFFFFF",
        btnBorder:'2px solid #FFFFFF',
        btnBorderHover:'2px solid #FF0000',
        revBtnBorder:'2px solid #000000',
        cardBackground: '#000000',
        cardBorder: '4px solid #FFFFFF',
        cardBorderHover: '4px solid #FF0000',
        detailsHeaderColor: "grey",
        detail: "#FFFFFF",
        hover:"#FF0000",
        scroll:"#000000",
        typesBorder: '5px solid #FFFFFF',
        shaddow: '0 0 0.6rem #ff0000'
    }
}

const initialState = {

    dark: false,
    theme: themes.light,
    toggle: () => {}

}

export const ThemeContext = React.createContext(initialState)

export function ThemeProvider({ children }) {
    const [dark, setDark] = React.useState(false)
  
    React.useEffect(() => {
      const isDark = localStorage.getItem('dark') === 'true'
      setDark(isDark)
    }, [dark])
  
    const toggle = () => {
      const isDark = !dark
      localStorage.setItem('dark', JSON.stringify(isDark))
      setDark(isDark)
    }
  
    const theme = dark ? themes.dark : themes.light
  
    return (
      <ThemeContext.Provider value={{theme, dark, toggle}}>
        {children}
      </ThemeContext.Provider>
    )
  }