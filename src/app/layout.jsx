import "./globals.css";
import "../fonts/style.css";
import { Header, Footer } from "@/components";

export const metadata = {
  title: "Ombak Festival At Desaru Coast Johor",
  description:
    "A luxurious weekend getaway filled with music, arts, culture and family fun! Get your ticket with our partnering hotels now.",
  keywords:
    "Family friendly activities, Music festival, Music festival in Johor, Arts and Crafts, Beach festival, Weekend getaway ideas, Events for family, Malaysia festivals, Upcoming concerts 2024, Resort activities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <link rel="icon" href="/favicon.ico" />
      <body>
        <Header />
        <section>{children}</section>
        <Footer />
      </body>
    </html>
  );
}
