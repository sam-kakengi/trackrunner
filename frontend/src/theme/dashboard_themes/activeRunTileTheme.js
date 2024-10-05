import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import { blueGrey, yellow } from "@mui/material/colors"

let activeRunTileTheme = createTheme({
    typography:{
        h6: {
            color: blueGrey[700]
        },
        h5:{
            color: blueGrey[200]
        },
        h4:{
            color: blueGrey[900]
        },
        h3:{
            color: blueGrey[50]
        },
        h2:{
            color: blueGrey[800]
        },
        body1:{
            color: blueGrey[900],
            fontWeight: '500',
        },
        h7: {
            color: blueGrey[700]
        },
        h8: {
            color: blueGrey[800]
        }
        
    },
    palette: {
        primary: {
            main: yellow[600], 
        },
        secondary: {
            main: '#546E7A',
        },
        tertiary: {
            main: '#37474F'
        }
    }
})
activeRunTileTheme = responsiveFontSizes(activeRunTileTheme)
export default activeRunTileTheme