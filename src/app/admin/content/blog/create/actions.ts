'use server';

import { prisma } from '@/lib/db/prisma';
import { auth } from '@/lib/auth'; // Import auth
import { type NextRequest } from 'next/server';
console.log('createBlogPostAction: NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set');

export async function createBlogPostAction(formData: FormData, request: NextRequest) { // Changed order of parameters
  console.log('createBlogPostAction: Function started'); // Added log
  // 1. Extract data from formData
  const title = formData.get('title');
  const slug = formData.get('slug');
  const content = formData.get('content');
  const published = formData.get('published'); // Checkbox values might need specific handling

  console.log('createBlogPostAction: Extracted form data', { title, slug, published }); // Added log

  // 2. TODO: Validate the extracted data (highly recommended)
  // Example validation (add more comprehensive validation based on your needs):
  if (!title || !slug || !content) {
    console.error('Validation Error: Missing required fields');
    // TODO: Return an error message to the client
    return { error: 'Missing required fields' }; // Example error return
  }


  console.log('createBlogPostAction: Before getting session'); // Added log
  try {
    // 3. Interact with your database (using Prisma) to save the blog post

    // Read the session cookie from the request headers
    const cookieHeader = request.headers.get('Cookie');
    if (!cookieHeader) {
 return { error: 'Session cookie not found' };
    }

    // Extract the 'session' cookie value from the Cookie header
    const sessionCookie = getCookieValue(cookieHeader, 'session'); // Implement this helper function

    if (!sessionCookie) {
 return { error: 'Session cookie not found' };
    }

    // Decrypt the session cookie using the decrypt function
    const session = await decrypt(sessionCookie);

    console.log('createBlogPostAction: Full session object:', JSON.stringify(session, null, 2));
    console.log('createBlogPostAction: After getting session', {
      sessionExists: !!session,
      userId: session?.user?.id,
    }); // Added log
    if (!session || !session.user || !session.user.id) {
      return { error: 'User not authenticated' }; // Return error if user is not authenticated
    }


    // Log data before sending to Prisma
    console.log('Data being sent to prisma.blogPost.create:', {
      title: title as string,
      slug: slug as string,
      content: content as string,
      published: published === 'on',
      authorId: session.userId,
    });
    const newPost = await prisma.blogPost.create({
      data: {
        title: title as string, // Cast to string, assuming it's required and present after validation
        slug: slug as string,   // Cast to string
        content: content as string, // Cast to string
        published: published === 'on', // Assuming checkbox value is 'on' when checked and schema is boolean
        // Add the author ID field based on your schema:

 authorId: session.user.id, // Use the authenticated user's ID
      },
    });

    console.log('Blog post created successfully:', newPost);
    console.log('Blog post created successfully:', newPost);

    // 4. Optional: Revalidate cache for the blog list page
    // If you uncomment the import above, uncomment this line too:
    // revalidatePath('/admin/content/blog');

    // You might also want to redirect the user to the blog list page after creation.
    // This is typically done on the client side after the action is called,
    // but you could also do it here using redirect from 'next/navigation'.
    // import { redirect } from 'next/navigation'; // Import at the top if needed
    // redirect('/admin/content/blog');


  } catch (error) {
    // Log the full error object for debugging
    console.error('Error creating blog post:', JSON.stringify(error, null, 2));
    // Instead of throwing, you might want to return an object with an error message
    // that your client-side code can display to the user.
    // Example: return { error: 'Failed to create blog post' };
    throw error; // Re-throwing the error for now, but consider returning an error object
  }
}

// Helper function to extract a cookie value from the Cookie header
function getCookieValue(cookieHeader: string, name: string): string | null {
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName.trim() === name) {
      return cookieValue;
    }
  }
  return null;
}
