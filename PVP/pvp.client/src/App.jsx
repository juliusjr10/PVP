import React, { useState, useMemo, useEffect,setName } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HabitsPage from './pages/HabitsPage';
import SmokingHabit from './pages/SmokingHabit';
import NoPage from './pages/NoPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ColorModeContext from "./components/ColorModeContext"
import SignUp from "./pages/SignUp";

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
                        {isAuthenticated && (
                            <>
                                <Route index element={<MainPage />} />
                                <Route path="/mainpage" element={<MainPage />} />
                                <Route path="/habitspage" element={<HabitsPage />} />
                                <Route path="/smokinghabit" element={<SmokingHabit />} />
                                <Route path="*" element={<NoPage />} />
                            </>
                        )}
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}


