import { useEffect } from "react";
 
const useOnClickOutside = (ref, handler) => {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mouseup", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mouseup", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      [ref, handler]
    );
};
 
export default useOnClickOutside;