// app/(tabs)/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/explore" />; // ou "/woofshare" ou autre
}
