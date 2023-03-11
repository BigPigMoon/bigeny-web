const getDate = (dateStr: string) => {
  // Сегодня в 20:30
  // Вчера в 18:23
  // 12 декабря в 13:40

  const date = new Date(Date.parse(dateStr));

  let res = "";

  const now = new Date();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (date.getDay() === now.getDay()) res += "Today ";
  else if (date.getDay() === now.getDay() - 1) res += "Yesterday ";
  else res += `${date.getDay()} ${monthNames[date.getMonth()]}`;

  res += date.toLocaleTimeString();

  return res;
};

export default getDate;
