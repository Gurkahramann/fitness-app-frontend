// Function to convert Gregorian date to Jalali date (if needed)
export function gregorianToJalali(date: Date): { year: number; month: number; day: number } {
    // This is a simplified implementation
    // For a complete implementation, you might want to use a library like moment-jalaali
  
    // For now, we'll just return the Gregorian date
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    }
  }
  
  // Function to convert Jalali date to Gregorian date (if needed)
  export function jalaliToGregorian(year: number, month: number, day: number): Date {
    // This is a simplified implementation
    // For a complete implementation, you might want to use a library like moment-jalaali
  
    // For now, we'll just return a new Date with the provided values
    return new Date(year, month - 1, day)
  }
  
  // Format date as YYYY/MM/DD for the date picker
  export function formatDateForPicker(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
  }
  
  // Format date as DD/MM/YYYY for display
  export function formatDateForDisplay(dateStr: string): string {
    const [year, month, day] = dateStr.split("/")
    return `${day}/${month}/${year}`
  }
  