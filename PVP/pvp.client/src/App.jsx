import React, { useState, useMemo, useEffect} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import HabitsPage from './pages/HabitsPage';
import LandingPage from './pages/LandingPage';
import SmokingHabit from './pages/SmokingHabit';
import NoPage from './pages/NoPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ColorModeContext from "./components/ColorModeContext"
import SignUp from "./pages/SignUp";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SignIn from './pages/SignIn';
import EditProfile from './pages/EditProfile';

export default function App() {

    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://localhost:7200/api/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();
                if (content.username) {
                    setIsAuthenticated(true);
                }

                console.log(content.username)
            }
        )();
    });

    const [mode, setMode] = useState('dark');
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Assuming initially user is not authenticated

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );


    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        {!isAuthenticated && <Route path="*" element={<SignUp />} />}
                        <Route path="/landingpage" element={<LandingPage />} />
                        <Route path="/forgotpassword" element={<ForgotPassword />} />
                        <Route path="/resetpassword/:token" element={<ResetPassword />} exact/>
                        <Route path="/login" element={<SignIn />} />
                        {isAuthenticated && (
                            <>
                                <Route index element={<MainPage />} />
                                <Route path="/mainpage" element={<MainPage />} />
                                <Route path="/habitspage" element={<HabitsPage />} />
                                <Route path="/smokinghabit" element={<SmokingHabit />} />
                                <Route path="/editprofile" element={<EditProfile />} />
                                <Route path="*" element={<NoPage />} />
                            </>
                        )}
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}


