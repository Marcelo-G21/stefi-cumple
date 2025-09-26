// src/components/Lunita.jsx
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Lunita({ isFrozen }) {
  const SIZE = 80;
  const HALF = SIZE / 2;
  const DISTANCE_THRESHOLD = 6;
  const SPEED = 180;

  const [target, setTarget] = useState({ x: 150, y: 150 });
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const [frame, setFrame] = useState(0);
  const [state, setState] = useState('idle'); // idle | walk | sleep | pet
  const [direction, setDirection] = useState('down');
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [initialMessage, setInitialMessage] = useState(true);

  const [showMessage, setShowMessage] = useState(false);
  const idleTimeout = useRef(null);
  const messageTimeout = useRef(null);

  const sprites = {
    idle: ['/sprites/idle1.png', '/sprites/idle2.png'],
    sleep: [
      '/sprites/sleep1.png',
      '/sprites/sleep2.png',
      '/sprites/sleep3.png',
      '/sprites/sleep4.png',
      '/sprites/sleep5.png',
      '/sprites/sleep6.png',
      '/sprites/sleep7.png',
      '/sprites/sleep8.png',
      '/sprites/sleep9.png',
      '/sprites/sleep10.png',
      '/sprites/sleep11.png',
    ],
    walk: {
      up: ['/sprites/walk_up1.png', '/sprites/walk_up2.png'],
      down: ['/sprites/walk_down1.png', '/sprites/walk_down2.png'],
      left: ['/sprites/walk_left1.png', '/sprites/walk_left2.png'],
      right: ['/sprites/walk_right1.png', '/sprites/walk_right2.png'],
    },
    pet: [
      '/sprites/pet1.png',
      '/sprites/pet2.png',
      '/sprites/pet3.png',
      '/sprites/pet4.png',
      '/sprites/pet5.png',
    ],
  };

  const spriteScales = { idle: 0.7, sleep: 0.7, walk: 1, pet: 0.7 };
  const frameSpeed = { idle: 300, walk: 250, sleep: 300 };
  const pauseAfterIdle = 1000;

  useEffect(() => {
    const IGNORE_SELECTOR =
      "button, a, input, textarea, select, label, [role='button'], .card, .no-lunita, [data-lunita-ignore]";

    const handlePointerDown = (e) => {
      const x = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      const y = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;

      if (e.target && e.target.closest && e.target.closest(IGNORE_SELECTOR)) {
        return;
      }

      if (
        x >= position.x - HALF &&
        x <= position.x + HALF &&
        y >= position.y - HALF &&
        y <= position.y + HALF
      ) {
        handlePet();
        setState('pet');
        setFrame(0);
        setLastInteraction(Date.now());
        return;
      }

      if (isFrozen) return;

      setTarget({ x, y });
      setState('walk');
      setLastInteraction(Date.now());
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [position, isFrozen]);

  // mensaje inicial
  useEffect(() => {
    if (initialMessage) {
      const timer = setTimeout(() => setInitialMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [initialMessage]);

  // Animación idle
  useEffect(() => {
    if (state !== 'idle') return;
    let isMounted = true;
    let frameIndex = 0;
    let blinkCount = 0;
    const blinksPerCycle = 2;

    const nextFrame = () => {
      if (!isMounted) return;
      setFrame(frameIndex);
      if (frameIndex === 1) blinkCount += 1;

      if (blinkCount >= blinksPerCycle) {
        setFrame(0);
        idleTimeout.current = setTimeout(() => {
          if (!isMounted) return;
          frameIndex = 0;
          blinkCount = 0;
          nextFrame();
        }, pauseAfterIdle);
        return;
      }

      frameIndex = frameIndex === 0 ? 1 : 0;
      idleTimeout.current = setTimeout(nextFrame, frameSpeed.idle);
    };

    nextFrame();
    return () => {
      isMounted = false;
      clearTimeout(idleTimeout.current);
    };
  }, [state]);

  // Animación walk y sleep
  useEffect(() => {
    if (state !== 'walk' && state !== 'sleep') return;
    const totalFrames =
      state === 'sleep'
        ? sprites.sleep.length
        : sprites.walk[direction]?.length || 1;
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % totalFrames);
    }, frameSpeed[state]);
    return () => clearInterval(id);
  }, [state, direction]);

  // Animación pet
  useEffect(() => {
    if (state !== 'pet') return;

    let isMounted = true;
    let curFrame = 0;

    const nextFrame = () => {
      if (!isMounted) return;
      setFrame(curFrame);

      if (curFrame === sprites.pet.length - 1) {
        setTimeout(() => {
          if (!isMounted) return;
          setState('idle');
          setFrame(0);
        }, 150);
        return;
      }

      curFrame += 1;
      idleTimeout.current = setTimeout(nextFrame, 190);
    };

    nextFrame();

    return () => {
      isMounted = false;
      clearTimeout(idleTimeout.current);
    };
  }, [state]);

  const handlePet = () => {
    setState('pet');
    setFrame(0);
    setLastInteraction(Date.now());
    setShowMessage(true);
    if (messageTimeout.current) clearTimeout(messageTimeout.current);
    messageTimeout.current = setTimeout(() => {
      setShowMessage(false);
    }, 1200);
  };

  // Inactividad -> sleep
  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - lastInteraction > 5000 && state !== 'sleep') {
        setState('sleep');
        setFrame(0);
      }
    }, 500);
    return () => clearInterval(id);
  }, [lastInteraction, state]);

  // Dirección
  useEffect(() => {
    const dx = target.x - position.x;
    const dy = target.y - position.y;
    let newDirection = direction;

    if (Math.abs(dx) > Math.abs(dy)) newDirection = dx > 0 ? 'right' : 'left';
    else newDirection = dy > 0 ? 'down' : 'up';

    if (newDirection !== direction) {
      setDirection(newDirection);
    }
  }, [target, position, direction]);

  const getSprite = () => {
    if (state === 'sleep') return sprites.sleep[frame % sprites.sleep.length];
    if (state === 'walk')
      return (sprites.walk[direction] || sprites.walk.down)[
        frame % (sprites.walk[direction]?.length || 1)
      ];
    if (state === 'pet') return sprites.pet[frame % sprites.pet.length];
    return sprites.idle[frame % sprites.idle.length];
  };

  // Actualiza posición
  const handleUpdate = (latest) => {
    const left =
      typeof latest.left === 'number'
        ? latest.left
        : parseFloat(latest.left || 0);
    const top =
      typeof latest.top === 'number' ? latest.top : parseFloat(latest.top || 0);
    const curX = left + HALF;
    const curY = top + HALF;
    setPosition({ x: curX, y: curY });

    const dx = target.x - curX;
    const dy = target.y - curY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= DISTANCE_THRESHOLD && state === 'walk') {
      setPosition({ x: target.x, y: target.y });
      setState('idle');
      setFrame(0);
      setLastInteraction(Date.now());
    }
  };

  const distance = Math.sqrt(
    Math.pow(target.x - position.x, 2) + Math.pow(target.y - position.y, 2)
  );
  const duration = distance / SPEED;

  return (
    <>
      <motion.img
        src={getSprite()}
        alt="Lunita"
        className="lunita-sprite"
        style={{
          position: 'fixed',
          left: position.x - HALF,
          top: position.y - HALF,
          width: SIZE,
          height: SIZE,
          pointerEvents: 'auto',
          userSelect: 'none',
          imageRendering: 'pixelated',
        }}
        animate={{
          left: target.x - HALF,
          top: target.y - HALF,
          scale: spriteScales[state] || 1,
        }}
        transition={{
          type: 'tween',
          duration: duration,
          ease: 'linear',
        }}
        onUpdate={handleUpdate}
        draggable={false}
      />

      {/* Mensaje inicial */}
      <AnimatePresence>
        {initialMessage && (
          <motion.div
            key="initial-message"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -40 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="font-pixelify"
            style={{
              position: 'fixed',
              left: position.x - 90,
              top: position.y - 20,
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              fontSize: 16,
              fontWeight: 'bold',
              color: '#ff3366',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1px 8px',
              textShadow: '1px 1px 2px white',
              whiteSpace: 'nowrap',
              zIndex: 100,
            }}
          >
            💌 Tienes una carta!!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mensaje al acariciar */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            key="pet-message"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -40 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="font-pixelify"
            style={{
              position: 'fixed',
              left: position.x - 90,
              top: position.y - 20,
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              fontSize: 16,
              fontWeight: 'bold',
              color: '#ff3366',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1px 8px',
              textShadow: '1px 1px 2px white',
              whiteSpace: 'nowrap',
              zIndex: 100,
            }}
          >
            Feliz cumpleaños!! ❤️
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
