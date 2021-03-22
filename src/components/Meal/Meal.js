import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    mealCard: {
        maxWidth: 400,
    },
    media: {
        height: 200,
    },
});

const Meal = (props) => {
    const {
        idMeal,
        strMeal,
        strCategory,
        strInstructions,
        strMealThumb,
    } = props.meal;

    const classes = useStyles();

    return (
        <Grid item sm={6} md={3}>
            <Card className={classes.mealCard}>
                <CardActionArea component={Link} to={`/meal/${idMeal}`} >
                    <CardMedia
                        className={classes.media}
                        image={strMealThumb}
                        title={strMeal}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {strMeal}
                        </Typography>
                        <Typography gutterBottom variant="p" component="p">
                            {strCategory}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {`${strInstructions.slice(0, 200)}.....`}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button component={Link} to={`/meal/${idMeal}`} variant="outlined">Read More</Button>
                    <Button variant="contained" color="secondary">Order Now</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Meal;