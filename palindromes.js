/* Balanced Brackets */


const s = '([{{[()]}()}[]])';

const balancedBrackets = s => {
  const opens = ['(','[','{'];
  const closed = [')',']','}'];
  let openStack = [];

  for(let i = 0; i < s.length; i++){
      if(opens.includes(s[i])){
          openStack.push(s[i]);
      } else {
          let next = openStack.pop();
          if(opens.indexOf(next) !== closed.indexOf(s[i])) return false;
      }
  }
  if(!openStack.length) return true;
  return false;
};

console.log('balancedBrackets answer: ', balancedBrackets(s));

