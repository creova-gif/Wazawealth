import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Trophy, Lock, CheckCircle } from "lucide-react";
import { Progress } from "./ui/progress";

interface BadgesScreenProps {
  language: 'sw' | 'en';
  accessToken: string;
  onBack: () => void;
}

export function BadgesScreen({ language, accessToken, onBack }: BadgesScreenProps) {
  const [badges, setBadges] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const t = language === 'sw' ? {
    title: 'Medali Zangu',
    subtitle: 'Pata medali kwa kufanya mambo mapya',
    earned: 'Umepata',
    locked: 'Imefungwa',
    level: 'Kiwango',
    progress: 'Maendeleo',
    tutorials: 'Masomo yaliyokamilika'
  } : {
    title: 'My Badges',
    subtitle: 'Earn badges by completing milestones',
    earned: 'Earned',
    locked: 'Locked',
    level: 'Level',
    progress: 'Progress',
    tutorials: 'Tutorials Completed'
  };

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      const { projectId } = await import('@/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;

      const response = await fetch(`${apiUrl}/badges`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      const result = await response.json();
      if (response.ok) {
        setBadges(result);
      }
    } catch (err) {
      console.error('Error loading badges:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">{language === 'sw' ? 'Inapakia...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{t.title}</h1>
              <p className="text-sm text-amber-100">{t.subtitle}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Card className="p-4 bg-white/20 backdrop-blur border-0">
              <p className="text-amber-100 text-sm mb-1">{t.earned}</p>
              <p className="text-2xl font-bold">{badges?.earnedBadges?.length || 0}</p>
            </Card>
            <Card className="p-4 bg-white/20 backdrop-blur border-0">
              <p className="text-amber-100 text-sm mb-1">{t.level}</p>
              <p className="text-2xl font-bold">{badges?.level || 1}</p>
            </Card>
            <Card className="p-4 bg-white/20 backdrop-blur border-0">
              <p className="text-amber-100 text-sm mb-1">{t.tutorials}</p>
              <p className="text-2xl font-bold">{badges?.tutorialProgress || 0}</p>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Earned Badges */}
        {badges?.earnedBadges?.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              {t.earned}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {badges.earnedBadges.map((badge: any, idx: number) => (
                <Card key={idx} className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {language === 'sw' ? badge.name : badge.nameEn}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {new Date(badge.earnedAt).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Badges */}
        {badges?.availableBadges?.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-400" />
              {t.locked}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {badges.availableBadges.map((badge: any, idx: number) => (
                <Card key={idx} className="p-6 bg-white opacity-75">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lock className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="font-bold text-gray-700 mb-1">
                      {language === 'sw' ? badge.name : badge.nameEn}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {language === 'sw' ? badge.description : badge.descriptionEn}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Progress Section */}
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50">
          <h3 className="font-bold text-gray-900 mb-4">{t.progress}</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">{t.level} {badges?.level || 1}</span>
                <span className="font-semibold text-emerald-600">{t.level} {(badges?.level || 1) + 1}</span>
              </div>
              <Progress value={((badges?.tutorialProgress || 0) % 10) * 10} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">
                {(badges?.tutorialProgress || 0) % 10}/10 {language === 'sw' ? 'masomo' : 'lessons'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}