import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Profile from './components/Profile';
import ProfileCreate from './components/ProfileCreate';
import ProfileList from './components/ProfileList';
import Menu from './components/menu';

class App extends React.Component
{
  render()
  {
    return(
      <>
        <BrowserRouter>
        <Menu/>
          <Switch>
            <Route exact path="/" component={ProfileCreate} />
            <Route path="/list" component={ProfileList} />
            <Route path="/:userid" component={Profile} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
