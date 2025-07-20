'use server'

import { getAllBlogPosts } from '@/lib/db/blogPosts'

export async function fetchBlogPosts(options?: {
  search?: string
  offset?: number
  limit?: number
  orderBy?: { [key: string]: 'asc' | 'desc' }
  publishedOnly?: boolean
}) {
  return getAllBlogPosts(options)
}
