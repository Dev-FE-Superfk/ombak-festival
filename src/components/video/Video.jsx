export default function Videolayer({ src, type }) {
  return (
    <>
      <video autoPlay muted loop playsinline>
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
    </>
  );
}
