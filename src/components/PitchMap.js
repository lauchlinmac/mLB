import { useEffect, useRef } from "react";

export default function PitchMap({ pitch }) {
  const ref = useRef();

  useEffect(() => {
    const ctx = ref.current.getContext("2d");

    ctx.clearRect(0, 0, 200, 200);

    // strike zone
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(50, 50, 100, 100);

    // pitch dot
    if (pitch?.x && pitch?.y) {
      ctx.fillStyle = "red";

      const x = 50 + pitch.x;
      const y = 50 + pitch.y;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [pitch]);

  return (
    <div>
      <h3>🎯 Pitch Map</h3>
      <canvas ref={ref} width="200" height="200" />
    </div>
  );
}
