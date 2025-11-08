/**
 * Filter assignments by multiple criteria
 *
 * @param {Array} assignmentList - List of assignments to filter
 * @param {Object} filters - Filter criteria {courseId, status, priority, searchTerm}
 * @returns {Array} Filtered assignments
 */
function filterAssignments(assignmentList, filters = {}) {
  let filtered = [...assignmentList]; // Create copy of array

  // Filter by course
  if (filters.courseId && filters.courseId !== "all") {
    filtered = filtered.filter(
      (a) => a.courseId === parseInt(filters.courseId)
    );
  }

  // Filter by completion status
  if (filters.status && filters.status !== "all") {
    if (filters.status === "complete") {
      filtered = filtered.filter((a) => a.completed);
    } else if (filters.status === "incomplete") {
      filtered = filtered.filter((a) => !a.completed);
    } else if (filters.status === "overdue") {
      filtered = filtered.filter((a) => isOverdue(a));
    }
  }

  // Filter by priority
  if (filters.priority && filters.priority !== "all") {
    filtered = filtered.filter((a) => a.priority === filters.priority);
  }

  // Filter by search term (searches title and description)
  if (filters.searchTerm && filters.searchTerm.trim() !== "") {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        (a.description && a.description.toLowerCase().includes(term))
    );
  }

  return filtered;
}

/**
 * Sort assignments by due date
 *
 * @param {Array} assignmentList - Assignments to sort
 * @returns {Array} Sorted array (earliest first)
 */
function sortByDueDate(assignmentList) {
  // sort() compares two items at a time
  // Negative number = a comes first
  // Positive number = b comes first
  // Zero = no change
  return assignmentList.sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA - dateB; // Ascending order (earliest first)
  });
}

/**
 * Sort assignments by priority
 * Priority order: high → medium → low
 *
 * @param {Array} assignmentList - Assignments to sort
 * @returns {Array} Sorted array
 */
function sortByPriority(assignmentList) {
  // Map priorities to numbers for easy sorting
  const priorityOrder = { high: 3, medium: 2, low: 1 };

  return assignmentList.sort((a, b) => {
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

/**
 * Sort assignments by points value
 *
 * @param {Array} assignmentList - Assignments to sort
 * @returns {Array} Sorted array (highest points first)
 */
function sortByPoints(assignmentList) {
  return assignmentList.sort((a, b) => b.points - a.points);
}

/**
 * Calculate statistics for a list of assignments
 *
 * reduce() is perfect for aggregating data into a single result
 *
 * @param {Array} assignmentList - Assignments to analyze
 * @returns {Object} Statistics {completed, overdue, pointsEarned, totalPoints, completionRate}
 */
function calculateStats(assignmentList) {
  // reduce() takes an accumulator and each item
  // The accumulator starts as the initial value (last parameter)
  const stats = assignmentList.reduce(
    (acc, assignment) => {
      // Count completed
      if (assignment.completed) {
        acc.completed++;
        acc.pointsEarned += assignment.points;
      }

      // Count total points
      acc.totalPoints += assignment.points;

      // Check if overdue
      if (isOverdue(assignment)) {
        acc.overdue++;
      }

      return acc; // Return accumulator for next iteration
    },
    {
      // Initial accumulator value
      completed: 0,
      overdue: 0,
      pointsEarned: 0,
      totalPoints: 0,
    }
  );

  // Calculate completion rate as percentage
  stats.completionRate =
    assignmentList.length > 0
      ? ((stats.completed / assignmentList.length) * 100).toFixed(1)
      : 0;

  return stats;
}

/**
 * Get upcoming assignments (due within X days)
 *
 * @param {Array} assignmentList - Assignments to check
 * @param {number} days - Number of days to look ahead
 * @returns {Array} Upcoming assignments
 */
function getUpcomingAssignments(assignmentList, days = 7) {
  const today = new Date();
  const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);

  return assignmentList.filter((a) => {
    if (a.completed) return false;

    const dueDate = new Date(a.dueDate);
    return dueDate >= today && dueDate <= futureDate;
  });
}

/**
 * Check if any assignments are overdue
 *
 * some() returns true if AT LEAST ONE item passes the test
 *
 * @param {Array} assignmentList - Assignments to check
 * @returns {boolean} True if any are overdue
 */
function hasOverdueAssignments(assignmentList) {
  return assignmentList.some((a) => isOverdue(a));
}

/**
 * Transform assignments for chart display
 *
 * map() creates a new array by transforming each item
 *
 * @param {Array} assignmentList - Assignments to transform
 * @returns {Array} Array of {label, value} for charts
 */
function prepareChartData(assignmentList) {
  // Group by priority
  const priorities = { high: 0, medium: 0, low: 0 };

  assignmentList.forEach((a) => {
    priorities[a.priority]++;
  });

  // Transform to chart format
  return Object.keys(priorities).map((priority) => ({
    label: priority.charAt(0).toUpperCase() + priority.slice(1),
    value: priorities[priority],
  }));
}
