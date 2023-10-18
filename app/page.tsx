import { Badge } from "@/components/ui/badge"

const Home = () => {

  return (
    <main className="min-h-screen p-4 bg-white dark:bg-[#1C1917]">
      <div
        className="max-w-4xl bg-white border z-40 shadow dark:bg-[#131110] mx-auto text-center relative px-4 py-8 md:py-12 rounded-2xl"
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl text-black dark:text-white font-black mb-4 md:mb-8"><span className="text-primary">PDF</span>izado</h1>
        <p className="text-lg md:text-xl mb-8">Haz tu estudio más fácil interactuando con la Inteligencia Artificial mediante un chat para extraer la información más relevante de tus archivos <span className="font-bold">PDF.</span></p>
        <p className="text-xl md:text-2xl">&iexcl;Solamente arrastra tu archivo y puedes empezar a preguntar lo que necesites!</p>
        <div className="w-48 h-48 bg-primary/20 absolute rounded-full right-0 blur-xl z-10" />
        <div className="w-48 h-48 bg-primary/20 absolute rounded-full -left-32 top-0 blur-xl" />
        <Badge className="mt-8">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2" />En línea
        </Badge>
      </div>

      <div className="relative p-4 mt-16 w-full">


        <h1 className="text-3xl font-bold text-center">Interfaz y utilidad</h1>
      </div>
    </main>
  )
}
export default Home