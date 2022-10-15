export function isUsername(username: string) {
  const usernameRegex = /^[a-zA-Z0-9]{1,20}$/;
  const regex = new RegExp(usernameRegex);
  return username ? regex.test(username) : false;
}
