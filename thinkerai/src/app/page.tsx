'use client';

import { Layout } from "@/components/Layout";
import { CharacterGrid } from "@/components/CharacterGrid";
import { CharacterShowcase } from "@/components/CharacterShowcase";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Heart, MessageCircle, Shield, Star } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Character Showcase */}
        <CharacterShowcase />

        {/* FAQ Section */}
        <FAQSection />

        {/* Footer */}
        <Footer />
      </div>
    </Layout>
  );
}
