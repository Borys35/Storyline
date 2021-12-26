import { FC } from "react";
import { animated } from "react-spring";
import useInfiniteSpring from "../../hooks/useInfiniteSpring";

const SkeletonItem: FC = () => {
  const { opacity } = useInfiniteSpring({
    from: { opacity: 0.5 },
    to: { opacity: 0.7 },
    delay: 500,
    config: { mass: 50 },
  });

  return (
    <animated.div
      className="element p-4 bg-gray-500 h-32"
      style={{ opacity: opacity.to((opacity: number) => opacity) }}
    ></animated.div>
  );
};

export default SkeletonItem;
