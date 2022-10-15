import { getBlockedUsers, getUser, adminGetUser } from '@/utils/mysql';
import { UserDtoRes } from '@/dto/user';
import { redisGet } from '@/utils/redis';
import { isAdmin } from '@/utils/user';

export async function userService(
  requestedByUid: string,
  requestedUsername: string,
): Promise<UserDtoRes> {
  const requestedByUserAccessLevel = (await redisGet(requestedByUid))?.split(
    '-',
  )[1];
  const requestedUser = isAdmin(requestedByUserAccessLevel)
    ? await adminGetUser(requestedUsername, 'username')
    : await getUser(requestedUsername, 'username');
  if (!requestedUser) {
    return {
      status: 404,
      message: 'Not found',
      id: '0QcLmM',
    };
  }
  const blockedUsers = await getBlockedUsers(requestedUser.id);
  for (let i = 0; i < blockedUsers.length; i++) {
    if (blockedUsers[i].uid === requestedByUid) {
      return {
        status: 403,
        message: blockedUsers[i].reason,
        id: 'XcyrXL',
      };
    }
  }

  if (isAdmin(requestedByUserAccessLevel)) {
    return {
      status: 200,
      user: {
        id: requestedUser.id,
        username: requestedUser.username,
        displayName: requestedUser.display_name,
        bio: requestedUser.bio,
        pfp: requestedUser.pfp,
        signUpDate: requestedUser.sign_up_date,
        lastSignInDate: requestedUser.last_sign_in_date,
        banned: requestedUser.banned === 1,
        accessLevel: requestedUser.access_level,
      },
      id: 'vkedjN',
    };
  } else {
    return {
      status: 200,
      user: {
        id: requestedUser.id,
        username: requestedUser.username,
        displayName: requestedUser.display_name,
        bio: requestedUser.bio,
        pfp: requestedUser.pfp,
        signUpDate: requestedUser.sign_up_date,
        lastSignInDate: requestedUser.last_sign_in_date,
        banned: requestedUser.banned === 1,
        accessLevel: requestedUser.access_level,
      },
      id: 'Z8sUxp',
    };
  }
}
