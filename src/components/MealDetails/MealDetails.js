import { Box, Button, Container, Grid, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from "@material-ui/core/colors";
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from '@material-ui/icons/Share';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    mealDetails: {
        maxWidth: 900,
        margin: '0 auto',
    },
    mealThumb: {
        height: 0,
        paddingTop: '56.25%',
    },
    backBtn: {
        marginLeft: 'auto',
    },
    heart: {
        color: red[500],
    },

}));

const MealDetails = () => {

    const classes = useStyles();

    const [meal, setMeal] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);

    const {
        strMeal,
        strCategory,
        strInstructions,
        strMealThumb,
    } = meal;

    const { idMeal } = useParams();

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
            .then(res => res.json())
            .then(data => setMeal(data.meals[0]))
    }, [idMeal]);

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal['strIngredient' + i]) {
            ingredients.push(
                `${meal['strMeasure' + i]} ${meal['strIngredient' + i]}`
            );
        } else {
            break;
        }
    }

    return (
        <Container component={Box} py={4}>
            <Card className={classes.mealDetails}>
                <Grid container>
                    <Grid item xs={12} sm={8}>
                        <CardMedia
                            className={classes.mealThumb}
                            image={strMealThumb}
                            title="Paella dish"
                        />
                        <CardHeader
                            title={strMeal}
                            subheader={strCategory}
                            style={{ paddingBottom: 0 }}
                        />
                        <CardContent>
                            <Typography variant="h6" >
                                Instructions :-
                        </Typography>
                            <Typography paragraph>
                                {strInstructions}
                            </Typography>
                        </CardContent>

                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CardContent>
                            <Typography variant="h6">
                                Ingredients :-
                            </Typography>
                            <Typography>
                                {ingredients.map((ing, index) => (
                                    <ListItem button key={index}>
                                        <ListItemIcon>
                                            <CheckBoxIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText primary={ing} />
                                    </ListItem>
                                ))}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
                <CardContent style={{ paddingTop: 0 }}>
                    <CardActions disableSpacing>
                        <IconButton onClick={() => setIsFavorite(!isFavorite)}>
                            {isFavorite ? (
                                <FavoriteIcon className={classes.heart} />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <Button component={Link} to="/" className={classes.backBtn} variant="contained" size="large" color="secondary">
                            Go to Home
                                </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Container>
    );
};

export default MealDetails;