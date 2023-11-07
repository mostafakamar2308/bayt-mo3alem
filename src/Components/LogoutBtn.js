"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import logout from "@/Assets/sign-out.png";
import Image from "next/image";

function LogoutBtn({ tokenName, link }) {
  const Router = useRouter();
  const handleLogout = () => {
    Cookies.remove(tokenName);
    Router.push(`/${link}-login`);
  };
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 p-4 py-2 text-white border border-white rounded-md"
    >
      <Image
        src={logout}
        className="hidden lg:inline"
        alt="log out icon"
        width={30}
      />
      Log out{" "}
    </button>
  );
}

export default LogoutBtn;
