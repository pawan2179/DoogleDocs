import { JSX, useState } from "react";

interface IconButtonProps {
  icon: JSX.Element;
  tooltip: string;
  onClick: Function;
}

const IconBtn = ({icon, tooltip, onClick}: IconButtonProps) => {
  const [showToolTip, setShowToolTip] = useState(false);
  return (
    <div
      onMouseOver={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
      className="relative flex justify-center items-center"
    >
      <button
        onClick={() => onClick()}
        className="text-gray-600 flex justify-center items-center w-7 h-7 rounded-sm hover:bg-gray-100"
      >{icon}
      </button>
      {showToolTip && (
        <div className="absolute text-gray-600 top-full flex-col flex items-center">
          <div className="arrow-up border-b-gray-700"></div>
          <div className="relative -top-[1px] bg-gray-700 text-white text-xs font-medium text-center py-1 px-2 rounded-sm">{tooltip}</div>
        </div>
      )}
    </div>
  )

}

export default IconBtn;