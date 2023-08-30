import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

async function page() {
  const session = await getServerSession(options);
  console.log(session);
  return <div>page</div>;
}

export default page;
