// src/layouts/MainLayout.tsx
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    ListItemIcon,
    ListItemText,
    CssBaseline,
    ListItemButton,
    Divider,
    Avatar,
    Tooltip,
    IconButton,
    styled,
    Theme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuIcon from '@mui/icons-material/Menu';
import { Colors } from '../styles/Colors';
import logo3Image from '../../assets/images/logo3.png'
import logoImage from '../../assets/images/logo.png'
const drawerWidth = 310;

const CustomAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 2,
    backgroundColor: Colors.amareloescuro,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 24,
    borderBottom: '4px solid rgb(48, 21, 83)',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const CustomDrawer = styled(Drawer)(({ theme }: { theme: Theme }) => ({
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        backgroundColor: Colors.roxoescuro,
        color: Colors.brancocinza,
        borderRadius: '0px 0px 20px 0px',
        borderRight: '4px solid rgb(48, 21, 83)',
        paddingTop: '20px',
        boxShadow: '4px 0 10px rgba(0, 0, 0, 0.2)',
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

const CustomListItem = styled(ListItemButton)(({ theme }) => ({
    borderRadius: 30,
    margin: '8px 0',
    width: '100%',
    color: Colors.brancocinza,
    fontWeight: 'bold',
    '&.Mui-selected': {
        backgroundColor: '#fff',
        color: Colors.roxoescuro,
    },
    '&:hover': {
        backgroundColor: '#d2b4f8',
        color: Colors.preto,
    },
}));

const CustomListItemIcon = styled(ListItemIcon)(() => ({
    minWidth: '40px',
    color: 'inherit',
}));

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleNavigate = (path: string) => {
        navigate(path);
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <CustomAppBar position="fixed" open={open}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => setOpen(!open)}
                        sx={{ fontSize: 40 }}
                    >
                        <MenuIcon fontSize="inherit" />
                    </IconButton>
                    <Avatar
                        src={logo3Image}
                        alt="Logo"
                        sx={{ width: 300, height: 200 }}
                    />
                </Toolbar>
            </CustomAppBar>

            <CustomDrawer variant="persistent" anchor="left" open={open}>
                <Toolbar />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 2 }}>
                    <Tooltip title="Minha Clínica" placement="bottom">
                        <Avatar
                            src={logoImage}
                            alt="Logo"
                            sx={{ width: 300, height: 300, mb: 2 }}
                        />
                    </Tooltip>
                    <Divider sx={{ width: '80%' }} />
                </Box>
                <List sx={{ width: '100%', px: 2 }}>
                    <CustomListItem
                        onClick={() => handleNavigate('/painel')}
                        selected={location.pathname === '/painel'}
                    >
                        <CustomListItemIcon><DashboardIcon /></CustomListItemIcon>
                        <ListItemText primary="Painel" />
                    </CustomListItem>

                    <CustomListItem
                        onClick={() => handleNavigate('/paciente')}
                        selected={location.pathname === '/paciente'}
                    >
                        <CustomListItemIcon><GroupIcon /></CustomListItemIcon>
                        <ListItemText primary="Pacientes" />
                    </CustomListItem>

                    <CustomListItem
                        onClick={() => handleNavigate('/agenda')}
                        selected={location.pathname === '/agenda'}
                    >
                        <CustomListItemIcon><CalendarMonthIcon /></CustomListItemIcon>
                        <ListItemText primary="Agenda" />
                    </CustomListItem>
                </List>
            </CustomDrawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    transition: (theme) =>
                        theme.transitions.create('margin', {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    marginLeft: open ? `${drawerWidth}px` : 0,
                }}
            >
                <Toolbar />
                <Outlet context={{ drawerOpen: open }} />
            </Box>
        </Box>
    );
}
