/**
 * Validate course data before creating/updating
 *
 * @param {Object} course - Course object to validate
 * @returns {boolean} True if valid (throws error if invalid)
 * @throws {Error} If validation fails
 */
function validateCourse(course) {
  try {
    // Check 1: Course name is required
    if (!course.name || course.name.trim() === "") {
      throw new Error("Course name is required");
    }

    // Check 2: Course code is required
    if (!course.code || course.code.trim() === "") {
      throw new Error("Course code is required");
    }

    // Check 3: Course code format validation
    // Examples: "CSE 310", "GESCI 110", "PUBH 210"
    const codePattern = /^[A-Z]{3,5}\s?\d{3}$/i;
    if (!codePattern.test(course.code)) {
      throw new Error(
        "Course code must be 3-5 letters + 3 numbers (e.g., CSE 310, GESCI 110)"
      );
    }

    // Check 4: No duplicate course codes
    // Get existing courses from storage
    const existingCourses = loadFromStorage(STORAGE_KEYS.COURSES) || [];

    // Check if this code already exists (skip if editing same course)
    const duplicate = existingCourses.find(
      (c) =>
        c.code.toUpperCase() === course.code.toUpperCase() && c.id !== course.id
    );

    if (duplicate) {
      throw new Error(`Course ${course.code} already exists`);
    }

    // All checks passed!
    return true;
  } catch (error) {
    // Display user-friendly error message
    displayErrorMessage(error.message);

    // Re-throw the error so calling function knows validation failed
    throw error;
  }
}

/**
 * Validate assignment data
 *
 * @param {Object} assignment - Assignment object to validate
 * @returns {boolean} True if valid
 * @throws {Error} If validation fails
 */
function validateAssignment(assignment) {
  try {
    // Check 1: Title is required
    if (!assignment.title || assignment.title.trim() === "") {
      throw new Error("Assignment title is required");
    }

    // Check 2: Course must be selected
    if (!assignment.courseId) {
      throw new Error("Please select a course for this assignment");
    }

    // Check 3: Due date is required
    if (!assignment.dueDate) {
      throw new Error("Due date is required");
    }

    // Check 4: Due date must be valid
    const dueDate = new Date(assignment.dueDate);
    if (isNaN(dueDate.getTime())) {
      throw new Error("Invalid due date format");
    }

    // Check 5: Points must be non-negative
    if (assignment.points < 0) {
      throw new Error("Points cannot be negative");
    }

    // Check 6: Priority must be valid
    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(assignment.priority)) {
      throw new Error("Priority must be low, medium, or high");
    }

    // All checks passed!
    return true;
  } catch (error) {
    displayErrorMessage(error.message);
    throw error;
  }
}

/**
 * Display error message to user
 *
 * @param {string} message - Error message to show
 */
function displayErrorMessage(message) {
  // Simple alert
  alert("⚠️ " + message);

  // Also log to console for debugging
  console.error("Validation Error:", message);
}

/**
 * Display success message to user
 *
 * @param {string} message - Success message to show
 */
function displaySuccessMessage(message) {
  console.log("✅ " + message);
}
