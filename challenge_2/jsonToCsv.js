const example = {
    "firstName": "Joshie",
    "lastName": "Wyattson",
    "county": "San Mateo",
    "city": "San Mateo",
    "role": "Broker",
    "sales": 1000000,
    "children": [
    {
      "firstName": "Beth Jr.",
      "lastName": "Johnson",
      "county": "San Mateo",
      "city": "Pacifica",
      "role": "Manager",
      "sales": 2900000,
      "children": [
        {
          "firstName": "Smitty",
          "lastName": "Won",
          "county": "San Mateo",
          "city": "Redwood City",
          "role": "Sales Person",
          "sales": 4800000,
          "children": []
        },
        {
          "firstName": "Allen",
          "lastName": "Price",
          "county": "San Mateo",
          "city": "Burlingame",
          "role": "Sales Person",
          "sales": 2500000,
          "children": []
        }
      ]
    },
    {
      "firstName": "Beth",
      "lastName": "Johnson",
      "county": "San Francisco",
      "city": "San Francisco",
      "role": "Broker/Sales Person",
      "sales": 7500000,
      "children": []
    }
  ]
};

const recordsToCsv = records => {
  if (!records || records.length === 0) {
    throw new Error(`recordsToCsv: invalid records array: ${records}`);
  }

  const headers = Object.keys(records[0]);
  const rows = records.map(Object.values);
  return [headers, ...rows];
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
