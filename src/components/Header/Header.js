import { Avatar, Container, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    nav: {
        background: "#dc3545",
    },
    title: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "flex",
        },
    },
    mobileMenu: {
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    logo: {
        marginRight: theme.spacing(1),
    },
}));

const Header = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.nav} position="static">
                <Container>
                    <Toolbar>
                        <Avatar alt="Logo" src={Logo} className={classes.logo} />
                        <Typography variant="h6" className={classes.title}>
                            Hungry Monster
                        </Typography>
                        <div className={classes.sectionDesktop}>
                            <Button component={Link} to="/" color="inherit">
                                Home
                            </Button>
                            <Button component={Link} to="/profile" color="inherit">
                                Profile
                            </Button>
                            <Button component={Link} to="/login" color="inherit">
                                Login
                            </Button>
                            <Button component={Link} to="/signup" color="inherit">
                                Signup
                            </Button>
                        </div>
                        <IconButton className={classes.mobileMenu} onClick={handleClick} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu className={classes.mobileMenu} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                            <MenuItem component={Link} to="/" onClick={handleClose}>
                                Home
                                </MenuItem>
                            <MenuItem component={Link} to="/profile" onClick={handleClose}>
                                Profile
                                </MenuItem>
                            <MenuItem component={Link} to="/contact" onClick={handleClose}>
                                Contact
                                </MenuItem>
                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Header;