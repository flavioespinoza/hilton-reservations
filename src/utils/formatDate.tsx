function pad(s: any) {
  return s < 10 ? "0" + s : s;
}

export default function _fomatDate(date: Date) {
  let d = new Date(date);

  return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join("/");
}
