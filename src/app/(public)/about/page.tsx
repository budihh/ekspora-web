import AboutClient from '@/components/public/AboutClient';
import { supabase } from '@/lib/supabaseClient';

export const revalidate = 60;

export default async function AboutPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
  let profile = null;
  let team = [];

  try {
    const [resProfile, resTeam] = await Promise.all([
      supabase.from('company').select('*').maybeSingle(),
      supabase.from('teams').select('*')
    ]) as [any, any];
    
    if (!resProfile.error && resProfile.data) {
      profile = resProfile.data;
    }
    
    if (!resTeam.error && resTeam.data) {
      team = resTeam.data;
    }
  } catch (error) {
    console.error('Error fetching about data:', error);
  }

  return <AboutClient profile={profile} team={team} />;
}
