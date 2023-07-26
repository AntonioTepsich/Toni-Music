import { useEffect } from 'react';

const RedirectPage = () => {
  useEffect(() => {
    // Redirect to /webapp/playlists
    window.location.href = '/webapp/playlists';
  }, []);

  return null;
};

export default RedirectPage;
