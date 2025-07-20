import { findUserById } from '@/lib/db/users'

export async function fetchUserById(id: string) {
  return findUserById(id)
}
