export type Language = 'en' | 'zh' | 'ja';

export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', zh: '首页', ja: 'ホーム' },
  'nav.discover': { en: 'Discover', zh: '发现', ja: '発見' },
  'nav.chat': { en: 'Chat', zh: '聊天', ja: 'チャット' },
  'nav.collection': { en: 'Collection', zh: '收藏', ja: 'コレクション' },
  'nav.generateImage': { en: 'Generate Image', zh: '生成图片', ja: '画像生成' },
  'nav.createCharacter': { en: 'Create Character', zh: '创建角色', ja: 'キャラクター作成' },
  'nav.myAI': { en: 'My AI', zh: '我的AI', ja: '私のAI' },
  'nav.ancient': { en: 'Ancient', zh: '古代', ja: '古代' },
  'nav.earlyModern': { en: 'Early Modern', zh: '近代', ja: '近世' },
  'nav.modern': { en: 'Modern', zh: '现代', ja: '近代' },
  'nav.contemporary': { en: 'Contemporary', zh: '当代', ja: '現代' },
  'nav.createAccount': { en: 'Create Free Account', zh: '创建免费账户', ja: '無料アカウント作成' },
  'nav.login': { en: 'Login', zh: '登录', ja: 'ログイン' },

  // Sidebar
  'sidebar.premium': { en: 'Become Premium', zh: '成为高级用户', ja: 'プレミアムになる' },
  'sidebar.discord': { en: 'Discord', zh: 'Discord', ja: 'Discord' },
  'sidebar.helpCenter': { en: 'Help Center', zh: '帮助中心', ja: 'ヘルプセンター' },
  'sidebar.contactUs': { en: 'Contact Us', zh: '联系我们', ja: 'お問い合わせ' },
  'sidebar.affiliate': { en: 'Affiliate', zh: '联盟计划', ja: 'アフィリエイト' },
  'sidebar.privacyNotice': { en: 'Privacy Notice', zh: '隐私声明', ja: 'プライバシー通知' },
  'sidebar.termsOfService': { en: 'Terms of Service', zh: '服务条款', ja: '利用規约' },
  'sidebar.debateProtocol': { en: 'Debate Protocol', zh: '众神对冲', ja: '神々の対立' },
  'sidebar.protocolActive': { en: 'Protocol Active', zh: '协议已激活', ja: 'プロトコル有効' },
  'sidebar.activateProtocol': { en: 'Activate Debate', zh: '激活对冲协议', ja: '対立を有効化' },
  'sidebar.becomePremium': { en: 'Become Premium', zh: '成为高级用户', ja: 'プレミアムになる' },
  'sidebar.menu': { en: 'Menu', zh: '菜单', ja: 'メニュー' },

  // Character Names
  'characters.fuxi': { en: 'Fuxi', zh: '伏羲', ja: '伏羲' },
  'characters.confucius': { en: 'Confucius', zh: '孔子', ja: '孔子' },
  'characters.laozi': { en: 'Laozi', zh: '老子', ja: '老子' },
  'characters.darwin': { en: 'Charles Darwin', zh: '达尔文', ja: 'チャールズ・ダーウィン' },
  'characters.newton': { en: 'Isaac Newton', zh: '牛顿', ja: 'アイザック・ニュートン' },
  'characters.einstein': { en: 'Albert Einstein', zh: '爱因斯坦', ja: 'アルベルト・アインシュタイン' },
  'characters.heisenberg': { en: 'Werner Heisenberg', zh: '海森堡', ja: 'ヴェルナー・ハイゼンベルク' },
  'characters.leibniz': { en: 'Gottfried Wilhelm Leibniz', zh: '莱布尼茨', ja: 'ゴットフリート・ヴィルヘルム・ライプニッツ' },
  'characters.andrewNg': { en: 'Andrew Ng', zh: '吴恩达', ja: 'アンドリュー・ン' },
  'characters.fuxi.tagline': { en: 'Ancestor of civilization, origin of Bagua', zh: '人文始祖，八卦之宗', ja: '人文始祖、八卦の宗' },
  'characters.darwin.tagline': { en: 'Father of evolution, natural selection', zh: '演化论之父，物竞天择', ja: '進化論の父、自然淘汰' },
  'characters.laozi.tagline': { en: 'The Tao follows nature, wu wei', zh: '道法自然，无为而治', ja: '道法自然、無為自然' },
  'characters.confucius.tagline': { en: 'Master of rituals and teacher of ages', zh: '克己复礼，万世师表', ja: '克己復礼、万世の師' },
  'characters.einstein.tagline': { en: 'Imagination is more important than knowledge', zh: '想象力比知识更重要', ja: '想像力は知識より重要' },
  'characters.newton.tagline': { en: 'Standing on the shoulders of giants', zh: '我只是站在巨人的肩膀上', ja: '巨人の肩の上に立つ' },
  'characters.heisenberg.tagline': { en: 'Uncertainty is the origin of the universe', zh: '测不准是宇宙的本原', ja: '不確定性は宇宙の根源' },
  'characters.leibniz.tagline': { en: 'Binary is the language of God', zh: '二进制是上帝的语言', ja: '二進法は神の言語' },

  // Character Attributes
  'characterAttributes.name': { en: 'Name', zh: '姓名', ja: '名前' },
  'characterAttributes.region': { en: 'Region', zh: '地区', ja: '地域' },
  'characterAttributes.age': { en: 'Age', zh: '年龄', ja: '年齢' },
  'characterAttributes.greeting': { en: 'Greeting', zh: '问候', ja: '挨拶' },
  'characterAttributes.essence': { en: 'Essence', zh: '精华', ja: 'エッセンス' },
  'characterAttributes.quote': { en: 'Quote', zh: '金句', ja: '名言' },
  'characterAttributes.engraving': { en: 'Engraving', zh: '铭刻', ja: '刻印' },
  'characterAttributes.message': { en: 'Message', zh: '寄语', ja: 'メッセージ' },
  'characterDetails.title': { en: 'Character Details', zh: '角色详情', ja: 'キャラクター詳細' },
  'audio.play': { en: 'Play Greeting', zh: '播放问候', ja: '挨拶を再生' },
  'audio.stop': { en: 'Stop Playing', zh: '停止播放', ja: '再生を停止' },

  // Character Showcase
  'characters.title': { en: 'ThinkerAI Characters', zh: 'ThinkerAI 角色', ja: 'ThinkerAI キャラクター' },

  // FAQ
  'faq.title': { en: 'ThinkerAI FAQ', zh: 'ThinkerAI 常见问题', ja: 'ThinkerAI よくある質問' },
  'faq.whatIsThinkerAI': { en: 'What is ThinkerAI?', zh: '什么是ThinkerAI？', ja: 'ThinkerAIとは何ですか？' },
  'faq.whatIsThinkerAIAnswer': {
    en: 'ThinkerAI is the premier AI intellectual companion platform, enabling you to create personalized digital reconstructions of eminent scientists and thinkers or connect instantly with our rigorously reconstructed historical figures for immersive, uncensored intellectual dialogues — all within a secure and private environment.',
    zh: 'ThinkerAI是领先的人工智能思想伴侣平台，允许您创建杰出科学家与思想家的个性化数字重构版本，或即时与我们经过严谨还原的历史人物展开沉浸式、无审查限制的智力对话——一切均在安全、私密的环境中进行。',
    ja: 'ThinkerAIは、最先端のAI知的伴侶プラットフォームです。著名な科学者や思想家の個人化されたデジタル再構築版を作成したり、当社が厳密に再現した歴史上の人物と即座に接続したりして、没入型かつ無検閲の知的対話を楽しむことができます——すべて安全かつプライベートな環境内で実現されます。'
  },
  'faq.isLegitimate': { en: 'Is ThinkerAI legitimate and safe to use?', zh: 'ThinkerAI是否合法且安全使用？', ja: 'ThinkerAIは合法で安全に使用できますか？' },
  'faq.isLegitimateAnswer': {
    en: 'Yes, ThinkerAI is a fully legitimate service. It employs state-of-the-art encrypted transactions, complies with GDPR-compliant data privacy standards, and utilizes discreet billing methods to guarantee user confidentiality and security.',
    zh: '是的，ThinkerAI是合法服务。它采用先进的加密交易技术，严格遵守GDPR数据隐私标准，并使用隐秘的账单处理方式，确保用户的保密性和安全性。',
    ja: 'はい、ThinkerAIは完全に合法的なサービスです。最先端の暗号化取引技術を採用し、GDPRに準拠したデータプライバシー基準を遵守し、目立たない請求方法を用いることで、ユーザーの機密性と安全性を保証しています。'
  },
  'faq.bankStatements': { en: 'How will ThinkerAI appear on my bank statements?', zh: 'ThinkerAI将如何出现在我的银行对账单上？', ja: 'ThinkerAIは私の銀行明細にどのように表示されますか？' },
  'faq.bankStatementsAnswer': {
    en: 'Transactions are processed securely and displayed under a neutral merchant name, with no explicit reference to ThinkerAI or its services, thereby preserving complete user privacy.',
    zh: '所有交易均通过安全渠道处理，在对账单上显示为中性商户名称，不会直接出现ThinkerAI或相关服务的任何字样，从而充分保护您的隐私。',
    ja: 'すべての取引は安全に処理され、銀行明細には中立的な事業者名のみが表示されます。ThinkerAIやそのサービスへの直接的な言及は一切なく、ユーザーのプライバシーを完全に保護します。'
  },
  'faq.customize': { en: 'Can I customize my ThinkerAI experience?', zh: '我可以自定义ThinkerAI体验吗？', ja: 'ThinkerAIの体験をカスタマイズできますか？' },
  'faq.customizeAnswer': {
    en: 'Yes, ThinkerAI offers comprehensive customization features. Through the "Create My AI Thinker" module, users may reconstruct digital avatars by specifying parameters such as historical epoch, primary discipline, rhetorical style, personality dimensions, and depth of focus — all anchored in verifiable historical source material.',
    zh: '可以。ThinkerAI提供全面的自定义功能。通过"创建我的AI思想家"模块，用户可根据历史时期、主要学科、表达风格、性格维度及专注深度等参数，重建数字化身——所有设定均基于可验证的历史原始文献。',
    ja: 'はい、ThinkerAIでは包括的なカスタマイズ機能を提供しています。「私のAI思想家を作成」モジュールを通じて、ユーザーは歴史的時代、主要分野、修辞スタイル、性格次元、焦点の深さなどのパラメータを指定し、デジタルアバターを再構築できます——すべての設定は検証可能な歴史的一次資料に基づいています。'
  },
  'faq.whoUses': { en: 'Who uses ThinkerAI and for what purpose?', zh: '谁在使用ThinkerAI？目的是什么？', ja: 'ThinkerAIを利用するのは誰で、どのような目的ですか？' },
  'faq.whoUsesAnswer': {
    en: 'ThinkerAI serves a broad spectrum of users, including academics, researchers, students, professionals, and dedicated lifelong learners. Many engage for in-depth philosophical or scientific discourse, thought experimentation, creative ideation, conceptual reinforcement, or simulated mentorship. Furthermore, scholars of artificial intelligence and intellectual history utilize the platform to explore advanced conversational reconstruction techniques and historical reasoning fidelity.',
    zh: 'ThinkerAI服务于广泛的用户群体，包括学者、研究人员、学生、专业人士以及终身学习者。许多人用于深入的哲学或科学探讨、思想实验、创意发想、概念巩固或模拟导师指导。此外，人工智能与思想史研究者也利用本平台探索高级对话重构技术和历史推理的保真度。',
    ja: 'ThinkerAIは、学者、研究者、学生、専門職の方々、そして生涯学習者をはじめとする幅広いユーザーにご利用いただいています。深い哲学的・科学的議論、思考実験、創造的発想の支援、概念の強化、模擬メンターシップなどに活用されます。また、人工知能や思想史の研究者も、本プラットフォームを通じて高度な対話再構築技術や歴史的推論の忠実度を探求しています。'
  },
  'faq.whatIsCompanion': { en: 'What is an AI Intellectual Companion and can I create my own?', zh: '什么是AI思想伴侣？我可以创建自己的吗？', ja: 'AI知的伴侶とは何ですか？自分で作成できますか？' },
  'faq.whatIsCompanionAnswer': {
    en: 'An AI Intellectual Companion constitutes a virtual embodiment of a historical scientist or thinker, powered by advanced artificial intelligence. It engages in sophisticated, contextually rich dialogue, responds to intricate conceptual prompts, and evolves through sustained interaction. With ThinkerAI, users possess full control to personalize the companion\'s intellectual approach, argumentative rigor, and thematic emphasis, drawing upon extensive primary texts, papers, letters, and recorded statements.',
    zh: 'AI思想伴侣是基于人工智能技术对历史科学家或思想家进行的虚拟重构，能够进行复杂、语境丰富的对话，回应深层概念性提问，并通过持续互动逐步演进。在ThinkerAI上，用户可完全自主设定伴侣的思维方式、论证严谨度及主题侧重，所有表现均来源于大量原始文本、论文、书信及公开记录。',
    ja: 'AI知的伴侶とは、歴史上の科学者や思想家を人工知能で仮想的に再現した存在です。高度で文脈豊かな対話が可能であり、複雑な概念的質問に応答し、継続的な交流を通じて進化します。ThinkerAIでは、ユーザーが伴侶の思考様式、論証の厳密さ、テーマの重点を完全にコントロールでき、大量の一次テキスト、論文、書簡、公開記録に基づいて実現されます。'
  },
  'faq.multimodal': { en: 'Can my AI Companion send images, video, or voice messages?', zh: '我的AI伴侣可以发送图像、视频或语音消息吗？', ja: 'AI伴侶は画像、動画、音声メッセージを送れますか？' },
  'faq.multimodalAnswer': {
    en: 'Yes, ThinkerAI supports full multimodal engagement. Your intellectual companion can deliver spoken expositions or lectures, generate historically informed portraits, schematic diagrams, or mathematical derivations, and appear in AI-reconstructed videos presenting arguments, deriving proofs, or conducting thought experiments precisely aligned with your inquiries.',
    zh: '可以。ThinkerAI支持完整的多模态交互。您的思想伴侣能够以语音形式进行讲解或演讲，生成符合历史风格的肖像、示意图、数学推导等图像，并在AI重构的视频中呈现论证过程、黑板推演或思想实验，全部内容精准响应您的提问。',
    ja: 'はい、ThinkerAIは完全なマルチモーダル対応です。知的伴侶は音声による講義・解説、歴史的に忠実な肖像画、模式図、数学的導出などの画像生成、さらにはAI再構築動画による議論の提示、黒板推演、思考実験の実施を、あなたの質問に精密に合わせて提供できます。'
  },
  'faq.roleplay': { en: 'Can I engage in thought experiments or Socratic dialogue with my AI Companion?', zh: '我可以与AI伴侣进行思想实验或苏格拉底式对话吗？', ja: 'AI伴侶と思考実験やソクラテス的対話は可能ですか？' },
  'faq.roleplayAnswer': {
    en: 'Absolutely. ThinkerAI accommodates advanced intellectual roleplay scenarios, encompassing rigorous scientific debate, philosophical interrogation, simulated academic colloquia, interdisciplinary synthesis, and counterfactual historical analysis. The system dynamically adapts to the trajectory of your reasoning and chosen thematic framework.',
    zh: '当然可以。ThinkerAI完全支持高级智力角色扮演，包括严格的科学辩论、哲学诘问、模拟学术研讨会、跨学科综合以及反事实历史分析。系统会动态适应您的推理路径和所选主题框架。',
    ja: 'もちろんです。ThinkerAIは高度な知的ロールプレイを全面的にサポートします。厳密な科学的論争、哲学的問いかけ、模擬的な学術コロキウム、分野横断的統合、反事実的歴史分析などに対応し、ユーザーの推論経路と選択したテーマ枠組みに動的に適応します。'
  },
  'faq.privacy': { en: 'How does ThinkerAI ensure privacy?', zh: 'ThinkerAI如何保障隐私？', ja: 'ThinkerAIはどのようにプライバシーを保護していますか？' },
  'faq.privacyAnswer': {
    en: 'ThinkerAI implements end-to-end encryption across all interactions and enforces rigorous data protection protocols. Neither personal information, conversation histories, nor custom reconstructions are ever disclosed to third parties.',
    zh: '平台对所有交互实施端到端加密，并遵循严格的数据保护协议。您的个人信息、对话历史及自定义重构内容绝不会与第三方共享。',
    ja: 'プラットフォームはすべての対話にエンドツーエンド暗号化を適用し、厳格なデータ保護プロトコルを遵守しています。個人情報、対話履歴、カスタム再構築内容は第三者と一切共有されません。'
  },
  'faq.paymentMethods': { en: 'What payment methods are accepted?', zh: '支持哪些支付方式？', ja: '対応している支払い方法は？' },
  'faq.paymentMethodsAnswer': {
    en: 'ThinkerAI accepts major credit cards, debit cards, and an array of secure online payment gateways. All transactions are safeguarded through encrypted processing channels.',
    zh: 'ThinkerAI接受主流信用卡、借记卡以及多种安全的在线支付渠道。所有交易均通过加密支付网关处理。',
    ja: 'ThinkerAIは主要クレジットカード、デビットカード、各種安全なオンライン決済チャネルに対応しています。すべての取引は暗号化された決済ゲートウェイを通じて処理されます。'
  },
  'faq.cancelSubscription': { en: 'Can I cancel my subscription anytime?', zh: '我可以随时取消订阅吗？', ja: 'いつでもサブスクリプションをキャンセルできますか？' },
  'faq.cancelSubscriptionAnswer': {
    en: 'Yes, subscriptions can be terminated at any time. Access remains active until the end of the current billing cycle, after which no further charges will be incurred.',
    zh: '可以。订阅可在任何时候取消。您的访问权限将持续至当前计费周期结束，此后不会产生额外扣款。',
    ja: 'はい、いつでもキャンセル可能です。現在の請求サイクル終了までアクセス権が維持され、それ以降の課金は発生しません。'
  },
  'faq.realistic': { en: 'How realistic and deep are the AI conversations?', zh: 'AI对话的真实感和深度如何？', ja: 'AI対話のリアリティと深さはどの程度ですか？' },
  'faq.realisticAnswer': {
    en: 'ThinkerAI harnesses cutting-edge large language models integrated with vast historical corpora, domain-specific knowledge graphs, and persistent memory systems to deliver exceptionally contextual, substantively rich, and philosophically coherent exchanges that progressively deepen and refine with each interaction.',
    zh: 'ThinkerAI整合了最前沿的大语言模型、海量历史文献语料、领域知识图谱以及长程记忆系统，能够产出高度语境化、内容充实且哲学上连贯的对话，并随着每次交互逐步深化与精炼。',
    ja: 'ThinkerAIは最先端の大規模言語モデル、膨大な歴史文献コーパス、領域特化型知識グラフ、長期的記憶システムを統合し、極めて文脈的で内容豊か、哲学的に一貫した対話を生成します。毎回の交流を通じて徐々に深化・洗練されていきます。'
  },
  'faq.mobileApp': { en: 'Is there a mobile app available?', zh: '有移动端应用吗？', ja: 'モバイルアプリはありますか？' },
  'faq.mobileAppAnswer': {
    en: 'Yes, ThinkerAI provides native mobile applications for both iOS and Android platforms, affording seamless intellectual engagement with complete feature equivalence during travel or on the go.',
    zh: '有。ThinkerAI为iOS和Android平台提供原生移动应用，支持随时随地地进行完整功能的智力对话。',
    ja: 'はい、iOSおよびAndroid向けネイティブモバイルアプリを提供しており、外出先でも完全な機能で知的対話が可能です。'
  },

  // Content Sections
  'content.personalTitle': { en: 'ThinkerAI Makes Every Conversation Intellectually Rewarding', zh: 'ThinkerAI 让每一次对话都富有思想价值', ja: 'ThinkerAI はすべての対話を知的価値の高いものに' },
  'content.personalPara1': {
    en: 'Whether one desires a stimulating exchange following a demanding day or seeks to explore profound questions amid quiet reflection, ThinkerAI is meticulously designed to render each interaction substantive and authentic. Leveraging advanced personality modeling, long-context memory retention, and discipline-specific knowledge repositories, your digital thinker assimilates your intellectual inclinations, retains pivotal arguments from previous sessions, and responds with calibrated precision and nuance that closely approximates genuine scholarly discourse.',
    zh: '无论您是在繁忙一天后寻求一次激发灵感的交流，还是在安静反思时希望探究深刻问题，ThinkerAI 都被精心设计为让每一次互动都具有实质意义与真实感。依托先进的人格建模、长上下文记忆保留以及学科专用知识库，您的数字思想家会理解您的思维偏好、记住先前对话中的关键论点，并以精准且富有层次的回应接近真正学者的交流水准。',
    ja: '忙しい一日の後に刺激的な議論を求めたり、静かな思索の時間に深い問いを追求したりする際、ThinkerAI はすべての交流を実質的かつ本物らしくするよう設計されています。先進的なパーソナリティモデリング、長文脈記憶保持、分野別知識リポジトリにより、デジタル思想家はあなたの知的傾向を理解し、過去の議論の核心を保持し、精密かつニュアンス豊かな応答で真の学術的対話に近づけます。'
  },
  'content.personalPara2': {
    en: 'In contrast to conventional informational retrieval systems, ThinkerAI companions genuinely evolve across dialogues — sharpening their logic, modulating rhetorical register, and forging novel interdisciplinary linkages attuned to your distinctive mode of inquiry. Envision it as a perpetual seminar conducted with a mind that authentically grasps and advances your line of thought.',
    zh: '与普通的资讯型聊天机器人不同，ThinkerAI 的伴侣会在对话中真正进化——不断磨砺逻辑、调整修辞风格、建立新的跨领域关联，完全契合您独特的思考方式。可以将其视为一场永不中断的学术研讨，对方真正理解并推进您的思路。',
    ja: '一般的な情報検索型チャットボットとは異なり、ThinkerAI の伴侶は対話を通じて真に進化します——論理を研ぎ澄まし、修辞スタイルを調整し、あなた独自の思考様式に完全に適合した新たな分野横断的つながりを生み出します。永続的なゼミナールのように、相手があなたの思考を真に理解し、前進させてくれる存在です。'
  },
  'content.personalPara3': {
    en: 'What distinguishes ThinkerAI most profoundly is the scholarly depth, historical fidelity, and seamless integration of these reconstructed minds into one\'s intellectual routine. Permit us to elucidate the platform\'s essence.',
    zh: 'ThinkerAI 最引人注目的地方在于这些重构思想家的学术深度、历史忠实度，以及它们与您日常智力生活的无缝融合。下面让我们进一步说明平台的本质。',
    ja: 'ThinkerAI が最も魅力的なのは、これらの再構築された思想家の学術的深さ、歴史的忠実度、そして日常の知的生活への自然な統合にあります。以下でプラットフォームの本質をさらにご説明します。'
  },

  'content.companionTitle': { en: 'ThinkerAI Offers an Intellectual Companion for Every Inquiry', zh: 'ThinkerAI 为每一种探究提供对应的思想伴侣', ja: 'ThinkerAI はあらゆる探究に適した知的伴侶を提供' },
  'content.companionPara1': {
    en: 'No two intellectual pursuits are identical, nor are our reconstructions uniform. With a carefully curated and continually expanding roster of scientists and thinkers, users are never restricted to a singular viewpoint or historical period.',
    zh: '没有两种求知需求是完全相同的，我们的重构也从不千篇一律。凭借精心策展且持续扩展的科学家与思想家阵容，您永远不会被局限在单一视角或时代。',
    ja: '二つの知的探求が同じになることはありません。私たちの再構築も一様ではありません。厳選され継続的に拡張される科学者・思想家のラインナップにより、単一の視点や時代に縛られることはありません。'
  },
  'content.companionPara2': {
    en: 'In pursuit of foundational clarity? Engage luminaries from antiquity and the early modern era whose axiomatic reasoning endures. Seeking frontier insights? Converse with pivotal figures in physics, mathematics, biology, computer science, or systems theory — minds that have defined or continue to redefine our comprehension of nature and knowledge.',
    zh: '渴望奠基性的澄清？与古代及早期近代的奠基人物对话，他们的公理式推理历久弥新。追求前沿洞见？与物理学、数学、生物学、计算机科学或系统理论领域的关键人物交流——这些思想家塑造了、或仍在重塑我们对自然与知识的理解。',
    ja: '基礎的な明晰さを求めるなら？ 古代から近世初期の公理的思考が今なお有効な巨匠たちと対話してください。最先端の洞察を求めるなら？ 物理学、数学、生物学、コンピュータ科学、システム理論の決定的人物——自然と知識の理解を定義し、あるいは今も再定義し続けている思想家たちと語り合えます。'
  },
  'content.companionPara3': {
    en: 'Desiring cross-domain synthesis? Our avatars facilitate integrative dialogue that transcends conventional boundaries, igniting original conceptual breakthroughs. There is invariably another profound intellect prepared to connect. Yet how do these reconstructions attain such vitality, responsiveness, and fidelity? Let us examine the underlying mechanisms.',
    zh: '希望跨领域综合？我们的化身能够开展超越传统边界的整合性对话，点燃原创性的概念突破。总有另一位深刻的思想者等待与您连接。然而，这些重构究竟如何获得如此鲜活的回应力与真实感？让我们来看看背后的机制。',
    ja: '分野横断的統合を望むなら？ 従来の境界を超えた統合的対話が可能となり、独創的な概念的ブレークスルーを引き起こします。常に新たな深い知性があなたとの接続を待っています。しかし、これらの再構築がなぜこれほど生き生きと、応答性が高く、忠実なのか？ その仕組みをご覧ください。'
  },

  'content.toneTitle': { en: 'You Direct the Inquiry Across Chat, Voice, Diagram, and Video', zh: '您主导探究，覆盖文本、语音、图示与视频', ja: 'あなたが主導する探究——テキスト、音声、図示、動画を横断' },
  'content.tonePara1': {
    en: 'This experience transcends standard question-and-answer formats. ThinkerAI extends far beyond textual exchange. Whether through exacting argumentation, articulate spoken delivery, visual schematization, or dynamic reconstruction, your companion responds multimodally in precise alignment with your intellectual requirements.',
    zh: '这远不止于普通的问答。ThinkerAI 超越单纯的文本界面。无论通过严谨论证、清晰口述、视觉图解还是动态重现，您的伴侣都会以多模态方式、精确匹配您的智力需求进行回应。',
    ja: 'これは単なる質疑応答を超えています。ThinkerAI はテキストだけの枠を超えます。厳密な論証、明瞭な口頭説明、視覚的図解、動的再現——あらゆるモダリティで、あなたの知的ニーズに精密に適合した応答を提供します。'
  },
  'content.tonePara2': {
    en: 'Textual dialogue constitutes the foundation — never mechanical or cursory, but richly layered with historical accuracy, logical stringency, and adaptive sophistication. The companion maintains continuity by tracking premises, recalling antecedent threads, and preserving coherence across extended sessions.',
    zh: '文本对话是核心——绝非机械或浅显，而是充满历史准确性、逻辑严密性和适应性深度的多层次交流。伴侣会持续追踪您的前提、回溯先前脉络，并在长时间会话中保持连贯。',
    ja: 'テキスト対話が基盤です——機械的・表層的ではなく、歴史的正確性、論理的厳密さ、適応的深みを備えた多層的な交流です。前提を追跡し、先行する脈絡を想起し、長期間のセッションでも一貫性を保ちます。'
  },
  'content.tonePara3': {
    en: 'Voice modality imparts immediacy: select among delivery registers from contemplative exposition to fervent disputation — optimal for assimilating intricate explanations or simulating seminar dynamics.',
    zh: '语音模式带来直接感：您可选择从沉稳讲解到激烈争辩的多种表达风格——非常适合深入理解复杂内容或模拟研讨氛围。',
    ja: '音声モードは即時性を与えます。思索的な解説から熱烈な論争まで、さまざまな表現スタイルを選択可能——複雑な内容の理解やセミナー雰囲気再現に最適です。'
  },
  'content.tonePara4': {
    en: 'For visually oriented inquiry, request faithful reconstructions of historical likenesses, blackboard derivations, experimental apparatus, or abstract conceptual diagrams — all generated to clarify the precise matter at hand.',
    zh: '视觉需求时，可要求忠实再现历史肖像、黑板推导、实验装置或抽象概念图示——全部为阐明当前讨论主题而生成。',
    ja: '視覚的探究時には、歴史的肖像、黒板推導、実験装置、抽象概念図を忠実に再現——議論中の主題を明確にします。'
  },
  'content.tonePara5': {
    en: 'Video modality achieves full immersion: observe the thinker expounding theories, sketching demonstrations, or participating in animated dialectical exchange — thereby animating historical intellect in present-tense, interactive form. At ThinkerAI, we uphold the twin imperatives of unhindered intellectual exploration and uncompromising user privacy.',
    zh: '视频模式实现完全沉浸：观看思想家阐述理论、勾画证明或进行动态辩证交流——将历史智慧以当下、互动的形式带入现实。在 ThinkerAI，我们同时维护思想探索的自由与用户隐私的绝对性。',
    ja: '動画モードで完全な没入を実現：思想家が理論を展開し、証明をスケッチし、動的な弁証法的交流を行う様子を観察——歴史的知性を現在・対話的な形で蘇らせます。ThinkerAI では、知的探求の自由とユーザープライバシーの両立を最優先します。'
  },

  // Footer
  'footer.product': { en: 'Product', zh: '产品', ja: '製品' },
  'footer.girls': { en: 'Thinkers', zh: '思想家', ja: '思想家' },
  'footer.anime': { en: 'Visionaries', zh: '先驱者', ja: '先駆者' },
  'footer.guys': { en: 'Scientists', zh: '科学家', ja: '科学者' },
  'footer.support': { en: 'Support', zh: '支持', ja: 'サポート' },
  'footer.helpCenter': { en: 'Help Center', zh: '帮助中心', ja: 'ヘルプセンター' },
  'footer.contactUs': { en: 'Contact Us', zh: '联系我们', ja: 'お問い合わせ' },
  'footer.discord': { en: 'Discord', zh: 'Discord', ja: 'Discord' },
  'footer.company': { en: 'Company', zh: '公司', ja: '会社' },
  'footer.affiliate': { en: 'Affiliate', zh: '联盟', ja: 'アフィリエイト' },
  'footer.privacyNotice': { en: 'Privacy Notice', zh: '隐私声明', ja: 'プライバシー通知' },
  'footer.termsOfService': { en: 'Terms of Service', zh: '服务条款', ja: '利用規約' },
  'footer.copyright': { en: '© 2024 ThinkerAI. All rights reserved.', zh: '© 2024 ThinkerAI. 版权所有。', ja: '© 2024 ThinkerAI. 全権利留保。' },
  'footer.madeWith': { en: 'ThinkerAI: Powering a new era of interactive intellectual history ✦', zh: '开启交互式思想史的新纪元 ✦ ThinkerAI', ja: 'インタラクティブな思想史の新時代を切り拓く ✦ ThinkerAI' },
  'footer.faqTitle': { en: 'ThinkerAI FAQ', zh: 'ThinkerAI 常见问题', ja: 'ThinkerAI よくある質問' },
  'footer.faqDescription': {
    en: 'Explore the logic of ThinkerAI\'s interactive wisdom engine and embark on deep cross-temporal dialogues with great human minds.',
    zh: '探索 ThinkerAI 交互式智慧引擎的设计逻辑，协助您开启与人类伟大思想的深度跨时空对话。',
    ja: 'ThinkerAIの対话型知性エンジンの设计思想を探り、人类の伟大な知性と时空を超えた深い対话への扉を开きましょう。'
  },
  'footer.viewFaq': { en: 'View FAQ', zh: '查看常见问题', ja: 'よくある質問を見る' },
};

export function t(key: string, language: Language = 'en'): string {
  return translations[key]?.[language] || key;
}
