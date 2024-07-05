import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './home';
import message from './componenthome/message';
import Course from './componenthome/course';
import grade10A1 from './componenthome/grade10/A1';
import grade10A2 from './componenthome/grade10/A2';
import grade10A3 from './componenthome/grade10/A3';
import grade11A1 from './componenthome/grade11/A1';
import grade11A2 from './componenthome/grade11/A2';
import grade11A3 from './componenthome/grade11/A3';
import grade12A1 from './componenthome/grade12/A1';
import grade12A2 from './componenthome/grade12/A2';
import grade12A3 from './componenthome/grade12/A3';
import toan10a1 from './componenthome/grade10/classa1/toan';
import van10a1 from './componenthome/grade10/classa1/van';
import anh10a1 from './componenthome/grade10/classa1/anh';
import khoahoctunhien10a1 from './componenthome/grade10/classa1/khoahoctunhien';
import khoahocxahoi10a1 from './componenthome/grade10/classa1/khoahocxahoa';
import showform from './componenthome/grade10/classa1/showform';

import toan10a2 from './componenthome/grade10/classa2/toan';
import van10a2 from './componenthome/grade10/classa2/van';
import anh10a2 from './componenthome/grade10/classa2/anh';
import khoahoctunhien10a2 from './componenthome/grade10/classa2/khoahoctunhien';
import khoahocxahoi10a2 from './componenthome/grade10/classa2/khoahocxahoa';
import showformtoana2 from './componenthome/grade10/classa2/showform';

import toan10a3 from './componenthome/grade10/classa3/toan';
import van10a3 from './componenthome/grade10/classa3/van';
import anh10a3 from './componenthome/grade10/classa3/anh';
import khoahoctunhien10a3 from './componenthome/grade10/classa3/khoahoctunhien';
import khoahocxahoi10a3 from './componenthome/grade10/classa3/khoahocxahoa';
import showformtoana3 from './componenthome/grade10/classa3/showform';

import toan11a1 from './componenthome/grade11/classa1/toan';
import van11a1 from './componenthome/grade11/classa1/van';
import anh11a1 from './componenthome/grade11/classa1/anh';
import khoahoctunhien11a1 from './componenthome/grade11/classa1/khoahoctunhien';
import khoahocxahoi11a1 from './componenthome/grade11/classa1/khoahocxahoa';
import showformtoan11a1 from './componenthome/grade11/classa1/showform';

import toan11a2 from './componenthome/grade11/classa2/toan';
import van11a2 from './componenthome/grade11/classa2/van';
import anh11a2 from './componenthome/grade11/classa2/anh';
import khoahoctunhien11a2 from './componenthome/grade11/classa2/khoahoctunhien';
import khoahocxahoi11a2 from './componenthome/grade11/classa2/khoahocxahoa';
import showformtoan11a2 from './componenthome/grade11/classa2/showform';

import toan11a3 from './componenthome/grade11/classa3/toan';
import van11a3 from './componenthome/grade11/classa3/van';
import anh11a3 from './componenthome/grade11/classa3/anh';
import khoahoctunhien11a3 from './componenthome/grade11/classa3/khoahoctunhien';
import khoahocxahoi11a3 from './componenthome/grade11/classa3/khoahocxahoa';
import showformtoan11a3 from './componenthome/grade11/classa3/showform';

import toan12a1 from './componenthome/grade12/classa1/toan';
import van12a1 from './componenthome/grade12/classa1/van';
import anh12a1 from './componenthome/grade12/classa1/anh';
import khoahoctunhien12a1 from './componenthome/grade12/classa1/khoahoctunhien';
import khoahocxahoi12a1 from './componenthome/grade12/classa1/khoahocxahoa';
import showformtoan12a1 from './componenthome/grade12/classa1/showform';

import toan12a2 from './componenthome/grade12/classa2/toan';
import van12a2 from './componenthome/grade12/classa2/van';
import anh12a2 from './componenthome/grade12/classa2/anh';
import khoahoctunhien12a2 from './componenthome/grade12/classa2/khoahoctunhien';
import khoahocxahoi12a2 from './componenthome/grade12/classa2/khoahocxahoa';
import showformtoan12a2 from './componenthome/grade12/classa2/showform';

import toan12a3 from './componenthome/grade12/classa3/toan';
import van12a3 from './componenthome/grade12/classa3/van';
import anh12a3 from './componenthome/grade12/classa3/anh';
import khoahoctunhien12a3 from './componenthome/grade12/classa3/khoahoctunhien';
import khoahocxahoi12a3 from './componenthome/grade12/classa3/khoahocxahoa';
import showformtoan12a3 from './componenthome/grade12/classa3/showform';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login}></Route>
        <Route path='/signup' exact component={Signup}></Route>
        <Route path='/home/:userId' exact component={Home}></Route>
        <Route path='/message' exact component={message}></Route>
        <Route path='/course' exact component={Course}></Route>
        <Route path="/course/grade10/a1" exact component={grade10A1} />
        <Route path="/course/grade10/a2" exact component={grade10A2} />
        <Route path="/course/grade10/a3" exact component={grade10A3} />
        <Route path="/course/grade11/a1" exact component={grade11A1} />
        <Route path="/course/grade11/a2" exact component={grade11A2} />
        <Route path="/course/grade11/a3" exact component={grade11A3} />
        <Route path="/course/grade12/a1" exact component={grade12A1} />
        <Route path="/course/grade12/a2" exact component={grade12A2} />
        <Route path="/course/grade12/a3" exact component={grade12A3} />
        <Route path="/course/grade10/a1/toan" exact component={toan10a1} />
        <Route path="/course/grade10/a1/van" exact component={van10a1} />
        <Route path="/course/grade10/a1/anh" exact component={anh10a1} />
        <Route path="/course/grade10/a1/khoahoctunhien" exact component={khoahoctunhien10a1} />
        <Route path="/course/grade10/a1/khoahocxahoi" exact component={khoahocxahoi10a1} />
        <Route exact path="/course/grade10/a1/showform/:link" component={showform} />
       
        <Route path="/course/grade10/a2/toan" exact component={toan10a2} />
        <Route path="/course/grade10/a2/van" exact component={van10a2} />
        <Route path="/course/grade10/a2/anh" exact component={anh10a2} />
        <Route path="/course/grade10/a2/khoahoctunhien" exact component={khoahoctunhien10a2} />
        <Route path="/course/grade10/a2/khoahocxahoi" exact component={khoahocxahoi10a2} />
        <Route exact path="/course/grade10/a2/showform/:link" component={showformtoana2} />
        
        <Route path="/course/grade10/a3/van" exact component={van10a3} />
        <Route path="/course/grade10/a3/anh" exact component={anh10a3} />
        <Route path="/course/grade10/a3/khoahoctunhien" exact component={khoahoctunhien10a3} />
        <Route path="/course/grade10/a3/khoahocxahoi" exact component={khoahocxahoi10a3} />
        <Route exact path="/course/grade10/a3/showform/:link" component={showformtoana3} />
        
        <Route path="/course/grade11/a1/toan" exact component={toan11a1} />
        <Route path="/course/grade11/a1/van" exact component={van11a1} />
        <Route path="/course/grade11/a1/anh" exact component={anh11a1} />
        <Route path="/course/grade11/a1/khoahoctunhien" exact component={khoahoctunhien11a1} />
        <Route path="/course/grade11/a1/khoahocxahoi" exact component={khoahocxahoi11a1} />
        <Route exact path="/course/grade11/a1/showform/:link" component={showformtoan11a1} />
    
        <Route path="/course/grade11/a2/toan" exact component={toan11a2} />
        <Route path="/course/grade11/a2/van" exact component={van11a2} />
        <Route path="/course/grade11/a2/anh" exact component={anh11a2} />
        <Route path="/course/grade11/a2/khoahoctunhien" exact component={khoahoctunhien11a2} />
        <Route path="/course/grade11/a2/khoahocxahoi" exact component={khoahocxahoi11a2} />
        <Route exact path="/course/grade11/a2/showform/:link" component={showformtoan11a2} />
        
        <Route path="/course/grade11/a3/toan" exact component={toan11a3} />
        <Route path="/course/grade11/a3/van" exact component={van11a3} />
        <Route path="/course/grade11/a3/anh" exact component={anh11a3} />
        <Route path="/course/grade11/a3/khoahoctunhien" exact component={khoahoctunhien11a3} />
        <Route path="/course/grade11/a3/khoahocxahoi" exact component={khoahocxahoi11a3} />
        <Route exact path="/course/grade11/a3/showform/:link" component={showformtoan11a3} />
        
        <Route path="/course/grade12/a1/toan" exact component={toan12a1} />
        <Route path="/course/grade12/a1/van" exact component={van12a1} />
        <Route path="/course/grade12/a1/anh" exact component={anh12a1} />
        <Route path="/course/grade12/a1/khoahoctunhien" exact component={khoahoctunhien12a1} />
        <Route path="/course/grade12/a1/khoahocxahoi" exact component={khoahocxahoi12a1} />
        <Route exact path="/course/grade12/a1/showform/:link" component={showformtoan12a1} />
        
        <Route path="/course/grade12/a2/toan" exact component={toan12a2} />
        <Route path="/course/grade12/a2/van" exact component={van12a2} />
        <Route path="/course/grade12/a2/anh" exact component={anh12a2} />
        <Route path="/course/grade12/a2/khoahoctunhien" exact component={khoahoctunhien12a2} />
        <Route path="/course/grade12/a2/khoahocxahoi" exact component={khoahocxahoi12a2} />
        <Route exact path="/course/grade12/a2/showform/:link" component={showformtoan12a2} />
       
        <Route path="/course/grade12/a3/toan" exact component={toan12a3} />
        <Route path="/course/grade12/a3/van" exact component={van12a3} />
        <Route path="/course/grade12/a3/anh" exact component={anh12a3} />
        <Route path="/course/grade12/a3/khoahoctunhien" exact component={khoahoctunhien12a3} />
        <Route path="/course/grade12/a3/khoahocxahoi" exact component={khoahocxahoi12a3} />
        <Route exact path="/course/grade12/a3/showform/:link" component={showformtoan12a3} />
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
