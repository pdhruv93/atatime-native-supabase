export function getPublicUrl(fileName: string | null | undefined) {
  if (!fileName) {
    return undefined;
  }

  return `${process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL}/storage/v1/object/public/profile-pictures/${fileName}`;
}
