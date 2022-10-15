const GHOST = 0;
const ADMIN = 1;
const USER = 2;

export function isGhost(accessLevel: number | string | undefined) {
  if (!accessLevel) return true;
  if (typeof accessLevel === 'string') return parseInt(accessLevel) === GHOST;
  return accessLevel === GHOST;
}

export function isAdmin(accessLevel: number | string | undefined) {
  if (!accessLevel) return true;
  if (typeof accessLevel === 'string') return parseInt(accessLevel) === ADMIN;
  return accessLevel === ADMIN;
}
