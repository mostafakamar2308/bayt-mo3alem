import Sidebar from "@/Components/Sidebar";
import React from "react";

function layout({ children }) {
  return (
    <div className="gap-2 lg:flex" dir="ltr">
      <Sidebar />
      <div className="grow-[8] min-h-screen">{children}</div>
    </div>
  );
}

export default layout;
