'use server';

import { prisma } from '@/lib/db/prisma';
// You might also need to import revalidatePath from 'next/cache' if you plan to use it
// import { revalidatePath } from 'next/cache';

export async function createBlogPostAction(formData: FormData) {
  // 1. Extract data from formData
  const title = formData.get('title');
  const slug = formData.get('slug');
  const content = formData.get('content');
  const published = formData.get('published'); // Checkbox values might need specific handling

  // 2. TODO: Validate the extracted data (highly recommended)
  // Example validation (add more comprehensive validation based on your needs):
  if (!title || !slug || !content) {
    console.error('Validation Error: Missing required fields');
    // TODO: Return an error message to the client
    return { error: 'Missing required fields' }; // Example error return
  }


  try {
    // 3. Interact with your database (using Prisma) to save the blog post

    // TODO: Get the current user ID for the authorId field.
    // This depends on your authentication setup. You'll need to replace
    // 'TODO: Get current user ID' with actual logic to get the user's ID.
    // Example: const authorId = await getCurrentUserId(); // Assuming you have such a function


    const newPost = await prisma.blogPost.create({
      data: {
        title: title as string, // Cast to string, assuming it's required and present after validation
        slug: slug as string,   // Cast to string
        content: content as string, // Cast to string
        published: published === 'on', // Assuming checkbox value is 'on' when checked and schema is boolean
        // Add the author ID field based on your schema:
        authorId: 'TODO: Get current user ID', // <--- Replace with actual logic to get the user ID
        // Add any other required fields from your Prisma schema
        // e.g., createdAt: new Date(),
      },
    });

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
    console.error('Error creating blog post:', error);
    // 5. TODO: Handle errors appropriately (e.g., return an error message to the client)
    // Instead of throwing, you might want to return an object with an error message
    // that your client-side code can display to the user.
    // Example: return { error: 'Failed to create blog post' };
    throw error; // Re-throwing the error for now, but consider returning an error object
  }
}
