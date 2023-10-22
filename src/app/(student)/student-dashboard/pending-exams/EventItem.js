import { subjects } from "@/constants";
import { useMemo } from "react";
import Link from "next/link";

function EventItem({ info, subject }) {
  const { event } = info;

  const color = useMemo(() => {
    return subjects.find((currSubject) => currSubject.value === subject).colors;
  }, [subject]);
  return (
    <div className={`py-4 w-full text-right px-1 text-xl  ${color}`}>
      <Link href={"/exam/" + event.id}>{event.title}</Link>
    </div>
  );
}

export default EventItem;
