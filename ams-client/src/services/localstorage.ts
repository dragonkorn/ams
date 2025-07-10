// LocalStorageService class for reading and writing localStorage in pure JavaScript
export class LocalStorageService {
  // Save data to localStorage
  static setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value)
      window.localStorage.setItem(key, serializedValue)
    } catch (error) {
      // Handle error if serialization fails
      console.error('Error saving to localStorage:', error)
      throw error
    }
  }

  // Read data from localStorage
  static getItem<T = any>(key: string): T | null {
    try {
      const item = window.localStorage.getItem(key)
      if (item === null) return null
      return JSON.parse(item) as T
    } catch (error) {
      // Handle error if parsing fails
      console.error('Error reading from localStorage:', error)
      throw error
    }
  }

  // Remove data from localStorage
  static removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      // Handle error if remove fails
      console.error('Error removing from localStorage:', error)
      throw error
    }
  }

  // Clear all data from localStorage
  static clear(): void {
    try {
      window.localStorage.clear()
    } catch (error) {
      // Handle error if clear fails
      console.error('Error clearing localStorage:', error)
      throw error
    }
  }
}
