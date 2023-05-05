
const AVERAGE_BAD = '/rangebad.e7154eae.png';
const AVERAGE_GOOD = '/rangegood.de2bd7fb.png';
const AVERAGE_GREAT = '/rangegreat.41d4fa5e.png';

export const checkAverange = function checkAverange(average) {
  if (average < 5) {
    return (average = AVERAGE_BAD);
  } else if (average > 5 && average < 8) {
    return (average = AVERAGE_GOOD);
  } else {
    return (average = AVERAGE_GREAT);
  }
};