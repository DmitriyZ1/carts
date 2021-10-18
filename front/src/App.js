
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Forms from './components/Forms'
import List from './components/List'
import Trans from './components/Trans'

function App() {

  return (
    <div className="App">
      <div className="head">
        <a href="/" className="logotipe">
          <img src="pen.png" alt="pen" />
          <span className="logospan">TeSt</span>
        </a>
      </div>
      <h1>Приложение на react</h1>
        <Switch>
          <Route path="/" render={() => <List />} exact/>
          <Route path="/forms" render={() => <Forms />} exact/>
          <Route path="/transf/:idpers" render={() => <Trans />} exact/>
        </Switch>
      <div className="footer"> </div>
    </div>
  );
}

export default App;
