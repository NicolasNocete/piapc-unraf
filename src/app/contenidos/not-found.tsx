import Link from "next/link";

export default function ContentNotFound() {
  return <main className="grid min-h-svh place-items-center bg-[#f2f0e8] p-6 text-center"><div><h1 className="text-4xl font-semibold">Contenido no disponible</h1><Link className="mt-5 inline-block underline" href="/contenidos">Volver al catalogo</Link></div></main>;
}
