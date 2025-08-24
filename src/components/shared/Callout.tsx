import React from "react";

export interface CalloutProps {
  type?: "info" | "warning" | "error";
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ type = "info", children }) => {
  const color =
    type === "error"
      ? "border-red-500 bg-red-50 text-red-800"
      : type === "warning"
      ? "border-yellow-500 bg-yellow-50 text-yellow-800"
      : "border-blue-500 bg-blue-50 text-blue-800";
  return (
    <div className={`border-l-4 p-4 mb-4 rounded ${color}`}>
      {children}
    </div>
  );
};
