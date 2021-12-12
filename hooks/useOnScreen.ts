import { MutableRefObject, useEffect, useRef, useState } from "react";

export default function useOnScreen(
  // ref: MutableRefObject<HTMLDivElement | null>,
  opts: IntersectionObserverInit = { rootMargin: "0px" }
): [boolean, MutableRefObject<HTMLDivElement | null>] {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, opts);

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [ref, opts]);

  return [isIntersecting, ref];
}
