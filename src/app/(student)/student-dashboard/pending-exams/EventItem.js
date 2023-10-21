import { subjects } from "@/constants";
import { useMemo } from "react";

function EventItem({ info, subject }) {
  const { event } = info;

  const color = useMemo(() => {
    return subjects.find((currSubject) => currSubject.value === subject).colors;
  }, [subject]);
  return (
    <div className={`py-4 text-right px-1 text-xl  ${color}`}>
      {event.title}
    </div>
  );
}

export default EventItem;
