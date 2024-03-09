import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HabitsPage from './pages/HabitsPage';
import SmokingHabit from './pages/SmokingHabit';
import NoPage from './pages/NoPage';

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<MainPage />} />
                    <Route path="/mainpage" element={<MainPage />} />
                    <Route path="/habitspage" element={<HabitsPage />} />
                    <Route path="/smokinghabit" element={<SmokingHabit />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}