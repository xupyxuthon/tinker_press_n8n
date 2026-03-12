import person_en from './person_en.json';
import person_zh from './person_zh.json';
import person_ja from './person_ja.json';

export type Language = 'en' | 'zh' | 'ja';

export interface CharacterAttribute {
  name: string;
  birth_year: number | string;
  death_year: number | string;
  region: string;
  age: string;
  greeting: string;
  essence: string;
  quote: string;
  engraving: string;
  message: string;
  description: string;
  image: string;
  video: string;
  audio: string;
  nameKey: string;
}

export interface CharacterData {
  [key: string]: CharacterAttribute;
}

// 媒体文件映射
const mediaMapping: Record<string, { image: string; video: string; audio: string; nameKey: string }> = {
  'fuxi': {
    image: '/fuxi/32b329ef-a33e-4a91-9df2-0794fcf5ebf3.jpg',
    video: '/fuxi/final_grok-video-32b329ef-a33e-4a91-9df2-0794fcf5ebf3.mp4',
    audio: '/fuxi/Fuxi-ng_say_hello.mp3',
    nameKey: 'characters.fuxi'
  },
  'confucius': {
    image: '/confucius/5c0144b8-9eb5-49cb-ab96-50884f6ded4e.jpg',
    video: '/confucius/grok-video-5c0144b8-9eb5-49cb-ab96-50884f6ded4e.mp4',
    audio: '/confucius/confucius_say_hello.mp3',
    nameKey: 'characters.confucius'
  },
  'laozi': {
    image: '/laozi/7b8b39e0-062d-4297-9d5a-8899e6181dd7.jpg',
    video: '/laozi/grok-video-7b8b39e0-062d-4297-9d5a-8899e6181dd7.mp4',
    audio: '/laozi/laozi_say_hello.mp3',
    nameKey: 'characters.laozi'
  },
  'darwin': {
    image: '/darwin/b3e26469-7452-4d7c-acb1-69f5eb490975.jpg',
    video: '/darwin/grok-video-89a8bc7d-afb8-472f-9bb1-d7373b8b98f6.mp4',
    audio: '/darwin/darwin_say_hello.mp3',
    nameKey: 'characters.darwin'
  },
  'newton': {
    image: '/newton/1b21b5bb-30a9-4630-af53-1eb33997d762.jpg',
    video: '/newton/grok-video-1b21b5bb-30a9-4630-af53-1eb33997d762.mp4',
    audio: '/newton/newton_say_hello.mp3',
    nameKey: 'characters.newton'
  },
  'einstein': {
    image: '/einstein/3ea43354-b4b7-4572-b446-569a2df0de6c.jpg',
    video: '/einstein/grok-video-3ea43354-b4b7-4572-b446-569a2df0de6c.mp4',
    audio: '/einstein/einstein_say_hello.mp3',
    nameKey: 'characters.einstein'
  },
  'heisenberg': {
    image: '/heisenberg/240b8e60-4c38-4699-9a45-9f929afdb2b0.jpg',
    video: '/heisenberg/grok-video-4a2b8c9d-1e3f-4a5b-9c8d-0e1f2a3b4c5d.mp4',
    audio: '/heisenberg/heisenberg_say_hello.mp3',
    nameKey: 'characters.heisenberg'
  },
  'leibniz': {
    image: '/leibniz/5fb45bab-73fc-4606-bd69-4653bd5ac350.jpg',
    video: '/leibniz/grok-video-5d6e7f8a-2b4c-4d5e-8f9a-0b1c2d3e4f5a.mp4',
    audio: '/leibniz/leibniz_say_hello.mp3',
    nameKey: 'characters.leibniz'
  },
  'andrew_ng': {
    image: '/andrew-ng/lucid-origin_Half-body_portrait_waist-up_contemporary_AI_researcher_Andrew_Ng_in_modern_busin-0 (1).jpg',
    video: '/andrew-ng/grok-video-691d45b8-6140-4672-9cc8-acfe87c172cc.mp4',
    audio: '/andrew-ng/andrew-ng_say_hello.mp3',
    nameKey: 'characters.andrewNg'
  }
};

// 增强角色数据，添加媒体文件和翻译键
function enhanceCharacterData(rawData: any): CharacterData {
  const enhanced: CharacterData = {};
  
  Object.keys(rawData).forEach(key => {
    const character = rawData[key];
    const media = mediaMapping[key];
    
    if (media) {
      enhanced[key] = {
        ...character,
        image: media.image,
        video: media.video,
        audio: media.audio,
        nameKey: media.nameKey
      };
    }
  });
  
  return enhanced;
}

const characterDatabase: Record<Language, CharacterData> = {
  en: enhanceCharacterData(person_en),
  zh: enhanceCharacterData(person_zh),
  ja: enhanceCharacterData(person_ja),
};

// URL到数据库ID的映射
const urlToIdMapping: Record<string, string> = {
  'fuxi': 'fuxi',
  'kongzi': 'confucius',
  'laozi': 'laozi',
  'darwin': 'darwin',
  'newton': 'newton',
  'einstein': 'einstein',
  'heisenberg': 'heisenberg',
  'leibniz': 'leibniz',
  'andrew-ng': 'andrew_ng'
};

export function getCharacterData(characterId: string, language: Language = 'en'): CharacterAttribute | null {
  // 将URL参数映射到数据库ID
  const dbId = urlToIdMapping[characterId] || characterId;
  return characterDatabase[language]?.[dbId] || null;
}

export function getAllCharacters(language: Language = 'en'): CharacterData {
  return characterDatabase[language] || {};
}

export function getDisplayCharacters(language: Language = 'en'): CharacterData {
  const allChars = characterDatabase[language] || {};
  const displayChars: CharacterData = {};
  
  // 排除孔子（confucius），只展示其他8个角色
  Object.keys(allChars).forEach(id => {
    if (id !== 'confucius') {
      displayChars[id] = allChars[id];
    }
  });
  
  return displayChars;
}

export function getCharacterList(language: Language = 'en'): string[] {
  return Object.keys(characterDatabase[language] || {});
}

export function getDisplayCharacterList(language: Language = 'en'): string[] {
  return Object.keys(getDisplayCharacters(language));
}
