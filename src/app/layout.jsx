'use client';
import './globals.css';
import '../fonts/style.css';
import {Header, Footer} from '@/components';

// export const metadata = {
//   title: "Ombak Festival At Desaru Coast Johor",
//   description:
//     "A luxurious weekend getaway filled with music, arts, culture and family fun! Get your ticket with our partnering hotels now.",
//   keywords:
//     "Family friendly activities, Music festival, Music festival in Johor, Arts and Crafts, Beach festival, Weekend getaway ideas, Events for family, Malaysia festivals, Upcoming concerts 2024, Resort activities",
// };

export default function RootLayout({children}) {
  const user_data = {
    id: '123456', // example data
    info: {
      name: 'someone', // example data
      email: 'someone@example.com', // example data
    },
  };
  return (
    <html lang='en'>
      <title>Ombak Festival At Desaru Coast Johor</title>
      <meta
        name='description'
        content='A luxurious weekend getaway filled with music, arts, culture and family fun! Get your ticket with our partnering hotels now'
      />
      <meta
        name='keywords'
        content='Family friendly activities, Music festival, Music festival in Johor, Arts and Crafts, Beach festival, Weekend getaway ideas, Events for family, Malaysia festivals, Upcoming concerts 2024, Resort activities'
      />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
      />
      <link rel='icon' href='/favicon.ico' />
      <body>
        <Header />
        <section id='root'>{children}</section>
        <Footer />
      </body>
    </html>
  );
}
