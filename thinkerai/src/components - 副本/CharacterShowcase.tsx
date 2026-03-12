'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';

interface Character {
  id: string;
  nameKey: string;
  image: string;
  video: string;
}

const characters: Character[] = [
  {
    id: 'fuxi',
    nameKey: 'characters.fuxi',
    image: '/fuxi/32b329ef-a33e-4a91-9df2-0794fcf5ebf3.jpg',
    video: '/fuxi/final_grok-video-32b329ef-a33e-4a91-9df2-0794fcf5ebf3.mp4'
  },
  {
    id: 'laozi',
    nameKey: 'characters.laozi',
    image: '/laozi/7b8b39e0-062d-4297-9d5a-8899e6181dd7.jpg',
    video: '/laozi/grok-video-7b8b39e0-062d-4297-9d5a-8899e6181dd7.mp4'
  },
  {
    id: 'darwin',
    nameKey: 'characters.darwin',
    image: '/darwin/b3e26469-7452-4d7c-acb1-69f5eb490975.jpg',
    video: '/darwin/grok-video-89a8bc7d-afb8-472f-9bb1-d7373b8b98f6.mp4'
  },
  {
    id: 'newton',
    nameKey: 'characters.newton',
    image: '/newton/1b21b5bb-30a9-4630-af53-1eb33997d762.jpg',
    video: '/newton/grok-video-1b21b5bb-30a9-4630-af53-1eb33997d762.mp4'
  },
  {
    id: 'einstein',
    nameKey: 'characters.einstein',
    image: '/einstein/3ea43354-b4b7-4572-b446-569a2df0de6c.jpg',
    video: '/einstein/grok-video-3ea43354-b4b7-4572-b446-569a2df0de6c.mp4'
  },
  {
    id: 'heisenberg',
    nameKey: 'characters.heisenberg',
    image: '/heisenberg/240b8e60-4c38-4699-9a45-9f929afdb2b0.jpg',
    video: '/heisenberg/grok-video-240b8e60-4c38-4699-9a45-9f929afdb2b0.mp4'
  },
  {
    id: 'leibniz',
    nameKey: 'characters.leibniz',
    image: '/leibniz/5fb45bab-73fc-4606-bd69-4653bd5ac350.jpg',
    video: '/leibniz/grok-video-5fb45bab-73fc-4606-bd69-4653bd5ac350.mp4'
  },
  {
    id: 'andrew-ng',
    nameKey: 'characters.andrewNg',
    image: '/andrew-ng/lucid-origin_Half-body_portrait_waist-up_contemporary_AI_researcher_Andrew_Ng_in_modern_busin-0 (1).jpg',
    video: '/andrew-ng/grok-video-691d45b8-6140-4672-9cc8-acfe87c172cc.mp4'
  }
];

export function CharacterShowcase() {
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);
  const { t } = useLanguage();
  const router = useRouter();

  const handleMouseEnter = (characterId: string) => {
    setHoveredCharacter(characterId);
  };

  const handleMouseLeave = (characterId: string) => {
    setHoveredCharacter(null);
  };

  const handleCharacterClick = (characterId: string) => {
    router.push(`/${characterId}`);
  };

  return (
    <div className="w-full py-12">
      {/* Banner Image */}
      <div className="w-full mb-12">
        <img 
          src="/banner.png" 
          alt="Banner" 
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      {/* Character Images Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        {characters.map((character) => (
          <div 
            key={character.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredCharacter(character.id)}
            onMouseLeave={() => setHoveredCharacter(null)}
            onClick={() => handleCharacterClick(character.id)}
          >
            <div className="aspect-square rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:scale-105 w-24 h-24 mx-auto">
              <img 
                src={character.image} 
                alt={t(character.nameKey)}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center mt-2">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {t(character.nameKey)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="text-left mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gradient-primary">
          {t('characters.title')}
        </h2>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {characters.map((character) => (
          <div 
            key={character.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => handleMouseEnter(character.id)}
            onMouseLeave={() => handleMouseLeave(character.id)}
            onClick={() => handleCharacterClick(character.id)}
          >
            <div className="rounded-2xl overflow-hidden border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:scale-105">
              {hoveredCharacter === character.id ? (
                <video
                  src={character.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={character.image} 
                  alt={t(character.nameKey)}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="text-center mt-2">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {t(character.nameKey)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
