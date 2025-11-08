# 📚 ClassTrack - Academic Task Manager

## Overview

**ClassTrack** is a lightweight, responsive web application designed to help students manage their academic workload efficiently. Built with vanilla JavaScript, HTML5, and CSS3, ClassTrack provides a modern interface for organizing courses, tracking assignments, and monitoring academic progress—all stored locally in your browser using localStorage.

Whether you're juggling multiple courses, tracking assignment deadlines, or monitoring your completion progress, ClassTrack helps you stay organized and focused on what matters: your education.

---

## 🎯 Key Features

### Course Management
- **Create and organize courses** with custom names, codes, and color themes
- **Track course details** including semester, credits, and academic progress
- **Visual progress indicators** showing completion percentage for each course
- **Edit and delete courses** with intuitive controls

### Assignment Tracking
- **Add detailed assignments** with descriptions, due dates, and point values
- **Set priority levels** (High, Medium, Low) for better organization
- **Mark assignments complete** with an interactive checkbox system
- **Search and filter** assignments by course, status, or text content
- **Sort assignments** by due date, priority, or points value

### Progress Visualization
- **Real-time statistics** showing total, completed, and overdue assignments
- **Completion chart** with an interactive doughnut graph powered by Chart.js
- **Points tracking** to monitor earned vs. total points
- **Visual feedback** for overdue assignments and upcoming deadlines

### Responsive Design
- **Mobile-friendly interface** that adapts to any screen size
- **Left-aligned layout** optimized for readability
- **No horizontal scrolling** on any device
- **Touch-friendly buttons** and interactive elements

### Data Persistence
- **LocalStorage integration** - data persists across browser sessions
- **Automatic saving** of all changes
- **No backend required** - complete privacy and offline functionality
- **Easy data management** with clear storage structure

---

## 🎨 Design Features

### Color Palette (BYU-Pathway Inspired)
- **Navy Blue (#002E5D)** - Primary brand color
- **Bright Blue (#0062B8)** - Interactive elements
- **Gold (#FFB81C)** - Accent highlights
- **Green (#28A745)** - Completed items
- **Red (#DC3545)** - Overdue/High priority
- **Orange (#FD7E14)** - Medium priority

### Accessibility
- **High contrast text** for readability
- **Semantic HTML** structure
- **Keyboard navigation** support
- **WCAG-compliant colors**

---

## 💻 Technology Stack

### Frontend
- **HTML5** - Semantic markup and form structure
- **CSS3** - Responsive layout with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Modern JavaScript features:
  - ES6 Array Methods: `filter()`, `map()`, `reduce()`, `find()`, `sort()`
  - Arrow functions and template literals
  - Destructuring and spread operator
  - Promise handling

### External Libraries
- **Chart.js** - Beautiful, interactive charts via CDN
- **date-fns** - Date formatting and calculations via CDN

### Storage
- **Browser LocalStorage API** - Client-side data persistence
- **JSON serialization** - Structured data storage

---

## 📁 Project Structure

```
ClassTrack/
├── index.html                 # Main HTML file
├── README.md                  # Project documentation
│
├── css/
│   ├── styles.css            # Main layout and base styles
│   ├── courses.css           # Course card styling
│   └── assignments.css       # Assignment and stats styling
│
└── js/
    ├── app.js                # Main application logic and DOM handling
    ├── storage.js            # LocalStorage wrapper (exception handling)
    ├── utils.js              # Utility functions and recursion
    ├── validation.js         # Input validation (exception handling)
    ├── courses.js            # Course CRUD operations
    ├── assignments.js        # Assignment CRUD operations
    ├── filters.js            # Filtering and sorting (ES6 arrays)
    └── charts.js             # Chart.js integration
```

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)
- Optional: Live Server extension for local development

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NéfiMuniz/class_track.git
   cd class_track
   ```

2. **Open in your browser**
   - **Simple Method**: Double-click `index.html`
   - **Live Server Method**: Right-click `index.html` → "Open with Live Server"

3. **Start using ClassTrack**
   - Click "+ Add Course" to create your first course
   - Add assignments to each course
   - Track your progress in real-time

### No Installation Required
ClassTrack is a static web application - no npm, no build process, no backend server. Just open and use!

---

## 📖 User Guide

### Adding a Course

1. Click the **"+ Add Course"** button in the header
2. Fill in the course details:
   - **Course Name** - Full course name (e.g., "Applied Programming")
   - **Course Code** - Department code (e.g., "CSE 310", "GESCI 110")
   - **Color Theme** - Choose a color to identify this course
   - **Credits** - Number of credit hours
   - **Semester** - Academic term (e.g., "Fall 2025")
3. Click **"Save Course"**

### Adding an Assignment

1. Click the **"+ Add Assignment"** button
2. Fill in the assignment details:
   - **Course** - Select the course (required)
   - **Title** - Assignment name
   - **Description** - Additional details (optional)
   - **Due Date** - When it's due (required)
   - **Priority** - High, Medium, or Low
   - **Points** - How many points it's worth
3. Click **"Save Assignment"**

### Managing Assignments

- **Mark Complete** - Click the checkbox next to an assignment
- **Edit** - Click the "Edit" button to modify
- **Delete** - Click the "Delete" button to remove
- **Filter** - Use the dropdowns to filter by course or status
- **Search** - Type in the search box to find assignments
- **Sort** - Choose how to sort (due date, priority, points)

### Viewing Progress

The **right sidebar** shows:
- **Total** - Number of assignments
- **Completed** - Number finished
- **Overdue** - Past due, incomplete assignments
- **Completion Rate** - Percentage of assignments finished
- **Completion Chart** - Visual representation of progress
- **Points Summary** - Earned vs. total points

---

## 🗄️ Data Structure

### Course Object
```javascript
{
  id: 1730412000000,
  name: "Applied Programming",
  code: "CSE 310",
  color: "#0062B8",
  credits: 3,
  semester: "Fall 2025",
  archived: false,
  createdAt: "2025-11-08T15:20:00.000Z"
}
```

### Assignment Object
```javascript
{
  id: 1730412100000,
  courseId: 1730412000000,
  title: "JavaScript Module",
  description: "Build an academic task manager",
  dueDate: "2025-11-15",
  priority: "high",
  points: 100,
  completed: false,
  completedDate: null,
  createdAt: "2025-11-08T15:20:30.000Z"
}
```

### Statistics Object
```javascript
{
  completed: 8,
  overdue: 2,
  pointsEarned: 720,
  totalPoints: 1000,
  completionRate: 80.0
}
```

---

## 💾 LocalStorage Details

### Storage Keys
- **`classtrack_courses`** - Stores all courses as JSON array
- **`classtrack_assignments`** - Stores all assignments as JSON array

### Storage Limits
- Typically **5-10MB** per domain in most browsers
- More than enough for thousands of assignments
- Automatic error handling if quota exceeded

### Data Persistence
- Data persists even after closing the browser
- Data persists across devices (different browsers/computers require separate data)
- Clear browser cache to reset all data

---

## 🎥 Demo & Video

Test the application:
[**Access the Class Track**](https://nefimuniz.github.io/class_track/)

Watch a complete walkthrough of ClassTrack features:
[**Click here to watch the ClassTrack demo video →**](https://youtu.be/nUdjawmrhfk)

*Duration: ~5 minutes*  
*Topics: Course creation, assignment tracking, filtering, sorting, statistics*

---

## 🐛 Known Limitations

1. **Single Browser Storage** - Data is browser and device-specific
2. **Manual Backup** - No automatic cloud backup
3. **No Sharing** - Can't share assignments with classmates
4. **Offline Only** - Works only when offline, no sync across devices
5. **Data Loss** - Clearing browser cache deletes all data

---

## 👨‍💻 Author

**Néfi Muniz**
- 📧 Email: [your-email@example.com](mailto:nefims@gmail.com)
- 🔗 GitHub: [github.com/NéfiMuniz](https://github.com/NefiMuniz)
- 💼 LinkedIn: [linkedin.com/in/NéfiMuniz](https://linkedin.com/in/nefimuniz)

### Suggestions or Questions?
Feel free to open a discussion or issue!

---

## 🙏 Acknowledgments

- **BYU-Pathway Worldwide** - For the educational inspiration and color scheme
- **Chart.js** - For beautiful charting library
- **date-fns** - For date utility library
- **The JavaScript Community** - For ES6+ features and best practices

---

## 📈 Project Statistics

- **Total Lines of Code**: ~2,500
- **JavaScript Files**: 8 modules
- **CSS Files**: 3 stylesheets
- **External Dependencies**: 2 (Chart.js, date-fns)
- **Supported Browsers**: 5+
- **Mobile Responsive**: Yes ✅
- **Accessibility**: WCAG Compliant

---

## 🎓 Educational Value

ClassTrack serves as an excellent example of:
- **Modern JavaScript** - ES6+ features and patterns
- **Web APIs** - LocalStorage and DOM APIs
- **Responsive Design** - Mobile-first approach
- **Data Structures** - Objects, arrays, and JSON
- **Error Handling** - Try-catch and validation
- **User Experience** - Intuitive interface design
- **Code Organization** - Modular architecture

Perfect for learning or as a portfolio project!

---

## ⭐ Show Your Support

If you find ClassTrack helpful, please consider:
- ⭐ Starring this repository
- 🔗 Sharing with friends and colleagues
- 💬 Leaving feedback or suggestions
- 🐛 Reporting bugs
- 🤝 Contributing improvements

---

**Last Updated**: November 8, 2025  
**Version**: 1.0.0  
**Status**: Active Development

Made with ❤️ for students by Néfi Muniz