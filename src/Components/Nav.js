import Link from "next/link";

async function Nav() {
  return (
    <header className="flex justify-between p-4">
      <Link href={"/"}>
        <h1 className="text-3xl font-bold text-orange">Word Thread</h1>
      </Link>
      <nav className="flex items-center gap-4 text-lg">
        <Link
          href="https://t.me/Madareg_barmja"
          className="p-2 border border-gray-700 rounded-md"
        >
          Contact Us{" "}
        </Link>

        <Link
          href="/#register"
          className="px-3 py-2 font-bold text-white rounded-md bg-purple"
        >
          Register
        </Link>
      </nav>
    </header>
  );
}

export default Nav;
