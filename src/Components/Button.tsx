import React from "react";
import image from '../lib/image';
const Button = ({
  loading,
  width,
  bgColor,
  color,
  onClick,
  children,
}: {
  loading?: boolean;
  width?: string;
  bgColor?: string;
  color?: string;
  onClick?: () => any;
  children?: React.ReactNode;
}) => {
  const className = `${width || "w-32"} h-12 p-1 m-1 ${color || "text-black"} rounded-md ${bgColor || "bg-white"} border-2 border-myorange flex justify-center items-center hover:bg-myyellow transition duration-200`;
  return (
    <button
      onClick={typeof onClick === "function" ? onClick : () => {}}
    className={className}
    >
      {loading ? <img src={image('three-dots.svg')} className="w-3/5"></img> : children}
    </button>
  );
};

export default Button;
