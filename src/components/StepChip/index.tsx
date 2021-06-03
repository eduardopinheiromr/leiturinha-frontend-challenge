import React from "react";

type Props = {
  position: number;
  step: number;
  onClick: () => void;
  label: string;
};

export default function index({ position, step, onClick, label }: Props) {
  const isSelected = position === step;

  return (
    <div
      className={
        (isSelected && "font-bold") + " flex items-center cursor-pointer"
      }
      onClick={onClick}
    >
      <p
        className={
          (isSelected && "bg-black text-white") +
          " border h-10 w-10 flex items-center justify-center rounded-full"
        }
      >
        {position}
      </p>
      <span className="ml-3">{label}</span>
    </div>
  );
}
