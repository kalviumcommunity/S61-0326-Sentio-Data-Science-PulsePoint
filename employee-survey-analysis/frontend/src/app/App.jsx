import { useEffect, useState } from "react";
import { LoginPage, SessionPage, SignupPage } from "../features/auth";

const SESSION_STORAGE_KEY = "pulsepoint-session";

function readStoredSession() {
  try {
    const storedValue = window.localStorage.getItem(SESSION_STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch {
    return null;
  }
}

function App() {
  const [session, setSession] = useState(() => readStoredSession());
  const [page, setPage] = useState(session ? "session" : "login");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (session) {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      return;
    }

    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }, [session]);

  const handlePageSwitch = (nextPage) => {
    setNotice("");
    setPage(nextPage);
  };


  // After signup, go directly to dashboard
  const handleSignupSuccess = (authSession) => {
    setNotice("");
    setSession(authSession);
    setPage("session");
  };

  const handleLoginSuccess = (authSession) => {
    setNotice("");
    setSession(authSession);
    setPage("session");
  };

  const handleLogout = () => {
    setSession(null);
    setPage("login");
  };

  if (session && page === "session") {
    return <SessionPage session={session} onLogout={handleLogout} />;
  }

  return (
    <>
      {page === "login" ? (
        <LoginPage
          notice={notice}
          onLoginSuccess={handleLoginSuccess}
          onSwitch={handlePageSwitch}
        />
      ) : (
        <SignupPage
          onGoogleAuthSuccess={handleLoginSuccess}
          onSignupSuccess={handleSignupSuccess}
          onSwitch={handlePageSwitch}
        />
      )}
    </>
  );
}

export default App;
