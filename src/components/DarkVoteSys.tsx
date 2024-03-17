import CandidatesTotal from '../data/vote.json';

export default function VoteSys() {
  return (
    <div class="lg:grid grid-cols-4 px-12 lg:gap-10 gap-5 flex flex-col mb-10 ">
      {CandidatesTotal.map((candidate) => {
        return (
          <div class="relative text-center scale-105 hover:scale-110 transition">
            <img
              class="rounded-xl border-4 border-[#237067]"
              src={`${candidate['vote-image']}-vote.webp`}
              alt=""
            />
            <div class="absolute z-20 inset-0   text-white text-2xl font-semibold tracking-wider p-4 ">
              <div class="h-full w-full flex justify-center items-center">
                <i class="fa-solid fa-lock"></i>
              </div>
            </div>
            <div class="absolute rounded-xl z-10 inset-0 bg-blue-950/90"></div>
          </div>
        );
      })}
    </div>
  );
}
