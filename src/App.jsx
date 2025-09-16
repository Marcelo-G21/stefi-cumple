import { useState } from "react";
import Lunita from "./components/Lunita"; // 👈 asegúrate que el path es correcto
import BackgroundParticles from "./components/BackgroundParticles";
import Welcome from "./pages/Welcome";
import Letter from "./pages/Letter";
import Compliments from "./pages/Compliments";
import Garden from "./pages/Garden";
import Stars from "./pages/Stars";
import Celebration from "./pages/Celebration";

export default function App() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 0 ? prev - 1 : prev));
  const goToStart = () => setStep(0);

  const pageProps = { onNext: nextStep, onPrev: prevStep, onStart: goToStart };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/fondo.jpg')" }}
    >
      <BackgroundParticles />

      {/* 👇 Lunita siempre visible */}
      <Lunita />

      {step === 0 && <Welcome onNext={nextStep} />}
      {step === 1 && <Letter {...pageProps} />}
      {step === 2 && <Compliments {...pageProps} />}
      {step === 3 && <Garden {...pageProps} />}
      {step === 4 && <Stars {...pageProps} />}
      {step === 5 && <Celebration {...pageProps} />}
    </div>
  );
}
