import { useCallback, useEffect, useState } from "react";

import {
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
} from './requests';
// ALL OF THESE HOOKS ARE JUST MAKIGN SURE THAT THE APPLICATION'S STATE IS SAVED AND 
// ANY CALCULATIONS AND API REQUESTS NEEDED FOR THAT STATE ARE ONLY PERFORMED WHEN USER HAS PERFORMED SOME ACTIONS  
// THAT WILL CASE ANY UPDATES
//FOR EXAMPLE: 
//our launches data won't be reloaded every time we swtich pages becasue nothing hase changed
//HOOKS ARE GREAT FOR MAKING OUR REACT APP MORE EFFICIENT AND MINIMIZING THE AMOUNT OF REQUESTS THAT OUR API NEEDS TO HANDLE
// WHICH SPEEDS EVERYTING UP, EVERYBODY WINS

function useLaunches(onSuccessSound, onAbortSound, onFailureSound) {

  const [launches, saveLaunches] = useState([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);

  const getLaunches = useCallback(async () => { // the useCallback is react way of saving our app from needlesly recomputing of whatever is in this function 
    const fetchedLaunches = await httpGetLaunches();
    saveLaunches(fetchedLaunches);
  }, []);

  useEffect(() => {//when app first loads
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(async (e) => {
    e.preventDefault();
    setPendingLaunch(true);
    const data = new FormData(e.target);
    const launchDate = new Date(data.get("launch-day"));
    const mission = data.get("mission-name");
    const rocket = data.get("rocket-name");
    const target = data.get("planets-selector");
    const response = await httpSubmitLaunch({
      launchDate,
      mission,
      rocket,
      target,
    });

    // TODO: Set success based on response.
    const success = response.ok; // the response.ok is set to true when or submitLaunch returns one of the 200 status codes 
    if (success) {
      getLaunches();
      setTimeout(() => {
        setPendingLaunch(false);
        onSuccessSound();
      }, 800);
    } else {
      onFailureSound();
    }
  }, [getLaunches, onSuccessSound, onFailureSound]);

  const abortLaunch = useCallback(async (id) => {//when pressign X
    const response = await httpAbortLaunch(id);

    // TODO: Set success based on response.
    const success = response.ok;
    if (success) {
      getLaunches();
      onAbortSound();
    } else {
      onFailureSound();
    }
  }, [getLaunches, onAbortSound, onFailureSound]);

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  };
}

export default useLaunches;