import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import BackButton from "../components/BackButton";

export default function Letter({ onNext, onPrev }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 relative">
      <BackButton onPrev={onPrev} />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-white shadow-xl rounded-2xl p-6 max-w-lg border-4 border-pink-300"
      >
        <p className="text-lg mb-6">
          Feliz cumpleaños a la mujer más hermosa que existe, con los ojitos más lindos y la cual aún no me
          creo que pueda tener el privilegio de conocer.{" "}
        </p>
        <p className="text-lg mb-6">(´｡• ◡ •｡`) ♡</p>
        <p className="text-lg mb-6">
          Pero un momento... por supuesto que eres más que eso ;3
        </p>

        <button
          onClick={onNext}
          className="mt-4 px-5 py-3 bg-pink-300 text-white rounded-full shadow-lg hover:bg-pink-600 transition flex items-center gap-2 mx-auto"
        >
          <span className="text-lg font-semibold">Siguiente</span>
          <FaArrowRight />
        </button>
      </motion.div>
    </div>
  );
}
