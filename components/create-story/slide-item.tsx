import classNames from "classnames";
import React, { FC } from "react";

interface Props {
  title: string;
  hasError: boolean;
  isSelected: boolean;
  onClick: Function;
  onBinClick: Function;
}

const SlideItem: FC<Props> = ({
  title,
  hasError,
  isSelected,
  onClick,
  onBinClick,
  ...props
}) => {
  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target !== e.currentTarget) return;
    onClick();
  }

  return (
    <div
      className={classNames(
        "relative px-8 py-4 rounded-xl bg-indigo-400 cursor-pointer border-2 border-black break-words",
        { "ring-4 ring-red-600": hasError },
        { "ring-4 ring-blue-600": isSelected }
      )}
      onClick={handleClick}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 absolute top-2 right-2 z-10"
        viewBox="0 0 20 20"
        fill="currentColor"
        onClick={() => onBinClick()}
      >
        <path
          fillRule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span className="line-clamp-3 pointer-events-none">{title}</span>
    </div>
  );
};

export default SlideItem;
