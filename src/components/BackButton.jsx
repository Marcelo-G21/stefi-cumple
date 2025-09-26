import { FaArrowLeft } from 'react-icons/fa';

export default function BackButton({ onPrev }) {
  return (
    <button
      onClick={onPrev}
      className="absolute top-4 left-4 p-3 bg-white/70 rounded-full shadow-md hover:scale-110 transition"
    >
      <FaArrowLeft />
    </button>
  );
}
