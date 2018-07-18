const candies = (ratings) => {
  let numOfCandies = [1];

  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      numOfCandies[i] = numOfCandies[i - 1] + 1;
    } else {
      numOfCandies[i] = 1;
    }
  }

  for (let i = ratings.length - 1; i > 0; i--) {
    if (ratings[i - 1] > ratings[i]) {
      numOfCandies[i - 1] = Math.max(numOfCandies[i] + 1, numOfCandies[i - 1]);
    }
  }

    return numOfCandies.reduce((start, next) => {
      return start += next;
    }, 0);

};
