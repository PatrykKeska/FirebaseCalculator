export const getTimeStamp = () => {
  const currentDate = new Date();

  // Get the year, month, and day
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Get the local hour, minutes, and seconds
  const hour = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  // Assemble the timestamp
  // Assemble the timestamp
  const timestamp = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  return timestamp;
};
