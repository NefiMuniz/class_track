/**
 * RECURSION EXAMPLE 1: Calculate total points in nested categories
 *
 * Example category structure:
 * {
 *   name: "Programming",
 *   points: 100,
 *   subcategories: [
 *     {name: "JavaScript", points: 50, subcategories: []},
 *     {name: "Python", points: 30, subcategories: []}
 *   ]
 * }
 * Result: 100 + 50 + 30 = 180 total points
 *
 * @param {Object} category - Category object with potential subcategories
 * @returns {number} Total points including all nested subcategories
 */
function calculateCategoryPoints(category) {
  // BASE CASE: If no category provided, return 0
  if (!category) {
    return 0;
  }

  // Start with this category's own points
  let total = category.points || 0;

  // RECURSIVE CASE: If there are subcategories, add their points too
  if (category.subcategories && category.subcategories.length > 0) {
    // Loop through each subcategory
    for (let subcat of category.subcategories) {
      total += calculateCategoryPoints(subcat);
    }
  }

  return total;
}

/**
 * RECURSION EXAMPLE 2: Find an assignment in a nested tree structure
 *
 * @param {Array} items - Array of assignment objects (may have subAssignments)
 * @param {number} targetId - The ID we're looking for
 * @returns {Object|null} The found assignment or null if not found
 */
function findAssignmentRecursive(items, targetId) {
  // BASE CASE 1: Empty array or no items
  if (!items || items.length === 0) {
    return null;
  }

  // Loop through each item in the array
  for (let item of items) {
    // BASE CASE 2: Found the target!
    if (item.id === targetId) {
      return item;
    }

    // RECURSIVE CASE: Search in sub-assignments
    if (item.subAssignments && item.subAssignments.length > 0) {
      const found = findAssignmentRecursive(item.subAssignments, targetId);

      // If we found it in the sub-assignments, return it
      if (found) {
        return found;
      }
    }
  }

  return null;
}

/**
 * Generate a unique ID using timestamp
 * This creates a simple unique identifier based on the current time
 *
 * @returns {number} A unique timestamp-based ID
 */
function generateId() {
  return Date.now();
}

/**
 * Format a date for display
 *
 * @param {string} dateString - ISO date string (e.g., "2025-11-15")
 * @returns {string} Formatted date (e.g., "Nov 15, 2025")
 */
function formatDate(dateString) {
  try {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (error) {
    return dateString;
  }
}

/**
 * Calculate days until a due date
 * Useful for showing "3 days remaining" messages
 *
 * @param {string} dueDate - ISO date string
 * @returns {number} Number of days (negative if overdue)
 */
function calculateDaysUntil(dueDate) {
  const due = new Date(dueDate);
  const today = new Date();

  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Calculate difference in milliseconds, then convert to days
  const diffMs = due - today;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}
