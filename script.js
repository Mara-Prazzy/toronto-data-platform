document.addEventListener('DOMContentLoaded', () => {
  // Roadmap Gantt Chart
  Highcharts.ganttChart('roadmapChartContainer', {
    accessibility: { enabled: false },
    title: { text: 'Enterprise Data Platform Roadmap - City of Toronto' },
    yAxis: {
      categories: [
        'Awareness & Stakeholder Engagement',
        'Design',
        'Development',
        'Pilot Implementation',
        'Scaling',
        'Adoption & Enablement',
        'Monitoring & Optimization',
        'Future Enhancements',
      ],
      reversed: true,
    },
    xAxis: {
      type: 'datetime',
      title: { text: 'Timeline' },
    },
    series: [{
      name: 'Phases',
      data: [
        {
          start: Date.UTC(2025, 0, 1),
          end: Date.UTC(2025, 2, 31),
          y: 0,
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
            stops: [
              [0, '#007bff'], // Blue gradient
              [1, '#4dabf7'], 
            ],
          },
        },
        {
          start: Date.UTC(2025, 2, 1),
          end: Date.UTC(2025, 5, 30),
          y: 1,
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
            stops: [
              [0, '#6610f2'], // Purple gradient
              [1, '#a370f2'], 
            ],
          },
        },
        {
          start: Date.UTC(2025, 4, 1),
          end: Date.UTC(2025, 8, 30),
          y: 2,
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
            stops: [
              [0, '#6f42c1'],
              [1, '#b071d3'], 
            ],
          },
        },
        {
          start: Date.UTC(2025, 7, 1),
          end: Date.UTC(2025, 11, 31),
          y: 3,
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
            stops: [
              [0, '#28a745'], // Green gradient
              [1, '#81c784'],
            ],
          },
        },
        {
          start: Date.UTC(2025, 9, 1),
          end: Date.UTC(2026, 0, 31),
          y: 4,
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
            stops: [
              [0, '#ffc107'], // Yellow gradient
              [1, '#ffd54f'], 
            ],
          },
        },
        {
          start: Date.UTC(2026, 0, 1),
          end: Date.UTC(2026, 5, 30),
          y: 5,
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
            stops: [
              [0, '#dc3545'], 
              [1, '#f28b96'], 
            ],
          },
        },
        {
          start: Date.UTC(2026, 0, 1),
          end: Date.UTC(2026, 5, 30),
          y: 6,
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
            stops: [
              [0, '#20c997'],
              [1, '#81d4c7'], 
            ],
          },
        },
        {
          start: Date.UTC(2026, 0, 1),
          end: Date.UTC(2026, 5, 30),
          y: 7,
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
            stops: [
              [0, '#6c757d'],
              [1, '#adb5bd'], 
            ],
          },
        },
      ],
    }],
  });

  // Resource Allocation Charts
  // Stacked Horizontal Bar Chart
  const ctxBar = document.getElementById('resourceAllocationBarChart').getContext('2d');
  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['Awareness', 'Design', 'Development', 'Pilot', 'Scaling', 'Adoption'],
      datasets: [
        { label: 'Data Engineers', data: [2, 2, 5, 5, 5, 5], backgroundColor: '#007bff' },
        { label: 'Cloud Engineers', data: [0, 1, 3, 0, 2, 0], backgroundColor: '#6610f2' },
        { label: 'DevOps Professionals', data: [0, 1, 2, 1, 0, 0], backgroundColor: '#28a745' },
        { label: 'Data Governance Specialist', data: [1, 1, 0, 0, 0, 1], backgroundColor: '#20c997' },
        { label: 'Machine Learning Engineers', data: [0, 1, 1, 1, 1, 0], backgroundColor: '#ffc107' },
        { label: 'Data Analysts', data: [1, 2, 0, 0, 0, 2], backgroundColor: '#17a2b8' },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
          },
        },
        legend: { display: true, position: 'top' },
      },
      indexAxis: 'y', // Horizontal bar chart
      scales: {
        x: { stacked: true, title: { display: true, text: 'Count' } },
        y: { stacked: true, title: { display: true, text: 'Phases' } },
      },
    },
  });

  // Resource Allocation Pie Chart
  const resourceData = [
    { role: 'Data Engineers', count: 5, estimatedCost: 600000, color: '#007bff' },
    { role: 'Cloud Engineers', count: 2, estimatedCost: 250000, color: '#6610f2' },
    { role: 'DevOps Professionals', count: 2, estimatedCost: 240000, color: '#28a745' },
    { role: 'Data Governance Specialist', count: 1, estimatedCost: 120000, color: '#20c997' },
    { role: 'Machine Learning Engineers', count: 1, estimatedCost: 150000, color: '#ffc107' },
    { role: 'Data Analysts', count: 2, estimatedCost: 180000, color: '#17a2b8' },
  ];

  const ctxPie = document.getElementById('resourceAllocationPieChart').getContext('2d');

  // Calculate total cost for percentage calculations
  const totalCost = resourceData.reduce((sum, item) => sum + item.estimatedCost, 0);

  const pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: resourceData.map((item) => item.role),
      datasets: [
        {
          data: resourceData.map((item) => item.estimatedCost),
          backgroundColor: resourceData.map((item) => item.color),
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: false, // Disable responsiveness for fixed dimensions
      maintainAspectRatio: false, // Allow custom height and width
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const role = tooltipItem.label;
              const cost = tooltipItem.raw;
              const percentage = ((cost / totalCost) * 100).toFixed(1);
              return `${role}: $${cost.toLocaleString()} (${percentage}%)`;
            },
          },
        },
        legend: {
          display: true,
          position: 'top', // Align legends with the bar chart
          labels: {
            boxWidth: 12,
            font: {
              size: 12,
            },
          },
        },
        datalabels: {
          color: '#fff',
          font: {
            weight: 'bold',
          },
          formatter: (value, context) => {
            const percentage = ((value / totalCost) * 100).toFixed(1);
            return `${percentage}%`;
          },
        },
      },
    },
  });

  // Success Metric

  // Hover Highlight for Metrics
  document.querySelectorAll('.metric').forEach(metric => {
    metric.addEventListener('mouseenter', () => {
      metric.style.backgroundColor = "#f0f8ff"; // Highlight on hover
    });
    metric.addEventListener('mouseleave', () => {
      metric.style.backgroundColor = "transparent"; // Reset
    });
  });

  // Toggle Highlight for Current/Target Metrics
  const toggleButton = document.getElementById('toggle-metrics');
  let highlightActive = false;

  toggleButton.addEventListener('click', () => {
    highlightActive = !highlightActive;

    const toggleHighlight = (currentId, targetId) => {
      const currentElement = document.getElementById(currentId);
      const targetElement = document.getElementById(targetId);

      if (highlightActive) {
        currentElement.style.color = "red";
        targetElement.style.color = "green";
      } else {
        currentElement.style.color = "black";
        targetElement.style.color = "black";
      }
    };

    // Technical KPIs
    toggleHighlight("data-freshness-current", "data-freshness-target");
    toggleHighlight("validation-error-current", "validation-error-target");
    toggleHighlight("time-to-data-current", "time-to-data-target");
    toggleHighlight("schema-changes-current", "schema-changes-target");
    toggleHighlight("data-observability-current", "data-observability-target");
    toggleHighlight("production-failure-current", "production-failure-target");
    toggleHighlight("data-lineage-current", "data-lineage-target");

    // Business KPIs
    toggleHighlight("value-generation-current", "value-generation-target");
    toggleHighlight("user-adoption-current", "user-adoption-target");
    toggleHighlight("compliance-current", "compliance-target");
    toggleHighlight("time-to-insight-current", "time-to-insight-target");
    toggleHighlight("data-product-quality-current", "data-product-quality-target");
    toggleHighlight("operational-efficiency-current", "operational-efficiency-target");
    toggleHighlight("data-governance-maturity-current", "data-governance-maturity-target");
  });

  // Change Mangement

  // Toggle Collapsible Key Insights
  const changeManagementButton = document.querySelector('.explore-btn');
  const changeManagementCollapse = document.querySelector('#changeManagementInsights');

  changeManagementButton.addEventListener('click', () => {
    if (changeManagementCollapse.classList.contains('show')) {
      changeManagementButton.textContent = "Explore Key Insights";
    } else {
      changeManagementButton.textContent = "Hide Key Insights";
    }
  });

  // Optionally, you can reset the text when the section collapses
  changeManagementCollapse.addEventListener('hidden.bs.collapse', () => {
    changeManagementButton.textContent = "Explore Key Insights";
  });

  changeManagementCollapse.addEventListener('shown.bs.collapse', () => {
    changeManagementButton.textContent = "Hide Key Insights";
  });


  // Past Experience
  // Highlight timeline items on hover
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.backgroundColor = "#e6f7ff"; // Highlight color
      item.style.borderColor = "#0056b3"; // Darker blue border
    });

    item.addEventListener('mouseleave', () => {
      item.style.backgroundColor = "transparent"; // Reset background
      item.style.borderColor = "#007bff"; // Original blue border
    });
  });

  // Nav Bar //

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 50;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });  



});
