import { useEffect, useRef } from "react";

/**
 * This hook gets called only when the dependencies change but not during initial render.
 *
 */
export const useNonInitialEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}
    