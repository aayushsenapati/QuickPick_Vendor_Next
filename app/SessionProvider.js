'use client';
import { SessionProvider as Provider } from 'next-auth/react';

// Remove the type annotation for Props
function SessionProvider({ children }) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}

export default SessionProvider;