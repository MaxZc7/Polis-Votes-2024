import { createClient } from '@libsql/client';

const client = createClient({
  url: import.meta.env.DATABASE_URL ?? '',
  authToken: import.meta.env.DATABASE_TOKEN ?? '',
});

export const getVotes = async () => {
  const result = await client.execute({
    sql: `SELECT * FROM Votes`,
    args: [],
  });

  return result;
};

export const addVote = async (username: string, vote: any) => {
  const result = await client.execute({
    sql: `INSERT INTO Votes (username, option_id) VALUES (?,?)`,
    args: [username, vote],
  });
  return result;
};
export const cleanVote = async (username: string) => {
  const result = await client.execute({
    sql: `DELETE FROM Votes WHERE username = ?`,
    args: [username],
  });
  return result;
};
