import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex">
      <Link href={"/teacher-register"}>Register teacher</Link>
    </main>
  );
}
