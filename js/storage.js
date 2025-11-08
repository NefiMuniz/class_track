const STORAGE_KEYS = {
  COURSES: "classtrack_courses",
  ASSIGNMENTS: "classtrack_assignments",
};

/**
 * Save data to localStorage
 *
 * @param {string} key - The name to save the data under
 * @param {any} data - The data to save (will be converted to JSON string)
 * @throws {Error} If storage is full or disabled
 */
function saveToStorage(key, data) {
  try {
    // Convert JavaScript object/array to JSON string
    // Example: {name: "CSE 310"} becomes '{"name":"CSE 310"}'
    const jsonString = JSON.stringify(data);

    // Save to localStorage
    localStorage.setItem(key, jsonString);
  } catch (error) {
    // Handle specific error types
    if (error.name === "QuotaExceededError") {
      // localStorage is full
      throw new Error("Storage quota exceeded! Please delete old data.");
    } else if (error.name === "SecurityError") {
      // localStorage is disabled in browser settings
      throw new Error("localStorage is disabled or unavailable.");
    } else {
      // Some other error occurred
      throw error;
    }
  }
}

/**
 * Load data from localStorage
 *
 * @param {string} key - The name the data was saved under
 * @returns {any} The loaded data, or null if not found
 */
function loadFromStorage(key) {
  try {
    const jsonString = localStorage.getItem(key);

    if (!jsonString) {
      return null;
    }

    // Convert JSON string back to JavaScript object/array
    // Example: '{"name":"CSE 310"}' becomes {name: "CSE 310"}
    return JSON.parse(jsonString);
  } catch (error) {
    // If JSON is corrupted or invalid, log error and return null
    console.error("Error loading from storage:", error);
    return null;
  }
}

/**
 * Clear all app data from localStorage
 * Useful for testing or resetting the app
 */
function clearAllStorage() {
  try {
    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.ASSIGNMENTS);
    console.log("All data cleared successfully");
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
}
