export const arrayNormalizer = (arr, key = 'id') => arr.reduce((obj, item) => Object.assign(obj, { [item[key]]: item }), {});
