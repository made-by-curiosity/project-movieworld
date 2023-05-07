const AVERAGE_BAD =
  'https://github.com/made-by-curiosity/project-movieworld/blob/main/src/images/rangebad.png?raw=true';
const AVERAGE_GOOD =
  'https://github.com/made-by-curiosity/project-movieworld/blob/main/src/images/rangegood.png?raw=true';
const AVERAGE_GREAT =
  'https://github.com/made-by-curiosity/project-movieworld/blob/main/src/images/rangegreat.png?raw=true';

export function checkAverange(average) {
  if (average < 5) {
    return AVERAGE_BAD;
  } else if (average > 5 && average < 8) {
    return AVERAGE_GOOD;
  } else {
    return AVERAGE_GREAT;
  }
}
