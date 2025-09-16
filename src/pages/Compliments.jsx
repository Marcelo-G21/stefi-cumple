import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import BackButton from "../components/BackButton";

export default function BirthdayPoints({ onPrev, onNext }) {
  const points = [
    {
      title: "Responsable y dedicada",
      description:
        "Buscas realizar las cosas poniendo mucha atención a los detalles, siempre intentando hacerlo lo mejor posible. No puedo evitar sentir una gran admiración por tí. Has demostrado que lo que te planteas, lo haces, eres realmente ejemplar✧",
      compliment: "Eres admirable ⊹₊⟡⋆",
    },
    {
      title: "Tu humor",
      description:
        "Tus bromas random, los gestos graciosos que haces, cada momento divertido ilumina más de lo que crees. Es un razgo característico tuyo que hace la vida mucho más feliz. Siento que es un razgo que te vuelve encantadora :3",
      compliment: "Eres un rayito de sol ⋆☀︎｡",
    },
    {
      title: "Tu visión de la moda",
      description:
        "Tu forma de ver la moda, el como realmente cada uno tiene su estilo propio, me inspira mucho, jamás lo había visto de esa forma. Me has ayudado demasiado en cuanto a mi imagen propia. No olvides tu sueño, porque sé que eres capaz de hacer lo que te propongas <3",
      compliment: "Eres capaz de grandes cosas",
      compliment2: "( ꈍ◡ꈍ)",
    },
    {
      title: "Inteligente y razonable",
      description:
        "Sueles reflexionar muy bien las cosas, admiro tu forma de abordar temas y razonar. Tanto la reflexión sobre situaciones propias como de opinión o que pueden ser polémicos, no sueles dejarte llevar por lo que una mayoría dice y sueles ir de frente, segura de lo que piensas. Siempre puedo aprender nuevas cosas a partir de lo que planteas y opinas, eso lo valoro muchísimo. Tener la razón se te da muy bien jeje ;3",
      compliment: "Eres increíble (˵ •̀ ᴗ - ˵ ) ✧",
    },
    {
      title: "Gusto musical",
      description:
        "Has compartido tanta música con la que he logrado conectar. Jamás esperé llegar a escuchar tanto a BTS, entre tantas otras canciones y artistas, solo gracias a tí fue posible. Literalmente me abriste una parte de la música que no había explorado y simplemente puedo decir: que buenos temardos >:3",
      compliment: "Tienes un exelente gusto musical ♬⋆.˚",
    },
    {
      title: "Tu forma de ser",
      description:
        "No puedo evitar adorarte. Cada ocurrencia, cada gesto, cada charla extensa, cada juego, cada momento lindo junto a tí genera felicidad. Eres tú, en tu totalidad quién logra cautivar completamente y hacer de la vida un lugar más bonito contigo en ella <3",
      compliment: "Tu existencia es simplemente hermosa ❀࿐",
    },
  ];

  const [page, setPage] = useState(0);
  const [expandedText, setExpandedText] = useState(null);

  const itemsPerPage = 2;
  const startIndex = page * itemsPerPage;
  const visiblePoints = points.slice(startIndex, startIndex + itemsPerPage);

  const isLastPage = startIndex + itemsPerPage >= points.length;
  const isFirstPage = page === 0;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex items-center justify-center h-screen p-6 text-sm">
      <BackButton onPrev={onPrev} data-lunita-ignore />
      <motion.div
        key={page}
        initial="hidden"
        animate="visible"
        variants={container}
        className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 max-w-md w-full border-4 border-pink-300"
      >
        <h2 className="text-xl font-bold mb-6 text-pink-400 text-center">
          Algunas razones por las que eres maravillosa
        </h2>

        <ul className="space-y-6">
          {visiblePoints.map((point, i) => (
            <motion.li
              key={i}
              variants={item}
              className="p-4 rounded-lg bg-pink-50 shadow-md text-left cursor-pointer "
              onClick={() => setExpandedText(point)}
              data-lunita-ignore
            >
              <h3 className="text-lg font-semibold text-pink-400 mb-1">
                {point.title}
              </h3>
              <p className="text-gray-700 line-clamp-4">{point.description}</p>

              {/* Compliment separado */}
              <p className="mt-3 text-pink-400 text-center font-[cursive] text-lg">
                {point.compliment}
              </p>
              {point.compliment2 && (
                <p className="text-pink-400 text-center font-[cursive] text-lg">
                  {point.compliment2}
                </p>
              )}
            </motion.li>
          ))}
        </ul>

        {/* Controles de navegación */}
        <div className="mt-6 flex items-center justify-center space-x-4">
          {!isFirstPage && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-pink-300 text-white rounded-full shadow-md hover:bg-pink-400 transition flex items-center justify-center"
              data-lunita-ignore
            >
              <FaArrowLeft className="text-lg w-4 h-8" />
            </motion.button>
          )}

          {!isLastPage ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-pink-300 text-white rounded-full shadow-md hover:bg-pink-400 transition flex items-center justify-center"
              data-lunita-ignore
            >
              <FaArrowRight className="text-lg w-4 h-8" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
              className="px-6 py-3 bg-pink-400 text-white rounded-xl shadow-md hover:bg-pink-600 transition flex items-center gap-2"
              data-lunita-ignore
            >
              Siguiente <FaArrowRight />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {expandedText && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedText(null)}
            data-lunita-ignore
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-xs w-full shadow-lg relative border-3 border-pink-300"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              data-lunita-ignore
            >
              <h3 className="text-lg font-semibold text-pink-400 mb-3">
                {expandedText.title}
              </h3>
              <p className="text-gray-700 mb-4">{expandedText.description}</p>

              {/* Compliment en el modal también */}
              <p className="text-pink-400 text-center font-[cursive] text-lg">
                {expandedText.compliment}
              </p>
              {expandedText.compliment2 && (
                <p className="text-pink-400 text-center font-[cursive] text-lg">
                  {expandedText.compliment2}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
