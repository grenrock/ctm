import { createClient } from 'redis';

export async function redisGet(key: string) {
  const client = createClient({ url: process.env.CTM_REDIS });
  await client.connect();
  const value = await client.get(key);
  await client.quit();
  return value;
}

export async function redisSet(key: string, value: string, expiry: number) {
  const client = createClient({ url: process.env.CTM_REDIS });
  await client.connect();
  await client.set(key, value, { EX: expiry });
  await client.quit();
}

export async function redisDel(key: string) {
  const client = createClient({ url: process.env.CTM_REDIS });
  await client.connect();
  await client.del(key);
  await client.quit();
}
