import Sidebar from "@/Components/Sidebar";
import React from "react";

function layout({ children }) {
  return (
    <div className="flex min-h-screen gap-2">
      <Sidebar />
      <div className="grow-[10]">{children}</div>
    </div>
  );
}

export default layout;
