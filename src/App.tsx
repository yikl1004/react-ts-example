// default
import React, { FC } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// components
import TodoListContainer from 'container/TodoListContainer';


interface IMenuItem {
  path: string
  name: string
  exact?: boolean
}

class MenuItem implements IMenuItem {
  name: string;
  path: string;
  exact?: boolean;

  constructor(
    path: string,
    name: string,
    exact?: boolean
  ) {
    this.path = path;
    this.name = name;
    
    if ( typeof exact === 'boolean' && exact ) {
      this.exact = exact;
    }
  }
}

const App: FC = (): JSX.Element => {
  const menus: IMenuItem[] = [
    new MenuItem('/', 'Home', true),
    new MenuItem('/todolist', 'Todo List')
  ];

  return (
    <div className="App">
     <header>
       <h1>Hello, World!</h1>
       <Router history={createBrowserHistory()}>
         <nav>
           <ul>
              { menus.map((menu: IMenuItem, index: number): JSX.Element => {
                let props = { exact: menu.exact ? menu.exact.toString() : "false" };
                return (
                  <li key={index}>
                    <Link to={menu.path} {...props}>
                      { menu.name }
                    </Link>
                  </li>
                )})
              }
           </ul>
         </nav>
         <Route path="/" exact />
         <Route path="/todolist" component={ TodoListContainer } />
       </Router>
     </header>
    </div>
  );
}

export default App;
