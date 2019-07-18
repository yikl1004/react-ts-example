import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// redux
import configureStore from 'store/redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux'

// mobx
import { GlobalContext, RootStore, GlobalContextProvider } from 'store/mobx';
import { Store } from 'redux';

// import * as serviceWorker from './serviceWorker';



const storeMode = process.env.REACT_APP_STORE_MODE;
let CustomProvider = null;
let props: { value?: any, store?: any } = {};

if ( storeMode === 'MOBX' ) {

  const value: GlobalContext = { rootStore: new RootStore() };
  CustomProvider = GlobalContextProvider;
  props = { value };

} else if ( storeMode === 'REDUX' ) {

  const store: Store = configureStore();
  CustomProvider = ReduxProvider;
  props = { store };

}

if ( CustomProvider !== null ) {

  ReactDOM.render(
    <CustomProvider store={ props.store } value={ props.value }>
      <App />
    </CustomProvider>,
    document.getElementById('root')
  );

}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
