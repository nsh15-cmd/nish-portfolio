export default function HeroText() {
  return (
    <div className="flex flex-col justify-center h-full gap-16 z-10">
      {/* Intro Block */}
      <div>
        <p className="text-text-main text-base font-fira mb-3">Hi all. I am</p>

        {/* Changed from text-5xl/6xl to text-4xl/5xl */}
        <h1 className="text-text-main text-4xl md:text-5xl font-normal tracking-tight mb-3">
          Nishia Pinlac
        </h1>

        {/* Changed from text-2xl/3xl to text-xl/2xl */}
        <h2 className="text-accent-purple text-xl md:text-2xl font-fira flex items-center gap-2">
          <span>&gt;</span> Front-end developer
        </h2>
      </div>

      {/* Code Snippet Block */}
      <div className="font-fira text-sm md:text-base flex flex-col gap-2">
        <p className="text-text-comment">// complete the game to continue</p>
        <p className="text-text-comment">// find my profile on Github:</p>
        <p className="mt-1">
          <span className="text-accent-purple">const</span>{" "}
          <span className="text-accent-green">githubLink</span>{" "}
          <span className="text-text-main">=</span>{" "}
          {/* Notice we use an actual anchor tag here so the link is clickable */}
          <a
            href="https://github.com/nsh15-cmd"
            target="_blank"
            rel="noreferrer"
            className="text-[#E99287] hover:underline transition-all"
          >
            "https://github.com/nsh15-cmd"
          </a>
        </p>
      </div>
    </div>
  );
}
