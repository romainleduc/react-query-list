export const paramsSerializer = (params) => {
  const searchParams = new URLSearchParams();
  for (const key of Object.keys(params)) {
    const param = params[key];
    if (Array.isArray(param)) {
      for (const p of param) {
        searchParams.append(key, p);
      }
    } else {
      searchParams.append(key, param);
    }
  }
  return searchParams.toString();
}

export const getFetch = (url, filters) => {
  return new Promise((resolve) => {
    fetch(`https://my-json-server.typicode.com/romainleduc/react-query-list${url}${filters ? `?${paramsSerializer(filters)}`: ''}`)
    .then(res => res.json())
    .then((newData) => resolve(newData));
  })
}