import React from 'react';
import Login from './Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './Signup';
import Home from './home';
import Course from './componenthome/course';
import user from './componenthome/user';
import Notification from './componenthome/Notification';
import Message from './componenthome/Message';
import { SocketProvider } from './SocketContext';
function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Login}></Route>
          <Route path='/signup' exact component={Signup}></Route>
          <Route path='/home/:userId' exact component={Home}></Route>
          <Route path='/notification/:userId' component={Notification} />
          <Route path='/message/:userId' component={Message} />
          <Route path='/course' exact component={Course}></Route>
          <Route path='/search' exact component={user}></Route>
        </Switch>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
