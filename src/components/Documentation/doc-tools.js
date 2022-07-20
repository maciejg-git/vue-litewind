let stringifyObject = (value, highlight) => {
  let s = JSON.stringify(value, null, "&#9;");
  if (!highlight) return s;
  return s
    .replace(/(false)/gi, "<span class='text-danger-400 font-semibold'>$1</span>")
    .replace(/(true)/gi, "<span class='text-success-400 font-semibold'>$1</span>");
};

export {
  stringifyObject,
};
