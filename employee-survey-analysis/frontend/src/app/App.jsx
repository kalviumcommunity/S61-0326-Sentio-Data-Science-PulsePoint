import { useState } from 'react';
import { LoginPage, SignupPage } from '../features/auth';

function App() {
  const [page, setPage] = useState('login');

  return (
    <>
      {page === 'login' ? (
        <LoginPage onSwitch={setPage} />
      ) : (
        <SignupPage onSwitch={setPage} />
      )}
    </>
  );
}

export default App;
