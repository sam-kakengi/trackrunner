import { createTheme } from '@mui/material/styles'

const drawerTheme = createTheme({
    components: {
      MuiListItem: {
        styleOverrides: {
          root: {
            '&:active': {
              backgroundColor: '#FFC107',                 
              borderRadius: '2rem',                       
              color: 'black',                              
              '& .MuiListItemIcon-root': {                
                color: 'black',
              },
            },
            '&:hover': { 
              backgroundColor: '#FFC107',                 
              borderRadius: '2rem',                       
              color: 'black',
              cursor: 'pointer',                              
              '& .MuiListItemIcon-root': {                
                color: 'black',
              },
            },
            color: 'white',
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: 'white',  
          },
        },
      },
    },
  })

export default drawerTheme