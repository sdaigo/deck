// returns today's date in YYYY-MM-DD format
export const today = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return [year, month > 9 ? month : `0${month}`, day > 9 ? day : `0${day}`].join("-");
};
