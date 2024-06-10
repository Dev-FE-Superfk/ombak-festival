// components/UserbackWidget.js
"use client";
import { useLayoutEffect, ReactDOM, useEffect } from "react";
import { UserbackProvider, useUserback } from "@userback/react";

// const UserbackWidget = () => {
//   useLayoutEffect(() => {
//     // Code untuk memanggil widget Userback
//     const userbackScript = document.createElement("script");
//     userbackScript.async = true;
//     userbackScript.src = "https://embed.userback.io/widget.js";
//     document.body.appendChild(userbackScript);

//     return () => {
//       // Cleanup jika diperlukan
//       document.body.removeChild(userbackScript);
//     };
//   }, []);

//   return null; // Komponen ini tidak mengembalikan apa pun yang terlihat di UI
// };

// export default UserbackWidget;
export default function Userback() {
  const { isOpen, open, init } = useUserback();

  useEffect(() => {
    init("A-xQ6x2VJaEspUVIlxcoH6tPkLd");
  }, []);
  return <></>;
}
