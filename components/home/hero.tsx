type ThemeProps = {
    theme: string;
}

export default function Hero({
    theme
}:ThemeProps) {
  return (
    <section className="relative w-full mx-auto max-w-7xl px-6 pb-0 lg:h-[330px]">

      {/* Texto do Hero */}
      <div className="relative z-10 max-w-[680px] lg:pt-10">
        <h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-[#101D35] md:text-5xl xl:text-[3.25rem]">
          Dados do Brasil com
          <span className="block">
            contexto, clareza e profundidade
          </span>
        </h1>
        <p className="mt-5 max-w-[600px] text-base leading-relaxed text-[#64748B]">
            O Observatório Nacional reúne indicadores demográficos, educacionais e de saúde do Brasil, com explicações acessíveis e acesso às fontes originais.
        </p>
      </div>

      {/* Imagem decorativa em segundo plano */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-visible lg:block">
        <img
          src="/images/hero-home.png"
          alt=""
          className="absolute -right-12 top-0 w-[750px] max-w-none object-contain"
        />
      </div>

    </section>
  );
}