import React, { useEffect, useState, useRef } from 'react';

interface CarCursorProps {
  enabled: boolean;
}

export const CarCursor: React.FC<CarCursorProps> = ({ enabled }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Check if device supports fine hover (desktop/mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.classList.contains('clickable')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth trailing animation loop
    const animate = () => {
      setTrailingPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.22,
          y: prev.y + dy * 0.22,
        };
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [enabled, pos.x, pos.y, isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Aerodynamic Speed Glow Slipstream */}
      <div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovering ? '64px' : '44px',
          height: isHovering ? '64px' : '44px',
          background: isHovering
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, rgba(14, 165, 233, 0.15) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(37, 99, 235, 0.1) 60%, transparent 80%)',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
        }}
      />

      {/* Main Car Silhouette & Detail Spark Indicator */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.75 : isHovering ? 1.3 : 1})`,
        }}
      >
        <div className="relative">
          {/* Custom Sleek Sports Car Vector Icon Cursor */}
          <svg
            className={`w-7 h-7 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-colors duration-200 ${
              isHovering ? 'text-cyan-400' : 'text-blue-500'
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Aerodynamic Sports Car Outline */}
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9L2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" fill="currentColor" />
            <circle cx="17" cy="17" r="2" fill="currentColor" />
            {/* Detailing Gloss Flare Accent */}
            <path d="M9 10h4" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
          </svg>

          {/* Sparkle Micro-dot at front headlight */}
          <div
            className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
              isHovering ? 'bg-cyan-300 shadow-[0_0_10px_#67e8f9]' : 'bg-blue-300 shadow-[0_0_6px_#93c5fd]'
            } animate-ping duration-1000`}
          />
        </div>
      </div>
    </div>
  );
};
