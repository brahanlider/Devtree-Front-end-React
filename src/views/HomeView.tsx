import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

export default function HomeView() {
  return (
    <>
      <Header />

      <main className="min-h-screen py-10 bg-gray-100 bg-right-top bg-no-repeat lg:bg-home bg-home-xl">
        <div className="max-w-5xl mx-auto mt-10">
          <div className="px-10 space-y-6 lg:w-1/2 lg:p-0">
            <h1 className="text-6xl font-black">
              Todas tus <span className="text-cyan-400">Redes Sociales</span> en
              un enlace
            </h1>

            <p className="text-xl text-slate-800">
              Únete a una comunidad de más de 200 usuarios que ya están
              compartiendo sus redes sociales. ¡Comparte tu perfil de TikTok,
              Instagram, GitHub, LinkedIn y más, y conecta con otros
              profesionales apasionados como tú!
            </p>
            <SearchForm />
          </div>
        </div>
      </main>
    </>
  );
}
