import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './Login.css';

function App() {
  const [page, setPage] = useState('login');

  return (
    <>
      {page === 'login' ? (
        <Login onSwitch={setPage} />
      ) : (
        <Signup onSwitch={setPage} />
      )}
    </>
  );
}

export default App;
