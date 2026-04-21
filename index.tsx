import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { supabase } from './src/supabaseClient';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// If this is an OAuth popup callback (Supabase puts access_token in the hash)
if (window.opener && window.location.hash.includes('access_token=')) {
  // Wait for Supabase to process the token from the URL
  supabase.auth.onAuthStateChange((event, session) => {
    if (session && window.opener) {
      window.opener.postMessage({
        type: 'OAUTH_AUTH_SUCCESS',
        access_token: session.access_token,
        refresh_token: session.refresh_token
      }, '*');
      window.close();
    }
  });

  // Fallback checking the session directly
  supabase.auth.getSession().then(({ data }) => {
    if (data.session && window.opener) {
      window.opener.postMessage({
        type: 'OAUTH_AUTH_SUCCESS',
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
      }, '*');
      window.close();
    }
  });

  root.render(
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#F4F6F9' }}>
      <div style={{ textAlign: 'center', padding: '30px', background: 'white', borderRadius: '24px', boxShadow: '0 20px 40px -10px rgba(79,70,229,0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Google Verified!</h2>
        <p style={{ color: '#64748b', fontWeight: 500 }}>Logging you into the dashboard...</p>
      </div>
    </div>
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
