import classNames from "classnames";
import { FC } from "react";

interface Props {
  side: "left" | "right";
  heading: string;
  text: string;
}

const Block: FC<Props> = ({ side, heading, text }) => {
  return (
    <div>
      <h3
        className={classNames(
          "font-bold text-xl mb-1 text-center",
          { "sm:text-right": side === "left" },
          { "sm:text-left": side === "right" }
        )}
      >
        {heading}
      </h3>
      <div
        className={classNames(
          "element p-6 bg-green-500 rounded-full",
          { "sm:rounded-tr": side === "left" },
          { "sm:rounded-tl": side === "right" }
        )}
      >
        {text}
      </div>
    </div>
  );
};

export default Block;
