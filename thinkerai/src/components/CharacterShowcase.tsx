'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChatContext } from '@/contexts/ChatContext';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export function CharacterShowcase() {
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);
  const { t, language } = useLanguage();
  const { isDebateModeActive, selectedCharacterIds, toggleCharacterSelection, characters } = useChatContext();

  // 🏮 降神指南逻辑：切换瞬间弹出气泡
  useEffect(() => {
    if (isDebateModeActive) {
      setShowGuidance(true);
      const timer = setTimeout(() => setShowGuidance(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isDebateModeActive]);

  const handleMouseEnter = (characterId: string) => {
    setHoveredCharacter(characterId);
  };

  const handleMouseLeave = (characterId: string) => {
    setHoveredCharacter(null);
  };

  const handleCharacterClick = (id: string, e: React.MouseEvent) => {
    if (isDebateModeActive) {
      e.preventDefault();
      toggleCharacterSelection(id);
    }
  };

  return (
    <div className="w-full py-12 relative min-h-screen">
      {/* 🏮 圣域时空遮罩 - 降维治理：似有还无的虚化 */}
      <div className={cn(
        "fixed inset-0 z-40 transition-all duration-1000 pointer-events-none",
        isDebateModeActive
          ? "opacity-100 backdrop-blur-[2px] bg-black/10 brightness-90"
          : "opacity-0 backdrop-blur-0 bg-transparent"
      )} />

      {/* 🏮 降神指南气泡 (Guidance Popup) */}
      <div className={cn(
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] transition-all duration-700 pointer-events-none",
        showGuidance ? "opacity-100 scale-100" : "opacity-0 scale-90"
      )}>
        <div className="bg-black/60 backdrop-blur-xl border border-sage-gold/40 px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          <p className="text-sage-gold font-bold tracking-widest text-lg animate-pulse">
            {language === 'zh' ? '请点选两位先贤进行辩论' : 'Please select two sages for debate'}
          </p>
        </div>
      </div>

      {/* 内容展示区 */}
      <div className={cn(
        "relative transition-all duration-700 w-full",
        isDebateModeActive ? "scale-[0.99]" : "scale-100"
      )}>
        {/* Banner Image */}
        <div className="w-full mb-12">
          <img
            src="/banner.png"
            alt="Banner"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* 🏮 圣贤法相流水阵 (Character Avatar Row) - 找回遗失的灵韵 */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-6 mb-12 relative z-50">
          {characters.map((character) => (
            <div
              key={`thumb-${character.id}`}
              className="relative group cursor-pointer flex flex-col items-center"
              onClick={(e) => handleCharacterClick(character.id, e)}
            >
              <div className={cn(
                "w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 transition-all duration-500 hover:scale-110",
                hoveredCharacter === character.id ? "border-sage-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]" : "border-white/10 group-hover:border-sage-gold/60"
              )}>
                <img
                  src={character.avatar}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-3 text-[10px] font-bold tracking-widest text-foreground/60 group-hover:text-sage-gold transition-colors uppercase whitespace-nowrap">
                {character.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>

        {/* 标题 */}
        <div className="mb-8 relative z-50">
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient-primary tracking-tighter">
            {isDebateModeActive
              ? (language === 'zh' ? '请选择对冲参与者' : 'Select Sages for Debate')
              : t('characters.title')
            }
          </h2>
        </div>

        {/* 圣贤格阵 (Character Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 relative z-50">
          {characters.map((character) => {
            return (
              <div
                key={character.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(character.id)}
                onMouseLeave={() => handleMouseLeave(character.id)}
              >
                <Link
                  href={isDebateModeActive ? "#" : `/${character.id}`}
                  onClick={(e) => handleCharacterClick(character.id, e)}
                  className="flex flex-col group cursor-pointer relative"
                >
                  <div className={cn(
                    "relative aspect-[3/4] rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform shadow-2xl",
                    selectedCharacterIds.includes(String(character.id)) ? "scale-[1.05] shadow-[0_0_30px_rgba(212,175,55,0.3)]" : "group-hover:scale-[1.03]"
                  )}>
                    {/* Border Layer */}
                    <div className={cn(
                      "absolute inset-0 rounded-3xl border transition-colors duration-500 z-30 pointer-events-none",
                      selectedCharacterIds.includes(String(character.id)) ? "border-sage-gold border-2" : "border-border/10 group-hover:border-sage-gold/40"
                    )} />

                    {/* Image & Content Wrapper */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden z-10 bg-card/40">
                      {character.video && hoveredCharacter === character.id ? (
                        <video
                          src={character.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className={cn(
                            "w-full h-full object-cover transition-all duration-1000 scale-110",
                            isDebateModeActive && !selectedCharacterIds.includes(String(character.id)) ? 'grayscale-[0.5]' : 'grayscale-0'
                          )}
                        />
                      ) : (
                        <img
                          src={character.avatar}
                          alt={character.name}
                          className={cn(
                            "w-full h-full object-cover transition-all duration-1000",
                            hoveredCharacter === character.id ? 'scale-110' : 'scale-100',
                            isDebateModeActive && !selectedCharacterIds.includes(String(character.id)) ? 'grayscale-[0.5]' : 'grayscale-0'
                          )}
                        />
                      )}

                      {/* Selection Overlay */}
                      {isDebateModeActive && (
                        <div className={cn(
                          "absolute inset-0 z-30 flex flex-col items-center justify-center transition-all duration-500",
                          selectedCharacterIds.includes(String(character.id)) ? "bg-sage-gold/10" : "bg-black/20 opacity-0 group-hover:opacity-100"
                        )}>
                          <div className={cn(
                            "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-700",
                            selectedCharacterIds.includes(String(character.id)) ? "bg-sage-gold border-white scale-125 shadow-[0_0_15px_#d4af37]" : "border-white/40 bg-black/20"
                          )}>
                            {selectedCharacterIds.includes(String(character.id)) && <Check className="h-6 w-6 text-white" />}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center mt-6 space-y-1 pointer-events-none">
                    <span className={cn(
                      "block text-base font-bold transition-colors tracking-widest uppercase text-[10px]",
                      selectedCharacterIds.includes(String(character.id)) ? "text-sage-gold" : "text-foreground/80 group-hover:text-sage-gold"
                    )}>
                      {character.name}
                    </span>
                    <div className={cn(
                      "h-[2px] mx-auto transition-all duration-500 rounded-full",
                      selectedCharacterIds.includes(String(character.id)) ? "w-12 bg-sage-gold shadow-[0_0_8px_#d4af37]" : "w-0 group-hover:w-8 bg-sage-gold"
                    )} />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
