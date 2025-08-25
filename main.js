// Load data.json and populate page
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('about-text').innerText = data.about;

    const projectsList = document.getElementById('projects-list');
    data.projects.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${p.title}</strong><br>
                      ${p.description}<br>
                      <strong>Tech:</strong> ${p.tech.map(t => `<code>${t}</code>`).join(' ')}<br>
                      <a href="${p.link}" target="_blank">View on GitHub</a>`;
      projectsList.appendChild(li);
    });

    document.getElementById('github').href = data.contact.github;
    document.getElementById('github').innerText = data.contact.github;
    document.getElementById('email').href = `mailto:${data.contact.email}`;
    document.getElementById('email').innerText = data.contact.email;

    document.getElementById('quote').innerText = data.quote;
  })
  .catch(err => console.error('Error loading data.json:', err));
