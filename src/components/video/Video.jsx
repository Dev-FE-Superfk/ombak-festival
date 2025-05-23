export default function VideoPlayer({
  src,
  type,
  autoPlay = true,
  loop = true,
  className,
  controls = false,
}) {
  return (
    <video
      autoPlay={autoPlay}
      muted={true}
      loop={loop}
      playsInline
      className={className}
      controls={controls}
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
}
