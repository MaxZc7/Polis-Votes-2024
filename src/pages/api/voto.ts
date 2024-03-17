import { type APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import { addVote, cleanVote, getVotes } from '../../database/client';

export const POST: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const username = session?.user?.name;

  if (!username) {
    return new Response('Unauthorized', { status: 401 });
  }

  let votesToSend = [];
  try {
    const { votes } = await request.json();

    votesToSend = votes;
  } catch (e) {
    return new Response('Bad Request', { status: 400 });
  }

  try {
    await cleanVote(username);
    await addVote(username, votesToSend);
  } catch (e) {
    console.log(e);
    return new Response('Internal Server Error', { status: 500 });
  }

  return new Response('ok', { status: 200 });
};

export const GET: APIRoute = async ({ request }) => {
  try {
    const votes = await getVotes();
    return new Response(JSON.stringify(votes.rows), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response('Internal Server Error', { status: 500 });
  }
};
