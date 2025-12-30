
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@repo/ui';
import { motion } from 'framer-motion';
import { Check, X, Globe, Mail, Phone } from 'lucide-react';

interface DigitalPresenceCardProps {
  stats: {
    emailCount: number;
    mobileCount: number;
    websiteCount: number;
  };
  total: number;
}

export function DigitalPresenceCard({ stats, total }: DigitalPresenceCardProps) {
  const websitePct = ((stats.websiteCount / total) * 100).toFixed(1);
  const emailPct = ((stats.emailCount / total) * 100).toFixed(1);
  const mobilePct = ((stats.mobileCount / total) * 100).toFixed(1);

  return (
    <Card className="h-full border-border/60 shadow-none bg-gradient-to-b from-transparent to-primary/5">
      <CardHeader>
        <CardTitle className="text-lg font-display">Digital Maturity</CardTitle>
        <CardDescription>Connectivity & Transparency Indicators</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
            {/* Website Metric - The Key Differentiator */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <span className="font-medium text-foreground">Website Presence</span>
                    </div>
                    <span className="font-mono font-bold text-primary">{websitePct}%</span>
                </div>
                <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${websitePct}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </div>
                <p className="text-[10px] text-muted-foreground">
                    Only {stats.websiteCount} out of {total} NGOs have a dedicated website.
                    This is a key filter for donors seeking high transparency.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
                {/* Email Metric */}
                <div className="space-y-2 bg-secondary/10 p-3 rounded-md border border-border/50">
                    <div className="flex items-center gap-2 mb-1">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium">Email Reach</span>
                    </div>
                    <div className="text-xl font-bold font-mono">{emailPct}%</div>
                    <div className="text-[10px] text-muted-foreground">100% Contactable</div>
                </div>

                {/* Mobile Metric */}
                <div className="space-y-2 bg-secondary/10 p-3 rounded-md border border-border/50">
                    <div className="flex items-center gap-2 mb-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium">Mobile Reach</span>
                    </div>
                    <div className="text-xl font-bold font-mono">{mobilePct}%</div>
                    <div className="text-[10px] text-muted-foreground">Direct Access</div>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
