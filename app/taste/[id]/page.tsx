import { Metadata } from 'next';
import TastePageClient from './TastePageClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    // Fetch minimal data for OG tags
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/taste/${id}`, {
      next: { revalidate: 60 }, // Revalidate every minute
    });
    
    if (!response.ok) {
      return {
        title: 'TastePrint - Musical DNA Discovery',
        description: 'Discover your musical DNA through stunning 3D visualizations',
      };
    }
    
    const data = await response.json();
    const name = data.user?.displayName || 'Someone';
    const genre = data.analysis?.summary?.topGenres?.[0] || 'Various';
    const mood = data.analysis?.geneticHelix?.summary?.dominantMood || 'Cosmic';
    
    const ogUrl = `/api/og?name=${encodeURIComponent(name)}&genre=${encodeURIComponent(genre)}&mood=${encodeURIComponent(mood)}`;
    
    return {
      title: `${name}'s TastePrint - Musical DNA`,
      description: `Discover ${name}'s unique musical taste with 3D visualizations and AI-generated cosmic story`,
      openGraph: {
        title: `${name}'s TastePrint`,
        description: `Discover ${name}'s unique musical taste`,
        images: [ogUrl],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${name}'s TastePrint`,
        description: `Discover ${name}'s unique musical taste`,
        images: [ogUrl],
      },
    };
  } catch (error) {
    return {
      title: 'TastePrint - Musical DNA Discovery',
      description: 'Discover your musical DNA through stunning 3D visualizations',
    };
  }
}

export default async function TastePage({ params }: PageProps) {
  const { id } = await params;
  return <TastePageClient id={id} />;
}
