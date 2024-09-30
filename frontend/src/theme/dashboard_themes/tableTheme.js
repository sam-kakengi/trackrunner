import { createTheme, responsiveFontSizes } from "@mui/material/styles"

let tableTheme = createTheme({

    palette: {
        background: {
            main: '#546E7A',
        },
    },
    components: {
        MuiTableCell: {
          styleOverrides: {
            root: {
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.7)',
                padding: '12px 16px',
                fontSize: '1rem', 
              },
            head: {
                fontWeight: 'bold',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1rem', 
              },
          },
        },
        MuiTableRow: {
          styleOverrides: {
            root: {
              '&:last-child td': {
                borderBottom: 0,
              },
            },
          },
        },
      },
  })

tableTheme = responsiveFontSizes(tableTheme)
export default tableTheme