/* eslint-disable no-console */
import { useState, useEffect } from 'react';

function useFilter(currentGender, currentSpecies, currentStatus) {
  const [addition, setAddition] = useState('');

  useEffect(() => {
    setAddition(`&status=${currentStatus}&gender=${currentGender}&species=${currentSpecies}`);
  }, [currentGender, currentSpecies, currentStatus]);

  return addition;
}

export default useFilter;