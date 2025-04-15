import React, { useState } from 'react';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from "./components/ThemeContext";
import useLoginState from "./hooks/useLoginState";
import AuthPage from "./pages/AuthPage";
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Content from './components/Content';
import AboutPage from './pages/AboutPage';

function App() {
    const { isLoggedIn } = useLoginState();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <Provider store={store}>
            <ThemeProvider>
                <MuiThemeProvider theme={createTheme()}>
                    <CssBaseline />
                    <Router>
                        {isLoggedIn ? (
                            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", pb: 7 }}>
                                <Header onMenuToggle={toggleMenu} />
                                <Box sx={{ display: "flex", flexGrow: 1 }}>
                                    <Menu open={menuOpen} onClose={toggleMenu} />
                                    <Routes>
                                        <Route path="/" element={<Content />} />
                                        <Route path="/about" element={<AboutPage />} />
                                        <Route path="/lab/:labId" element={<Content />} />
                                    </Routes>
                                </Box>
                                <Footer />
                            </Box>
                        ) : (
                            <AuthPage />
                        )}
                    </Router>
                </MuiThemeProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;