document.addEventListener('DOMContentLoaded', () => {
  // Function to load animals from the backend
  function loadAnimals() {
    fetch('/api/animals')
      .then(response => response.json())
      .then(data => {
        const tbody = document.querySelector('#animals-table tbody');
        tbody.innerHTML = '';
        data.forEach(animal => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${animal.id}</td>
            <td>${animal.name}</td>
            <td>${animal.species}</td>
            <td>${animal.breed || ''}</td>
            <td>${animal.age || ''}</td>
            <td>${animal.gender || ''}</td>
            <td>${animal.healthStatus || ''}</td>
            <td>
              <button onclick="deleteAnimal('${animal.id}')">Delete</button>
            </td>
          `;
          tbody.appendChild(row);
        });
        // Update dashboard stats
        document.getElementById('total-animals').textContent = data.length;
        const healthyCount = data.filter(a => a.healthStatus === 'Healthy').length;
        document.getElementById('healthy-animals').textContent = healthyCount;
      })
      .catch(err => console.error(err));
  }

  // Function to add a new animal
  const animalForm = document.getElementById('animal-form');
  animalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(animalForm);
    const animal = {};
    formData.forEach((value, key) => animal[key] = value);
    fetch('/api/animals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(animal)
    })
      .then(response => response.json())
      .then(() => {
        animalForm.reset();
        loadAnimals();
      })
      .catch(err => console.error(err));
  });

  // Function to delete an animal
  window.deleteAnimal = function(id) {
    fetch(`/api/animals/${id}`, {
      method: 'DELETE'
    })
      .then(() => loadAnimals())
      .catch(err => console.error(err));
  };

  // Load animals when button is clicked
  document.getElementById('load-animals').addEventListener('click', loadAnimals);

  // Function to load health records
  function loadRecords() {
    fetch('/api/health-records')
      .then(response => response.json())
      .then(data => {
        const tbody = document.querySelector('#records-table tbody');
        tbody.innerHTML = '';
        data.forEach(record => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.animalId}</td>
            <td>${record.date}</td>
            <td>${record.recordType}</td>
            <td>${record.condition || ''}</td>
            <td>${record.administeredBy || ''}</td>
            <td>${record.nextFollowUp || ''}</td>
            <td>${record.notes || ''}</td>
            <td>
              <button onclick="deleteRecord('${record.id}')">Delete</button>
            </td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch(err => console.error(err));
  }

  // Function to add a new health record
  const recordForm = document.getElementById('record-form');
  recordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(recordForm);
    const record = {};
    formData.forEach((value, key) => record[key] = value);
    fetch('/api/health-records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    })
      .then(response => response.json())
      .then(() => {
        recordForm.reset();
        loadRecords();
      })
      .catch(err => console.error(err));
  });

  // Function to delete a health record
  window.deleteRecord = function(id) {
    fetch(`/api/health-records/${id}`, {
      method: 'DELETE'
    })
      .then(() => loadRecords())
      .catch(err => console.error(err));
  };

  // Load records when button is clicked
  document.getElementById('load-records').addEventListener('click', loadRecords);

  // Disease detection (placeholder functionality)
  const diseaseForm = document.getElementById('disease-form');
  diseaseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const species = document.getElementById('species-select').value;
    const symptoms = Array.from(document.querySelectorAll('input[name="symptoms"]:checked')).map(el => el.value);
    const duration = document.getElementById('duration').value;
    const additionalNotes = diseaseForm.querySelector('textarea[name="additionalNotes"]').value;
    
    // Placeholder analysis – in a real application, send this data to the backend for processing.
    const analysisResult = `Species: ${species}\nSymptoms: ${symptoms.join(', ')}\nDuration: ${duration}\nNotes: ${additionalNotes}\n\nPotential Issues: This is a demo analysis.`;
    document.getElementById('analysis-results').textContent = analysisResult;
  });
});