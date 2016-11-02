'use strict';

define([], () => {
  const config = {
    apiKey: 'AIzaSyDmchc2BGqhV4Ku_z-6v_WFERtTALhFGDs',
    scopes: 'https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/userinfo.profile',
    clientId: '254065977502-eq85v6ctoe4jp05nel72cbct5ail0dri.apps.googleusercontent.com'
  };

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  return config;
});
