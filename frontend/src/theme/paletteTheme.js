import { createTheme } from '@mui/material/styles'

const paletteTheme = createTheme({
  palette: {
    primary: {
      main: '#FFD54F',
    },
    secondary: {
      main: '#546E7A', 
    },
    background: {
      default: '#263238',  
    },
    text: {
      primary: '#FFFFFF',  
      secondary: '#000000', 
    },
    action: {
      hover: '#FFC107',  
    },
    secondButton: {
        main: '#EEEEEE',
    }
  },
})

export default paletteTheme