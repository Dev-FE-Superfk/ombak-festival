import "./globals.css";
import "../fonts/style.css";
import { Header, Footer } from "@/components";

export const metadata = {
  title: "Ombak Festival 2024",
  description: "Ombak Festival 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <section>{children}</section>
        <Footer />
      </body>
    </html>
  );
}
