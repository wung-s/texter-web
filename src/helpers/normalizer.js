// eslint-disable-next-line
export const normalizeById = data =>
  data.reduce((res, e) => {
    res[e.id] = e
    return res
  }, {})
