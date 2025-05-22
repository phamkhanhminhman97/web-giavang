import { useMemo } from "react";

/**
 * Custom hook to provide formatted date and time strings
 * @param date - Optional Date object (defaults to current date/time)
 * @param locale - Optional locale string (defaults to 'vi-VN')
 * @returns Object containing formatted date and time strings
 */
export function useFormattedDate(date = new Date(), locale = 'vi-VN') {
  // Memoize the date object to avoid unnecessary re-renders
  const dateObj = useMemo(() => date, [date]);
  
  // Memoize the formatted date string
  const formattedDate = useMemo(() => 
    dateObj.toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }), 
  [dateObj, locale]);
  
  // Memoize the formatted time string
  const formattedTime = useMemo(() => 
    dateObj.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }), 
  [dateObj, locale]);
  
  // Memoize the full formatted date and time string
  const formattedDateTime = useMemo(() => 
    dateObj.toLocaleString(locale), 
  [dateObj, locale]);
  
  return {
    date: dateObj,
    formattedDate,
    formattedTime,
    formattedDateTime
  };
}
