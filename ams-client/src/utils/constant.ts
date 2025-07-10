export const Month = {
  JANUARY: 1,
  FEBRUARY: 2,
  MARCH: 3,
  APRIL: 4,
  MAY: 5,
  JUNE: 6,
  JULY: 7,
  AUGUST: 8,
  SEPTEMBER: 9,
  OCTOBER: 10,
  NOVEMBER: 11,
  DECEMBER: 12,
} as const;

export type MonthType = typeof Month[keyof typeof Month];


export const SimpleDateFormat = "YYYYMMDD";

export function DateToSimpleFormat(date: Date): string {
  return date.toISOString().split('T')[0].replace(/-/g, '');
}

// From input simple format date, return date object
// Example: 20250101 -> 2025-01-01 as Date object
export function SimpleFormatToDate(date: string): Date {
  // validate date format by regex
  const regex = /^(\d{4})(\d{2})(\d{2})$/;
  if (!regex.test(date)) {
    throw new Error("Invalid date format");
  }

  // return date object
  return new Date(parseInt(date.slice(0, 4)), parseInt(date.slice(4, 6)) - 1, parseInt(date.slice(6, 8)));
}