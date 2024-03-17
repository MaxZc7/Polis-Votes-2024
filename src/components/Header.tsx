import { useState } from 'preact/hooks';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <header
      class={`${
        menuOpen ? 'h-screen ' : ''
      } fixed top-0 w-full py-4 headerBgBlurMobile  text-white textShadow z-50 `}
    >
      <div class="flex  items-center max-w-7xl justify-between mx-auto px-4">
        <div class="flex  justify-between w-full lg:w-auto z-50">
          <a href="/" class="text-5xl font-bold textGlow">
            Polis
          </a>
          <button
            onClick={() => toggleMenu()}
            class="text-3xl focus:outline-none lg:hidden z-50 "
          >
            {menuOpen ? (
              <i class="fas fa-xmark"></i>
            ) : (
              <i class="fas fa-bars"></i>
            )}
          </button>
        </div>
        {/* mobile nav */}
        <div class={`${menuOpen ? 'flex' : 'hidden'} `}>
          <nav
            class={`flex absolute left-0 w-full top-0 flex-col justify-center items-center h-screen gap-4 text-4xl tracking-wide uppercase m-auto`}
          >
            <a
              class="textGlow bg-black/25 p-4 px-6 textShadow rounded-xl"
              href="/vota"
            >
              Votar
            </a>
            <a
              class="textGlow bg-black/25 p-4 px-6 textShadow rounded-xl"
              href="/candidatos"
            >
              Candidatos
            </a>
            <a
              class="textGlow bg-black/25 p-4 px-6 textShadow rounded-xl"
              href="/info"
            >
              Informacion
            </a>
          </nav>
        </div>
        {/* Normal Nav */}
        <nav class="hidden lg:flex gap-4 text-2xl  tracking-wide uppercase">
          <a class="textGlow" href="/vota">
            Votar
          </a>
          <a class="textGlow" href="/candidatos">
            Candidatos
          </a>
          <a class="textGlow" href="/info">
            Informacion
          </a>
        </nav>

        <div class="hidden lg:block">
          <a
            target="_blank"
            class="textGlow"
            href="https://github.com/MaxZc7?tab=repositories"
          >
            <i class="fab fa-github text-2xl "></i>
          </a>
        </div>
      </div>
    </header>
  );
}
