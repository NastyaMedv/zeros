module.exports = function zeros(expression) {

  function counting(number, step, find, start) {
    var zero = 0;
    var i = start, j = step;
    while (i <= number) {
      j = i;
      while ((j % find) == 0) {
        j = j / find;
        zero++;
      }
      i = i + step;
    }
    return zero;
  }

  var unusedTwo = 0, unusedFive = 0, startPos = 0;

  function countingFive(number) {
    return counting(number,5,5,5);
  }
  function countingTwo(number) {
    return counting(number,2,2,2);
  }
  function countingExtraFive(number,start) {
    return counting(number,2,5,start);
  }

  function define(str) {
    let num = parseInt(str);
    if ((str[(str.length-2)])!='!') {
      unusedTwo+=countingTwo(num);
      unusedFive+=countingFive(num);
    } else {
        if ((num % 2) == 0) {
          unusedTwo+=countingTwo(num);
          unusedFive+=countingExtraFive(num,2);
        } else {
            unusedFive+=countingExtraFive(num,1);
            }
      }
  }

  while (startPos < expression.length) {
    let mult = expression.indexOf('*',startPos);
    if (mult == -1) {
      define(expression.slice(startPos,(expression.length+1)));
      startPos = expression.length;
    } else {
      define(expression.slice(startPos,mult));
      startPos = mult+1;
    }
  }

  return Math.min(unusedTwo, unusedFive);
}
