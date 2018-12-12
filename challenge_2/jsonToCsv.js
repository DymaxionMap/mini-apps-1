const recordsToCsv = records => {
  if (!records || records.length === 0) {
    throw new Error(`recordsToCsv: invalid records array: ${records}`);
  }

  const headers = Object.keys(records[0]);
  const rows = records.map(Object.values);
  return [headers, rows];
};

jsonToCsv = json => {
  const report = JSON.parse(json);
  const records = [];
  const traverse = (record) => {
    records.push(record);
    if (!record.children || record.children.length === 0) {
      return;
    }

    record.children.forEach(traverse);
  };

  traverse(report);
  let csv = recordsToCsv(records.map(record => {
    delete record['children'];
    return record;
  }));
  return csv;
};

module.exports = jsonToCsv;
