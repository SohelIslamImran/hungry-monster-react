import { Container } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { UserContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    profile: {
        margin: '50px auto',
        maxWidth: 600,
    },
    content: {
        textAlign: 'center',
    },
    avatar: {
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
    title: {
        marginBottom: '20px',
    }
}));


const Profile = () => {
    const classes = useStyles();

    const { user } = useContext(UserContext);

    return (
        <Container maxWidth="sm">
            <Card className={classes.profile}>
                <CardContent>
                    <Avatar style={{ margin: '0 auto' }} alt="Profile" src={user.photo} className={classes.avatar} />
                </CardContent>
                <CardContent className={classes.content}>
                    <Typography className={classes.title} color="dark" variant="h5" component="h6">
                        Name: {user.name}
                    </Typography>
                    <Typography color="dark" variant="h5" component="h6">
                        Email: {user.email}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Profile;