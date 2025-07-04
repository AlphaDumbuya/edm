import { redirect } from 'next/navigation';

export default function AdminBlogRedirectPage() {
  redirect('/admin/content/blog');
  return null;
}
