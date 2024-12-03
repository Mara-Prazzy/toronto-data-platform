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

  // Success Metrics Chart
  const ctxMetrics = document.getElementById('metricsChart').getContext('2d');
  new Chart(ctxMetrics, {
    type: 'bar',
    data: {
      labels: ['Uptime (%)', 'Decision Speed (ms)', 'Adoption Rate (%)'],
      datasets: [{
        label: 'Metrics',
        data: [99.9, 300, 80],
        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      }
    }
  });
});
