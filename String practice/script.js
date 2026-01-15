const string =
  'underscore_case\nfirst_name\nSome_Variable\ncalculate_AGE\ndelayed_departure';

function corectString(str) {
  let firsIterResult = str.split('\n');
  for (const [i, row] of firsIterResult.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const corectLine =
      first.replace(first[0], first[0].toUpperCase()) +
      ' ' +
      second.replace(second[0], second[0].toUpperCase());

    console.log(`${corectLine.padEnd(25)}${'✅'.repeat(i + 1)}`);
  }
}
