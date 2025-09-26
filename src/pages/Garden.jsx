import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../components/BackButton';

const flowers = [
  { emoji: '🌹', text: 'Eres increíblemente hermosa, nunca dudes de ello' },
  { emoji: '🌻', text: 'Tu alegría ilumina como un rayito de sol' },
  {
    emoji: '🌸',
    text: 'Cada vez que te veo, tienes un aura tan hermosa y delicada',
  },
  { emoji: '🌼', text: 'Tienes los ojitos más lindos que existen' },
  {
    emoji: '🌷',
    text: 'Eres alguien muy admirable y capaz de lograr todo lo que te propongas',
  },
  {
    emoji: '🌺',
    text: 'No hay nadie más que pueda tener tu encanto, eres simplemente maravillosa',
  },
];

export default function Garden({ onNext, onPrev }) {
  const [selectedFlower, setSelectedFlower] = useState(null);

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <BackButton onPrev={onPrev} data-lunita-ignore />

      {/* Card grande */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 max-w-md w-full border-4 border-pink-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-pink-400 text-center">
          Un jardín florece °❀⋆.ೃ࿔*:･
        </h2>

        {/* Grid con flores*/}
        <div className="grid grid-cols-2 gap-6">
          {flowers.map((flower, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFlower(flower)}
              className="flex items-center justify-center bg-pink-50 p-6 rounded-xl shadow-md cursor-pointer"
              data-lunita-ignore
            >
              <span className="text-5xl">{flower.emoji}</span>
            </motion.div>
          ))}
        </div>

        {/* Botón continuar */}
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onNext}
            className="px-6 py-3 bg-pink-400 text-white rounded-xl shadow-md hover:bg-pink-600 transition"
            data-lunita-ignore
          >
            Un momento...
          </motion.button>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedFlower && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFlower(null)}
            data-lunita-ignore
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-xs w-full shadow-lg relative text-center font-semibold"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              data-lunita-ignore
            >
              <span className="text-6xl">{selectedFlower.emoji}</span>
              <p className="mt-4 text-pink-400 text-lg">
                {selectedFlower.text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
