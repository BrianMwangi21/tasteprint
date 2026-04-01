import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';
import { UserMusicData } from '../types';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function generateTasteStory(data: UserMusicData): Promise<string> {
  const topArtists = data.topArtists.mediumTerm.slice(0, 5).map(a => a.name).join(', ');
  const topGenres = [...new Set(data.topArtists.mediumTerm.flatMap(a => a.genres))].slice(0, 5).join(', ');
  const recentlyPlayed = data.recentlyPlayed.slice(0, 5).map(rp => rp.track.name).join(', ');
  const totalTracks = data.topTracks.mediumTerm.length + data.recentlyPlayed.length;

  const prompt = `Write a poetic, cosmic narrative about a music listener's taste profile. Make it feel like a stargazing observatory reading of their musical DNA.

Listener Data:
- Top Artists: ${topArtists}
- Favorite Genres: ${topGenres}
- Recently Played: ${recentlyPlayed}
- Total Tracks Analyzed: ${totalTracks}
- Saved Library Size: ${data.savedTracksCount} tracks

Style Guidelines:
- Write 3-4 sentences maximum
- Use cosmic, astronomical metaphors (stars, galaxies, nebulae, constellations)
- Be poetic but not overly flowery
- Reference specific artists/genres naturally
- Create a sense of wonder and discovery
- End with a feeling of cosmic connection

Example tone: "Your musical constellation weaves together the electric pulses of [artist] with the warm acoustic nebulae of [genre]. Like a pulsar beacon in the night sky, your taste radiates outward, connecting distant sonic galaxies into a unified harmonic universe."

Write the cosmic story now:`;

  try {
    const { text } = await generateText({
      model: openrouter('openrouter/free'),
      prompt,
      temperature: 0.8,
    });

    return text.trim();
  } catch (error) {
    console.error('Error generating taste story:', error);
    return generateFallbackStory(data);
  }
}

function generateFallbackStory(data: UserMusicData): string {
  const topArtist = data.topArtists.mediumTerm[0]?.name || 'unknown artist';
  const topGenre = data.topArtists.mediumTerm[0]?.genres[0] || 'various genres';
  
  const stories = [
    `Your musical journey orbits around the stellar energy of ${topArtist}, with ${topGenre} forming the gravitational pull of your sonic universe. Like a comet blazing through the night, your taste trails stardust across multiple dimensions of sound.`,
    `In the vast expanse of your musical cosmos, ${topArtist} shines as a guiding star, illuminating pathways through the ${topGenre} nebulae. Your listening patterns trace constellations that tell stories across light-years of musical history.`,
    `Your taste profile forms a unique supernova, with ${topArtist} at its core radiating ${topGenre} energy throughout your personal galaxy. Each track you play sends ripples through the fabric of your musical spacetime.`,
  ];

  return stories[Math.floor(Math.random() * stories.length)];
}

export default { generateTasteStory };
