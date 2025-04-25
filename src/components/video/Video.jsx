export default function VideoPlayer({src, type, autoPlay = true, loop = true}) {
  return (
    <video autoPlay={autoPlay} muted={true} loop={loop} playsInline>
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
}
