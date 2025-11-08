# 📚 ClassTrack - Academic Task Manager

## Overview

### Professional Learning Goal

As a software engineer and developer, I created ClassTrack to deepen my understanding of modern JavaScript, object-oriented programming principles, and responsive web design. This project challenged me to build a complete, production-ready application from the ground up using vanilla JavaScript, demonstrating proficiency in ES6+ syntax, asynchronous programming patterns, and client-side data management. Through ClassTrack, I wanted to showcase my ability to write clean, well-organized, and maintainable code while creating a genuinely useful tool that solves real-world problems.

### Software Description

ClassTrack is a responsive, single-page web application built entirely in vanilla JavaScript that helps users manage their academic workload efficiently. The application allows students to create courses, add detailed assignments with due dates and priority levels, track completion progress, and visualize their academic statistics in real-time. All data is persisted locally in the browser using the LocalStorage API, eliminating the need for a backend server while ensuring data privacy and immediate availability.

The software demonstrates advanced JavaScript concepts including ES6 array methods for data manipulation, exception handling for robust error management, recursion for elegant problem-solving, DOM manipulation for dynamic UI creation, and integration of external libraries for enhanced functionality. The responsive design adapts seamlessly to desktop, tablet, and mobile devices without horizontal scrolling, ensuring an optimal user experience across all platforms.

### Purpose for Writing This Software

I developed ClassTrack with three primary objectives:

**1. Mastery of Modern JavaScript:** To deepen my expertise in ES6+ features including arrow functions, template literals, destructuring, spread operators, and modern array methods. I wanted to demonstrate proficiency in using `filter()`, `map()`, `reduce()`, `find()`, `sort()`, and `some()` to solve real problems elegantly.

**2. Production-Ready Code Quality:** To prove that I can write professional-grade code that is modular, maintainable, and well-documented. Each JavaScript file has a single responsibility, comprehensive comments explain the code's purpose, and error handling prevents the application from crashing under adverse conditions.

**3. Full-Stack Thinking:** To demonstrate that I understand the complete web development lifecycle—from user interface design and interaction handling, through data management and validation, to storage and retrieval. Building without a backend forced me to think critically about client-side architecture and data management best practices.

This application serves as both a portfolio piece and a valuable tool I personally use for managing my own academic responsibilities at BYU-Pathway Worldwide.

---

## Software Demo Video

Test the application:
[**Access the Class Track**](https://nefimuniz.github.io/class_track/)

Watch a complete walkthrough of ClassTrack features:
[**Click here to watch the ClassTrack demo video**](https://youtu.be/nUdjawmrhfk)

*Duration: ~5 minutes*  
*Topics: Course creation, assignment tracking, filtering, sorting, statistics*

---

## Development Environment

### Tools & Technologies Used

**Code Editor:**
- **Visual Studio Code (VS Code)** - Primary IDE with extensions for JavaScript, HTML/CSS, and Git integration

**Version Control:**
- **Git & GitHub** - For version control, repository management, and collaboration capabilities

**Development Server:**
- **Live Server (VS Code Extension)** - For real-time browser refresh during development

**Browser DevTools:**
- **Chrome DevTools** - For debugging JavaScript, inspecting DOM elements, viewing LocalStorage, and monitoring network activity
- **Firefox Developer Tools** - For cross-browser testing and validation

**Additional Tools:**
- **Google Chrome** - Primary testing browser
- **Mozilla Firefox** - Secondary testing for cross-browser compatibility
- **Responsive Design Mode** - Browser built-in tool for mobile/tablet testing
- **JSONFormatter** - For validating and formatting JSON data in LocalStorage

### Programming Languages & Libraries

**Core Language:**
- **JavaScript (ES6+/ECMAScript 2015+)** - Modern JavaScript with features including:
  - Arrow functions and template literals
  - ES6 array methods (filter, map, reduce, find, sort)
  - Destructuring and spread operator
  - Promise handling and async patterns
  - Classes and object-oriented principles

**Markup & Styling:**
- **HTML5** - Semantic HTML structure with form validation
- **CSS3** - Advanced CSS features including:
  - CSS Grid for dashboard layout
  - Flexbox for responsive components
  - CSS Variables for theming
  - Media queries for responsive design
  - CSS animations and transitions

**External Libraries (via CDN):**
- **Chart.js (v3.9+)** - Interactive data visualization library for pie/doughnut charts and bar charts
  - Enables real-time chart updates with smooth animations
  - Provides responsive, touch-friendly chart interactions

- **date-fns (v2.29.3+)** - Utility library for date formatting and calculations
  - Simplifies date operations and locale-aware formatting
  - Provides consistent date handling across the application

**Browser APIs Used:**
- **LocalStorage API** - Client-side data persistence with exception handling
- **DOM API** - Dynamic element creation and manipulation
- **Event API** - User interaction handling and event delegation
- **JSON API** - Data serialization and deserialization

---

## Useful Websites

These resources proved invaluable during ClassTrack development:

- [MDN Web Docs - JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Comprehensive JavaScript documentation and tutorials
- [MDN Web Docs - ES6 Features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) - In-depth guide to modern JavaScript syntax
- [Chart.js Documentation](https://www.chartjs.org/) - Official Chart.js library documentation with examples
- [date-fns Documentation](https://date-fns.org/) - Complete guide to date-fns library functions
- [MDN Web Docs - LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - LocalStorage API reference and best practices
- [JSON Formatter & Validator](https://jsonformatter.org/) - Testing and validating JSON data structures

---

## Future Work

  - Integrate Firebase backend for multi-device sync
  - Implement user authentication (email/password, Google OAuth)
  - Enable data backup to cloud storage
  - Workload distribution chart showing assignments per week
  - Export to Google Calendar
  - PDF report generation for progress summary

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
