let currentFilters = {
  courseId: "all",
  status: "all",
  searchTerm: "",
};

function initializeApp() {
  console.log("ClassTrack initializing...");

  initializeCourses();
  initializeAssignments();

  renderCourses();
  renderAssignments();
  updateStatistics();

  attachEventListeners();

  console.log("ClassTrack ready!");
}

function attachEventListeners() {
  document.getElementById("add-course-btn").addEventListener("click", () => {
    showCourseModal();
  });

  document
    .getElementById("add-assignment-btn")
    .addEventListener("click", () => {
      showAssignmentModal();
    });

  document
    .getElementById("course-form")
    .addEventListener("submit", handleCourseSubmit);
  document
    .getElementById("assignment-form")
    .addEventListener("submit", handleAssignmentSubmit);

  let searchTimeout;
  document.getElementById("search-input").addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentFilters.searchTerm = e.target.value;
      renderAssignments();
    }, 300);
  });

  document.getElementById("filter-course").addEventListener("change", (e) => {
    currentFilters.courseId = e.target.value;
    renderAssignments();
  });

  document.getElementById("filter-status").addEventListener("change", (e) => {
    currentFilters.status = e.target.value;
    renderAssignments();
  });

  document.getElementById("sort-option").addEventListener("change", (e) => {
    renderAssignments();
  });
}

function renderCourses() {
  const container = document.getElementById("courses-container");
  const courses = getCourses();

  container.innerHTML = "";
  document.getElementById("course-count").textContent = courses.length;

  if (courses.length === 0) {
    container.innerHTML = `
            <div class="courses-empty">
                <div class="courses-empty-icon">📚</div>
                <p class="courses-empty-text">No courses yet.<br>Click "+ Add Course" to begin!</p>
            </div>
        `;
    return;
  }

  courses.forEach((course) => {
    const card = createCourseCard(course);
    container.appendChild(card);
  });

  updateCourseFilter();
}

function createCourseCard(course) {
  const card = document.createElement("div");
  card.className = "course-card";
  card.dataset.color = course.color;
  card.style.borderLeftColor = course.color;

  // Get assignment counts
  const counts = getCourseAssignmentCounts(course.id);
  const completionPercent =
    counts.total > 0 ? ((counts.completed / counts.total) * 100).toFixed(0) : 0;

  card.innerHTML = `
        <div class="course-header">
            <div>
                <div class="course-name">${course.name}</div>
                <span class="course-code">${course.code}</span>
            </div>
        </div>
        
        <div class="course-info">
            <span>📅 ${course.semester}</span>
            <span>⭐ ${course.credits} credits</span>
        </div>
        
        <div class="course-progress">
            <div class="course-progress-label">
                <span>Progress</span>
                <span>${completionPercent}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-bar-fill" style="width: ${completionPercent}%"></div>
            </div>
        </div>
        
        <div class="course-actions">
            <button class="btn-icon btn-edit" onclick="editCourse(${course.id})">✏️</button>
            <button class="btn-icon btn-delete" onclick="confirmDeleteCourse(${course.id})">🗑️</button>
        </div>
    `;

  return card;
}

function renderAssignments() {
  const container = document.getElementById("assignments-container");
  let assignments = getAssignments();

  assignments = filterAssignments(assignments, currentFilters);

  const sortOption = document.getElementById("sort-option").value;
  if (sortOption === "dueDate") {
    assignments = sortByDueDate([...assignments]);
  } else if (sortOption === "priority") {
    assignments = sortByPriority([...assignments]);
  } else if (sortOption === "points") {
    assignments = sortByPoints([...assignments]);
  }

  container.innerHTML = "";

  if (assignments.length === 0) {
    container.innerHTML = `
            <div class="assignments-empty">
                <div class="assignments-empty-icon">📝</div>
                <p class="assignments-empty-text">No assignments found</p>
            </div>
        `;
    return;
  }

  assignments.forEach((assignment) => {
    const card = createAssignmentCard(assignment);
    container.appendChild(card);
  });

  updateStatistics();
}

// Create assignment card with proper overdue handling
function createAssignmentCard(assignment) {
  const card = document.createElement("div");
  card.className = "assignment-card";

  if (assignment.completed) {
    card.classList.add("completed");
  }

  const overdueStatus = isOverdue(assignment);
  if (overdueStatus) {
    card.classList.add("overdue");
  }

  // Get course info
  const course = findCourseById(assignment.courseId);
  const courseName = course ? course.name : "Unknown Course";
  const courseColor = course ? course.color : "#666666";

  // Format due date
  const dueDate = formatDate(assignment.dueDate);
  const daysUntil = calculateDaysUntil(assignment.dueDate);
  let dueDateText = dueDate;

  // Show time-related messages
  if (!assignment.completed) {
    if (daysUntil < 0) {
      dueDateText += ` (${Math.abs(daysUntil)} days ago)`;
    } else if (daysUntil === 0) {
      dueDateText += " (Due today!)";
    } else if (daysUntil <= 3) {
      dueDateText += ` (${daysUntil} days left)`;
    }
  }

  card.innerHTML = `
        <div class="assignment-header">
            <div class="assignment-main">
                <div class="checkbox-container">
                    <input type="checkbox" 
                           ${assignment.completed ? "checked" : ""}
                           onchange="handleToggleComplete(${assignment.id})">
                    <div class="checkbox-custom"></div>
                </div>
                
                <div class="assignment-content">
                    <div class="course-badge" style="background-color: ${courseColor}; color: white;">
                        ${courseName}
                    </div>
                    <h3 class="assignment-title">${assignment.title}</h3>
                    ${
                      assignment.description
                        ? `<p class="assignment-description">${assignment.description}</p>`
                        : ""
                    }
                    
                    <div class="assignment-meta">
                        <span class="meta-item due-date ${
                          daysUntil <= 3 &&
                          daysUntil >= 0 &&
                          !assignment.completed
                            ? "due-soon"
                            : ""
                        }">
                            📅 ${dueDateText}
                        </span>
                        <span class="meta-item priority-badge priority-${
                          assignment.priority
                        }">
                            ${assignment.priority}
                        </span>
                        <span class="meta-item points">
                            ⭐ ${assignment.points} points
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="assignment-actions">
                <button class="btn-sm btn-edit-assignment" onclick="editAssignment(${
                  assignment.id
                })">
                    Edit
                </button>
                <button class="btn-sm btn-delete-assignment" onclick="confirmDeleteAssignment(${
                  assignment.id
                })">
                    Delete
                </button>
            </div>
        </div>
    `;

  return card;
}

function updateStatistics() {
  const assignments = getAssignments();
  const stats = calculateStats(assignments);

  document.getElementById("total-assignments").textContent = assignments.length;
  document.getElementById("completed-assignments").textContent =
    stats.completed;
  document.getElementById("overdue-assignments").textContent = stats.overdue;
  document.getElementById("completion-rate").textContent =
    stats.completionRate + "%";

  document.getElementById("points-earned").textContent = Number(
    stats.pointsEarned
  );
  document.getElementById("points-total").textContent = Number(
    stats.totalPoints
  );

  updateCharts(stats);
}

function showCourseModal(courseId = null) {
  const modal = document.getElementById("course-modal");
  const form = document.getElementById("course-form");
  const title = document.getElementById("course-modal-title");

  form.reset();

  if (courseId) {
    title.textContent = "Edit Course";
    const course = findCourseById(courseId);

    document.getElementById("course-name").value = course.name;
    document.getElementById("course-code").value = course.code;
    document.getElementById("course-color").value = course.color;
    document.getElementById("course-credits").value = course.credits;
    document.getElementById("course-semester").value = course.semester;

    form.dataset.editId = courseId;
  } else {
    title.textContent = "Add Course";
    delete form.dataset.editId;
  }

  modal.classList.remove("hidden");
}

function showAssignmentModal(assignmentId = null) {
  const modal = document.getElementById("assignment-modal");
  const form = document.getElementById("assignment-form");
  const title = document.getElementById("assignment-modal-title");

  form.reset();

  const courseSelect = document.getElementById("assignment-course");
  courseSelect.innerHTML = '<option value="">Select a course...</option>';
  getCourses().forEach((course) => {
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = `${course.code} - ${course.name}`;
    courseSelect.appendChild(option);
  });

  if (assignmentId) {
    title.textContent = "Edit Assignment";
    const assignment = assignments.find((a) => a.id === assignmentId);

    if (assignment) {
      document.getElementById("assignment-course").value = assignment.courseId;
      document.getElementById("assignment-title").value = assignment.title;
      document.getElementById("assignment-description").value =
        assignment.description;
      document.getElementById("assignment-duedate").value = assignment.dueDate;
      document.getElementById("assignment-priority").value =
        assignment.priority;
      document.getElementById("assignment-points").value = assignment.points;

      form.dataset.editId = assignmentId;
    }
  } else {
    title.textContent = "Add Assignment";
    delete form.dataset.editId;
  }

  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("course-modal").classList.add("hidden");
  document.getElementById("assignment-modal").classList.add("hidden");
}

function handleCourseSubmit(e) {
  e.preventDefault();

  try {
    const form = e.target;
    const courseData = {
      name: document.getElementById("course-name").value,
      code: document.getElementById("course-code").value,
      color: document.getElementById("course-color").value,
      credits: document.getElementById("course-credits").value,
      semester: document.getElementById("course-semester").value,
    };

    if (form.dataset.editId) {
      courseData.id = parseInt(form.dataset.editId);
      updateCourse(courseData.id, courseData);
    } else {
      createCourse(courseData);
    }

    closeModal();
    renderCourses();
    renderAssignments();
  } catch (error) {
    console.error("Form submission error:", error);
  }
}

function handleAssignmentSubmit(e) {
  e.preventDefault();

  try {
    const form = e.target;
    const assignmentData = {
      courseId: document.getElementById("assignment-course").value,
      title: document.getElementById("assignment-title").value,
      description: document.getElementById("assignment-description").value,
      dueDate: document.getElementById("assignment-duedate").value,
      priority: document.getElementById("assignment-priority").value,
      points: document.getElementById("assignment-points").value,
    };

    if (form.dataset.editId) {
      updateAssignment(parseInt(form.dataset.editId), assignmentData);
    } else {
      createAssignment(assignmentData);
    }

    closeModal();
    renderCourses();
    renderAssignments();
  } catch (error) {
    console.error("Form submission error:", error);
  }
}

// Toggle complete and refresh course cards
function handleToggleComplete(assignmentId) {
  toggleComplete(assignmentId);
  renderCourses();
  renderAssignments();
}

function editCourse(courseId) {
  showCourseModal(courseId);
}

function editAssignment(assignmentId) {
  showAssignmentModal(assignmentId);
}

function confirmDeleteCourse(courseId) {
  const course = findCourseById(courseId);
  if (
    confirm(
      `Delete course "${course.name}"? This will also delete all assignments for this course.`
    )
  ) {
    deleteCourse(courseId);
    renderCourses();
    renderAssignments();
  }
}

function confirmDeleteAssignment(assignmentId) {
  const assignment = assignments.find((a) => a.id === assignmentId);
  if (confirm(`Delete assignment "${assignment.title}"?`)) {
    deleteAssignment(assignmentId);
    renderCourses();
    renderAssignments();
  }
}

function updateCourseFilter() {
  const select = document.getElementById("filter-course");
  select.innerHTML = '<option value="all">All Courses</option>';

  getCourses().forEach((course) => {
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = course.name;
    select.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", initializeApp);
