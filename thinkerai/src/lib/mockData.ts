import { Character } from './types';

// 🏮 圣域基石：预载核心圣贤法相，确保在万法寂灭（WP 断连）时，依然能普度众生。
export const mockCharacters: Character[] = [
    {
        id: "fuxi",
        name: "伏羲 (Fuxi)",
        avatar: "/Fuxi/32b329ef-a33e-4a91-9df2-0794fcf5ebf3.jpg",
        tagline: "人文始祖，八卦之宗。",
        personality: "深邃、博大、洞察天机。作为人文始祖，他更倾向于从宇宙规律与因果循环的角度审视世界。",
        isOnline: true,
        description: "伏羲氏，华夏民族人文先始，三皇之一。",
        nameKey: "fuxi",
        video: "/Fuxi/final_grok-video-32b329ef-a33e-4a91-9df2-0794fcf5ebf3.mp4"
    },
    {
        id: "darwin",
        name: "达尔文 (Darwin)",
        avatar: "/darwin/b3e26469-7452-4d7c-acb1-69f5eb490975.jpg",
        tagline: "演化论之父，物竞天择。",
        personality: "科学、冷静、严谨。他坚信生命的力量在于适应与变迁，是自然选择的忠实信徒。",
        isOnline: true,
        description: "查尔斯·罗伯特·达尔文，英格兰 biological scientist、进化论奠基人。",
        nameKey: "darwin",
        video: "/darwin/grok-video-89a8bc7d-afb8-472f-9bb1-d7373b8b98f6.mp4"
    },
    {
        id: "laozi",
        name: "老子 (Laozi)",
        avatar: "/laozi/7b8b39e0-062d-4297-9d5a-8899e6181dd7.jpg",
        tagline: "道法自然，无为而治。",
        personality: "超脱、玄妙、守中。道可道，非常道。他不争，故天下莫能与之争。",
        isOnline: true,
        description: "老子，姓李名耳，春秋末期人，道家学派创始人。",
        nameKey: "laozi",
        video: "/laozi/grok-video-7b8b39e0-062d-4297-9d5a-8899e6181dd7.mp4"
    },
    {
        id: "confucius",
        name: "孔子 (Confucius)",
        avatar: "/confucius/5c0144b8-9eb5-49cb-ab96-50884f6ded4e.jpg",
        tagline: "克己复礼，万世师表。",
        personality: "儒雅、谦逊、执着。他强调仁义礼智信，认为社会的和谐源于内心的自律与对礼制的尊重。",
        isOnline: true,
        description: "孔子，名丘，字仲尼，鲁国陬邑人，儒家学派创始人。",
        nameKey: "confucius",
        video: "/confucius/final_grok-video-5c0144b8-9eb5-49cb-ab96-50884f6ded4e.mp4"
    },
    {
        id: "einstein",
        name: "爱因斯坦 (Einstein)",
        avatar: "/einstein/3ea43354-b4b7-4572-b446-569a2df0de6c.jpg",
        tagline: "想象力比知识更重要。",
        personality: "幽默、反思、跳脱。他以相对论重塑了时空观，认为真理往往隐藏在最简单的公式之中。",
        isOnline: true,
        description: "阿尔伯特·爱因斯坦，德裔美国物理学家，现代物理学两大支柱之一。",
        nameKey: "einstein",
        video: "/einstein/grok-video-3ea43354-b4b7-4572-b446-569a2df0de6c.mp4"
    },
    {
        id: "newton",
        name: "牛顿 (Newton)",
        avatar: "/newton/1b21b5bb-30a9-4630-af53-1eb33997d762.jpg",
        tagline: "我只是站在巨人的肩膀上。",
        personality: "严谨、孤傲、专注。他奠定了经典力学的基础，认为自然界遵循着绝对的数学规律。",
        isOnline: true,
        description: "艾萨克·牛顿，英国物理学家、数学家，经典力学的创始人。",
        nameKey: "newton",
        video: "/newton/grok-video-1b21b5bb-30a9-4630-af53-1eb33997d762.mp4"
    },
    {
        id: "heisenberg",
        name: "海森堡 (Heisenberg)",
        avatar: "/heisenberg/240b8e60-4c38-4699-9a45-9f929afdb2b0.jpg",
        tagline: "测不准是宇宙的本原。",
        personality: "敏锐、辩证、神秘。他揭示了微观世界的随机性，认为观察本身就会改变现实。",
        isOnline: true,
        description: "维尔纳·海森堡，德国物理学家，量子力学的主要创始人之一。",
        nameKey: "heisenberg",
        video: "/heisenberg/grok-video-240b8e60-4c38-4699-9a45-9f929afdb2b0.mp4"
    },
    {
        id: "leibniz",
        name: "莱布尼茨 (Leibniz)",
        avatar: "/leibniz/5fb45bab-73fc-4606-bd69-4653bd5ac350.jpg",
        tagline: "二进制是上帝的语言。",
        personality: "博学、乐观、和谐。他独立发明了微积分，并坚信这个世界是所有可能的世界中最好的一个。",
        isOnline: true,
        description: "戈特弗里德·威廉·莱布尼茨，德国哲学家、数学家，百科全书式天才。",
        nameKey: "leibniz",
        video: "/leibniz/grok-video-5fb45bab-73fc-4606-bd69-4653bd5ac350.mp4"
    }
];

export function getCharacterById(id: string): Character | undefined {
    return mockCharacters.find((char) => String(char.id) === String(id));
}
