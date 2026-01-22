const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// -------------------------------------1--------------------------------------------
// 1. Store the the average weight of a "Husky" in a variable "huskyWeight"
const huskyWeight = breeds.find(
  (breed) => breed.breed.toLowerCase() === 'husky'
).averageWeight;
// console.log(huskyWeight);

// -------------------------------------2--------------------------------------------
// 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)

// only first breed
const mostActiveBreed = breeds.find((breed) => {
  return (
    breed.activities.includes('running') && breed.activities.includes('fetch')
  );
});
// console.log(mostActiveBreed);

// all breads
const mostActiveBreeds = breeds.filter((breed) => {
  return (
    breed.activities.includes('running') && breed.activities.includes('fetch')
  );
});
// console.log(mostActiveBreeds);

// -------------------------------------3--------------------------------------------
// Create an array "allActivities" of all the activities of all the dog breeds
const allActivities = breeds.map((breed) => breed.activities).flat();
// console.log(allActivities);

// -------------------------------------4--------------------------------------------
//  4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
const uniqueActivities = new Set(breeds.flatMap((breed) => breed.activities));
// console.log(uniqueActivities);

// -------------------------------------5--------------------------------------------
// 5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities
// these breeds like to do, in a unique array called "swimmingAdjacent".

const activitySet = new Set(
  breeds
    .map((breed) => breed.activities)
    .filter((activity) => activity.includes('swimming'))
    .flat()
);
const activityArr = [...activitySet.values()];
const index = activityArr.indexOf('swimming');
activityArr.splice(index, 1);
const swimmingAdjacent = activityArr;

// -------------------------------------6--------------------------------------------
//  6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
// console.log(breeds.every((breed) => breed.averageWeight >= 10));
// console.log(swimmingAdjacent);

// -------------------------------------7--------------------------------------------
// 7. Are there any breeds that are "active"? "Active" means that the dog has
//  3 or more activities. Log to the console whether "true" or "false".

// First i`ve think i shoud do smth like this`:

// const isThereAny = breeds.forEach((breed) => {
//   console.log(
//     `${breed.breed} has more than 2 activity ${breed.activities.length > 1 ? true : false}`
//   );
// });

// Second: correct

console.log(breeds.some((breed) => breed.activities.length > 1));

// -------------------------------------8--------------------------------------------
// BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.
const maxAvWeight = Math.max(...breeds.map((br) => br.averageWeight));
console.log(maxAvWeight);
