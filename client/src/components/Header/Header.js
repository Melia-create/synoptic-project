import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExploreIcon from '@mui/icons-material/Explore';


export default function Header() {
    const userStorage = window.localStorage;
    const [isLoggedIn, setIsLoggedIn] = useState();

    const handleLogout = () => {
        userStorage.removeItem('user');
        setIsLoggedIn(false)
        window.location.replace('/')
    }

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setIsLoggedIn(true)
        }
    }, [setIsLoggedIn])

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar sx={{ bgcolor: "teal" }} position="static">
                <Toolbar>
                    <ExploreIcon
                        style={{ width: '30px', height: '30px' }} />
                    <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                        Community Events Ltd
                    </Typography>
                    {isLoggedIn ? (
                        <Button 
                        sx={{ color: 'inherit', ':hover': { bgcolor: '#80cbc4' } }}
                        onClick={handleLogout}
                        >
                            Logout
                            </Button>
                    ) : (
                        <>
                            <Button sx={{ color: 'inherit', ':hover': { bgcolor: '#80cbc4' } }}
                                href='/login'>
                                Login
                            </Button>
                            <Button sx={{ color: 'inherit', ':hover': { bgcolor: '#80cbc4' } }}
                                href='/register'>
                                Register
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}