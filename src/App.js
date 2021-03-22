import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MealDetails from "./components/MealDetails/MealDetails";
import Profile from "./components/Profile/Profile";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    photo: '',
  });
  const [meals, setMeals] = useState([]);

  return (
    <UserContext.Provider value={{ meals, setMeals, user, setUser }}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/meal/:idMeal">
            <MealDetails />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
