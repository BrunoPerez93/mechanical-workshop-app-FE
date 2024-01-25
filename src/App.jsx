
import { useState } from 'react';
import './App.css';
import Navigation from './components/sections/Navigation';
import Routing from './components/sections/Routing';
import LoginPage from './components/pages/LoginPage';


function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () =>{
    setLoggedIn(true);
  }

  return (
    <>
      {isLoggedIn ? (
        <div>
          <Navigation />
          <Routing />
        </div>
      ) : (
        <LoginPage  onLogin={handleLogin}/>
      )}
    </>
  )
}

export default App
