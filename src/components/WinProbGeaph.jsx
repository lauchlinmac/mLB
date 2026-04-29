import { useEffect, useRef } from "react";

export default function WinProbGraph({ data }) {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 300, 150);

    ctx.beginPath();
    ctx.strokeStyle = "lime";

    data.forEach((p, i) => {
      const x = (i / data.length) * 300;
      const y = 150 - p * 150;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
  }, [data]);

  return (
    <div>
      <h3>📈 Win Probability</h3>
      <canvas ref={canvas => (ref.current = canvas)} width="300" height="150" />
    </div>
  );
}
