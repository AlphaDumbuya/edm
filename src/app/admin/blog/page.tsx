import { redirect } from 'next/navigation';
import RestrictedButton from '@/components/admin/RestrictedButton';

export default function AdminBlogRedirectPage() {
  redirect('/admin/content/blog');
  return <div />;
}

// Example usage for create, edit, and delete buttons
// Replace Button with RestrictedButton and pass allowedRoles and userRole
/*
<RestrictedButton allowedRoles={['ADMIN', 'SUPER_ADMIN', 'EDITOR']} userRole={role} onClick={handleCreate}>Create</RestrictedButton>
<RestrictedButton allowedRoles={['ADMIN', 'SUPER_ADMIN', 'EDITOR']} userRole={role} onClick={handleEdit}>Edit</RestrictedButton>
<RestrictedButton allowedRoles={['ADMIN', 'SUPER_ADMIN']} userRole={role} onClick={handleDelete}>Delete</RestrictedButton>
*/
