/* Word Break */

/* Question
Given a string 's' and a dictionary (array of words), find out if the string can
be divided into space delineated sentence given the words in the dictionary.

Ex:
s = 'bettercodebetter'
dict = ['bet','better','code']

return true => 'better code better'
*/

/* Complexities
n = string length
d = dictionary length

time: best case: O(n) worstcase: ...
space: O(n) ... can include recursive call for each letter ... i.e. = ['icu'] => ' i c u'

*/

const s = 'bettercode';
const dict = ['bet', 'better', 'code'];

const wordBreak = (s, dict) => {
  // base case
  if (!s.length) return true;

  let curWord = '';
  for (let i = 0; i < s.length; i++) {
    let curLetter = s[i];
    curWord += curLetter;
    if (dict.indexOf(curWord) !== -1) {
      let found = wordBreak(s.slice(i + 1), dict);
      if (found) return true;
    }
  }

  return false;
};

console.log('running wordBreak');
console.log('wordBreak answer: ', wordBreak(s, dict))
console.log('finished running word break')
