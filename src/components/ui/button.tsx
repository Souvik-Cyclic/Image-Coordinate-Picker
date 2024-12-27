import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const buttonClass = classNames(
    "inline-flex items-center justify-center font-medium focus:outline-none transition",
    {
      "bg-blue-500 text-white hover:bg-blue-600": variant === "primary",
      "border border-gray-300 text-gray-700 hover:bg-gray-100": variant === "outline",
      "px-4 py-2 text-sm": size === "sm",
      "px-6 py-3 text-base": size === "md",
      "px-8 py-4 text-lg": size === "lg",
    },
    className
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};
