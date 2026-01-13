export const pad = (n: number) => n.toString().padStart(2, "0");

export const toLocalDateTimeString = (date: Date) =>{
  if (!date) return null;

  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(date)) {
    return date;
  }

  const pad = (n:number) => n.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
