import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HabitsPage from './pages/HabitsPage';
import SmokingHabit from './pages/SmokingHabit';
import NoPage from './pages/NoPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ColorModeContext from "./components/ColorModeContext"

export default function App() {
    const [mode, setMode] = useState('dark');
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
                        <Route index element={<MainPage />} />
                        <Route path="/mainpage" element={<MainPage />} />
                        <Route path="/habitspage" element={<HabitsPage />} />
                        <Route path="/smokinghabit" element={<SmokingHabit />} />
                        <Route path="*" element={<NoPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}