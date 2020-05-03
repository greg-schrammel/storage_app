import * as React from 'react';

import { onAuthStateChanged } from 'services/auth';

const useUser = () => {
  const [user, setUser] = React.useState();
  React.useEffect(() => onAuthStateChanged(setUser));
  return user;
};

export default useUser;
