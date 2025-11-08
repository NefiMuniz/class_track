// Global array to store courses in memory
// This gets loaded from localStorage on page load
let courses = [];

/**
 * Initialize courses from localStorage
 * Call this when the page loads
 */
function initializeCourses() {
  courses = loadFromStorage(STORAGE_KEYS.COURSES) || [];
  console.log(`Loaded ${courses.length} courses from storage`);
}

/**
 * CREATE: Add a new course
 *
 * @param {Object} courseData - Course information from form
 * @returns {Object} The created course object
 */
function createCourse(courseData) {
  // Create a new course object with all required fields
  const course = {
    id: generateId(), // Unique ID
    name: courseData.name, // e.g., "Applied Programming"
    code: courseData.code.toUpperCase(), // e.g., "CSE 310"
    color: courseData.color || "#0062B8", // Color for visual identification
    credits: courseData.credits || 3, // Number of credits
    semester: courseData.semester || "Fall 2025",
    archived: false, // Soft delete flag
    createdAt: new Date().toISOString(), // When it was created
  };

  // Validate before adding
  validateCourse(course);

  // Add to our array
  courses.push(course);

  // Save to localStorage so it persists
  saveToStorage(STORAGE_KEYS.COURSES, courses);

  console.log("Course created:", course);
  return course;
}

/**
 * READ: Get all active courses
 *
 * @returns {Array} Array of active (non-archived) courses
 */
function getCourses() {
  // Use filter() to get only non-archived courses
  // filter() is an ES6 array method that creates a new array with items
  // that pass a test (returns true)
  return courses.filter((course) => !course.archived);
}

/**
 * READ: Find a specific course by ID
 *
 * @param {number} id - Course ID to find
 * @returns {Object|undefined} The course object or undefined if not found
 */
function findCourseById(id) {
  // find() returns the FIRST item that matches the condition
  // It stops searching as soon as it finds a match
  return courses.find((course) => course.id === id);
}

/**
 * UPDATE: Modify an existing course
 *
 * @param {number} id - ID of course to update
 * @param {Object} updates - Object with fields to update
 * @returns {Object} Updated course object
 */
function updateCourse(id, updates) {
  // Find the index of the course in the array
  const index = courses.findIndex((c) => c.id === id);

  if (index === -1) {
    throw new Error("Course not found");
  }

  // Merge the updates with existing course data
  // The spread operator (...) copies all properties
  courses[index] = {
    ...courses[index], // Existing properties
    ...updates, // New properties (overwrites existing)
    id: id, // Ensure ID doesn't change
  };

  // Validate the updated course
  validateCourse(courses[index]);

  // Save to storage
  saveToStorage(STORAGE_KEYS.COURSES, courses);

  console.log("Course updated:", courses[index]);
  return courses[index];
}

/**
 * DELETE: Remove a course
 *
 * @param {number} id - ID of course to delete
 */
function deleteCourse(id) {
  // Use filter() to create new array WITHOUT this course
  // This is a common delete pattern in JavaScript
  courses = courses.filter((c) => c.id !== id);

  // Also delete all assignments for this course
  deleteAssignmentsByCourse(id);

  // Save updated array
  saveToStorage(STORAGE_KEYS.COURSES, courses);

  console.log("Course deleted:", id);
}

/**
 * Get count of assignments for a specific course
 * Useful for displaying on course cards
 *
 * @param {number} courseId - Course ID
 * @returns {Object} Counts object {total, completed, overdue}
 */
function getCourseAssignmentCounts(courseId) {
  // Get all assignments for this course
  const courseAssignments = getAssignmentsByCourse(courseId);

  // Calculate statistics
  const total = courseAssignments.length;
  const completed = courseAssignments.filter((a) => a.completed).length;
  const overdue = courseAssignments.filter((a) => {
    return !a.completed && new Date(a.dueDate) < new Date();
  }).length;

  return { total, completed, overdue };
}
