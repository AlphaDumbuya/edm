import Link from 'next/link';

export default function ContentManagementPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Content Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/content/blog"
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          legacyBehavior>
          <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
          <p className="text-muted-foreground">Create, edit, and delete blog posts.</p>
        </Link>
        <Link
          href="/admin/content/news"
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          legacyBehavior>
          <h2 className="text-xl font-semibold">Manage News Articles</h2>
          <p className="text-muted-foreground">Create, edit, and delete news articles.</p>
        </Link>
        {/* Add links for other content types if needed */}
      </div>
    </div>
  );
}