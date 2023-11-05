const dateRange = (date) => {
  const range = new Date().getTime() - date.getTime();
  if (range > 86400000) {
    return "past";
  } else if (range < 0) {
    return "future";
  } else {
    return "present";
  }
};

export default dateRange;
