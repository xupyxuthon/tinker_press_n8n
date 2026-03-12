'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'faq.whatIsThinkerAI',
    answer: 'faq.whatIsThinkerAIAnswer'
  },
  {
    id: '2',
    question: 'faq.isLegitimate',
    answer: 'faq.isLegitimateAnswer'
  },
  {
    id: '3',
    question: 'faq.bankStatements',
    answer: 'faq.bankStatementsAnswer'
  },
  {
    id: '4',
    question: 'faq.customize',
    answer: 'faq.customizeAnswer'
  },
  {
    id: '5',
    question: 'faq.whoUses',
    answer: 'faq.whoUsesAnswer'
  },
  {
    id: '6',
    question: 'faq.whatIsCompanion',
    answer: 'faq.whatIsCompanionAnswer'
  },
  {
    id: '7',
    question: 'faq.multimodal',
    answer: 'faq.multimodalAnswer'
  },
  {
    id: '8',
    question: 'faq.roleplay',
    answer: 'faq.roleplayAnswer'
  },
  {
    id: '9',
    question: 'faq.privacy',
    answer: 'faq.privacyAnswer'
  },
  {
    id: '10',
    question: 'faq.paymentMethods',
    answer: 'faq.paymentMethodsAnswer'
  },
  {
    id: '11',
    question: 'faq.cancelSubscription',
    answer: 'faq.cancelSubscriptionAnswer'
  },
  {
    id: '12',
    question: 'faq.realistic',
    answer: 'faq.realisticAnswer'
  },
  {
    id: '13',
    question: 'faq.mobileApp',
    answer: 'faq.mobileAppAnswer'
  }
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const { t } = useLanguage();

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="w-full py-12">
      {/* Banner2 */}
      <div className="w-full mb-12">
        <img 
          src="/banner2.png" 
          alt="Banner2" 
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      {/* FAQ Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gradient-primary">
          {t('faq.title')}
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="w-full space-y-4">
        {faqItems.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
            >
              <span className="text-lg font-medium text-foreground">
                {t(item.question)}
              </span>
              <div className="flex-shrink-0 ml-4">
                {openItems.has(item.id) ? (
                  <ChevronUp className="h-5 w-5 text-primary" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </button>
            
            {openItems.has(item.id) && (
              <div className="px-6 py-4 border-t border-border bg-secondary/20">
                <p className="text-muted-foreground leading-relaxed">
                  {t(item.answer)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
