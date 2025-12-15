'use client';

import React from 'react';

// This is a simple obfuscation technique. The string "© 2025 BrokenxNetwork" is Base64 encoded.
export const EncodedFooter = () => {
  const [decodedText, setDecodedText] = React.useState('');
  React.useEffect(() => {
    // Decode only on the client-side to prevent hydration mismatch
    setDecodedText(atob('wqkgMjAyNSBCcm9rZW54TmV0d29yaw=='));
  }, []);

  return (
    <footer className="text-center p-4 text-xs text-muted-foreground">
      {decodedText}
    </footer>
  );
};
