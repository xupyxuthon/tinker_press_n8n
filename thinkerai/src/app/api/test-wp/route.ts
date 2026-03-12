
import { NextResponse } from 'next/server';

export async function GET() {
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8083';
    try {
        const response = await fetch(`${wpUrl}/?rest_route=/wp/v2/posts`);
        const data = await response.json();
        return NextResponse.json({
            success: true,
            message: "Saint_Chamber_3001 successfully accessed WordPress 8083",
            postsCount: data.length,
            samplePost: data[0] ? { title: data[0].title.rendered } : "No posts found"
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Saint_Chamber_3001 failed to access WordPress 8083",
            error: error.message
        }, { status: 500 });
    }
}
