import classNames = require("classnames");
import * as React from "react";

interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  isDisabled?: boolean;
}

export const Link: React.FunctionComponent<LinkProps> = ({
  children,
  onClick,
  href = "#",
  isDisabled = false,
  className = "",
}: LinkProps) => {
  const onClickProxy = onClick
    ? (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        onClick(event);
      }
    : (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
        event.preventDefault();

  const aClassNames = classNames({
    "opacity-50": isDisabled,
    "pointer-events-none": isDisabled,
  });

  return (
    <a
      href={href}
      className={className + " " + aClassNames}
      onClick={onClickProxy}
    >
      {children}
    </a>
  );
};
