import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const[{ user }, dispatch] = useStateValue();

  return (
    // BEM naming convention
    <BrowserRouter>
      <div className="app">
        {!user ? (
          <Login />
        ) : (
          <div className='app__body'>
            <Sidebar />
            <Routes>
              <Route path='/rooms'>
                <Route path=":roomId" element={<Chat />} />
              </Route>
            </Routes>            
          </div>
        )}
      </div>
    </BrowserRouter> 
  );
}

export default App;
