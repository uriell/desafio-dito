export const arrayOfPropertiesToObject = (array) => {
  const obj = {};

  for (let i = 0, { length } = array; i < length; i++) {
    const item = array[i];

    obj[item.key] = item.value;
  }

  return obj;
};

export const qsStringify = (params = {}) => {
  if (typeof params !== 'object') return '';
  if (!Object.keys(params).length) return '';
  return `?${Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)}`;
};