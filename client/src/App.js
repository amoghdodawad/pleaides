import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { persistor, store } from './redux/appStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Comp2 from './components/Comp2';
import Login from './components/Login';
import Home from './components/Home';
import LoginError from './components/LoginError';
import LoginSuccess from './components/LoginSuccess';
import Payment from './components/Payment';
import Onboarding from './components/Onboarding';
import Protected from './components/Protected';
import UnProtected from './components/UnProtected';

function App() {
  // console.log(store.getState());
  // const { token } = store.getState().user;
  return (
    <div className="App">
      <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <div className='App'> */}
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={
                <UnProtected next='login'>
                  <Login/>
                </UnProtected>
              }/>
              <Route path='/2' element={<Comp2/>}/> 
              <Route path='/login-success' element={
                // <Protected>
                  <LoginSuccess/>
                // </Protected>
              }/>
              <Route path='/login-error' element={<LoginError/>}/>
              <Route path='/payment' element={
                <Protected next='payment'>
                  <Payment/>
                </Protected>
              }/>
              <Route path='/onboarding' element={
                <Protected next='onboarding'>
                  <Onboarding/>
                </Protected>
              }/>
            </Routes>
          {/* </div> */}
        </PersistGate>
      </Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
