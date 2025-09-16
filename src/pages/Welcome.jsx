import { motion } from "framer-motion";

export default function Welcome({ onNext }) {
  return (
    <div className="flex items-center justify-center h-screen p-6">
      <motion.img
        src="../../public/carta.png" // 👈 tu imagen en public/
        alt="Regalo"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="cursor-pointer max-w-xs w-full"
      />
    </div>
  );
}
