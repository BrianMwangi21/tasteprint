import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Analysis from '@/models/Analysis';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await connectToDatabase();
    
    const analysis = await Analysis.findOne({ publicId: id });
    
    if (!analysis) {
      return NextResponse.json(
        { error: 'Analysis not found' },
        { status: 404 }
      );
    }
    
    if (!analysis.metadata.isPublic) {
      return NextResponse.json(
        { error: 'Analysis is private' },
        { status: 403 }
      );
    }
    
    analysis.metadata.viewCount += 1;
    analysis.metadata.lastViewedAt = new Date();
    await analysis.save();
    
    return NextResponse.json({
      id: analysis.publicId,
      user: analysis.user,
      analysis: analysis.analysis,
      metadata: {
        createdAt: analysis.metadata.createdAt,
        viewCount: analysis.metadata.viewCount,
      },
    });
    
  } catch (error) {
    console.error('Error fetching analysis:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analysis' },
      { status: 500 }
    );
  }
}
