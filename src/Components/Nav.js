import Link from "next/link";

async function Nav() {
  return (
    <header className="flex items-center justify-between p-4">
      <Link href={"/"}>
        <h1 className="text-xl font-bold lg:text-3xl text-orange">
          Word Thread
        </h1>
      </Link>
      <nav className="flex items-center gap-2 text-lg lg:gap-4">
        <Link
          href="/teacher-login"
          className="p-1 border border-gray-700 rounded-md lg:p-2"
        >
          Login{" "}
        </Link>

        <Link
          href="/teacher-register"
          className="p-2 font-bold text-white rounded-md lg:py-2 lg:px-3 bg-purple"
        >
          Register
        </Link>
      </nav>
    </header>
  );
}

export default Nav;
