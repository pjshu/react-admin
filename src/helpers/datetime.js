const formatTime = (d, accuracy = 'minutes') => {
  if (typeof d === 'number') {
    d = new Date(d * 1000);
  } else if (typeof d === "string") {
    d = new Date(d);
  }

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  const second = d.getSeconds();
  return `${year}/${month}/${date} ${hour}:${minutes < 10 ? 0 : ''}${minutes}${accuracy === 'second' ? `:${second}` : ''}`;
};

const getCurrentTime = (accuracy = 'minutes') => {
  const current = new Date();
  return formatTime(current, accuracy);
};

const getTimeStamp = (formatTime = null) => {
  return formatTime ? new Date(formatTime).getTime() : new Date().getTime();
};

export default getCurrentTime;
export {formatTime, getTimeStamp};
