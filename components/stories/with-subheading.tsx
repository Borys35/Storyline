import { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  subheading: string;
}

const WithSubheading: FC<Props> = ({ children, subheading, ...props }) => {
  return (
    <div {...props}>
      <span className="uppercase text-primary text-sm font-bold tracking-widest">
        {subheading}
      </span>
      {children}
    </div>
  );
};

export default WithSubheading;
