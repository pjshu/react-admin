const formatTime = (d, accuracy = 'minutes') => {
  if (typeof d === "string") {
    d = new Date(d);
  }
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  const second = d.getSeconds();
  return `${year}/${month}/${date} ${hour}:${minutes < 10 ? 0 : ''}${minutes}${accuracy === 'second' ? ` ${second}s` : ''}`;
};

const getCurrentTime = (accuracy = 'minutes') => {
  const current = new Date();
  return formatTime(current, accuracy);
};

export default getCurrentTime;
export {formatTime};
