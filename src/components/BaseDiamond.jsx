export default function BaseDiamond({ offense }) {
  return (
    <div className="diamond">
      <div className={`base second ${offense.second ? "active" : ""}`} />
      <div className={`base first ${offense.first ? "active" : ""}`} />
      <div className={`base third ${offense.third ? "active" : ""}`} />
    </div>
  );
}
