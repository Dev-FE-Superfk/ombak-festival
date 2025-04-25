'use client';
import './globals.css';
import '../fonts/style.css';
import {usePathname} from 'next/navigation';
import {Header, Footer} from '@/components';

export default function RootLayout({children}) {
  const pathname = usePathname();

  if (pathname === '/') {
    return (
      <html lang="en">
        <body>
          <section
            id="root"
            style={{background: '#FAF4E8', minHeight: '100vh'}}
          >
            {children}
          </section>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <title>Ombak Festival At Desaru Coast Johor</title>
      <meta
        name="description"
        content="A luxurious weekend getaway filled with music, arts, culture and family fun! Get your ticket with our partnering hotels now"
      />
      <meta
        name="keywords"
        content="Ombak festival, Family friendly activities, Music festival, Music festival in Johor, Arts and Crafts, Beach festival, Weekend getaway ideas, Events for family, Malaysia festivals, Upcoming concerts 2024, Resort activities"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <meta
        name="google-site-verification"
        content="YwnFshZHbbZvYVv14csblPX68aD9jT1FWoWyYqpR02s"
      />
      <meta
        name="thumbnail"
        content="https://www.ombakfestival.com/ombak_meta.jpeg"
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Ombak Festival At Desaru Coast Johor"
      />
      <meta
        property="og:description"
        content="A luxurious weekend getaway filled with music, arts, culture and family fun! Get your ticket with our partnering hotels now"
      />
      <meta property="og:url" content="https://www.ombakfestival.com/" />
      <meta
        property="og:site_name"
        content="Ombak Festival At Desaru Coast Johor"
      />
      <meta
        property="og:image"
        content="https://www.ombakfestival.com/ombak_meta.jpeg"
      />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="600" />
      <meta
        property="og:site_name"
        content="Ombak Festival At Desaru Coast Johor"
      />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content="A luxurious weekend getaway filled with music, arts, culture and family fun! Get your ticket with our partnering hotels now"
      />
      <meta
        name="twitter:title"
        content="Ombak Festival At Desaru Coast Johor"
      />
      <meta
        name="twitter:image"
        content="https://www.ombakfestival.com/ombak_meta.jpeg"
      />
      <body>
        <Header />
        <section id="root">{children}</section>
        <Footer />
        <noscript>
          <img
            height="1"
            width="1"
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=1451507682492885&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  );
}
