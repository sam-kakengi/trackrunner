import { createTheme } from '@mui/material/styles'
import paletteTheme from './paletteTheme'
import buttonTheme from './dashboard_themes/buttonTheme'
import drawerTheme from './dashboard_themes/drawerTheme'
import tileTheme from './dashboard_themes/tileTheme'

const theme = createTheme(
  {
    ...paletteTheme.palette,
  },
  buttonTheme.components,
  drawerTheme.components,
  tileTheme.components,
)

export default theme