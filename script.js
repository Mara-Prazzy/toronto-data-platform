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
  
    // Roadmap Timeline
    const roadmap = [
      { phase: "Planning", time: "Months 1-6", details: "Stakeholder workshops and tech stack selection." },
      { phase: "Pilot Implementation", time: "Months 7-12", details: "Launch pilots for key divisions." },
      { phase: "Scaling", time: "Months 13-24", details: "Extend platform citywide." },
      { phase: "Optimization", time: "Months 25-36", details: "Introduce advanced analytics and ML." },
    ];
  
    const timelineDiv = document.getElementById('timeline');
    roadmap.forEach(item => {
      const phaseDiv = document.createElement('div');
      phaseDiv.innerHTML = `<strong>${item.phase} (${item.time})</strong>: ${item.details}`;
      phaseDiv.className = "p-2 border mb-2 rounded shadow-sm";
      timelineDiv.appendChild(phaseDiv);
    });
  
    // Success Metrics Chart
    const ctx = document.getElementById('metricsChart').getContext('2d');
    new Chart(ctx, {
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
  