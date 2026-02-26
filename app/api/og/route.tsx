import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const name = searchParams.get('name') || 'Someone';
    const mood = searchParams.get('mood') || 'Sonic';
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
            backgroundColor: '#e8e4db',
            padding: '40px',
            fontFamily: 'serif',
            position: 'relative',
          }}
        >
          {/* Halftone / Grid Texture Simulation */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
              backgroundSize: '10px 10px',
              opacity: 0.5,
            }}
          />

          {/* Main Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              border: '10px solid #1a1a1a',
              boxShadow: '30px 30px 0px #1a1a1a',
              padding: '60px',
              width: '90%',
              height: '80%',
              position: 'relative',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#1a1a1a', opacity: 0.4 }}>VOL. 01 // NO. 442</div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#ff3e3e' }}>TOP SECRET</div>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: '120px',
                fontWeight: '900',
                lineHeight: '0.8',
                marginBottom: '40px',
                color: '#1a1a1a',
                letterSpacing: '-5px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex' }}>SONIC</div>
              <div style={{ display: 'flex', color: '#ff3e3e' }}>PROFILE</div>
            </div>

            {/* Name */}
            <div
              style={{
                fontSize: '60px',
                fontWeight: '900',
                color: '#1a1a1a',
                padding: '10px 20px',
                backgroundColor: '#fbff00',
                alignSelf: 'flex-start',
                marginBottom: '40px',
                transform: 'rotate(-2deg)',
              }}
            >
              {name.toUpperCase()}
            </div>

            {/* Bottom Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#ff3e3e' }} />
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>MOOD: {mood.toUpperCase()}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#1a1a1a' }} />
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>GENRE: {genre.toUpperCase()}</div>
                </div>
              </div>

              <div
                style={{
                  fontSize: '40px',
                  fontWeight: '900',
                  color: '#1a1a1a',
                  border: '4px solid #1a1a1a',
                  padding: '10px 20px',
                  transform: 'rotate(5deg)',
                }}
              >
                TASTEPRINT
              </div>
            </div>

            {/* "Tape" simulation */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                width: '150px',
                height: '40px',
                backgroundColor: 'rgba(255,255,255,0.5)',
                transform: 'translateX(-50%) rotate(2deg)',
              }}
            />
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
