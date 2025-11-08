// Global array to store assignments
let assignments = [];

/**
 * Initialize assignments from localStorage
 */
function initializeAssignments() {
  assignments = loadFromStorage(STORAGE_KEYS.ASSIGNMENTS) || [];
  console.log(`Loaded ${assignments.length} assignments from storage`);
}

/**
 * CREATE: Add a new assignment
 *
 * @param {Object} assignmentData - Assignment info from form
 * @returns {Object} Created assignment object
 */
function createAssignment(assignmentData) {
  const assignment = {
    id: generateId(),
    courseId: parseInt(assignmentData.courseId), // Link to course
    title: assignmentData.title,
    description: assignmentData.description || "",
    dueDate: assignmentData.dueDate, // ISO date string
    priority: assignmentData.priority || "medium",
    points: parseInt(assignmentData.points) || 0,
    completed: false,
    completedDate: null,
    createdAt: new Date().toISOString(),
  };

  // Validate before adding
  validateAssignment(assignment);

  // Add to array
  assignments.push(assignment);

  // Save to storage
  saveToStorage(STORAGE_KEYS.ASSIGNMENTS, assignments);

  console.log("Assignment created:", assignment);
  return assignment;
}

/**
 * READ: Get all assignments
 *
 * @returns {Array} All assignments
 */
function getAssignments() {
  return assignments;
}

/**
 * READ: Get assignments for specific course
 *
 * @param {number} courseId - Course ID
 * @returns {Array} Filtered assignments
 */
function getAssignmentsByCourse(courseId) {
  // filter() creates new array with only matching items
  return assignments.filter((a) => a.courseId === courseId);
}

/**
 * UPDATE: Toggle assignment completion status
 * This is called when user clicks the checkbox
 *
 * @param {number} id - Assignment ID
 */
function toggleComplete(id) {
  // Find the assignment
  const assignment = assignments.find((a) => a.id === id);

  if (!assignment) {
    console.error("Assignment not found");
    return;
  }

  // Toggle the completed status
  assignment.completed = !assignment.completed;

  // Set completion date if completing, clear if un-completing
  assignment.completedDate = assignment.completed
    ? new Date().toISOString()
    : null;

  // Save changes
  saveToStorage(STORAGE_KEYS.ASSIGNMENTS, assignments);

  console.log("Assignment toggled:", assignment);
}

/**
 * UPDATE: Modify an assignment
 *
 * @param {number} id - Assignment ID
 * @param {Object} updates - Fields to update
 */
function updateAssignment(id, updates) {
  const index = assignments.findIndex((a) => a.id === id);

  if (index === -1) {
    throw new Error("Assignment not found");
  }

  // Merge updates
  assignments[index] = {
    ...assignments[index],
    ...updates,
    id: id, // Preserve ID
  };

  // Validate
  validateAssignment(assignments[index]);

  // Save
  saveToStorage(STORAGE_KEYS.ASSIGNMENTS, assignments);

  console.log("Assignment updated:", assignments[index]);
}

/**
 * DELETE: Remove an assignment
 *
 * @param {number} id - Assignment ID
 */
function deleteAssignment(id) {
  // filter() creates new array without this assignment
  assignments = assignments.filter((a) => a.id !== id);

  // Save
  saveToStorage(STORAGE_KEYS.ASSIGNMENTS, assignments);

  console.log("Assignment deleted:", id);
}

/**
 * DELETE: Remove all assignments for a course
 * Called when a course is deleted
 *
 * @param {number} courseId - Course ID
 */
function deleteAssignmentsByCourse(courseId) {
  assignments = assignments.filter((a) => a.courseId !== courseId);
  saveToStorage(STORAGE_KEYS.ASSIGNMENTS, assignments);
  console.log(`Deleted all assignments for course ${courseId}`);
}

/**
 * Check if an assignment is overdue
 *
 * @param {Object} assignment - Assignment object
 * @returns {boolean} True if overdue
 */
function isOverdue(assignment) {
  if (assignment.completed) {
    return false; // Completed assignments aren't overdue
  }

  const dueDate = new Date(assignment.dueDate);
  const today = new Date();

  return dueDate < today;
}
