import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { persistor, store} from './redux/appStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Comp1 from './components/Comp1';
import Comp2 from './components/Comp2';
import Comp3 from './components/Comp3';
import Login from './components/Login';
import Home from './components/Home';
import LoginError from './components/LoginError';
import LoginSuccess from './components/LoginSuccess';
import Payment from './components/Payment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className='App'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/2' element={<Comp2/>}/>
              <Route path='/3' element={<Comp3/>}/>
              <Route path='/login-success' element={<LoginSuccess/>}/>
              <Route path='/login-error' element={<LoginError/>}/>
              <Route path='/payment' element={<Payment/>}/>
            </Routes>
          </div>
        </PersistGate>
      </Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
