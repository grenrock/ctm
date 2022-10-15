import mysql from 'mysql2';
import { isUsername } from './regex';

type UserColumns = 'id' | 'username';

async function runQuery(query: string) {
  const conn = mysql.createConnection({
    host: process.env.FOXDALE_MYSQL_HOST || 'localhost',
    user: process.env.FOXDALE_MYSQL_USER || 'root',
    password: process.env.FOXDALE_MYSQL_PASSWORD || '',
    database: process.env.FOXDALE_MYSQL_DATABASE || 'foxdale',
  });
  return new Promise<any>((resolve) => {
    conn.execute(query, (err, results) => {
      if (err) {
        resolve(null);
      } else {
        resolve(results);
      }
    });
  });
}

export async function adminGetUser(username: string, by: UserColumns) {
  if (!isUsername(username)) {
    return null;
  }
  const queryRes: any = await runQuery(
    `SELECT * FROM users WHERE ${by} = "${username}"`,
  );
  if (queryRes) return queryRes[0];
  return null;
}

export async function getUser(username: string, by: UserColumns) {
  if (!isUsername(username)) {
    return null;
  }
  const queryRes: any = await runQuery(
    `SELECT * FROM users WHERE ${by} = "${username}"`,
  );
  if (queryRes) return queryRes[0];
  return null;
}

export async function getBlockedUsers(uid: string) {
  if (!isUsername(uid)) {
    return null;
  }
  const queryRes: any = await runQuery(
    `SELECT block FROM user_block_rel WHERE uid = "${uid}"`,
  );
  if (queryRes) return queryRes;
  return null;
}

export async function createUser(username: string) {
  if (!isUsername(username)) {
    return null;
  }
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const queryRes: any = await runQuery(
    `
    INSERT INTO users (username, display_name, sign_up_date, banned, access_level)
    VALUES ("${username}", "${username}", "${date}", "0", "2")
    `,
  );
}
