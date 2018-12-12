document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.querySelector('#reportFile');
  const csvReport = document.querySelector('#csvReport');
  const form = document.querySelector('form');
  const reportSubmitButton = document.querySelector('#reportSubmit');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  reportSubmitButton.addEventListener('click', (event) => {
    const file = fileInput.files[0];
    // console.log(file);
    if (!file) {
      alert('No file was selected! Please choose a file before submitting.');
      return;
    }
    
    const data = new FormData();
    data.append('reportFile', file);
    fetch('/report', {
      method: 'POST',
      body: data,
    }).then(res => {
      res.text().then(text => {
        const csvReportData = JSON.parse(text);
        console.log(text);
        console.log(csvReportData);
      });
    });
  });
});