function timestampToString(timestamp: number) {
  const date = new Date(timestamp);

  const day = date.getDate();
  // const month = date.getMonth() + 1;
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  // return `${day}/${month}/${year}`;
  return `${month} ${day}, ${year}`;
}

export default timestampToString;
