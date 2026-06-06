/*
  inner.path™ v0.15
  Piloto privado · Sofia only.
*/

const DEMO_SPOTIFY_EMBED = "https://open.spotify.com/embed/episode/3Y9dQJ8Y0ScYrPWWZCtoSS?utm_source=generator";
const INNER_CHILD_SPOTIFY_EMBED = "https://open.spotify.com/embed/episode/7JLYDy0WI8w9hJ4yvLQgy1?utm_source=generator";
const BODY_SCAN_SPOTIFY_EMBED = "https://open.spotify.com/embed/episode/7boPwd0Eyy4A9Wp2Vk0CUh?utm_source=generator";

const UI_TEXT = {
  pt: {
    demo: "piloto privado · espaço pessoal da Sofia",
    hello: "olá,",
    values: "GPS interno · os teus 3 espelhos ·",
    note: "nota · daniela",
    thisWeek: "esta semana",
    meditationShortcut: "meditação da semana",
    play: "play",
    sessionMemory: "o que fica da sessão",
    sessionMemorySub: "resumo simples para integração",
    path: "percurso",
    pathSub: "sessões-base + integração",
    done: "feita",
    current: "actual",
    locked: "bloqueada",
    lockedHint: "As sessões futuras aparecem no mapa, mas só ficam acessíveis quando a Daniela as desbloquear.",
    meditation: "meditação",
    noAudioTitle: "sem áudio nesta semana",
    noAudioBody: "Esta meditação ainda está a ser criada. Usa as tarefas, o diário e o extra como apoio de integração.",
    sensations: "o que podes sentir esta semana",
    journalPlaceholder: "escreve livremente...",
    extra: "extra da semana",
    start: "iniciar",
    inhale: "inspira",
    exhale: "expira",
    clear: "limpar dados deste dispositivo",
    cleared: "dados limpos neste dispositivo",
    navHome: "início",
    navMeditation: "meditação",
    navJournal: "diário",
    navExtra: "extra",
    language: "idioma",
    futureSession: "sessão futura",
    futureBody: "Esta sessão ainda não está aberta para a cliente. A Daniela pode desbloqueá-la quando fizer sentido no percurso.",
    photoOptional: "foto opcional do casulo físico",
    photoFuture: "Na versão real, esta fotografia deve ficar protegida numa base de dados privada.",
    scoreFrom1To10: "pontua cada área de 1 a 10",
    casuloMeaning: "O Casulo mostra o ponto em que estás neste momento da tua vida: como te estás a nutrir, onde existe mais presença e que áreas estão prontas para receber mais cuidado, estrutura e escolha."
  },
  en: {
    demo: "private pilot · Sofia personal space",
    hello: "hello,",
    values: "inner GPS · your 3 mirrors ·",
    note: "note · daniela",
    thisWeek: "this week",
    meditationShortcut: "weekly meditation",
    play: "play",
    sessionMemory: "what stays from the session",
    sessionMemorySub: "simple summary for integration",
    path: "path",
    pathSub: "core sessions + integration",
    done: "done",
    current: "current",
    locked: "locked",
    lockedHint: "Future sessions appear on the map, but only become accessible when Daniela unlocks them.",
    meditation: "meditation",
    noAudioTitle: "no audio this week",
    noAudioBody: "This meditation is still being created. Use the tasks, journal and extra practice for integration.",
    sensations: "what you may feel this week",
    journalPlaceholder: "write freely...",
    extra: "weekly extra",
    start: "start",
    inhale: "inhale",
    exhale: "exhale",
    clear: "clear data on this device",
    cleared: "data cleared on this device",
    navHome: "home",
    navMeditation: "meditation",
    navJournal: "journal",
    navExtra: "extra",
    language: "language",
    futureSession: "future session",
    futureBody: "This session is not yet open for the client. Daniela can unlock it when it makes sense in the process.",
    photoOptional: "optional photo of the physical cocoon",
    photoFuture: "In the real version, this photo should be protected in a private database.",
    scoreFrom1To10: "score each area from 1 to 10",
    casuloMeaning: "The Cocoon shows where you are in this moment of your life: how you are nourishing yourself, where there is more presence and which areas are ready to receive more care, structure and choice."
  }
};

const PHASES = {
  lumen: {
    pt: { label: "fase 01 · lúmen", short: "lúmen", line: "limpeza · regulação · preparação" },
    en: { label: "phase 01 · lumen", short: "lumen", line: "clearing · regulation · preparation" }
  },
  integration: {
    pt: { label: "fase 02 · integração", short: "integração", line: "pausa · ferramentas · ancoragem" },
    en: { label: "phase 02 · integration", short: "integration", line: "pause · tools · anchoring" }
  },
  deep: {
    pt: { label: "fase 03 · aprofundamento", short: "aprofundamento", line: "crenças · criança interior · desenvolvimento" },
    en: { label: "phase 03 · deepening", short: "deepening", line: "beliefs · inner child · development" }
  }
};

const CASULO_AREAS = [
  { id: "purpose", pt: "Propósito de vida", en: "Life purpose" },
  { id: "spiritual", pt: "Liderança espiritual", en: "Spiritual leadership" },
  { id: "peers", pt: "Peer group", en: "Peer group" },
  { id: "social", pt: "Hobbies / vida social", en: "Hobbies / social life" },
  { id: "growth", pt: "Desenv. pessoal", en: "Personal growth" },
  { id: "contribution", pt: "Contrib. / voluntariado", en: "Contribution / service" },
  { id: "romance", pt: "Romance", en: "Romance" },
  { id: "family", pt: "Família / amigos", en: "Family / friends" },
  { id: "career", pt: "Trabalho / carreira", en: "Work / career" },
  { id: "health", pt: "Saúde", en: "Health" },
  { id: "finances", pt: "Finanças", en: "Finances" },
  { id: "meaning", pt: "Significado de vida", en: "Meaning in life" }
];

const METHOD_SESSIONS = [
  {
    id: "base-01",
    baseNumber: 1,
    phase: "lumen",
    status: "current",
    title: { pt: "O Casulo", en: "The Cocoon" },
    subtitle: { pt: "onde estou?", en: "where am I?" },
    intent: { pt: "diagnóstico interno · valores · ponto de partida", en: "inner diagnosis · values · starting point" },
    dateLabel: { pt: "semana 1", en: "week 1" },
    sessionMemory: {
      pt: ["anamnese · história e intenção", "roda da vida · 12 áreas", "os 3 espelhos · 3 pessoas · 9 qualidades · 3 valores", "blueprint inicial · o que vai ser trabalhado"],
      en: ["intake · story and intention", "wheel of life · 12 areas", "the 3 mirrors · 3 people · 9 qualities · 3 values", "initial blueprint · what will be worked on"]
    },
    note: {
      pt: "Bem-vinda. Esta é a tua primeira semana. Hoje começamos por desenhar o teu ponto de partida, escutar o que está vivo em ti e escolher a estrutura que te vai apoiar. Estou aqui contigo.",
      en: "Welcome. This is your first week. Today we begin by drawing your starting point, listening to what is alive in you, and choosing the structure that will support you. I am here with you."
    },
    tasks: {
      pt: [
        { title: "Preencher o casulo digital", detail: "pontuar as 12 áreas de 1 a 10", type: "casulo" },
        { title: "Ancorar os 3 Espelhos", detail: "usar os valores como bússola da semana", type: "valores" },
        { title: "Escrever o que estou a tolerar", detail: "uma página livre no diário", type: "diário" }
      ],
      en: [
        { title: "Fill in the digital cocoon", detail: "score the 12 areas from 1 to 10", type: "cocoon" },
        { title: "Anchor the 3 Mirrors", detail: "use your values as a compass this week", type: "values" },
        { title: "Write what I am tolerating", detail: "one free page in the journal", type: "journal" }
      ]
    },
    audio: null,
    sensations: {
      pt: [{ title: "clareza inicial", detail: "começas a perceber padrões que antes estavam misturados" }, { title: "algum desconforto", detail: "ver com verdade pode mexer com o sistema nervoso" }, { title: "vontade de organizar", detail: "o casulo começa a ganhar estrutura" }],
      en: [{ title: "initial clarity", detail: "you begin to see patterns that were previously mixed together" }, { title: "some discomfort", detail: "seeing clearly can stir the nervous system" }, { title: "a wish to organise", detail: "the cocoon starts gaining structure" }]
    },
    journal: {
      pt: ["O que estou a tolerar que já não está alinhado comigo?", "Que parte de mim precisa de mais presença esta semana?", "Que valor quero usar como bússola nos próximos dias?"],
      en: ["What am I tolerating that is no longer aligned with me?", "What part of me needs more presence this week?", "Which value do I want to use as a compass in the next few days?"]
    },
    extra: { type: "casulo" }
  },
  {
    id: "base-02",
    baseNumber: 2,
    phase: "lumen",
    status: "locked",
    title: { pt: "Banho de Luz", en: "Light Bath" },
    subtitle: { pt: "presente", en: "present moment" },
    intent: { pt: "primeira hipnose · limpeza do presente · ancoragem à voz", en: "first hypnotherapy session · present clearing · voice anchoring" },
    dateLabel: { pt: "semana 2", en: "week 2" },
    sessionMemory: {
      pt: ["EL1 · indução + floresta + santuário", "banho de luz · cabeça, garganta, peito, ventre", "escudo protector + sugestão pós-hipnótica", "gravação da sessão entregue à cliente"],
      en: ["EL1 · induction + forest + sanctuary", "light bath · head, throat, chest, womb/abdomen", "protective shield + post-hypnotic suggestion", "session recording delivered to the client"]
    },
    note: {
      pt: "Esta semana é de integração. Ouve a prática com calma e deixa o corpo assimilar o que foi trabalhado em sessão.",
      en: "This is an integration week. Listen calmly and let the body assimilate what was worked through in the session."
    },
    tasks: {
      pt: [{ title: "Ouvir a gravação", detail: "idealmente 3 vezes durante a semana", type: "áudio" }, { title: "Coerência cardíaca", detail: "5 minutos de manhã", type: "respiração" }, { title: "Journaling pós-sessão", detail: "escrever o que ficou mais presente", type: "diário" }],
      en: [{ title: "Listen to the recording", detail: "ideally 3 times during the week", type: "audio" }, { title: "Heart coherence", detail: "5 minutes in the morning", type: "breath" }, { title: "Post-session journaling", detail: "write what became most present", type: "journal" }]
    },
    audio: { title: { pt: "Banho de Luz", en: "Light Bath" }, detail: { pt: "gravação da sessão · Spotify", en: "session recording · Spotify" }, embedUrl: DEMO_SPOTIFY_EMBED },
    sensations: {
      pt: [{ title: "mais leveza", detail: "o corpo pode começar a largar tensão antiga" }, { title: "sono ou cansaço", detail: "integração profunda também consome energia" }, { title: "emoções soltas", detail: "deixa vir sem tentar controlar tudo" }],
      en: [{ title: "more lightness", detail: "the body may begin to release old tension" }, { title: "sleepiness or fatigue", detail: "deep integration also uses energy" }, { title: "loose emotions", detail: "let them come without trying to control everything" }]
    },
    journal: {
      pt: ["O que mudou no meu corpo depois desta sessão?", "Que pensamento repetitivo perdeu força?", "De que forma posso cuidar melhor de mim esta semana?"],
      en: ["What changed in my body after this session?", "Which repetitive thought lost strength?", "How can I take better care of myself this week?"]
    },
    extra: { type: "breath", title: { pt: "Coerência cardíaca", en: "Heart coherence" }, body: { pt: "Inspira durante 5 segundos. Expira durante 5 segundos. Repete por 5 minutos. O objectivo é devolver ritmo ao sistema nervoso.", en: "Inhale for 5 seconds. Exhale for 5 seconds. Repeat for 5 minutes. The aim is to restore rhythm to the nervous system." } }
  },
  {
    id: "base-03",
    baseNumber: 3,
    phase: "lumen",
    status: "locked",
    title: { pt: "Sala do Passado", en: "Room of the Past" },
    subtitle: { pt: "destraumatização", en: "de-traumatisation" },
    intent: { pt: "libertar o que foi acumulado ao longo de uma vida", en: "releasing what has been accumulated over time" },
    dateLabel: { pt: "semana 3", en: "week 3" },
    sessionMemory: {
      pt: ["EL2 · regressão ano a ano", "esfera de luz · guardar aprendizagem, libertar dor", "dissolução + sugestão pós-hipnótica"],
      en: ["EL2 · year-by-year regression", "sphere of light · keep learning, release pain", "dissolution + post-hypnotic suggestion"]
    },
    note: {
      pt: "Esta foi uma sessão de trabalho real e profundo. O teu subconsciente processou décadas de peso emocional. Nos próximos dias, descansa mais do que o habitual. Não precisas de perceber o que aconteceu — o trabalho já aconteceu. Estou aqui se precisares.",
      en: "This was a real and deep session. Your subconscious processed decades of emotional weight. Over the next few days, rest more than usual. You do not need to understand what happened — the work has already happened. I am here if you need me."
    },
    tasks: {
      pt: [{ title: "Ouvir Body Scan", detail: "regresso ao corpo · sobretudo à noite", type: "meditação" }, { title: "Descansar sem culpa", detail: "menos exigência, mais escuta", type: "corpo" }, { title: "Registar sonhos ou imagens", detail: "sem interpretar demais", type: "diário" }],
      en: [{ title: "Listen to Body Scan", detail: "return to the body · especially at night", type: "meditation" }, { title: "Rest without guilt", detail: "less pressure, more listening", type: "body" }, { title: "Record dreams or images", detail: "without over-interpreting", type: "journal" }]
    },
    audio: { title: { pt: "Body Scan", en: "Body Scan" }, detail: { pt: "regresso ao corpo · Spotify", en: "return to the body · Spotify" }, embedUrl: BODY_SCAN_SPOTIFY_EMBED },
    sensations: {
      pt: [{ title: "sonhos mais intensos", detail: "o inconsciente pode continuar a reorganizar informação" }, { title: "necessidade de silêncio", detail: "o corpo pede menos ruído externo" }, { title: "memórias soltas", detail: "não precisas de as agarrar" }],
      en: [{ title: "more intense dreams", detail: "the unconscious may continue reorganising information" }, { title: "need for silence", detail: "the body asks for less external noise" }, { title: "loose memories", detail: "you do not need to hold on to them" }]
    },
    journal: {
      pt: ["Que memória ou sensação ficou mais presente?", "O que o meu corpo me pediu esta semana?", "Que parte de mim precisa de segurança agora?"],
      en: ["Which memory or sensation stayed most present?", "What did my body ask of me this week?", "Which part of me needs safety now?"]
    },
    extra: { type: "integration", title: { pt: "Regresso ao presente", en: "Return to the present" }, body: { pt: "Em vez de analisares a linha do tempo, usa este extra para aterrar: 1 coisa que ficou mais leve, 1 sensação no corpo, 1 cuidado concreto para hoje.", en: "Instead of analysing the timeline, use this extra to land: 1 thing that feels lighter, 1 body sensation, 1 concrete act of care for today." } }
  },
  {
    id: "base-04",
    baseNumber: 4,
    phase: "lumen",
    status: "locked",
    title: { pt: "Corte de Cordões", en: "Cord Release" },
    subtitle: { pt: "origem", en: "origin" },
    intent: { pt: "devolver o que foi herdado e nunca pertenceu", en: "returning what was inherited but never belonged to you" },
    dateLabel: { pt: "semana 4", en: "week 4" },
    sessionMemory: {
      pt: ["EL3 · âncora de segurança somática", "devolução à mãe + pai + linhagem", "substituição simbólica"],
      en: ["EL3 · somatic safety anchor", "returning to mother + father + lineage", "symbolic replacement"]
    },
    note: {
      pt: "Esta semana devolveste o que nunca foi teu. Isso pode sentir-se de formas muito diferentes — mais leveza, mais distância, ou até uma saudade inesperada. Tudo é informação. Não precisas de fazer nada com isso. Só observa.",
      en: "This week you returned what was never yours. It may feel different in many ways — more lightness, more distance, or even an unexpected longing. Everything is information. You do not need to do anything with it. Just observe."
    },
    tasks: {
      pt: [{ title: "Prática · Devolver o Peso", detail: "enraizamento e limites internos · áudio a gravar", type: "prática" }, { title: "Escrever a carta simbólica", detail: "mãe, pai, cuidadores ou companheiro(a) · não é para enviar", type: "diário" }, { title: "Observar relações de origem", detail: "sem entrar em confronto", type: "observação" }],
      en: [{ title: "Practice · Returning the Weight", detail: "grounding and inner boundaries · audio to record", type: "practice" }, { title: "Write the symbolic letter", detail: "not to be sent", type: "journal" }, { title: "Observe origin relationships", detail: "without entering confrontation", type: "observation" }]
    },
    audio: null,
    sensations: {
      pt: [
        { title: "necessidade de contactar os pais — ou o oposto", detail: "ambas podem ser respostas saudáveis ao trabalho feito — não há resposta certa" },
        { title: "distância tranquila que antes seria impossível", detail: "o que mudou não é a relação — é o peso que carregavas nela" },
        { title: "tristeza limpa, sem rancor", detail: "o reconhecimento do que foi é diferente do sofrimento que estava antes" },
        { title: "sensação de mais espaço interior", detail: "o espaço onde estava o peso que devolveste está agora disponível para ti" },
        { title: "mudanças subtis em padrões relacionais repetitivos", detail: "o que foi libertado nas origens começa a reorganizar-se nas relações actuais" }
      ],
      en: [
        { title: "needing to contact your parents — or the opposite", detail: "both can be healthy responses to the work done — there is no right answer" },
        { title: "a calm distance that would have felt impossible before", detail: "what changed is not necessarily the relationship — it is the weight you carried in it" },
        { title: "clean sadness, without resentment", detail: "recognising what happened is different from the suffering that was there before" },
        { title: "a sense of more inner space", detail: "the space where the returned weight used to live is now available to you" },
        { title: "subtle changes in repetitive relational patterns", detail: "what was released at the origin begins to reorganise in present relationships" }
      ]
    },
    journal: {
      pt: ["Ao pensares nos teus pais esta semana — o que notaste de diferente?", "O que carregavas que percebeste que não era teu?", "O que preencheu o espaço que ficou livre?"],
      en: ["When thinking about your parents this week — what did you notice differently?", "What were you carrying that you realised was not yours?", "What filled the space that became free?"]
    },
    extra: { type: "letter", title: { pt: "Carta simbólica", en: "Symbolic letter" }, body: { pt: "Esta carta pode ser dirigida à mãe, ao pai, a cuidadores, à linhagem ou a um(a) companheiro(a), conforme o tema que ficou activo. Escreve como se estivesses a devolver um peso. Começa por: ‘Eu devolvo-te o que não é meu carregar...’. Não envies. No fim, rasga, guarda ou queima em segurança, conforme fizer sentido para ti.", en: "This letter can be addressed to the mother, father, caregivers, lineage or a partner, depending on the theme that is active. Write as if you were returning a weight. Begin with: ‘I return to you what is not mine to carry...’. Do not send it. At the end, tear it, keep it, or safely burn it, depending on what feels right." } }
  },
  {
    id: "base-05",
    baseNumber: 5,
    phase: "lumen",
    status: "locked",
    title: { pt: "Amor Incondicional", en: "Unconditional Love" },
    subtitle: { pt: "futuro", en: "future" },
    intent: { pt: "fechar o passado relacional · instalar a identidade nova", en: "closing the relational past · installing a new identity" },
    dateLabel: { pt: "semana 5", en: "week 5" },
    sessionMemory: {
      pt: ["EL4 · perdão com compaixão — pai, mãe, self", "pausa de 90s · auto-perdão em silêncio", "sala do futuro · fusão com a identidade nova"],
      en: ["EL4 · forgiveness with compassion — father, mother, self", "90-second pause · silent self-forgiveness", "future room · fusion with the new identity"]
    },
    note: {
      pt: "Esta semana fecha um ciclo por dentro. Não precisas de provar que mudaste. Repara apenas nos pequenos sinais de mais ternura, escolha e presença.",
      en: "This week closes an inner cycle. You do not need to prove that you have changed. Simply notice small signs of more tenderness, choice and presence."
    },
    tasks: {
      pt: [{ title: "Prática · Amor que Integra", detail: "integração profunda · áudio a gravar", type: "prática" }, { title: "Carta à versão antiga", detail: "despedida simbólica", type: "diário" }, { title: "Escolha da nova identidade", detail: "uma acção pequena e concreta", type: "acção" }],
      en: [{ title: "Practice · Love that Integrates", detail: "deep integration · audio to record", type: "practice" }, { title: "Letter to the old version", detail: "symbolic goodbye", type: "journal" }, { title: "New identity choice", detail: "one small concrete action", type: "action" }]
    },
    audio: null,
    sensations: {
      pt: [{ title: "mais ternura por ti", detail: "o auto-perdão abre espaço interno" }, { title: "emoções contraditórias", detail: "podes sentir leveza e luto ao mesmo tempo" }, { title: "vislumbre de futuro", detail: "a mente começa a imaginar uma versão mais livre" }],
      en: [{ title: "more tenderness towards yourself", detail: "self-forgiveness opens inner space" }, { title: "contradictory emotions", detail: "you may feel lightness and grief at the same time" }, { title: "a glimpse of future", detail: "the mind begins to imagine a freer version" }]
    },
    journal: {
      pt: ["Que versão antiga posso despedir com respeito?", "O que começo a sentir que já não preciso de repetir?", "Que pequena escolha representa a minha nova identidade?"],
      en: ["Which old version can I say goodbye to with respect?", "What do I begin to feel I no longer need to repeat?", "Which small choice represents my new identity?"]
    },
    extra: { type: "identity", title: { pt: "Nova identidade", en: "New identity" }, body: { pt: "Escolhe uma frase simples que começa por: ‘Eu agora escolho...’. Depois transforma-a numa acção pequena para esta semana.", en: "Choose a simple sentence beginning with: ‘I now choose...’. Then turn it into one small action for this week." } }
  },
  {
    id: "base-06",
    baseNumber: 6,
    phase: "integration",
    status: "locked",
    title: { pt: "Integração", en: "Integration" },
    subtitle: { pt: "tapping e orientação", en: "tapping and guidance" },
    intent: { pt: "integrar · regular · transformar emoção em escolha", en: "integrate · regulate · turn emotion into choice" },
    dateLabel: { pt: "semana 6", en: "week 6" },
    sessionMemory: {
      pt: ["check-in · o que mudou, o que ainda resiste", "introdução ao tapping · explicação + prática", "orientação para a fase seguinte"],
      en: ["check-in · what changed, what still resists", "introduction to tapping · explanation + practice", "orientation for the next phase"]
    },
    note: {
      pt: "Esta semana usamos o corpo como porta de entrada. Primeiro regulas. Depois escolhes. O objectivo não é controlar tudo, é criares mais espaço interno antes de reagir.",
      en: "This week we use the body as the doorway. First you regulate. Then you choose. The aim is not to control everything, but to create more inner space before reacting."
    },
    tasks: {
      pt: [{ title: "Prática · Regular Primeiro", detail: "voltar ao corpo · áudio a gravar", type: "prática" }, { title: "Fazer tapping", detail: "5 rondas · avaliar intensidade antes e depois", type: "EFT" }, { title: "Usar a frase central", detail: "apesar de (...), eu aceito-me e amo-me incondicionalmente", type: "prática" }, { title: "Journaling de integração", detail: "responder às 3 perguntas", type: "diário" }],
      en: [{ title: "Practice · Regulate First", detail: "return to the body · audio to record", type: "practice" }, { title: "Do tapping", detail: "5 rounds · rate intensity before and after", type: "EFT" }, { title: "Use the core phrase", detail: "even though (...), I deeply and completely accept and love myself", type: "practice" }, { title: "Integration journaling", detail: "answer the 3 questions", type: "journal" }]
    },
    audio: null,
    sensations: {
      pt: [{ title: "emoção a descer", detail: "o corpo começa a perceber que há uma saída" }, { title: "mais contacto com o corpo", detail: "podes sentir zonas que antes estavam desligadas" }, { title: "clareza depois da prática", detail: "regular primeiro, decidir depois" }],
      en: [{ title: "emotion settling", detail: "the body begins to understand that there is a way through" }, { title: "more body contact", detail: "you may feel areas that were previously disconnected" }, { title: "clarity after practice", detail: "regulate first, decide later" }]
    },
    journal: {
      pt: ["Onde ainda sinto resistência?", "Que frase resume melhor o que estou a atravessar?", "Que escolha pequena posso fazer a partir de mais amor próprio?"],
      en: ["Where do I still feel resistance?", "Which sentence best describes what I am going through?", "Which small choice can I make from more self-love?"]
    },
    extra: { type: "tapping", title: { pt: "Tapping", en: "Tapping" }, body: { pt: "Escolhe um tema específico e avalia a intensidade da emoção de 0 a 10. Usa a frase: ‘Apesar de (...), eu aceito-me e amo-me incondicionalmente’. Faz 5 rondas pelos 9 pontos e volta a avaliar. Se quiseres, podes continuar até a intensidade baixar.", en: "Choose one specific theme and rate the intensity of the emotion from 0 to 10. Use the phrase: ‘Even though (...), I deeply and completely accept and love myself’. Do 5 rounds through the 9 points and rate again. If you want, continue until the intensity decreases." } }
  },
  {
    id: "base-07",
    baseNumber: 7,
    phase: "deep",
    status: "locked",
    title: { pt: "Crenças", en: "Beliefs" },
    subtitle: { pt: "8 modelos determinantes", en: "8 core models" },
    intent: { pt: "8 modelos de crenças determinantes · resiliência", en: "8 determining belief models · resilience" },
    dateLabel: { pt: "semana 7", en: "week 7" },
    sessionMemory: { pt: ["EL6 · hipnose · 8 MCDs", "autocontrolo, autoconfiança, resiliência", "empatia, optimismo, sentido de vida"], en: ["EL6 · hypnotherapy · 8 models", "self-control, self-confidence, resilience", "empathy, optimism, meaning"] },
    note: { pt: "Esta sessão trouxe consciência às crenças que estruturam a tua forma de te veres e de veres o mundo. Esta semana é para observar com curiosidade, perceber o que já está pronto para se reorganizar e reconhecer os recursos que já existem em ti.", en: "This session brought awareness to the beliefs that structure the way you see yourself and the world. This week is about observing with curiosity, noticing what is ready to reorganise and recognising the resources that already exist within you." },
    tasks: { pt: [{ title: "Prática · Crenças", detail: "crenças e resiliência · áudio a gravar", type: "prática" }, { title: "Quiz das 8 áreas", detail: "slider 1 a 10", type: "quiz" }, { title: "Identificar crença dominante", detail: "a que mais condiciona escolhas", type: "diário" }], en: [{ title: "Practice · Beliefs", detail: "beliefs and resilience · audio to record", type: "practice" }, { title: "8-area quiz", detail: "slider 1 to 10", type: "quiz" }, { title: "Identify dominant belief", detail: "the one shaping choices the most", type: "journal" }] },
    audio: null,
    sensations: { pt: [{ title: "mais consciência", detail: "começas a ouvir a frase interna que comanda o padrão" }], en: [{ title: "more awareness", detail: "you begin to hear the inner sentence driving the pattern" }] },
    journal: { pt: ["Que crença me limita mais neste momento?", "De onde parece vir esta crença?", "Que crença nova seria mais verdadeira para mim?"], en: ["Which belief limits me most right now?", "Where does this belief seem to come from?", "Which new belief would be more true for me?"] },
    extra: { type: "quiz", title: { pt: "8 Áreas de Resiliência", en: "8 Areas of Resilience" }, body: { pt: "Avalia de 1 a 10: autocontrolo, autoconfiança, resiliência, empatia, optimismo, sentido de vida, autonomia e segurança interna.", en: "Rate from 1 to 10: self-control, self-confidence, resilience, empathy, optimism, meaning, autonomy and inner safety." } }
  },
  {
    id: "base-08",
    baseNumber: 8,
    phase: "deep",
    status: "locked",
    title: { pt: "Criança Interior", en: "Inner Child" },
    subtitle: { pt: "partes internas", en: "inner parts" },
    intent: { pt: "integração das partes · libertar emoções enterradas", en: "integrating parts · releasing buried emotions" },
    dateLabel: { pt: "semana 8", en: "week 8" },
    sessionMemory: { pt: ["EL7 · sala de cura · crianças interiores", "contacto com as diferentes partes emocionais", "integração · o adulto que cuida de todas"], en: ["EL7 · healing room · inner children", "contact with different emotional parts", "integration · the adult who cares for all of them"] },
    note: { pt: "Esta semana é para te aproximares das partes de ti que precisavam de mais amor, presença e segurança. Faz o exercício com gentileza, como falarias com uma criança que merece ser vista, escutada e protegida.", en: "This week is about coming closer to the parts of you that needed more love, presence and safety. Do the exercise gently, as you would speak to a child who deserves to be seen, heard and protected." },
    tasks: { pt: [{ title: "Ouvir a meditação", detail: "criança interior", type: "meditação" }, { title: "A Criança e a Adulta", detail: "identificar necessidade e resposta interna", type: "integração" }, { title: "Cuidar de forma concreta", detail: "uma acção pequena esta semana", type: "acção" }], en: [{ title: "Listen to the meditation", detail: "inner child", type: "meditation" }, { title: "The Child and the Adult", detail: "identify need and inner response", type: "integration" }, { title: "Care in a concrete way", detail: "one small action this week", type: "action" }] },
    audio: { title: { pt: "Cura da Criança Interior", en: "Inner Child Healing" }, detail: { pt: "meditação guiada · Spotify", en: "guided meditation · Spotify" }, embedUrl: INNER_CHILD_SPOTIFY_EMBED },
    sensations: { pt: [{ title: "ternura e tristeza", detail: "quando olhas para ti com mais verdade" }], en: [{ title: "tenderness and sadness", detail: "when you look at yourself with more truth" }] },
    journal: { pt: ["Que parte pequena de mim apareceu nesta sessão?", "O que esta parte tentava proteger?", "Que frase ela precisava de ter ouvido de uma adulta segura?"], en: ["Which younger part of me appeared in this session?", "What was this part trying to protect?", "Which sentence did she need to hear from a safe adult?"] },
    extra: { type: "innerchild", title: { pt: "A Criança e a Adulta", en: "The Child and the Adult" }, body: { pt: "Coloca uma foto tua em criança, se fizer sentido. Olha para ela com presença, identifica a necessidade que esta parte traz e responde-lhe a partir da adulta interna.", en: "Add a childhood photo if it feels right. Look at it with presence, identify the need this part carries and respond from your inner adult." } }
  },
  {
    id: "base-09",
    baseNumber: 9,
    phase: "deep",
    status: "locked",
    title: { pt: "Desenvolvimento", en: "Development" },
    subtitle: { pt: "continuidade", en: "continuity" },
    intent: { pt: "fases psicossociais · integração · continuidade", en: "psychosocial phases · integration · continuity" },
    dateLabel: { pt: "semana 9", en: "week 9" },
    sessionMemory: { pt: ["EL8 · fases Erikson + Freud", "confiança, autonomia, iniciativa, identidade", "superação adaptativa dos conflitos latentes"], en: ["EL8 · Erikson + Freud phases", "trust, autonomy, initiative, identity", "adaptive resolution of latent conflicts"] },
    note: { pt: "Esta semana organiza a continuidade. Pode ser o fim de um ciclo, ou apenas uma nova etapa. O objectivo é saíres com mais estrutura interna para continuares a liderar a tua vida.", en: "This week organises continuity. It may be the end of a cycle, or simply a new stage. The goal is to leave with more inner structure to keep leading your life." },
    tasks: { pt: [{ title: "Reavaliar o casulo", detail: "comparar ponto de partida e ponto actual", type: "casulo" }, { title: "Escrever a carta à nova fase", detail: "quem sou agora, o que levo, o que deixo para trás", type: "carta" }, { title: "Identificar sinais de desalinhamento", detail: "como sei que estou a sair de mim", type: "consciência" }, { title: "Escolher ferramentas de continuidade", detail: "ROSE · regular · escrever · escolher", type: "plano" }], en: [{ title: "Reassess the cocoon", detail: "compare starting point and current point", type: "cocoon" }, { title: "Write the letter to the new phase", detail: "who I am now, what I carry, what I leave behind", type: "letter" }, { title: "Identify signs of misalignment", detail: "how I know I am moving away from myself", type: "awareness" }, { title: "Choose continuity tools", detail: "ROSE · regulate · write · choose", type: "plan" }] },
    audio: null,
    sensations: { pt: [{ title: "orgulho calmo", detail: "reconhecer o caminho sem dramatizar" }], en: [{ title: "quiet pride", detail: "recognising the path without dramatising" }] },
    journal: { pt: ["O que hoje já não carrego da mesma forma?", "Como percebo que estou a voltar ao automático?", "Que estrutura interna quero proteger nos próximos 30 dias?"], en: ["What do I no longer carry in the same way?", "How do I notice I am returning to autopilot?", "Which inner structure do I want to protect for the next 30 days?"] },
    extra: { type: "continuity", title: { pt: "Plano de Continuidade", en: "Continuity Plan" }, body: { pt: "Define a tua estrutura para os próximos 30 dias: uma âncora para regular, uma para escrever, uma escolha concreta para manter o alinhamento e uma carta à nova fase que começa agora.", en: "Define your structure for the next 30 days: one anchor to regulate, one to write, one concrete choice to keep alignment and a letter to the new phase that begins now." } }
  }
];

const REENCONTRO_SESSION = {
  id: "reconnect-00",
  baseNumber: 0,
  navCode: { pt: "REENCONTRO", en: "RECONNECT" },
  timelineCode: "R0",
  phase: "integration",
  status: "current",
  title: { pt: "Ponto de Reencontro", en: "Reconnect Point" },
  subtitle: { pt: "onde estou agora", en: "where am I now" },
  intent: { pt: "localizar o caminho feito · rever valores · escolher a próxima porta", en: "locate the path covered · review values · choose the next door" },
  dateLabel: { pt: "sessão de reencontro", en: "reconnect session" },
  sessionMemory: {
    pt: ["casulo digital · ponto actual", "GPS interno · os 3 espelhos", "o que já foi trabalhado", "próxima porta terapêutica"],
    en: ["digital cocoon · current point", "inner GPS · the 3 mirrors", "what has already been worked on", "next therapeutic door"]
  },
  note: {
    pt: "Esta semana é para organizar o que já mudou, o que ainda pede cuidado e qual é a próxima porta do teu processo.",
    en: "This week is here to organise what has already changed, what still needs care and what the next door of your process may be."
  },
  tasks: {
    pt: [
      { title: "Preencher o casulo de hoje", detail: "avaliar as 12 áreas como estão agora", type: "casulo" },
      { title: "Rever o GPS interno", detail: "os 3 espelhos continuam ou precisam de ajuste?", type: "valores" },
      { title: "Escrever o novo foco", detail: "o que pede atenção neste ciclo", type: "diário" },
      { title: "Prática de regulação", detail: "coerência cardíaca ou meditação indicada", type: "prática" }
    ],
    en: [
      { title: "Fill in today’s cocoon", detail: "rate the 12 areas as they are now", type: "cocoon" },
      { title: "Review the inner GPS", detail: "do the 3 mirrors remain or need adjustment?", type: "values" },
      { title: "Write the new focus", detail: "what needs attention in this cycle", type: "journal" },
      { title: "Regulation practice", detail: "heart coherence or the indicated meditation", type: "practice" }
    ]
  },
  audio: {
    title: { pt: "Banho de Luz", en: "Light Bath" },
    detail: { pt: "áudio de regulação e ancoragem à voz · Spotify", en: "regulation and voice anchoring audio · Spotify" },
    embedUrl: DEMO_SPOTIFY_EMBED
  },
  sensations: {
    pt: [
      { title: "clareza sem recomeçar do zero", detail: "o trabalho anterior continua a contar" },
      { title: "necessidade de reorganização", detail: "quando mudas, o mapa também precisa de ser actualizado" },
      { title: "mais escolha", detail: "a próxima fase deve nascer do que está vivo agora" }
    ],
    en: [
      { title: "clarity without starting from zero", detail: "the previous work still counts" },
      { title: "need for reorganisation", detail: "when you change, the map also needs updating" },
      { title: "more choice", detail: "the next phase should come from what is alive now" }
    ]
  },
  journal: {
    pt: ["Onde estou hoje em relação a quando comecei este processo?", "O que mudou em mim — e o que ainda quer mudar?", "Que tema pede agora mais verdade, cuidado ou estrutura?"],
    en: ["Where am I today compared with when this process began?", "What has changed in me — and what still wants to change?", "Which theme now asks for more truth, care or structure?"]
  },
  extra: {
    type: "reconnect",
    title: { pt: "Casulo + GPS Interno", en: "Cocoon + Inner GPS" },
    body: { pt: "Este reencontro junta o ponto actual da tua vida com os valores que te orientam. A partir daqui, a próxima porta deixa de ser automática e passa a ser escolhida.", en: "This reconnect point brings together the current state of your life and the values that guide you. From here, the next door is no longer automatic; it is chosen." },
    worked: {
      pt: ["regulação emocional", "hipnoterapia e integração", "crenças e padrões", "limites internos", "relação com o corpo"],
      en: ["emotional regulation", "hypnotherapy and integration", "beliefs and patterns", "inner boundaries", "relationship with the body"]
    },
    activeNow: {
      pt: ["actualizar o mapa interno", "perceber o que está vivo agora", "escolher a próxima porta terapêutica"],
      en: ["update the inner map", "understand what is alive now", "choose the next therapeutic door"]
    },
    nextDoor: {
      pt: "A próxima porta será escolhida pela Daniela conforme o que surgir no reencontro: integração, regulação, criança interior, crenças, ROSE ou uma semana emergente.",
      en: "The next door will be chosen by Daniela according to what emerges in the reconnect session: integration, regulation, inner child, beliefs, ROSE or an emergent week."
    }
  }
};

const CONTINUITY_INTEGRATION = {
  id: "follow-01",
  baseNumber: 1,
  navCode: { pt: "INT · 01", en: "INT · 01" },
  timelineCode: "I1",
  phase: "integration",
  status: "locked",
  title: { pt: "Integração Actual", en: "Current Integration" },
  subtitle: { pt: "semana personalizada", en: "custom week" },
  intent: { pt: "dar estrutura ao que ficou activo no reencontro", en: "give structure to what became active in the reconnect session" },
  dateLabel: { pt: "a definir", en: "to be defined" },
  sessionMemory: { pt: ["nota personalizada", "prática indicada", "diário guiado"], en: ["personal note", "indicated practice", "guided journal"] },
  note: { pt: "Esta semana será desenhada conforme o que aparecer no Ponto de Reencontro.", en: "This week will be designed according to what appears in the Reconnect Point." },
  tasks: { pt: [{ title: "Prática indicada", detail: "a definir pela Daniela", type: "prática" }], en: [{ title: "Indicated practice", detail: "to be defined by Daniela", type: "practice" }] },
  audio: null,
  sensations: { pt: [{ title: "semana personalizada", detail: "o conteúdo será ajustado ao processo" }], en: [{ title: "custom week", detail: "content will be adjusted to the process" }] },
  journal: { pt: ["O que ficou mais activo depois do reencontro?"], en: ["What became most active after the reconnect session?"] },
  extra: { type: "default", title: { pt: "Acompanhamento", en: "Follow-up" }, body: { pt: "Espaço reservado para uma semana personalizada.", en: "Reserved space for a custom week." } }
};

const NEW_CLIENT_SESSIONS = METHOD_SESSIONS.map((session, index) => ({
  ...session,
  status: index === 0 ? "current" : "locked"
}));


function copySession(session, overrides = {}) {
  return { ...session, ...overrides };
}

const SOFIA_SESSIONS = [
  copySession(METHOD_SESSIONS[0], {
    status: "done",
    dateLabel: { pt: "29 abril", en: "29 April" },
    note: {
      pt: "Nesta primeira sessão desenhámos o teu ponto de partida. O foco foi olhar para a tua vida com clareza, identificar a área que pede mais crescimento e começar a criar uma estrutura interna que te apoie.",
      en: "In this first session we drew your starting point. The focus was to look at your life with clarity, identify the area asking for more growth and begin creating an inner structure that supports you."
    },
    tasks: {
      pt: [
        { title: "Rever o Casulo", detail: "observa o teu ponto de partida com gentileza", type: "casulo" },
        { title: "Ancorar o GPS interno", detail: "confiança · bondade · amor próprio", type: "valores" },
        { title: "Dar nome à mente faladora", detail: "perceber quando ela aparece", type: "consciência" }
      ],
      en: [
        { title: "Review the Cocoon", detail: "observe your starting point with kindness", type: "cocoon" },
        { title: "Anchor the inner GPS", detail: "trust · kindness · self-love", type: "values" },
        { title: "Name the talking mind", detail: "notice when it appears", type: "awareness" }
      ]
    },
    journal: {
      pt: ["Que área da minha vida pede mais desenvolvimento neste momento?", "Que parte de mim precisa de mais confiança?", "Como posso praticar amor próprio de forma simples esta semana?"],
      en: ["Which area of my life asks for more development right now?", "Which part of me needs more trust?", "How can I practise self-love simply this week?"]
    }
  }),
  copySession(METHOD_SESSIONS[1], {
    status: "done",
    dateLabel: { pt: "6 maio", en: "6 May" },
    note: {
      pt: "Esta semana ancoraste a tua primeira prática de hipnoterapia deste percurso. O mais importante é reconheceres que parar um padrão também é amor próprio em acção.",
      en: "This week you anchored the first hypnotherapy practice of this path. The most important part is recognising that stopping a pattern is also self-love in action."
    },
    tasks: {
      pt: [
        { title: "Ouvir Banho de Luz", detail: "usar a prática como âncora de segurança", type: "áudio" },
        { title: "Voltar aos valores", detail: "confiança · bondade · amor próprio", type: "valores" },
        { title: "Registar uma escolha de cuidado", detail: "uma atitude pequena que mostre amor próprio", type: "diário" }
      ],
      en: [
        { title: "Listen to Light Bath", detail: "use the practice as a safety anchor", type: "audio" },
        { title: "Return to the values", detail: "trust · kindness · self-love", type: "values" },
        { title: "Record one care choice", detail: "one small attitude that shows self-love", type: "journal" }
      ]
    },
    journal: {
      pt: ["O que ficou mais calmo em mim depois desta sessão?", "Que escolha recente mostra que estou a cuidar de mim?", "Como posso falar comigo com mais bondade esta semana?"],
      en: ["What became calmer in me after this session?", "Which recent choice shows I am taking care of myself?", "How can I speak to myself with more kindness this week?"]
    }
  }),
  copySession(METHOD_SESSIONS[2], {
    status: "done",
    dateLabel: { pt: "13 maio", en: "13 May" }
  }),
  copySession(METHOD_SESSIONS[3], {
    status: "done",
    dateLabel: { pt: "20 maio", en: "20 May" }
  }),
  {
    id: "sofia-05-integracao",
    baseNumber: 5,
    navCode: { pt: "S · 05", en: "S · 05" },
    timelineCode: "S5",
    phase: "integration",
    status: "done",
    title: { pt: "Integração", en: "Integration" },
    subtitle: { pt: "preparar as férias", en: "preparing the holidays" },
    intent: { pt: "criar estrutura externa para apoiar estabilidade interna", en: "creating external structure to support inner stability" },
    dateLabel: { pt: "27 maio", en: "27 May" },
    sessionMemory: {
      pt: ["check-in de integração", "estrutura para as férias", "rotina de cuidado", "escolhas que apoiam estabilidade"],
      en: ["integration check-in", "holiday structure", "care routine", "choices that support stability"]
    },
    note: {
      pt: "Esta semana foi sobre preparação. Quando tens mais estrutura por fora, o teu sistema interno sente mais segurança para atravessar mudanças, férias e dias com menos rotina.",
      en: "This week was about preparation. When there is more structure outside, your inner system feels safer through changes, holidays and days with less routine."
    },
    tasks: {
      pt: [
        { title: "Criar calendário simples", detail: "organizar os dias com leveza e clareza", type: "estrutura" },
        { title: "Escolher práticas de cuidado", detail: "o que me ajuda a sentir-me estável", type: "cuidado" },
        { title: "Check-in 0 a 10", detail: "perceber como estou antes de decidir", type: "consciência" }
      ],
      en: [
        { title: "Create a simple calendar", detail: "organise the days with lightness and clarity", type: "structure" },
        { title: "Choose care practices", detail: "what helps me feel stable", type: "care" },
        { title: "0 to 10 check-in", detail: "notice where I am before deciding", type: "awareness" }
      ]
    },
    audio: null,
    sensations: {
      pt: [
        { title: "mais previsibilidade", detail: "a estrutura ajuda o corpo a antecipar o dia com menos tensão" },
        { title: "mais autonomia", detail: "começas a perceber que podes escolher pequenos cuidados" },
        { title: "mais clareza", detail: "saber o plano reduz ruído mental" }
      ],
      en: [
        { title: "more predictability", detail: "structure helps the body anticipate the day with less tension" },
        { title: "more autonomy", detail: "you begin to see that you can choose small acts of care" },
        { title: "more clarity", detail: "knowing the plan reduces mental noise" }
      ]
    },
    journal: {
      pt: ["Que tipo de estrutura me ajuda a sentir mais segura?", "Que prática simples posso manter mesmo fora da rotina?", "Que escolha me aproxima dos meus valores esta semana?"],
      en: ["What kind of structure helps me feel safer?", "Which simple practice can I keep even outside my routine?", "Which choice brings me closer to my values this week?"]
    },
    extra: { type: "integration", title: { pt: "Plano leve para férias", en: "Light holiday plan" }, body: { pt: "Escolhe 3 âncoras simples para os próximos dias: uma prática para regular, uma actividade que te nutre e uma pessoa ou lugar que te faz bem.", en: "Choose 3 simple anchors for the next few days: one practice to regulate, one activity that nourishes you and one person or place that feels good." } }
  },
  copySession(METHOD_SESSIONS[4], {
    id: "sofia-06-amor",
    baseNumber: 6,
    navCode: { pt: "S · 06", en: "S · 06" },
    timelineCode: "S6",
    status: "current",
    dateLabel: { pt: "3 junho", en: "3 June" },
    title: { pt: "Amor Incondicional", en: "Unconditional Love" },
    subtitle: { pt: "futuro", en: "future" },
    note: {
      pt: "Esta semana trabalhámos uma parte muito bonita do teu processo: reconhecer o que já podes largar e começar a aproximar-te da versão de ti que escolhe com mais amor próprio, confiança e bondade.",
      en: "This week we worked on a very beautiful part of your process: recognising what you can already release and beginning to move closer to the version of you that chooses with more self-love, trust and kindness."
    },
    tasks: {
      pt: [
        { title: "Integrar a sessão", detail: "dar tempo ao corpo para assimilar", type: "integração" },
        { title: "Carta à versão antiga", detail: "despedida simbólica, sem julgamento", type: "diário" },
        { title: "Uma escolha de amor próprio", detail: "pequena, concreta e possível", type: "acção" }
      ],
      en: [
        { title: "Integrate the session", detail: "give the body time to assimilate", type: "integration" },
        { title: "Letter to the old version", detail: "symbolic goodbye, without judgement", type: "journal" },
        { title: "One self-love choice", detail: "small, concrete and possible", type: "action" }
      ]
    },
    journal: {
      pt: ["Que parte antiga de mim posso despedir com carinho?", "Que valor quero praticar nos próximos dias?", "Que escolha pequena representa mais amor próprio para mim agora?"],
      en: ["Which old part of me can I say goodbye to with care?", "Which value do I want to practise over the next few days?", "Which small choice represents more self-love for me now?"]
    }
  }),
  copySession(METHOD_SESSIONS[6], {
    status: "locked",
    navCode: { pt: "S · 07", en: "S · 07" },
    timelineCode: "S7"
  }),
  copySession(METHOD_SESSIONS[7], {
    status: "locked",
    navCode: { pt: "S · 08", en: "S · 08" },
    timelineCode: "S8"
  }),
  copySession(METHOD_SESSIONS[8], {
    status: "locked",
    navCode: { pt: "S · 09", en: "S · 09" },
    timelineCode: "S9"
  })
];

const CONTINUITY_CLIENT_SESSIONS = [
  REENCONTRO_SESSION,
  CONTINUITY_INTEGRATION
];

const CLIENTS = [
  {
    id: "sofia-new-demo",
    slug: "sofia",
    code: "sofia-001",
    mode: "new",
    entry: "base9",
    name: { pt: "Sofia", en: "Sofia" },
    initials: "sf",
    values: { pt: ["Confiança", "Bondade", "Amor Próprio"], en: ["Trust", "Kindness", "Self-Love"] },
    activeSessionId: "sofia-06-amor",
    sessions: SOFIA_SESSIONS
  }
];

const INNER_PATH_DATA = {
  brand: {
    name: "inner.architecture®",
    product: "inner.path™",
    subtitle: { pt: "o teu espaço entre sessões", en: "your space between sessions" }
  },
  app: {
    version: "v0.15",
    defaultLanguage: "pt",
    defaultClientId: "sofia-new-demo",
    previewLockedSessions: false
  },
  phases: PHASES,
  ui: UI_TEXT,
  casuloAreas: CASULO_AREAS,
  clients: CLIENTS
};
