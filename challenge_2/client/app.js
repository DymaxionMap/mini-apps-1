const renderHeader = (headers) => {
  return headers.reduce((headerHtml, header) => headerHtml + `<th>${header}</th>`, '');
};

const renderRow = (row) => {
  return row.reduce((rowHtml, item) => rowHtml + `<td>${item}</td>`, '');
};

const renderRows = (rows) => {
  return rows.reduce((tableHtml, row) => {
    return tableHtml + `<tr>${renderRow(row)}</tr>`;
  }, '');
};

const renderTable = (headers, rows) => {
  return (
    `<table>
      <thead>
        ${renderHeader(headers)}
      </thead>
      <tbody>
        ${renderRows(rows)}
      </tbody>
    </table>`
  );
};

const renderDownloadLink = (url) => {
  return `<a href="${url}">Download CSV report</a>`;
};

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
        const { headers, rows, filePath } = JSON.parse(text);
        csvReport.innerHTML = renderTable(headers, rows);
        const download = document.querySelector('#download');
        download.innerHTML = renderDownloadLink(filePath);
      });
    });
  });
});