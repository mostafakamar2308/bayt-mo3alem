import Sidebar from "@/Components/Sidebar";
import React from "react";

function layout({ children }) {
  return (
    <div className="flex gap-2" dir="ltr">
      <Sidebar />
      <div className="grow-[8] min-h-screen">{children}</div>
    </div>
  );
}

export default layout;
