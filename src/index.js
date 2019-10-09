module.exports = function zeros(expression) {

  function counting(number, step) {
    var zero = 0;
    var i = step, j = step;
    while (i <= number) {
      j = i;
      while ((j % step) == 0) {
        j = j / step;
        zero++;
      }
      i = i + step;
    }
    return zero;
  }

  var unusedTwo = 0, unusedFive = 0, startPos = 0;

  function countingFive(number) {
    return counting(number,5);
  }
  function countingTwo(number) {
    return counting(number,2);
  }
  function countingTen(number) {
    return counting(number,10);
  }

  function define(str) {
    let num = parseInt(str);
    if ((str[(str.length-2)])!='!') {
      unusedTwo+=countingTwo(num);
      unusedFive+=countingFive(num);
    } else {
        if ((num % 2) == 0) {
          unusedTwo+=countingTwo(num);
          unusedFive+=countingTen(num);
      } else {
          unusedFive+=countingFive(num);
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
