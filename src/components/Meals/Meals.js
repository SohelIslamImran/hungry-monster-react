import { Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { UserContext } from '../../App';
import Meal from '../Meal/Meal';

const Meals = () => {
    const {meals} = useContext(UserContext);

    return (
        <Grid container spacing={3} mt={5} justify="center">
            {
                meals?.map(meal => <Meal key={meal.idMeal} meal={meal} />)
            }
        </Grid>
    );
};

export default Meals;