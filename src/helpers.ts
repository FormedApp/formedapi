export const getToken = function(headers: any) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};