import { useCallback, useEffect, useState } from "react";

import { httpGetPlanets } from "./requests";

function usePlanets() {
  const [planets, savePlanets] = useState([]); // initial state of planets variable | ROW 6

  const getPlanets = useCallback(async () => {
    const fetchedPlanets = await httpGetPlanets(); // which is then populated using http request
    savePlanets(fetchedPlanets); // then we call the savePlanets method that react made avaialble for ue above on ROW 6
  }, []);

  useEffect(() => { // use effect is made available by reacot se first raw, to always call our getPlanets function when we first load the app
    getPlanets();
  }, [getPlanets]);

  return planets;
}

export default usePlanets;
