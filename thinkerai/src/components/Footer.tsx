'use client';

import { MessageCircle, HelpCircle, Mail, Users, ExternalLink, Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const footerSections = [
    {
      title: t('footer.product'),
      links: [
        { name: t('footer.girls'), href: "/feed" },
        { name: t('footer.anime'), href: "/feed" },
        { name: t('footer.guys'), href: "/feed" },
      ]
    },
    {
      title: t('footer.support'),
      links: [
        { name: t('footer.helpCenter'), href: "https://www.baidu.com", icon: HelpCircle },
        { name: t('footer.contactUs'), href: "/contact-us", icon: Mail },
        { name: t('footer.discord'), href: "https://www.baidu.com", icon: MessageCircle },
      ]
    },
    {
      title: t('footer.company'),
      links: [
        { name: t('footer.affiliate'), href: "https://www.baidu.com", icon: Users },
        { name: t('footer.privacyNotice'), href: "/privacy-policy", icon: Shield },
        { name: t('footer.termsOfService'), href: "/legal-information", icon: FileText },
      ]
    }
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Candy AI FAQ Section */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gradient-primary">
              {t('footer.faqTitle')}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('footer.faqDescription')}
            </p>
            <Button
              size="lg"
              className="gradient-primary text-white border-0"
              onClick={() => window.location.href = '/faq'}
            >
              {t('footer.viewFaq')}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4 text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      {'icon' in link && link.icon && <link.icon className="h-4 w-4" />}
                      <span>{link.name}</span>
                      {link.href.startsWith('http') && <ExternalLink className="h-3 w-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              {t('footer.copyright')}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground text-sm">
                {t('footer.madeWith')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
