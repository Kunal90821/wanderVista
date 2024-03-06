import { IconButton } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";


const ThemeBtn = () => {
    const { themeMode, lightTheme, darkTheme } = useTheme();

    const toggleTheme = () => {
        if(themeMode === 'light') {
            darkTheme();
        } else {
            lightTheme();
        }
    };

    return (
        <IconButton onClick = {toggleTheme} color='inherit' className='hover:text-teal-500'>
            {themeMode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    );
};


export default ThemeBtn;