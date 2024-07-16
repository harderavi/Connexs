import { format, isThisYear, parseISO } from 'date-fns';

export const formatBytesToMB = (bytes: number): string => {
  if (bytes === 0) return "0 MB";

  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
};


export const formatDate = (date: Date | string, dateFormat: string = 'yyyy-MM-dd'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, dateFormat);
};
export const formatStdDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const dateFormat = isThisYear(dateObj) ? 'dd MMM' : 'dd MMM yyyy';
  return format(dateObj, dateFormat);
};
export const formatDateTime = (date: Date | string, dateTimeFormat: string = 'yyyy-MM-dd HH:mm:ss'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, dateTimeFormat);
};

export const formatTime = (date: Date | string, timeFormat: string = 'HH:mm a'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, timeFormat);
};