import { useEffect, useState } from 'preact/hooks';
import CandidatesTotal from '../data/vote.json';

export default function VoteSys() {
  const [votes, setVotes] = useState();
  const [status, setStatus] = useState('NORMAL');

  const handleVotes = (voteId: any) => {
    if (voteId !== votes) {
      setVotes(voteId);
    }
  };

  useEffect(() => {
    let item = localStorage.getItem('votes');
    let initialVotes;
    if (item !== null) {
      initialVotes = JSON.parse(item);
    } else {
      initialVotes = Array.from({ length: 1 }, () => []);
    }
    setVotes(initialVotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(votes));
  }, [votes]);

  const handleSendVotes = async () => {
    setStatus('LOADING');

    try {
      const response = await fetch('/api/voto', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ votes }),
      });

      if (!response.ok) {
        setStatus('ERROR');
        return;
      }
      setStatus('COMPLETE');
    } catch (e) {
      setStatus('ERROR');
    }

    let votosGuardados = localStorage.getItem('votes');
    if (votosGuardados) {
      // Simula enviar los votos a la base de datos (aquí deberías implementar la lógica real para enviarlos)

      console.log(
        'Enviando votos a la base de datos:',
        JSON.parse(votosGuardados)
      );
      // Limpia los votos almacenados en localStorage después de enviarlos a la base de datos
      localStorage.removeItem('votos');
      setStatus('FINALIZADO');
    } else {
      console.log('No hay votos almacenados para enviar.');
    }
  };

  return (
    <>
      <div>
        <h2 class="text-white  text-center lg:text-4xl text-3xl mb-10 lg:mt-4 mt-48">
          {status == 'NORMAL' ? (
            <h1>Votá Segun Tu Mirada!</h1>
          ) : (
            <a
              href="/candidatos"
              class="border rounded-full bg-black/30 p-4  textGlow"
            >
              Ver Votos
            </a>
          )}
        </h2>
        <div
          class={`${
            status == 'NORMAL' ? '' : 'lg:hidden hidden '
          }  lg:grid grid-cols-4 px-12 gap-5 lg:gap-10 mb-5 flex flex-col`}
        >
          {CandidatesTotal.map((candidate, index) => {
            const candidateId = `${index}`;
            return (
              <button
                id="button"
                class="relative text-center scale-105 hover:scale-110 transition"
                key={candidateId}
                onClick={() => handleVotes(candidateId)}
              >
                <img
                  class={` rounded-xl border-4 border-[#237067] ${
                    votes === candidateId
                      ? 'border-yellow-500 rounded-full'
                      : ''
                  } `}
                  src={`${candidate['vote-image']}-vote.webp`}
                  alt=""
                />
                <div class="absolute z-20 inset-x-0 bottom-0 text-white text-2xl font-semibold tracking-wider p-4">
                  {candidate['vote-name']}
                </div>
                <div class="absolute rounded-xl z-10 inset-0 bg-gradient-to-b from-transparent from-40% via-black/50 to-black/80"></div>
              </button>
            );
          })}
        </div>
        {status == 'NORMAL' ? (
          <div class="rounded-xl flex m-1 justify-center w-full ">
            <button
              onClick={() => handleSendVotes()}
              class="text-xl text-white  rounded-xl p-2 bg-black/30 hover:bg-black/60 transition font-semibold mb-2"
            >
              Enviar Voto
            </button>
          </div>
        ) : (
          <div class="p-2 text-white text-xl text-center">
            <p>Tu Voto Ha Sido Enviado</p>
            <a href="/vota " class="text-base font-semibold textGlow">
              Cambiar mi voto
            </a>
          </div>
        )}
      </div>
    </>
  );
}
