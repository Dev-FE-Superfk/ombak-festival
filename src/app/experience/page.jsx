// experience/page.jsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExperiencePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/experience/music-and-performances');
  }, [router]);

  return (
    <div style={{paddingTop:"160px", textAlign:"center"}}>
      Please wait...
    </div>
  ); // or you can return a loading spinner or message while redirecting
}
