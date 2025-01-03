const sqlPromise = initSqlJs({
  locateFile: file => `node_modules/sql.js/dist/${file}`
});
const dataPromise = fetch("coaches.db").then(res => res.arrayBuffer());
const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
const db = new SQL.Database(new Uint8Array(buf));

let coaches = [0];

db.each("SELECT * FROM aggregated", function (row){coaches.push(row)});

console.log(coaches[1]);

const jsonString = JSON.stringify(coaches, null, 2);

const blob = new Blob([jsonString], { type: 'application/json' });
const url = URL.createObjectURL(blob);

const a = document.createElement('a');
a.href = url;
a.download = 'data.json'; // The file name
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
