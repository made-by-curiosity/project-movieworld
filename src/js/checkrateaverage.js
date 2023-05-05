const AVERAGE_BAD = '/rangebad.e7154eae.png';
const AVERAGE_GOOD = '/rangegood.de2bd7fb.png';
const AVERAGE_GREAT = '/rangegreat.41d4fa5e.png';

export function checkAverange(average) {
  if (average < 5) {
    return AVERAGE_BAD;
  } else if (average > 5 && average < 8) {
    return AVERAGE_GOOD;
  } else {
    return AVERAGE_GREAT;
  }
}
