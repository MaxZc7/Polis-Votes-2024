import { useEffect, useState } from 'preact/hooks';
import Spin from './Spin';
export default function CandidatesPerc() {
  interface Vote {
    option_id: string;
    username: string;
    votes_id: number;
  }

  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const response = await fetch('/api/voto', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (response.ok) {
        const data: Vote[] = await response.json();

        const voteCounts: { [key: string]: number } = {
          '0': 0,
          '1': 0,
          '2': 0,
          '3': 0,
        };

        data.forEach((vote: any) => {
          voteCounts[vote.option_id]++;
        });
        setData(voteCounts);
      } else {
        console.error(
          'Error en la solicitud:',
          response.status,
          response.statusText
        );
      }
    } catch (e) {
      console.error('Error al realizar la solicitud:', e);
      throw e;
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const data0 = data['0' as keyof typeof data];
  const data1 = data['1' as keyof typeof data];
  const data2 = data['2' as keyof typeof data];
  const data3 = data['3' as keyof typeof data];

  //CALCS
  const sumData = data0 + data1 + data2 + data3;

  // CALCS FOR PERCENTAJES
  const percentajeData0 = (data0 / sumData) * 100;
  const percentajeData1 = (data1 / sumData) * 100;
  const percentajeData2 = (data2 / sumData) * 100;
  const percentajeData3 = (data3 / sumData) * 100;

  //FIXEDS
  const percentajeData0F = percentajeData0.toFixed(1);
  const percentajeData1F = percentajeData1.toFixed(1);
  const percentajeData2F = percentajeData2.toFixed(1);
  const percentajeData3F = percentajeData3.toFixed(1);

  return (
    <div class="flex w-full font-montserrat flex-col justify-center items-center mt-24 gradientBrown-bg">
      <h5 class="mb-12  mt-24 lg:text-4xl text-3xl text-center text-white capitalize ">
        Candidatos y su porcentaje de votos
      </h5>
      <div class="lg:grid grid-cols-4 px-12 flex flex-col lg:gap-10 gap-5 mb-8">
        <div class="text-center">
          <img
            class="rounded-xl border-4 border-[#f4f4f4]"
            src="izquierda-vote.webp"
            alt=""
          />
          <div class="lg:text-3xl text-xl flex justify-center text-sky-200 p-2">
            Votos: {typeof data0 == 'undefined' ? <Spin /> : data0}
          </div>{' '}
          <div class="lg:text-3xl  text-xl flex justify-center gap-2 text-sky-200 p-2">
            Porcentaje:{' '}
            {isNaN(parseFloat(percentajeData0F)) ? (
              <Spin />
            ) : (
              percentajeData0F + '%'
            )}
          </div>
        </div>
        <div class="text-center">
          <img
            class="rounded-xl border-4 border-[#f4f4f4]"
            src="peronismo-vote.webp"
            alt=""
          />
          <div class="lg:text-3xl text-xl flex justify-center gap-2 text-sky-200 p-2">
            Votos: {typeof data1 == 'undefined' ? <Spin /> : data1}
          </div>{' '}
          <div class="lg:text-3xl text-xl flex justify-center gap-2 text-sky-200 p-2">
            Porcentaje:{' '}
            {isNaN(parseFloat(percentajeData1F)) ? (
              <Spin />
            ) : (
              percentajeData1F + '%'
            )}
          </div>
        </div>
        <div class="text-center">
          <img
            class="rounded-xl border-4 border-[#f4f4f4]"
            src="macri-vote.webp"
            alt=""
          />
          <div class="lg:text-3xl text-xl flex justify-center gap-2 text-sky-200 p-2">
            Votos: {typeof data2 == 'undefined' ? <Spin /> : data2}
          </div>{' '}
          <div class="lg:text-3xl text-xl flex justify-center gap-2 text-sky-200 p-2">
            Porcentaje:{' '}
            {isNaN(parseFloat(percentajeData2F)) ? (
              <Spin />
            ) : (
              percentajeData2F + '%'
            )}
          </div>
        </div>
        <div class="text-center">
          <img
            class="rounded-xl border-4 border-[#f4f4f4]"
            src="milei-vote.webp"
            alt=""
          />
          <div class="lg:text-3xl text-xl flex justify-center gap-2 text-sky-200 p-2">
            Votos: {typeof data3 == 'undefined' ? <Spin /> : data3}
          </div>{' '}
          <div class="lg:text-3xl text-xl flex justify-center gap-2 text-sky-200 p-2">
            Porcentaje:{' '}
            {isNaN(parseFloat(percentajeData3F)) ? (
              <Spin />
            ) : (
              percentajeData3F + '%'
            )}
          </div>
        </div>
      </div>
      <div class="flex justify-center mb-12 items-center lg:text-2xl text-xl text-white border border-white bg-black/30 hover:bg-black/50 lg:p-4 rounded-2xl p-3 transition-opacity">
        <button onClick={() => getData()}>Reload Data</button>
      </div>
    </div>
  );
}
