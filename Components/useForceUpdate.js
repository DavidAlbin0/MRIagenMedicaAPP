import React, { useState } from 'react';

import { useReducer } from 'react';

const forceUpdateReducer = (state) => !state;

export const useForceUpdate = () => {
  const [, forceUpdate] = useReducer(forceUpdateReducer, false);
  return forceUpdate;
};
export default useForceUpdate;

