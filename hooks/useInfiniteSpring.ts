import { useState } from "react";
import { useSpring } from "react-spring";

function useInfiniteSpring(options: object) {
  const [flip, setFlip] = useState(false);
  const props = useSpring({
    reverse: flip,
    onRest: () => setFlip(!flip),
    ...options,
  });
  return props as any;
}

export default useInfiniteSpring;
