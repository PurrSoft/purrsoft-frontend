import { ThemeProvider } from "@mui/material";
import { Login } from "./pages/Login";
import { Test } from "./pages/Test";
import AppTheme from "./theme/AppTheme";

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <Login />
      <Test />
    </ThemeProvider>
  )
}

export default App;
