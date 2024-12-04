document.addEventListener('DOMContentLoaded', () => {
  // Tooltip for Architecture Diagram
  const tooltip = document.getElementById('tooltip');
  const areas = document.querySelectorAll('img[usemap] area');

  areas.forEach(area => {
    area.addEventListener('mouseenter', (e) => {
      tooltip.textContent = e.target.dataset.info || "Component Info";
      tooltip.style.left = `${e.pageX + 10}px`;
      tooltip.style.top = `${e.pageY + 10}px`;
      tooltip.style.display = 'block';
    });

    area.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  });

  // Roadmap Timeline Chart
  const ctxRoadmap = document.getElementById('roadmapChart').getContext('2d');

  // Fetch roadmap data from JSON
  fetch('roadmap.json')
    .then(response => response.json())
    .then(roadmap => {
      const labels = roadmap.map(item => item.phase);
      const startData = roadmap.map(item => item.start);
      const durationData = roadmap.map(item => item.end - item.start); // Duration of each phase
      const tooltips = roadmap.map(item => item.details);

      // Create gradient colors
      const gradientColors = [];
      roadmap.forEach((_, index) => {
        const gradient = ctxRoadmap.createLinearGradient(0, 0, 400, 0);
        if (index === 0) {
          gradient.addColorStop(0, "#007bff");
          gradient.addColorStop(1, "#4dabf7");
        } else if (index === 1) {
          gradient.addColorStop(0, "#6610f2");
          gradient.addColorStop(1, "#a370f2");
        } else if (index === 2) {
          gradient.addColorStop(0, "#6f42c1");
          gradient.addColorStop(1, "#b071d3");
        } else {
          gradient.addColorStop(0, "#e83e8c");
          gradient.addColorStop(1, "#f77eb9");
        }
        gradientColors.push(gradient);
      });

      new Chart(ctxRoadmap, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: "Start Time",
            data: startData, // Starting offsets
            backgroundColor: "rgba(0, 0, 0, 0)", // Invisible for stacking
            borderWidth: 0
          }, {
            label: "Duration",
            data: durationData, // Duration of each phase
            backgroundColor: gradientColors, // Gradient colors for each phase
          }]
        },
        options: {
          indexAxis: 'y', // Horizontal bar chart
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: "Months"
              },
              ticks: {
                stepSize: 1, // Show months incrementally
                max: 12 // Maximum month
              },
              stacked: true // Stack phases
            },
            y: {
              title: {
                display: true,
                text: "Phases"
              },
              stacked: true // Stack phases
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${labels[tooltipItem.dataIndex]}: ${tooltips[tooltipItem.dataIndex]}`;
                }
              }
            }
          }
        }
      });
    });

  // Resource Allocation Data
  const resourceAllocationData = [
    { phase: "Planning", start: 0, end: 3, color: "#007bff" },
    { phase: "Pilot Implementation", start: 2, end: 4, color: "#17a2b8" },
    { phase: "Scaling", start: 4, end: 8, color: "#ffc107" },
    { phase: "Optimization", start: 6, end: 12, color: "#28a745" },
  ];

  // Bar Chart: Horizontal Format
  const ctxBar = document.getElementById("resourceAllocationBarChart").getContext("2d");
  const barChartLabels = resourceAllocationData.map((item) => `${item.phase} (${item.start}-${item.end} Months)`);
  const barChartDurations = resourceAllocationData.map((item) => item.end - item.start);
  const barChartColors = resourceAllocationData.map((item) => item.color);

  new Chart(ctxBar, {
    type: "bar", // Use 'bar' type
    data: {
      labels: barChartLabels,
      datasets: [
        {
          label: "Duration (Months)",
          data: barChartDurations,
          backgroundColor: barChartColors,
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: "y", // Horizontal bars
      scales: {
        x: {
          title: { display: true, text: "Months" },
          ticks: { stepSize: 1, max: 12 }, // Show months from 0 to 12
        },
        y: {
          title: { display: true, text: "Phases" },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const { label, dataIndex } = tooltipItem;
              const { start, end } = resourceAllocationData[dataIndex];
              return `${label}: ${start} to ${end} months`;
            },
          },
        },
      },
    },
  });

  // Doughnut Chart: Percentage
  const ctxDoughnut = document.getElementById("resourceAllocationDoughnutChart").getContext("2d");
  const totalDuration = resourceAllocationData.reduce((sum, item) => sum + (item.end - item.start), 0);
  const doughnutChartPercentages = resourceAllocationData.map(
    (item) => ((item.end - item.start) / totalDuration) * 100
  );

  new Chart(ctxDoughnut, {
    type: "doughnut",
    data: {
      labels: resourceAllocationData.map((item) => item.phase),
      datasets: [
        {
          data: doughnutChartPercentages,
          backgroundColor: barChartColors,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const phase = tooltipItem.label;
              const percentage = doughnutChartPercentages[tooltipItem.dataIndex].toFixed(1);
              return `${phase}: ${percentage}%`;
            },
          },
        },
      },
    },
  });

  // Business KPIs (Combined Chart with Dual Y-Axes)
  const ctxBusiness = document.getElementById('businessKPIsChart').getContext('2d');
  new Chart(ctxBusiness, {
    type: 'bar',
    data: {
      labels: ['Customer Satisfaction (%)', 'Market Penetration (%)', 'Revenue Growth ($)'],
      datasets: [
        {
          label: 'Percentage',
          data: [85, 70, 0], // Zero value for revenue bar on this dataset
          backgroundColor: ['#4CAF50', '#2196F3', 'rgba(0,0,0,0)'], // Last bar invisible
          yAxisID: 'y2',
        },
        {
          label: 'Dollar Value',
          data: [0, 0, 2000000], // Zero values for percentage bars on this dataset
          backgroundColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', '#FF9800'], // First two bars invisible
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y1: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Dollar Value ($)',
          },
          ticks: {
            beginAtZero: true,
          },
        },
        y2: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Percentage (%)',
          },
          ticks: {
            beginAtZero: true,
            max: 100,
          },
          grid: {
            drawOnChartArea: false, // Avoid overlapping grid lines
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              if (tooltipItem.datasetIndex === 0) {
                return `${tooltipItem.label}: ${tooltipItem.raw}%`;
              }
              return `${tooltipItem.label}: $${tooltipItem.raw}`;
            },
          },
        },
        legend: {
          display: false,
          position: 'top',
        },
      },
    },
  });

  // Technical KPIs (Combined Chart with Dual Y-Axes)
  const ctxTechnical = document.getElementById('technicalKPIsChart').getContext('2d');
  new Chart(ctxTechnical, {
    type: 'bar',
    data: {
      labels: ['Uptime (%)', 'Data Quality (%)', 'Processing Speed (ms)'],
      datasets: [
        {
          label: 'Percentage Metrics',
          data: [99.9, 95.5, 0], // Zero value for processing speed on this dataset
          backgroundColor: ['#4CAF50', '#2196F3', 'rgba(0,0,0,0)'], // Last bar invisible
          yAxisID: 'y2',
        },
        {
          label: 'Processing Speed',
          data: [0, 0, 300], // Zero values for percentage bars on this dataset
          backgroundColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', '#FF9800'], // First two bars invisible
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y1: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Processing Speed (ms)',
          },
          ticks: {
            beginAtZero: true,
          },
        },
        y2: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Percentage (%)',
          },
          ticks: {
            beginAtZero: true,
            max: 100,
          },
          grid: {
            drawOnChartArea: false, // Avoid overlapping grid lines
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              if (tooltipItem.datasetIndex === 0) {
                return `${tooltipItem.label}: ${tooltipItem.raw}%`;
              }
              return `${tooltipItem.label}: ${tooltipItem.raw} ms`;
            },
          },
        },
        legend: {
          display: false,
          position: 'top',
        },
      },
    },
  });

  const ctxTimeline = document.getElementById('changeTimelineChart').getContext('2d');

  new Chart(ctxTimeline, {
    type: 'bar', // Use 'bar' instead of 'horizontalBar'
    data: {
      labels: ['Awareness', 'Implementation', 'Adoption', 'Monitoring'],
      datasets: [{
        //label: 'Timeline (Months)',
        data: [3, 6, 9, 12],
        backgroundColor: ['#007bff', '#6610f2', '#6f42c1', '#e83e8c'],
      }]
    },
    options: {
      indexAxis: 'y', // Make the bar chart horizontal
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Months' },
          ticks: { stepSize: 3 }
        },
        y: {
          title: { display: true, text: 'Phases' }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const descriptions = [
                'Engaging stakeholders and creating awareness.',
                'Executing initial platform rollout.',
                'Driving platform adoption across divisions.',
                'Monitoring usage and optimizing.'
              ];
              return descriptions[tooltipItem.dataIndex];
            }
          }
        }
      }
    }
  });

  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item) => {
    item.addEventListener("click", () => {
      const details = item.querySelector("p");
      details.style.display =
        details.style.display === "none" || !details.style.display
          ? "block"
          : "none";
    });
  });
});