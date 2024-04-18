import React, { useState, useMemo, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import HabitsPage from './pages/HabitsPage';
import LandingPage from './pages/LandingPage';
import SignUp from "./pages/SignUp";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SignIn from './pages/SignIn';
import EditProfile from './pages/EditProfile';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChangePassword from './pages/ChangePassword';
import AchievementsPage from './pages/AchievementsPage';

export default function App() {
    const [loading, setLoading] = useState(true); // Indicates whether authentication status is being checked
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Assuming initially user is not authenticated
    useEffect(() => {
        // Listen for the 'login' event to update isAuthenticated
        const handleLogin = () => {
            setIsAuthenticated(true);
        };

        window.addEventListener('login', handleLogin);

        // Cleanup event listener
        return () => {
            window.removeEventListener('login', handleLogin);
        };
    }, []);

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch('https://localhost:7200/api/Auth/user', {
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    });

                    if (response.ok) {
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error('Error:', error.message);
                } finally {
                    setLoading(false); // Once authentication status is resolved, set loading to false
                }
            }
        )();
    }, []);

    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#5a00ec',
            },
            secondary: {
                main: '#f50057',
            },
            background: {
                default: '#f5f5f5',
            },
        },
    });

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                {isAuthenticated && (
                    <>
                        <Route path="/habitspage" element={<HabitsPage />} />
                        <Route path="/achievementspage" element={<AchievementsPage /> } />
                            <Route path="/editprofile" element={<EditProfile />} />
                            <Route path="/changepassword" element={<ChangePassword />} />
                        <Route index element={<Navigate to="/habitspage" />} />
                        <Route path="*" element={<Navigate to="/habitspage" />} />
                    </>
                )}
                {!isAuthenticated && (
                    <>
                        <Route path="/landingpage" element={<LandingPage />} />
                        <Route path="/forgotpassword" element={<ForgotPassword />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/resetpassword/:token" element={<ResetPassword />} exact/>
                        <Route path="/login" element={<SignIn />} />
                        <Route path="*" element={<Navigate to="/landingpage" />} />
                    </>
                )}  
            </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}


