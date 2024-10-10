import { createTheme } from '@mui/material/styles'
import paletteTheme from '../paletteTheme'
import { red } from '@mui/material/colors'

const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: '100%',
          height: '4.3125rem',
          fontSize: '1.5rem',

          
          backgroundColor: paletteTheme.palette.primary.main,
          color: paletteTheme.palette.text.primary,

          '&:hover': {
            backgroundColor: paletteTheme.palette.action.hover,
          },

          
          '@media (max-width:600px)': {
            width: '100%',
            fontSize: '1rem',
          },
          '@media (min-width:600px)': {
            width: '20.3125rem',
            fontSize: '1.25rem',
          },
          '@media (min-width:960px)': {
            width: '100%',
            fontSize: '1.5rem',
          },
        },
        
        containedPrimary: {
          backgroundColor: paletteTheme.palette.primary.main,
          color: paletteTheme.palette.text.secondary,
          '&:hover': {
            backgroundColor: paletteTheme.palette.secondary.main,
          },
        },
        
        containedSecondary: {
          backgroundColor: paletteTheme.palette.secondButton.main,
          color: paletteTheme.palette.text.secondary,
          '&:hover': {
            backgroundColor: paletteTheme.palette.action.hover,
          },
        },
        
        outlined: {
          backgroundColor: 'transparent',
          border: `0.1rem solid ${paletteTheme.palette.primary.main}`,
          color: paletteTheme.palette.primary.main,
          '&:hover': {
            backgroundColor: paletteTheme.palette.action.hover,
            color: paletteTheme.palette.text.secondary,
          },
        },
      },
    },
  },
  palette: {
    primary: {
        main: red[400], 
    },
    secondary: {
        main: '#546E7A',
    },
    tertiary: {
        main: '#37474F'
    }
  }
})

export default buttonTheme