
export function debounce(callback, delay) {
  let timeout;
  const debouncedMethod = function () {
    const args = Array.from(arguments);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, delay || 100);
  };

  debouncedMethod.destroy = function () {
    if (timeout) clearTimeout(timeout);
  };

  return debouncedMethod;
}

export function getFilters() {
  const {
    location: { query },
  } = history;
  return query;
}

const setQueryParam = (filterObject) => {
  const {
    location: { pathname, query },
  } = history;

  history.push({
    pathname,
    query: {
      ...query,
      ...filterObject,
    },
  });
};

export const debounceSetQueryParams = debounce(setQueryParam, 1000);
