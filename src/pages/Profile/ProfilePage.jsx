import React from 'react';
import Preferences from './Preferences';
import SyncSettings from './SyncSettings';

const ProfilePage = () => {
  return (
    <div>
      <h2>Profil utilisateur</h2>
      <Preferences />
      <SyncSettings />
    </div>
  );
};

export default ProfilePage;
