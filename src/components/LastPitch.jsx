export default function LastPitch({ play }) {
  const last = play?.playEvents?.slice(-1)[0];

  if (!last) return null;

  return (
    <div className="last-pitch">
      Last Pitch: {last.details?.description}
    </div>
  );
}
