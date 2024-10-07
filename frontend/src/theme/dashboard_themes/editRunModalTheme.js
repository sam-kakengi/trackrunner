import { createTheme } from '@mui/material/styles'

const modalTheme = createTheme({
    palette: {
      primary: {
        main: '#FFD54F', 
      },
      secondary: {
        main: '#546E7A',
      },
      tertiary: {
        main: '#37474F'
      },
      quaternary: {
        main: '#FFFFFF'
      }
      
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& fieldset': {
              borderColor: '#37474F',  
            },
            '&:hover fieldset': {
              borderColor: '#37474F',  
            },
            '&.Mui-focused fieldset': {
              borderColor: '#37474F', 
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#37474F', 
          },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#FFD54F', 
            '&.Mui-focused': {
              color: '#FFC107', 
            },
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          input: {
            color: '#FFFDE7',
          },
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: 'black',
            '&.Mui-selected': {
              backgroundColor: '#FFD54F',
              color: 'black', 
            },
          },
        },
      },

      MuiList: {
        styleOverrides: {
          root: {
            paddingTop: 0,
            paddingBottom: 0, 
          },
        },
      },

      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: '#37474F', 
          },
        },
      },

      

    },
  });

export default modalTheme