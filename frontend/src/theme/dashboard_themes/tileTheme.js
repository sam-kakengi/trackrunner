import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

const tileTheme = createTheme({
    typography:{
        h6: {
            color: blueGrey[900]
        },
        h4:{
            color: blueGrey[200]
        },
        h2:{
            color: blueGrey[50]
        }
    }
});

export default tileTheme;