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
  return (
    <html lang='en'>
      <title>Ombak Festival At Desaru Coast Johor</title>
      <meta
        name='description'
        content='A luxurious weekend getaway filled with music, arts, culture and family fun! Get your ticket with our partnering hotels now'
      />
      <meta
        name='keywords'
        content='Ombak festival, Family friendly activities, Music festival, Music festival in Johor, Arts and Crafts, Beach festival, Weekend getaway ideas, Events for family, Malaysia festivals, Upcoming concerts 2024, Resort activities'
      />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
      />
      <PageMap>
        <DataObject type="thumbnail">
          <Attribute name="src" value="https://www.ombakfestival.com/ombak_meta.jpeg"/>
          <Attribute name="width" value="100"/>
          <Attribute name="height" value="130"/>
        </DataObject>
      </PageMap>
      <meta name="thumbnail" content="https://www.ombakfestival.com/ombak_meta.jpeg" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Ombak Festival At Desaru Coast Johor"/>
      <meta property="og:description" content="A luxurious weekend getaway filled with music, arts, culture and family fun! Get your ticket with our partnering hotels now"/>
      <meta property="og:url" content="https://www.ombakfestival.com/" />
      <meta property="og:site_name" content="Ombak Festival At Desaru Coast Johor" />
      <meta property="og:image" content="https://www.ombakfestival.com/ombak_meta.jpeg" />
      <meta property='og:image:width' content='600' />
      <meta property='og:image:height' content='600' />
      <meta property='og:site_name' content='Ombak Festival At Desaru Coast Johor' />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content="A luxurious weekend getaway filled with music, arts, culture and family fun! Get your ticket with our partnering hotels now"/>
      <meta name="twitter:title" content="Ombak Festival At Desaru Coast Johor" />
      <meta name="twitter:image" content="https://www.ombakfestival.com/ombak_meta.jpeg" />
      <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "mplxxqhpxr");
              `,
            }}
          />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-7KWRCJG83T"></script>
      <script
        dangerouslySetInnerHTML={{
              __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-7KWRCJG83T');
        `,
        }}
      />
      <body>
        <Header />
        <section id='root'>{children}</section>
        <Footer />
      </body>
    </html>
  );
}
