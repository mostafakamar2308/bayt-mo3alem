"use client";

import { useRouter } from "next/navigation";

function LogoutBtn() {
  const Router = useRouter();
  const handleLogout = function () {
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    Router.refresh();
  };
  return (
    <button onClick={handleLogout} className="p-4 py-2 text-white bg-purple">
      تسجيل الخروج
    </button>
  );
}

export default LogoutBtn;
