import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import SmokingCard from '../components/SmokingCard';
import ThreeDaysCard from './achievements/ThreeDaysCard';
import FiveDaysCard from './achievements/FiveDaysCard';
import OneWeekCard from './achievements/OneWeekCard';
import MeditateCard from '../components/MeditateCard';
import QuestionMarkCard from '../components/QuestionMarkCard';
import OneHabitCard from './achievements/OneHabitCard';
import WaterCard from '../components/WaterCard';
import Typography from '@mui/material/Typography';
import SmokingHabit from './SmokingHabit';
import MeditateHabit from './MeditateHabit';
import WaterHabit from './WaterHabit';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';

export default function HabitsAchievements() {
    const [selectedHabit, setSelectedHabit] = React.useState(null);

    const createHandleMenuClick = (habit) => {
        return () => {
            setSelectedHabit(habit);
        };
    };

    const habitCards = {
        Smoking: [
            <ThreeDaysCard key="smoking1" />,
            <FiveDaysCard key="smoking2" />,
        ],
        Meditate: [
            <ThreeDaysCard key="meditate1" />,
        ],
        Water: [
            <ThreeDaysCard key="water1" />,
            <FiveDaysCard key="water2" />,
            <OneWeekCard key="water3" />,
        ],
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', justifyContent: 'center' }}>
            <CssBaseline />
            <Box sx={{ p: 10 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h5" gutterBottom sx={{
                        fontSize: '2rem', color: '#333333', textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        Habits overall achievements
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                    <OneHabitCard />
                    <QuestionMarkCard />
                    <QuestionMarkCard />
                    <QuestionMarkCard />
                    <QuestionMarkCard />
                </Stack>
                <Box sx={{ mt: 2 }}>
                    <Dropdown>
                        <MenuButton>Habit</MenuButton>
                        <Menu slots={{ listbox: Listbox }}>
                            <MenuItem onClick={createHandleMenuClick("Smoking")}>Smoking</MenuItem>
                            <MenuItem onClick={createHandleMenuClick("Meditate")}>Meditate</MenuItem>
                            <MenuItem onClick={createHandleMenuClick("Water")}>Water</MenuItem>
                        </Menu>
                    </Dropdown>
                </Box>
                {selectedHabit && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            {selectedHabit} Achievements
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            {habitCards[selectedHabit]}
                        </Stack>
                    </Box>
                )}
            </Box>
        </Box>
    );
}





const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E6',
    700: '#0059B3',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Listbox = styled('ul')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 785px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
        };
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  min-width: 785px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
  `,
);