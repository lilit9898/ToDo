const month = [
  'Jan',
  'Feb',
  'March',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const date = new Date();
export let monthName = month[date.getMonth()];
export const day = new Date().getDay();
