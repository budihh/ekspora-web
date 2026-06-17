import AboutClient from '@/components/public/AboutClient';

export const revalidate = 60;

export default async function AboutPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
  let profile = null;
  let team = [];

  try {
    const [resProfile, resTeam] = await Promise.all([
      fetch(`${API_URL}/company`, { next: { revalidate: 60 } }),
      fetch(`${API_URL}/team`, { next: { revalidate: 60 } })
    ]);
    
    if (resProfile.ok) {
      const data = await resProfile.json();
      profile = data.data || null;
    }
    
    if (resTeam.ok) {
      const data = await resTeam.json();
      team = data.data || [];
    }
  } catch (error) {
    console.error('Error fetching about data:', error);
  }

  return <AboutClient profile={profile} team={team} />;
}
