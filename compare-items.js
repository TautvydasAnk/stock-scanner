// Utility to compare two arrays of items and output a summary of changes
const fs = require('fs');
const path = require('path');

function loadItems(file) {
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return [];
  }
}

function diffItems(prev, curr) {
  const prevNames = new Set(prev.map(i => i.name));
  const currNames = new Set(curr.map(i => i.name));
  const added = [...currNames].filter(n => !prevNames.has(n));
  const removed = [...prevNames].filter(n => !currNames.has(n));
  // For now, only name-based diff; extend if more fields
  return { added, removed };
}

function main() {
  const prevPath = path.resolve(process.cwd(), 'previous-scan-items.json');
  const currPath = path.resolve(process.cwd(), 'scan-items.json');
  const prev = loadItems(prevPath);
  const curr = loadItems(currPath);
  const { added, removed } = diffItems(prev, curr);
  let summary = '';
  if (added.length) summary += `Added items (${added.length}):\n` + added.map(n => `+ ${n}`).join('\n') + '\n';
  if (removed.length) summary += `Removed items (${removed.length}):\n` + removed.map(n => `- ${n}`).join('\n') + '\n';
  if (!summary) summary = 'No changes in items.';
  fs.writeFileSync(path.resolve(process.cwd(), 'scan-diff.txt'), summary);
}

main();
