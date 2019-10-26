function calculateWeightClass(weight) {
  const weightValue = parseInt(weight);
  if (weightValue < 10) {
    return 'XS';
  } else if (weightValue < 20) {
    return 'S';
  } else if (weightValue < 50) {
    return 'M';
  } else if (weightValue < 100) {
    return 'L';
  } else {
    return 'XL';
  }
}

/*
weight classes by lb
XS - 0-10
S - 10-20
M - 20-50
L - 50-100
XL - 100+
*/

function convertEnergyLevel(energyLevel) {
  switch (parseInt(energyLevel)) {
    case 0:
      return 'Low';
    case 1:
      return 'Medium';
    case 2:
      return 'High';
    default:
      return '?';
  }
}

function convertDate(unixTimestamp) {
  const unixTimeInMS = parseInt(unixTimestamp) * 1000;
  const dateObject = new Date(unixTimeInMS);
  const dateString = dateObject.toDateString();
  const displayDate = dateString.substring(0, 3) + ',' + dateString.substring(3, 10) + ',' + dateString.substring(10);
  return displayDate;
}

function formatBreedName(breed) {
  const wordsArray = breed.split(' ');
  const formattedWordsArray = wordsArray.map(word => {
    const firstLetter = word[0].toUpperCase();
    const rest = word.substring(1).toLowerCase();
    return firstLetter + rest;
  });
  return formattedWordsArray.join(' ');
}

export { calculateWeightClass, convertEnergyLevel, convertDate, formatBreedName };
