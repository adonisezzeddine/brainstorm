import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { title, url, description, projectId, tags, notes } = body;

    if (!title || !url || !projectId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const thoughtLink = await prisma.thoughtLink.create({
      data: {
        title,
        url,
        description,
        projectId,
        tags: tags || [],
        notes,
        userId,
      },
    });

    return NextResponse.json(thoughtLink);
  } catch (error) {
    console.error('[THOUGHT_LINKS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return new NextResponse('Project ID is required', { status: 400 });
    }

    const thoughtLinks = await prisma.thoughtLink.findMany({
      where: {
        projectId,
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(thoughtLinks);
  } catch (error) {
    console.error('[THOUGHT_LINKS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 