import { useCallback } from "react";
import Particles from '@tsparticles/react';
import { loadFull } from "tsparticles";

export default function BackgroundParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 60 },
          size: { value: 3 },
          move: { enable: true, speed: 1 },
          opacity: { value: 0.6 },
          links: { enable: true, color: "#ffffff" },
        },
      }}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
}
