import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './components/Profile';
import Home from './components/home';
import Article from './components/Article';
import Auth from "./components/Auth"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
        <h1>News App</h1>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/article" element={<Article/>}/>
            <Route path="/signin" element={<Auth/>}/>
          </Routes>
          </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
