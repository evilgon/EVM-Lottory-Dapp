import React, { MouseEventHandler } from "react";

interface Props {
  text: String
  type?: 'primary' | 'outlined' 
  onClick:MouseEventHandler<HTMLButtonElement>
}

const buttonTypes = {
  primary:"bg-[#194a41]",
  outlined:"border border-[#194a41]"
}
function Button(props: Props) {
  const { text,type='primary',onClick } = props;
  return (
    <button className={`${buttonTypes[type]}  text-white font-bold px-4 mx-4 py-2 rounded-md transition-all duration-200 hover:opacity-50`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
