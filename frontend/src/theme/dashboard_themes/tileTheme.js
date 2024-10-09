import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import { blueGrey } from "@mui/material/colors"

let tileTheme = createTheme({
    typography:{
        h6: {
            color: blueGrey[900],
        },
        h5:{
            color: blueGrey[200]
        },
        h4:{
            color: blueGrey[200]
        },
        h3:{
            color: blueGrey[50]
        },
        h2:{
            color: blueGrey[50]
        },
        body1:{
            color: blueGrey[900]
        },
    }
    
})
tileTheme = responsiveFontSizes(tileTheme)
export default tileTheme