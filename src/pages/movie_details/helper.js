export function renderRuntime(time) {
  if (time && time >= 0 ){
    let dates = new Date(time * 60 * 1000).toISOString().substr(11, 5).split(':');
    return dates[0] + 'h ' + dates[1] + 'm';  
  }
  return '00h 00m'
}

export function renderGenres (genres) {
  const gens = genres.map(a => a.name);
  return gens.join(", ");
}