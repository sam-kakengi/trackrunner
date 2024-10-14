import { createTheme } from '@mui/material/styles'
import paletteTheme from '../paletteTheme'
import { grey } from '@mui/material/colors'

const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: '100%',
          height: '4.3125rem',
          fontSize: '1.5rem',


          
          // '@media (max-width:600px)': {
          //   width: '100%',
          //   fontSize: '1rem',
          // },
          '@media (min-width:600px)': {
            width: '20.3125rem',
            fontSize: '1.25rem',
          },
          '@media (min-width:960px)': {
            width: '100%',
            fontSize: '1.5rem',
          },
          '&:hover': {
            backgroundColor: grey[700], 
            color: '#EEEEEE', 
          },
        },
        
      },
    },
  },
})

export default buttonTheme