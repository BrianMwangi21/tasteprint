import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Analysis from '@/models/Analysis';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    
    const skip = (page - 1) * limit;
    
    await connectToDatabase();
    
    const totalItems = await Analysis.countDocuments({ 'metadata.isPublic': true });
    
    const analyses = await Analysis.find({ 'metadata.isPublic': true })
      .sort({ 'metadata.createdAt': -1 })
      .skip(skip)
      .limit(limit)
      .select('publicId user.metadata.displayName user.metadata.images analysis.summary.topGenres analysis.metadata.createdAt analysis.metadata.viewCount');
    
    const totalPages = Math.ceil(totalItems / limit);
    
    const items = analyses.map(analysis => ({
      id: analysis.publicId,
      user: {
        displayName: analysis.user.displayName,
        images: analysis.user.images,
      },
      preview: {
        topGenre: analysis.analysis.summary.topGenres[0] || 'Various',
        trackCount: analysis.data?.topTracks?.mediumTerm?.length || 0,
        dominantMood: analysis.analysis.geneticHelix?.summary?.dominantMood || 'Unknown',
      },
      createdAt: analysis.metadata.createdAt,
      viewCount: analysis.metadata.viewCount,
    }));
    
    return NextResponse.json({
      items,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
    
  } catch (error) {
    console.error('Error fetching feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feed' },
      { status: 500 }
    );
  }
}
