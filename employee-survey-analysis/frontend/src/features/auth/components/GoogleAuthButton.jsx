import { useEffect, useEffectEvent, useRef, useState } from "react";
import styles from "../styles/AuthLayout.module.css";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

let googleScriptPromise;

function loadGoogleIdentityScript() {
  if (window.google?.accounts?.id) {
    return Promise.resolve(window.google);
  }

  if (googleScriptPromise) {
    return googleScriptPromise;
  }

  googleScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.google), {
        once: true,
      });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google Identity Services.")),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = () =>
      reject(new Error("Failed to load Google Identity Services."));
    document.head.appendChild(script);
  });

  return googleScriptPromise;
}

export default function GoogleAuthButton({
  disabled = false,
  onCredential,
  onError,
}) {
  const containerRef = useRef(null);
  const [helperMessage, setHelperMessage] = useState("");
  const handleCredential = useEffectEvent((response) => {
    if (!response?.credential) {
      onError?.("Google did not return a credential. Please try again.");
      return;
    }

    onCredential(response.credential);
  });
  const handleError = useEffectEvent((message) => {
    setHelperMessage(message);
    onError?.(message);
  });

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      setHelperMessage(
        "Add VITE_GOOGLE_CLIENT_ID to frontend/.env to enable Google sign-in."
      );
      return;
    }

    let isActive = true;

    loadGoogleIdentityScript()
      .then(() => {
        if (!isActive || !containerRef.current || !window.google?.accounts?.id) {
          return;
        }

        const googleIdentity = window.google.accounts.id;
        googleIdentity.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredential,
        });

        containerRef.current.innerHTML = "";
        googleIdentity.renderButton(containerRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          shape: "rectangular",
          width: Math.max(
            240,
            Math.floor(containerRef.current.getBoundingClientRect().width || 360)
          ),
          logo_alignment: "left",
        });
        setHelperMessage("");
      })
      .catch((error) => {
        handleError(error.message);
      });

    return () => {
      isActive = false;
    };
  }, [handleCredential, handleError]);

  return (
    <div className={styles.googleAuthStack}>
      <div
        className={`${styles.googleButtonMount} ${
          disabled ? styles.googleButtonDisabled : ""
        }`}
        ref={containerRef}
      />
      {helperMessage ? (
        <p className={styles.googleHelperText}>{helperMessage}</p>
      ) : null}
    </div>
  );
}
