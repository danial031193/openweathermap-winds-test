export const fetchResponse = async (url) => {
  const data = await fetch(url)

  return await data.json()
}

export const getMin = (arr, key) => {
  return arr.reduce((min, p) => p[key] < min ? p[key] : min, arr[0][key])
}

export const getMax = (arr, key) => {
  return arr.reduce((max, p) => p[key] > max ? p[key] : max, arr[0][key])
}
