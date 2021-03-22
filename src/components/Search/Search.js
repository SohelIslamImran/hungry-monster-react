import { Box, Button, Container, Divider, IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 600,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = () => {
  const classes = useStyles();

  const {setMeals} = useContext(UserContext);

  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (e) => {
    setSearchKeyword(searchKeyword)
    e.preventDefault();
  }

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKeyword}`)
      .then(response => response.json())
      .then(data => setMeals(data.meals))
  }, [searchKeyword, setMeals])

  return (
    <Container maxWidth="sm" component={Box} my={4} p={2}>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search for Meal..."
          inputProps={{ 'aria-label': 'search for meal...' }}
          value={searchKeyword}
          onChange={keyword => setSearchKeyword(keyword.target.value)}
        />
        <IconButton type="submit" onClick={handleSearch} className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <Button onClick={handleSearch} variant="contained" color="secondary">Search</Button>
      </Paper>
    </Container>
  );

};

export default Search;