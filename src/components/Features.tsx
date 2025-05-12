
import React from 'react';
import { Circle, ThumbsUp, Share, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="border border-white/10 bg-secondary/30 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="font-heading text-xl font-bold mb-2">{title}</h3>
        <p className="text-foreground/70">{description}</p>
      </CardContent>
    </Card>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Circle className="text-primary h-6 w-6" />,
      title: "All Matches Count",
      description: "Online. Offline. Rage quits. Sofa sessions. fcRivals logs everything — even the ones EA forgets."
    },
    {
      icon: <Trophy className="text-primary h-6 w-6" />,
      title: "One Group. One Table.",
      description: "Stop flipping between head-to-heads. fcRivals builds one shared leaderboard — and crowns the real champ."
    },
    {
      icon: <ThumbsUp className="text-primary h-6 w-6" />,
      title: "Stats You Can Brag About.",
      description: "Top scorer. Longest streak. Most goals in a game. fcRivals tracks the moments that make legends."
    },
    {
      icon: <Share className="text-primary h-6 w-6" />,
      title: "Flex With Proof",
      description: "Screenshot-ready for the group chat. fcRivals makes banter visual — and brutal."
    },
    {
      icon: <Trophy className="text-primary h-6 w-6" />,
      title: "Climb the Leaderboards",
      description: "Rankings update with every result. Be the champ — or get humbled."
    },
    {
      icon: <Trophy className="text-primary h-6 w-6" />,
      title: "Cross-Platform. Cross-Account.",
      description: "Switch consoles? Use guest mode? Still counts. fcRivals keeps your rivalry history all in one place."
    },
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Game-Changing Features</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">Everything you need to settle debates and crown the real GOAT.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
