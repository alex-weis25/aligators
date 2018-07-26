/* Convert book to trie */

/* Question
Find the starting indicies of each word in a given book.
*/

const book = `Once upon a time, there was a book with words. The book had not been catalogued, but would catch the eyes of onlookers nonetheless.`;

const makeTrie = book => {
  let trie = {};
  let bookLower = book.toLowerCase()
  let endings = [' ', '.', ',', '?', '!'];

  for (let i = 0; i < bookLower.length; i++) {
    let current = bookLower[i]
    let start = i;
    let node = trie;

    while (endings.indexOf(current) === -1 && i < bookLower.length) {
      if (node[current]) {
        node[current].indices.push(start);
        node = node[current];
      } else {
        node[current] = {indices: [start]};
        node = node[current];
      }
      i++;
      current = bookLower[i]
    }
  }
  return trie;
};

const wordLookUp = (book, word) => {
  let trie = makeTrie(book);

  for (let i = 0; i < word.length; i++){
    let letter = word[i];
    if (trie[letter]){
      trie = trie[letter];
    } else {
      return -1;
    }
  }
  return trie.indices;
};

console.log('wordLookUp answer: ', wordLookUp(book, 'the'));
