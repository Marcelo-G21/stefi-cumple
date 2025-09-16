import { motion } from "framer-motion";
import BackButton from "../components/BackButton";

export default function Celebration({ onPrev }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <BackButton onPrev={onPrev} data-lunita-ignore />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="card bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 max-w-md w-full border-4 border-pink-300 text-center"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-pink-400 mb-4"
        >
          Feliz cumpleaños Stefi!! ❀˖°
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-md mb-6"
        >
        Te queremos mucho digo- nyehehe &gt;:3 LSKDFSDF disfruta tu día cariño, este espacio quedará para que recuerdes lo maravillosa que eres y poder sacarte una sonrisa jeje :3 <br /> Te quiero mucho mi solecito &lt;3
        </motion.p>

        <motion.img
          src="/images/cumpleaños.jpg" // ⚡ reemplaza con la ruta de tu foto
          alt="Cumpleaños"
          className="w-full rounded-xl shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
}
