const formatTime = (d) => {
  if (typeof d === "string") {
    d = new Date(d);
  }
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  return `${year}/${month}/${date} ${hour}:${minutes}`;
};

const getCurrentTime = () => {
  const current = new Date();
  return formatTime(current);
};

export default getCurrentTime;
export {formatTime};
