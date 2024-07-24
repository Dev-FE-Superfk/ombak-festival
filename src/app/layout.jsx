'use client';
import './globals.css';
import '../fonts/style.css';
import {Header, Footer} from '@/components';

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
      {/* <script
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
      <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1451507682492885');
              fbq('track', 'PageView');
            `,
          }}
        /> */}
      <body>
        <Header />
        <section id='root'>{children}</section>
        <Footer />
        {/* <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1451507682492885&ev=PageView&noscript=1"
          />
        </noscript> */}
      </body>
    </html>
  );
}
