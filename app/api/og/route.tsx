import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const name = searchParams.get('name') || 'Someone';
    const mood = searchParams.get('mood') || 'Cosmic';
    const genre = searchParams.get('genre') || 'Various';
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a1a',
            backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a3a 0%, #0a0a1a 100%)',
            position: 'relative',
          }}
        >
          {/* Stars background */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
                                radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
                                radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
                                radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
                                radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.6), rgba(0,0,0,0)),
                                radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0))`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px',
            }}
          />
          
          {/* Aurora gradient orbs */}
          <div
            style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(78,205,196,0.3) 0%, transparent 70%)',
              top: '10%',
              left: '10%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124,77,255,0.3) 0%, transparent 70%)',
              bottom: '10%',
              right: '10%',
            }}
          />
          
          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              padding: '40px',
              textAlign: 'center',
            }}
          >
            {/* Logo */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                marginBottom: '20px',
                background: 'linear-gradient(90deg, #4ECDC4, #6C5CE7)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 30px rgba(78,205,196,0.5)',
              }}
            >
              TastePrint
            </div>
            
            {/* User name */}
            <div
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '16px',
                textShadow: '0 0 20px rgba(255,255,255,0.3)',
              }}
            >
              {name}&apos;s
            </div>
            
            {/* Subtitle */}
            <div
              style={{
                fontSize: '36px',
                color: '#4ECDC4',
                marginBottom: '40px',
                fontStyle: 'italic',
              }}
            >
              Musical DNA
            </div>
            
            {/* Stats */}
            <div
              style={{
                display: 'flex',
                gap: '40px',
                marginTop: '20px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#FFD93D',
                  }}
                >
                  {genre}
                </div>
                <div
                  style={{
                    fontSize: '18px',
                    color: '#888',
                  }}
                >
                  Top Genre
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#6C5CE7',
                  }}
                >
                  {mood}
                </div>
                <div
                  style={{
                    fontSize: '18px',
                    color: '#888',
                  }}
                >
                  Mood
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div
              style={{
                marginTop: '50px',
                padding: '16px 32px',
                background: 'linear-gradient(90deg, #4ECDC4, #6C5CE7)',
                borderRadius: '50px',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                boxShadow: '0 0 30px rgba(78,205,196,0.4)',
              }}
            >
              Discover Your Musical DNA →
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`${e}`);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
