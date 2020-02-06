import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Profile from './components/Profile';
import ProfileCreate from './components/ProfileCreate';
import ProfileList from './components/ProfileList';

class App extends React.Component
{
  render()
  {
    return(
      <>
        <BrowserRouter>
          <div>

          </div>
          <Switch>
            <Route exact path="/" component={ProfileCreate} />
            <Route path="/list" component={ProfileList} />
            <Route path="/:username" component={Profile} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
