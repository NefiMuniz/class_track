let completionChart = null;

// Create completion pie chart with high contrast legend
function createCompletionChart(stats) {
  const ctx = document.getElementById("completion-chart");

  if (!ctx) {
    console.error("Chart canvas not found");
    return;
  }

  if (completionChart) {
    completionChart.destroy();
  }

  // Get actual assignment counts
  const allAssignments = getAssignments();
  const totalCount = allAssignments.length;
  const completedCount = allAssignments.filter((a) => a.completed).length;
  const incompleteCount = totalCount - completedCount;

  // Don't show chart if no assignments
  if (totalCount === 0) {
    const container = ctx.parentElement;
    container.innerHTML =
      '<p style="text-align: center; color: #333; padding: 2rem; font-weight: 600;">No assignments yet</p>';
    // Re-add canvas for future use
    const newCanvas = document.createElement("canvas");
    newCanvas.id = "completion-chart";
    container.appendChild(newCanvas);
    return;
  }

  completionChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Incomplete"],
      datasets: [
        {
          data: [completedCount, incompleteCount],
          backgroundColor: ["#28A745", "#E0E0E0"],
          borderWidth: 2,
          borderColor: "#FFFFFF",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: 13,
              family: "'Segoe UI', sans-serif",
              weight: "600",
            },
            padding: 15,
            color: "#1a1a1a",
            boxWidth: 15,
            boxHeight: 15,
          },
        },
        tooltip: {
          backgroundColor: "#1a1a1a",
          titleColor: "#FFFFFF",
          bodyColor: "#FFFFFF",
          padding: 12,
          displayColors: true,
          titleFont: {
            size: 14,
            weight: "bold",
          },
          bodyFont: {
            size: 13,
          },
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return label + ": " + value + " (" + percentage + "%)";
            },
          },
        },
      },
    },
  });
}

function updateCharts(stats) {
  createCompletionChart(stats);
}

function createPriorityChart(assignments) {
  const ctx = document.getElementById("priority-chart");
  if (!ctx) return;

  const priorities = {
    high: assignments.filter((a) => a.priority === "high").length,
    medium: assignments.filter((a) => a.priority === "medium").length,
    low: assignments.filter((a) => a.priority === "low").length,
  };

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["High", "Medium", "Low"],
      datasets: [
        {
          label: "Number of Assignments",
          data: [priorities.high, priorities.medium, priorities.low],
          backgroundColor: ["#DC3545", "#FD7E14", "#17A2B8"],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: "#333333",
          },
        },
        x: {
          ticks: {
            color: "#333333",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#1a1a1a",
          },
        },
      },
    },
  });
}
