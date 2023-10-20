function EventItem({ info }) {
  const { event } = info;

  console.log(event);
  return <div>{event.title}</div>;
}

export default EventItem;
