export default function dateToEpochConverter(date: string): string {
  const myDate = new Date(date);
  const myEpoch = myDate.getTime() / 1000.0;
  return myEpoch.toString();
}
