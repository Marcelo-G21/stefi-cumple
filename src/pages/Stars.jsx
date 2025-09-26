import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import BackButton from '../components/BackButton';

const guests = [
  {
    name: 'Leon S. Kennedy',
    thumb: '/images/guest1.jpeg',
    image: '/images/guest1.jpeg',
    audio: '/audio/guest1.wav',
  },
  {
    name: 'Satoru Gojo',
    thumb: '/images/guest2.jpg',
    image: '/images/guest2.jpg',
    audio: '/audio/guest2.wav',
  },
  {
    name: 'Jeon Jungkook',
    thumb: '/images/guest3.jpg',
    image: '/images/guest3.jpg',
    audio: '/audio/guest3.mp3',
  },
];

export default function Stars({ onNext, onPrev }) {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const prevVisible = (e) => {
    e?.stopPropagation();
    if (visibleIndex > 0) setVisibleIndex((v) => v - 1);
  };
  const nextVisible = (e) => {
    e?.stopPropagation();
    if (visibleIndex < guests.length - 1) setVisibleIndex((v) => v + 1);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-6">
      <BackButton onPrev={onPrev} data-lunita-ignore className="card" />

      {/* Contenedor relativo para cards */}
      <div className="relative w-full max-w-md">
        {/* Card principal de invitados */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.32 }}
          className="card bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-6 border-4 border-pink-300"
          data-lunita-ignore
        >
          <h2 className="text-2xl font-bold mb-4 text-pink-400 text-center">
            Han llegado 3 invitados especiales ;3
          </h2>

          <div className="flex items-center justify-between">
            {visibleIndex > 0 ? (
              <button
                onClick={prevVisible}
                className="card w-10 h-10 flex items-center justify-center bg-pink-300 text-white rounded-full shadow-md hover:bg-pink-400 transition"
                aria-label="Anterior"
                data-lunita-ignore
              >
                <FaArrowLeft />
              </button>
            ) : (
              <div className="w-10" />
            )}

            <div className="w-64 mx-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={visibleIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedIndex(visibleIndex)}
                  data-lunita-ignore
                >
                  <div className="bg-pink-50 rounded-xl shadow-md p-4 flex flex-col items-center">
                    <img
                      src={guests[visibleIndex].thumb}
                      alt={guests[visibleIndex].name}
                      className="w-36 h-36 object-cover rounded-lg mb-3"
                    />
                    <div className="text-pink-400 font-semibold">
                      {guests[visibleIndex].name}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {visibleIndex < guests.length - 1 ? (
              <button
                onClick={nextVisible}
                className="card w-10 h-10 flex items-center justify-center bg-pink-300 text-white rounded-full shadow-md hover:bg-pink-400 transition"
                aria-label="Siguiente"
                data-lunita-ignore
              >
                <FaArrowRight />
              </button>
            ) : (
              <div className="w-10" />
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNext}
              className="card px-6 py-3 bg-pink-400 text-white rounded-xl shadow-md hover:bg-pink-600 transition"
              data-lunita-ignore
            >
              Seguir explorando
            </motion.button>
          </div>
        </motion.div>

        {/* Card de introducción encima */}
        <AnimatePresence>
          {showIntro && (
            <motion.div
              key="intro"
              className="absolute inset-0 z-10 bg-white border-4 border-pink-300 text-pink-400 p-6 rounded-2xl shadow-2xl text-center text-2xl font-bold flex items-center justify-center"
              initial={false} // ya empieza sólida
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              OMG!! Tenemos invitados ( ˶°ㅁ°) !!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal de invitado expandido */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            data-lunita-ignore
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg relative flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              data-lunita-ignore
            >
              <img
                src={guests[selectedIndex].image}
                alt={guests[selectedIndex].name}
                className="w-full rounded-lg mb-4 object-contain max-h-96"
              />

              <audio
                controls
                src={guests[selectedIndex].audio}
                className="w-full mb-4"
              />

              <div className="flex items-center justify-between w-full gap-4">
                {selectedIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(selectedIndex - 1);
                    }}
                    className="card w-10 h-10 flex items-center justify-center bg-pink-300 text-white rounded-full shadow-md hover:bg-pink-400 transition"
                    data-lunita-ignore
                  >
                    <FaArrowLeft />
                  </button>
                )}

                <div className="text-center text-pink-500 font-semibold flex-1">
                  {guests[selectedIndex].name}
                </div>

                {selectedIndex < guests.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(selectedIndex + 1);
                    }}
                    className="card w-10 h-10 flex items-center justify-center bg-pink-300 text-white rounded-full shadow-md hover:bg-pink-400 transition"
                    data-lunita-ignore
                  >
                    <FaArrowRight />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
