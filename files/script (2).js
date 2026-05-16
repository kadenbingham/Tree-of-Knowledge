/* =============================================
   EtymRoot — script.js
   Etymology search engine with local word database
   ============================================= */

'use strict';

/* ================================================================
   WORD DATABASE
   Each entry: id, word, phonetic, pos (part of speech), definition,
   etymology (array of timeline steps), related (array), funFact
   ================================================================ */
const WORDS = {

  forest: {
    word: 'forest',
    phonetic: '/ˈfɒrɪst/',
    pos: 'noun',
    definition: 'A large area of land covered with trees and undergrowth.',
    etymology: [
      {
        era: 'Modern English · 14th century',
        root: 'forest',
        meaning: 'A large expanse of woodland; royal hunting ground.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old French · 10th–14th century',
        root: 'forest',
        meaning: 'An unenclosed woodland, especially one preserved for hunting by the king.',
        lang: 'Old French',
        type: 'french',
      },
      {
        era: 'Medieval Latin · 8th century',
        root: 'forestis silva',
        meaning: 'Literally "the outside woods" — woodland outside the enclosed park walls.',
        lang: 'Medieval Latin',
        type: 'latin',
      },
      {
        era: 'Classical Latin',
        root: 'foris',
        meaning: '"Outside, out of doors." The root signals wildness beyond civilized enclosures.',
        lang: 'Latin',
        type: 'latin',
      },
    ],
    related: ['sylvan', 'arboreal', 'sylviculture', 'deforest', 'forester'],
    funFact: 'In medieval England, a "forest" was a legal term — royal land where the king hunted, enforced by harsh "forest law." You could be executed for poaching a deer. The trees were almost secondary.',
  },

  philosophy: {
    word: 'philosophy',
    phonetic: '/fɪˈlɒsəfi/',
    pos: 'noun',
    definition: 'The study of fundamental questions about existence, knowledge, ethics, reason, and the nature of reality.',
    etymology: [
      {
        era: 'Modern English · 14th century',
        root: 'philosophy',
        meaning: 'The love and pursuit of wisdom; rational investigation of truths.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old French · 12th century',
        root: 'filosofie',
        meaning: 'Knowledge, wisdom; introduced via scholars translating Arabic texts.',
        lang: 'Old French',
        type: 'french',
      },
      {
        era: 'Latin · Classical period',
        root: 'philosophia',
        meaning: 'Borrowed directly from Greek into Latin with no change of meaning.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Ancient Greek · 6th century BCE',
        root: 'φιλοσοφία (philosophia)',
        meaning: '"Love of wisdom" — from philo- (loving) + sophia (wisdom, skill).',
        lang: 'Ancient Greek',
        type: 'greek',
      },
      {
        era: 'Proto-Indo-European',
        root: '*bʰiHleh₂-',
        meaning: 'Root meaning "to love, cherish." Same ancestry as the Latin word "filius" (son).',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['philosopher', 'sophia', 'philology', 'philharmonic', 'sophomore'],
    funFact: 'The word "sophomore" literally means "wise fool" — from Greek sophos (wise) + moros (foolish). A fitting description of second-year students everywhere.',
  },

  companion: {
    word: 'companion',
    phonetic: '/kəmˈpænjən/',
    pos: 'noun',
    definition: 'A person who accompanies or spends time with another; a fellow traveller or associate.',
    etymology: [
      {
        era: 'Modern English · 13th century',
        root: 'companion',
        meaning: 'One who accompanies another; a friend or associate.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old French · 12th century',
        root: 'compaignon',
        meaning: 'Fellow, comrade — one who eats with you.',
        lang: 'Old French',
        type: 'french',
      },
      {
        era: 'Vulgar Latin',
        root: '*companio',
        meaning: '"Bread-sharer" — from com- (with, together) + panis (bread).',
        lang: 'Vulgar Latin',
        type: 'latin',
      },
      {
        era: 'Classical Latin',
        root: 'panis',
        meaning: '"Bread." The deepest social bond was sharing food at the same table.',
        lang: 'Latin',
        type: 'latin',
      },
    ],
    related: ['company', 'accompany', 'pantry', 'comrade', 'fellowship'],
    funFact: 'The word "companion" shares its root with "pantry" (where bread is kept) and "appanage" (a lord's provisioning). Friendship, etymologically, begins with sharing bread.',
  },

  disaster: {
    word: 'disaster',
    phonetic: '/dɪˈzɑːstər/',
    pos: 'noun',
    definition: 'A sudden, catastrophic event causing great damage or suffering; a complete failure.',
    etymology: [
      {
        era: 'Modern English · 16th century',
        root: 'disaster',
        meaning: 'A great misfortune; a calamitous event. The word entered through Italian explorers and poets.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Middle French · 15th century',
        root: 'désastre',
        meaning: 'Great calamity, misfortune — literally "bad star."',
        lang: 'Middle French',
        type: 'french',
      },
      {
        era: 'Italian · 14th century',
        root: 'disastro',
        meaning: '"Evil star influence" — from dis- (away, against) + astro (star).',
        lang: 'Italian',
        type: 'other',
      },
      {
        era: 'Latin & Greek',
        root: 'astrum / ἄστρον',
        meaning: '"Star." Medieval people believed that catastrophes were caused by malign star alignments — so a disaster was literally when your star went wrong.',
        lang: 'Latin / Greek',
        type: 'latin',
      },
    ],
    related: ['astronomy', 'astrology', 'asterisk', 'aster', 'disastrous'],
    funFact: '"Ill-starred", "disaster", "consider" (from com + sidus, "star"), and "desire" (de + sidus — "away from one\'s star") all reveal how deeply Renaissance Europeans believed the stars ruled fate.',
  },

  muscle: {
    word: 'muscle',
    phonetic: '/ˈmʌs(ə)l/',
    pos: 'noun',
    definition: 'A band of fibrous tissue in the body that can contract to produce movement.',
    etymology: [
      {
        era: 'Modern English · 15th century',
        root: 'muscle',
        meaning: 'Contractile tissue of the body; later also "strength, brawn."',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Middle French',
        root: 'muscle',
        meaning: 'The body tissue; borrowed from Latin anatomical vocabulary.',
        lang: 'Middle French',
        type: 'french',
      },
      {
        era: 'Latin · Classical period',
        root: 'musculus',
        meaning: '"Little mouse." Romans thought a muscle flexing under skin looked like a mouse moving under a cloth. Musculus also meant the mussel shellfish.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Proto-Indo-European',
        root: '*mūs-',
        meaning: '"Mouse." Same root gives us "mouse" (the animal), "mussel" (the shellfish), and "muscle."',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['mussel', 'mouse', 'musk', 'muscular', 'musculature'],
    funFact: 'Mouse, mussel, and muscle are all the same Latin word — musculus. Ancient anatomists saw flexing arm muscles as little mice running under the skin. The humble mouse shaped how we name the body.',
  },

  salary: {
    word: 'salary',
    phonetic: '/ˈsæləri/',
    pos: 'noun',
    definition: 'A fixed regular payment for employment, typically paid monthly.',
    etymology: [
      {
        era: 'Modern English · 14th century',
        root: 'salary',
        meaning: 'Regular payment for work done, paid at fixed intervals.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Anglo-Norman French',
        root: 'salarie',
        meaning: 'Wages, payment for services rendered.',
        lang: 'Anglo-Norman',
        type: 'french',
      },
      {
        era: 'Latin · Classical period',
        root: 'salarium',
        meaning: '"Salt money" — the allowance given to Roman soldiers to purchase salt, an essential and expensive commodity.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Latin root',
        root: 'sal',
        meaning: '"Salt." Whether soldiers were literally paid in salt or merely given money for it is debated — but the word salarium is unambiguous.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Proto-Indo-European',
        root: '*séh₂ls',
        meaning: '"Salt." The same root gives Greek halos (salt), producing words like halogen, halite, and halcyon.',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['salt', 'salsa', 'sauce', 'salami', 'halogen', 'halite'],
    funFact: 'A person "worth their salt" is worth their salary. Salary, salsa, sauce, and salami all come from the Latin sal. Salt was once so valuable that "salary" is its monument — we are still, metaphorically, paid in salt.',
  },

  window: {
    word: 'window',
    phonetic: '/ˈwɪndəʊ/',
    pos: 'noun',
    definition: 'An opening in a wall or roof fitted with glass or other transparent material.',
    etymology: [
      {
        era: 'Modern English · 13th century',
        root: 'window',
        meaning: 'A glazed opening in a wall to admit light and air.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old Norse · 12th century',
        root: 'vindauga',
        meaning: '"Wind eye" — from vindr (wind) + auga (eye). Viking settlers brought this word to England.',
        lang: 'Old Norse',
        type: 'other',
      },
      {
        era: 'Proto-Germanic',
        root: '*windaz + *augô',
        meaning: '"Wind" + "eye." The window was conceived as a hole in the wall that let the breath of air in — the building\'s eye.',
        lang: 'Proto-Germanic',
        type: 'germanic',
      },
    ],
    related: ['wind', 'air', 'fenestration', 'windfall', 'windowsill'],
    funFact: 'The Latin word for window was "fenestra," surviving in "fenestration" and in French "fenêtre." But the Viking word vindauga entirely displaced the Latin in English. Architecture and history in one pane.',
  },

  paradise: {
    word: 'paradise',
    phonetic: '/ˈpærədaɪs/',
    pos: 'noun',
    definition: 'A place of ideal happiness and delight; in religious context, Heaven.',
    etymology: [
      {
        era: 'Modern English · 13th century',
        root: 'paradise',
        meaning: 'Heaven; an ideal or perfect place or state.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old French',
        root: 'paradis',
        meaning: 'The Garden of Eden; Heaven; a walled garden.',
        lang: 'Old French',
        type: 'french',
      },
      {
        era: 'Latin · Ecclesiastical',
        root: 'paradisus',
        meaning: 'Garden of Eden; park, pleasure ground. Used in the Latin Bible.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Greek',
        root: 'παράδεισος (paradeisos)',
        meaning: '"Enclosed park, orchard." Alexander the Great\'s soldiers brought this Persian word back to the Greek world.',
        lang: 'Ancient Greek',
        type: 'greek',
      },
      {
        era: 'Old Iranian / Avestan',
        root: 'pairi-daēza',
        meaning: '"Around-wall" — pairi (around) + daēza (wall). A walled royal garden or hunting park.',
        lang: 'Avestan',
        type: 'pie',
      },
    ],
    related: ['park', 'garden', 'paradise-bird', 'Farsi', 'Avestan'],
    funFact: 'Paradise began as a Persian royal garden — a walled, irrigated enclosure of trees and animals in a dry landscape. It journeyed through Greek, Latin, French, and Hebrew scripture before arriving as our vision of Heaven.',
  },

  serendipity: {
    word: 'serendipity',
    phonetic: '/ˌsɛrənˈdɪpɪti/',
    pos: 'noun',
    definition: 'The occurrence of fortunate events by chance; happy, unexpected discoveries.',
    etymology: [
      {
        era: 'Modern English · 1754',
        root: 'serendipity',
        meaning: 'Coined by Horace Walpole in a letter: "happy accidents and sagacity." A deliberately invented word with an ancient story behind it.',
        lang: 'English (neologism)',
        type: 'modern',
      },
      {
        era: 'Persian fairytale · 12th century',
        root: 'Serendip',
        meaning: 'The Old Persian name for Sri Lanka (from Sanskrit Siṃhaladvīpa). Walpole coined the word from a Persian tale, "The Three Princes of Serendip," whose heroes made clever discoveries by accident.',
        lang: 'Persian / Arabic',
        type: 'other',
      },
      {
        era: 'Sanskrit',
        root: 'Siṃhaladvīpa',
        meaning: '"Island of the Sinhala people" — the ancient name of Sri Lanka, from which Arabic Sarandīb, and thus "Serendip," derives.',
        lang: 'Sanskrit',
        type: 'pie',
      },
    ],
    related: ['chance', 'fortuitous', 'happenstance', 'serendipitous', 'luck'],
    funFact: '"Serendipity" was voted one of the hardest English words to translate. In 2004 it topped a British list of the most beautiful English words. It is one of the few words traceable to an exact moment and letter of creation.',
  },

  school: {
    word: 'school',
    phonetic: '/skuːl/',
    pos: 'noun',
    definition: 'An institution for educating children; a place of learning.',
    etymology: [
      {
        era: 'Modern English · Old English',
        root: 'scōl',
        meaning: 'A place of learning; originally referring to debates and lectures.',
        lang: 'Old English',
        type: 'modern',
      },
      {
        era: 'Latin · Classical period',
        root: 'schola',
        meaning: 'Discussion, lecture, school — borrowed from Greek.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Ancient Greek',
        root: 'σχολή (skholē)',
        meaning: '"Leisure, rest, ease; that in which leisure is employed." School was what the free man did with his free time — leisure turned toward learning.',
        lang: 'Ancient Greek',
        type: 'greek',
      },
    ],
    related: ['scholar', 'scholastic', 'leisure', 'academic', 'gymnasium'],
    funFact: 'School literally meant "leisure" in ancient Greek. Only free men with time to spare could attend. The concept of compulsory childhood schooling — school as work — is a very modern inversion of the original meaning.',
  },

  alcohol: {
    word: 'alcohol',
    phonetic: '/ˈælkəhɒl/',
    pos: 'noun',
    definition: 'A colorless volatile flammable liquid; the intoxicating agent in fermented drinks.',
    etymology: [
      {
        era: 'Modern English · 16th century',
        root: 'alcohol',
        meaning: 'Originally referred to a fine powder (kohl for the eyes), then any distilled essence, then specifically distilled spirits.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Medieval Latin · 12th century',
        root: 'alcohol',
        meaning: 'A very fine powder or essence; used by alchemists for any sublimated or highly refined substance.',
        lang: 'Medieval Latin',
        type: 'latin',
      },
      {
        era: 'Arabic · medieval period',
        root: 'al-kuḥl (الكحل)',
        meaning: '"The kohl" — a finely powdered antimony sulfide used as eye cosmetic. Al- is the Arabic definite article.',
        lang: 'Arabic',
        type: 'other',
      },
    ],
    related: ['alchemy', 'algebra', 'alkali', 'elixir', 'distillation'],
    funFact: 'Alcohol began as eye makeup. Arab alchemists used al-kuḥl (kohl) to describe any finely purified powder. European alchemists borrowed the word for purified essences, and eventually for the spirit distilled from wine — "alcohol of wine."',
  },

  algebra: {
    word: 'algebra',
    phonetic: '/ˈældʒɪbrə/',
    pos: 'noun',
    definition: 'The branch of mathematics dealing with symbols and the rules for manipulating those symbols.',
    etymology: [
      {
        era: 'Modern English · 16th century',
        root: 'algebra',
        meaning: 'The mathematical discipline; adopted from Latin translations of Arabic mathematical treatises.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Medieval Latin · 12th century',
        root: 'algebra',
        meaning: 'Transliterated directly from Arabic into Latin by scholars in Toledo, Spain.',
        lang: 'Medieval Latin',
        type: 'latin',
      },
      {
        era: 'Arabic · 9th century',
        root: 'al-jabr (الجبر)',
        meaning: '"The reunion of broken parts" — from the title of al-Khwarizmi\'s treatise "Al-Kitab al-mukhtasar fi hisab al-jabr wal-muqabala" (The Compendious Book on Calculation by Completion and Balancing).',
        lang: 'Arabic',
        type: 'other',
      },
    ],
    related: ['algorithm', 'al-Khwarizmi', 'calculus', 'arithmetic', 'equation'],
    funFact: 'The word "algorithm" comes from the Latinized name of the same mathematician — al-Khwarizmi. Both algebra and algorithm are monuments to one 9th-century Persian scholar from the House of Wisdom in Baghdad.',
  },

  candidate: {
    word: 'candidate',
    phonetic: '/ˈkændɪdət/',
    pos: 'noun',
    definition: 'A person who applies for a job or is nominated for election.',
    etymology: [
      {
        era: 'Modern English · 17th century',
        root: 'candidate',
        meaning: 'One who seeks election or office; one put forward for a position.',
        lang: 'English',
        type: 'modern',
      },
      {
        era: 'Latin · Classical period',
        root: 'candidatus',
        meaning: '"Clothed in white" — from candidus (white, gleaming). Roman men seeking political office wore a toga whitened with chalk to signal purity and fitness for public life.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Latin root',
        root: 'candere',
        meaning: '"To shine, to glow white." The same root gives candid, candle, incandescent, and Candide.',
        lang: 'Latin',
        type: 'latin',
      },
    ],
    related: ['candid', 'candle', 'incandescent', 'candor', 'chandelier'],
    funFact: 'Roman election candidates literally wore bleached-white togas (toga candida) to stand out in crowds and signal moral purity. "Candid" (honest, open) shares the same root — whiteness as a metaphor for transparency.',
  },

  clue: {
    word: 'clue',
    phonetic: '/kluː/',
    pos: 'noun',
    definition: 'A fact or piece of evidence that helps solve a mystery or problem.',
    etymology: [
      {
        era: 'Modern English · 17th century',
        root: 'clue',
        meaning: 'A fact guiding one through a mystery; originally spelled "clew."',
        lang: 'English',
        type: 'modern',
      },
      {
        era: 'Middle English',
        root: 'clew',
        meaning: 'A ball of yarn or thread. From the myth of Theseus: Ariadne gave him a ball of thread to trail through the labyrinth so he could find his way out after killing the Minotaur.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old English',
        root: 'cliwen / cleowen',
        meaning: 'A rounded mass; a ball of yarn.',
        lang: 'Old English',
        type: 'germanic',
      },
      {
        era: 'Proto-Germanic',
        root: '*klīwją',
        meaning: 'A rounded object, ball. Related to "clew" used in sailing — a corner of a sail.',
        lang: 'Proto-Germanic',
        type: 'pie',
      },
    ],
    related: ['labyrinth', 'thread', 'clew', 'Ariadne', 'maze'],
    funFact: 'Every detective clue is a tiny echo of the Minotaur\'s labyrinth. When Theseus followed Ariadne\'s thread back out of the maze, the English language never forgot: a clue is still a thread you follow through darkness.',
  },

  daisy: {
    word: 'daisy',
    phonetic: '/ˈdeɪzi/',
    pos: 'noun',
    definition: 'A small wildflower with a yellow center and white petals.',
    etymology: [
      {
        era: 'Modern English',
        root: 'daisy',
        meaning: 'The common wildflower; also used in phrases like "fresh as a daisy."',
        lang: 'English',
        type: 'modern',
      },
      {
        era: 'Middle English · 12th century',
        root: 'dayesye',
        meaning: 'Contraction of "day\'s eye" — the flower that opens with the sun and closes at dusk.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old English',
        root: 'dæges ēage',
        meaning: '"Day\'s eye" — dæg (day) + ēage (eye). The sun itself was called the "eye of day."',
        lang: 'Old English',
        type: 'germanic',
      },
    ],
    related: ['eye', 'day', 'sunflower', 'heliotrope', 'marigold'],
    funFact: 'Chaucer called the daisy "eye of the day" and wrote an entire poem in its honor, the "Legend of Good Women." The flower opens and closes its petals with daylight, behaving exactly like an eye responding to light.',
  },

  disaster: {
    word: 'disaster',
    phonetic: '/dɪˈzɑːstər/',
    pos: 'noun',
    definition: 'A sudden, catastrophic event causing great damage or suffering; a complete failure.',
    etymology: [
      {
        era: 'Modern English · 16th century',
        root: 'disaster',
        meaning: 'A great misfortune; a calamitous event. The word entered through Italian explorers and poets.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Middle French · 15th century',
        root: 'désastre',
        meaning: 'Great calamity, misfortune — literally "bad star."',
        lang: 'Middle French',
        type: 'french',
      },
      {
        era: 'Italian · 14th century',
        root: 'disastro',
        meaning: '"Evil star influence" — from dis- (away, against) + astro (star).',
        lang: 'Italian',
        type: 'other',
      },
      {
        era: 'Latin & Greek',
        root: 'astrum / ἄστρον',
        meaning: '"Star." Medieval people believed that catastrophes were caused by malign star alignments — so a disaster was literally when your star went wrong.',
        lang: 'Latin / Greek',
        type: 'latin',
      },
    ],
    related: ['astronomy', 'astrology', 'asterisk', 'aster', 'disastrous'],
    funFact: '"Ill-starred", "disaster", "consider" (from com + sidus, "star"), and "desire" (de + sidus — "away from one\'s star") all reveal how deeply Renaissance Europeans believed the stars ruled fate.',
  },

  dunce: {
    word: 'dunce',
    phonetic: '/dʌns/',
    pos: 'noun',
    definition: 'A person who is slow at learning; a stupid person.',
    etymology: [
      {
        era: 'Modern English · 16th century',
        root: 'dunce',
        meaning: 'A dull, stupid person; someone incapable of learning. Derived as an insult from a scholar\'s name.',
        lang: 'English',
        type: 'modern',
      },
      {
        era: 'Middle English · 16th century',
        root: 'Duns man / Dunce',
        meaning: 'A follower of John Duns Scotus, the medieval philosopher. His supporters (Scotists) were mocked by Renaissance humanists as hair-splitting, obstinate, and resistant to new learning.',
        lang: 'English',
        type: 'modern',
      },
      {
        era: 'Origin: proper name · c. 1266–1308',
        root: 'John Duns Scotus',
        meaning: 'Born in Duns, Scotland. One of the most important medieval theologians. His name became synonymous with stupidity only through the contempt of his opponents.',
        lang: 'Latin (scholarly)',
        type: 'latin',
      },
    ],
    related: ['fool', 'dullard', 'blockhead', 'scholastic', 'Scotism'],
    funFact: 'John Duns Scotus was brilliant enough to earn the title "Doctor Subtilis" (the Subtle Doctor). The dunce cap is his monument — a pointed cap his followers wore as a symbol of focused thought, later inverted into mockery by their enemies.',
  },

  electricity: {
    word: 'electricity',
    phonetic: '/ɪˌlɛkˈtrɪsɪti/',
    pos: 'noun',
    definition: 'A form of energy resulting from the movement of charged particles; electric current.',
    etymology: [
      {
        era: 'Modern English · 17th century',
        root: 'electricity',
        meaning: 'Coined by William Gilbert in 1600 to describe the attractive force of amber when rubbed.',
        lang: 'New Latin / English',
        type: 'modern',
      },
      {
        era: 'New Latin · 1600',
        root: 'electricus',
        meaning: '"Amber-like, producing static charge like amber." From the property of amber to attract light objects when rubbed.',
        lang: 'New Latin',
        type: 'latin',
      },
      {
        era: 'Ancient Greek',
        root: 'ἤλεκτρον (ēlektron)',
        meaning: '"Amber." The Greeks observed that rubbed amber attracted feathers and dust. The same word also meant "a pale gold alloy" due to color similarity.',
        lang: 'Ancient Greek',
        type: 'greek',
      },
    ],
    related: ['electron', 'electrum', 'amber', 'electromagnetic', 'electrode'],
    funFact: 'Electricity is named after a tree resin. The ancient Greeks called amber ēlektron, and noticed it crackled and attracted things when rubbed. Every electron, electrode, and electric eel carries the ghost of fossilized tree sap.',
  },

  focus: {
    word: 'focus',
    phonetic: '/ˈfəʊkəs/',
    pos: 'noun',
    definition: 'The center of interest or activity; the point at which rays converge.',
    etymology: [
      {
        era: 'Modern English · 17th century',
        root: 'focus',
        meaning: 'Introduced by the astronomer Johannes Kepler in 1604 for the point where light rays converge in a lens.',
        lang: 'New Latin',
        type: 'modern',
      },
      {
        era: 'Latin · Classical period',
        root: 'focus',
        meaning: '"Hearth, fireplace, home fire." The hearth was the burning center of Roman domestic life.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Proto-Indo-European',
        root: '*bʰewg-',
        meaning: '"To shine, gleam." Related to the idea of a glowing, burning center point.',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['focal', 'foyer', 'fuel', 'fuse', 'hearth'],
    funFact: 'Kepler borrowed "focus" from the Latin word for hearth because light rays converging in a lens reminded him of heat rays converging at a fireplace. Your concentration and a Roman family\'s cooking fire share the same word.',
  },

  galaxy: {
    word: 'galaxy',
    phonetic: '/ˈɡæləksi/',
    pos: 'noun',
    definition: 'A system of millions or billions of stars, held together by gravity.',
    etymology: [
      {
        era: 'Modern English · 14th century',
        root: 'galaxy',
        meaning: 'First used specifically for the Milky Way, later extended to all stellar systems.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Medieval Latin',
        root: 'galaxia / galaxias',
        meaning: 'The Milky Way — borrowed from Greek astronomical vocabulary.',
        lang: 'Medieval Latin',
        type: 'latin',
      },
      {
        era: 'Ancient Greek',
        root: 'γαλαξίας κύκλος (galaxias kyklos)',
        meaning: '"Milky circle" — from gala (milk). The Greeks saw the Milky Way as a river of spilt milk across the sky.',
        lang: 'Ancient Greek',
        type: 'greek',
      },
      {
        era: 'Proto-Indo-European',
        root: '*glakt- / *melg-',
        meaning: '"Milk." The same root gives Latin lac (lactose, galaxy) and English milk.',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['lactose', 'Milky Way', 'galactic', 'lactate', 'lacto-'],
    funFact: 'Galaxy, lactose, and the Latin "lac" (milk) all come from the same ancient root for milk. The Milky Way is literally named for breast milk — Greek myth said it was milk spilt from Hera\'s breast as she nursed Heracles.',
  },

  gossip: {
    word: 'gossip',
    phonetic: '/ˈɡɒsɪp/',
    pos: 'noun',
    definition: 'Casual conversation or unverified reports about other people\'s private affairs.',
    etymology: [
      {
        era: 'Modern English · 16th century',
        root: 'gossip',
        meaning: 'Idle talk, rumor about others. The shift from "godparent" to "chatter" happened through the association of godparents gathering and talking at christenings.',
        lang: 'English',
        type: 'modern',
      },
      {
        era: 'Middle English · 12th century',
        root: 'godsib',
        meaning: '"God-sibling" — a godparent. Godsib was a spiritually related person, a sponsor at baptism, considered kin.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old English',
        root: 'godsibb',
        meaning: 'God (God) + sibb (related, akin). A person spiritually related through the sacrament of baptism.',
        lang: 'Old English',
        type: 'germanic',
      },
    ],
    related: ['sibling', 'god', 'kinship', 'sponsor', 'baptism'],
    funFact: 'A gossip was once an honor — your child\'s godparent, a trusted spiritual family member. Because godparents gathered and chatted at christenings, the word drifted from "intimate companion" to "idle talker." The same drift gave us "sibling" — once just "related person."',
  },

  hazard: {
    word: 'hazard',
    phonetic: '/ˈhæzəd/',
    pos: 'noun',
    definition: 'A danger or risk; something likely to cause harm.',
    etymology: [
      {
        era: 'Modern English · 14th century',
        root: 'hazard',
        meaning: 'Risk, danger, chance — especially the risk in games of dice.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old French · 13th century',
        root: 'hasard',
        meaning: 'A dice game of chance; the risk of losing at such a game.',
        lang: 'Old French',
        type: 'french',
      },
      {
        era: 'Spanish · medieval',
        root: 'azar',
        meaning: 'An unlucky throw of the dice; bad luck. Brought to Europe via Islamic Spain.',
        lang: 'Spanish',
        type: 'other',
      },
      {
        era: 'Arabic',
        root: 'az-zahr (الزهر)',
        meaning: '"The die" (singular of dice). The Islamic world preserved and transmitted dice games from Persia and India into medieval Europe.',
        lang: 'Arabic',
        type: 'other',
      },
    ],
    related: ['risk', 'chance', 'jeopardy', 'peril', 'venture'],
    funFact: 'Every workplace "hazard" sign traces back to an Arabic dice game. The word traveled from Arab traders to Spanish gamblers to French courts to English law. Risk and chance — the dice have always been at the center.',
  },

  humble: {
    word: 'humble',
    phonetic: '/ˈhʌmb(ə)l/',
    pos: 'adjective',
    definition: 'Having a modest or low opinion of one\'s importance; not proud or arrogant.',
    etymology: [
      {
        era: 'Modern English · 13th century',
        root: 'humble',
        meaning: 'Modest, meek; low in condition or rank.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old French · 12th century',
        root: 'humble',
        meaning: 'Meek, submissive; of low social rank.',
        lang: 'Old French',
        type: 'french',
      },
      {
        era: 'Latin · Classical period',
        root: 'humilis',
        meaning: '"Low, grounded" — from humus (earth, ground, soil). Humble literally means "close to the ground."',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Proto-Indo-European',
        root: '*dhghem-',
        meaning: '"Earth." The same root gives human, humus, exhume, chameleon (ground-lion), and the element name "chthonic."',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['human', 'humus', 'humiliate', 'exhume', 'chameleon'],
    funFact: 'Humble, human, humus, and humiliate all come from the same Latin root for earth and soil. To be humble is to be earthy — literally grounded. Even "chameleon" is from Greek khamai (on the ground) + leon (lion).',
  },

  infant: {
    word: 'infant',
    phonetic: '/ˈɪnfənt/',
    pos: 'noun',
    definition: 'A very young child or baby.',
    etymology: [
      {
        era: 'Modern English · 14th century',
        root: 'infant',
        meaning: 'A young child; in law, a minor under the age of majority.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old French',
        root: 'enfant',
        meaning: 'A child; also a young knight or page. French keeps this sense — "enfant" is still the ordinary word for child.',
        lang: 'Old French',
        type: 'french',
      },
      {
        era: 'Latin · Classical period',
        root: 'infans',
        meaning: '"Not speaking" — in- (not) + fans, present participle of fari (to speak). An infant is literally one who cannot yet speak.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Proto-Indo-European',
        root: '*bʰeh₂-',
        meaning: '"To speak, say." The same root gives fame, fate (what is spoken by the gods), fable, confess, and infant.',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['infantry', 'fable', 'fate', 'fame', 'confess', 'profess'],
    funFact: 'Infantry (foot soldiers) and infant share the same root: medieval Italian "infante" meant a young man, a foot-soldier too junior to be a knight. The foot-soldier and the baby both carry the mark of being too young to speak.',
  },

  journal: {
    word: 'journal',
    phonetic: '/ˈdʒɜːn(ə)l/',
    pos: 'noun',
    definition: 'A daily record of events or personal reflections; a newspaper or periodical.',
    etymology: [
      {
        era: 'Modern English · 14th century',
        root: 'journal',
        meaning: 'A daily record; a book in which daily transactions are recorded; a newspaper.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old French · 13th century',
        root: 'journal',
        meaning: '"Daily" — used as an adjective before becoming a noun for a daily record.',
        lang: 'Old French',
        type: 'french',
      },
      {
        era: 'Latin · Classical period',
        root: 'diurnalis',
        meaning: '"Of the day, daily" — from dies (day). The same root gives diary, diurnal, and via French: journey (a day\'s travel).',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Proto-Indo-European',
        root: '*dyew-',
        meaning: '"To shine, sky, day." The same root gives Zeus, Jupiter, deity, divine, and Tuesday (Tiw\'s day).',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['journey', 'diary', 'diurnal', 'sojourn', 'adjourn', 'Jupiter'],
    funFact: 'Journal, journey, diary, and adjourn are all the same root: dies (day). A journey was originally a day\'s travel distance. To adjourn is to put off to another day. Zeus and Jupiter are the shining-sky god — the sky that marks the days.',
  },

  karma: {
    word: 'karma',
    phonetic: '/ˈkɑːmə/',
    pos: 'noun',
    definition: 'The sum of a person\'s actions, seen as influencing their future fate; destiny or fate in general.',
    etymology: [
      {
        era: 'Modern English · 19th century',
        root: 'karma',
        meaning: 'Adopted from Hindu and Buddhist philosophy. In popular use: the idea that good deeds return as good fortune.',
        lang: 'English (borrowed)',
        type: 'modern',
      },
      {
        era: 'Sanskrit · ancient',
        root: 'karma (कर्म)',
        meaning: '"Action, deed, work." In Hindu and Buddhist cosmology: the moral law of cause and effect across lifetimes.',
        lang: 'Sanskrit',
        type: 'other',
      },
      {
        era: 'Proto-Indo-European',
        root: '*kʷer-',
        meaning: '"To make, do." The same root gives Sanskrit kriya (action, ritual practice) and Greek praxis (action, practice).',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['dharma', 'samsara', 'nirvana', 'yoga', 'praxis'],
    funFact: 'Karma and the Greek "praxis" — as in "practical," "malpractice," and "pragmatic" — come from the same ancient root meaning "to do." Eastern karma and Western pragmatism are cousins separated by thousands of miles and years.',
  },

  labyrinth: {
    word: 'labyrinth',
    phonetic: '/ˈlæbərɪnθ/',
    pos: 'noun',
    definition: 'A complicated irregular network of passages; a maze.',
    etymology: [
      {
        era: 'Modern English · 16th century',
        root: 'labyrinth',
        meaning: 'An intricate structure of passages; any bewildering complexity.',
        lang: 'English',
        type: 'modern',
      },
      {
        era: 'Latin',
        root: 'labyrinthus',
        meaning: 'The maze of Crete, built by Daedalus to contain the Minotaur.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Ancient Greek',
        root: 'λαβύρινθος (labyrinthos)',
        meaning: 'Possibly from pre-Greek Minoan labrys (double-headed axe) — the symbol of the Cretan palace at Knossos. The labyrinth may literally mean "house of the double axe."',
        lang: 'Ancient Greek / Minoan',
        type: 'greek',
      },
    ],
    related: ['maze', 'Minotaur', 'Daedalus', 'Ariadne', 'Knossos', 'clue'],
    funFact: 'The labyrinth may be one of the oldest non-Greek words in the Greek language — a survival from the pre-Greek Minoan civilization of Crete. The double-axe symbol (labrys) was everywhere at the palace of Knossos, which may have inspired the myth of the maze beneath it.',
  },

  lunatic: {
    word: 'lunatic',
    phonetic: '/ˈluːnətɪk/',
    pos: 'adjective / noun',
    definition: 'A person who is mentally ill or erratic; wildly foolish.',
    etymology: [
      {
        era: 'Modern English · 13th century',
        root: 'lunatic',
        meaning: 'An insane person; someone whose madness was thought to fluctuate with the phases of the moon.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old French',
        root: 'lunatique',
        meaning: 'Mad, moon-struck.',
        lang: 'Old French',
        type: 'french',
      },
      {
        era: 'Latin · Classical period',
        root: 'lunaticus',
        meaning: '"Moon-struck" — from luna (moon). It was widely believed that madness waxed and waned with the lunar cycle.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Proto-Indo-European',
        root: '*leuk-',
        meaning: '"Light, shine." The root of luna, also gives light, lucid, illuminate, and the name Lucifer (light-bearer).',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['lunar', 'illuminate', 'lucid', 'Lucifer', 'translucent'],
    funFact: 'Lunatic, lucid, illuminate, and Lucifer all share one ancient root: light. The moon (luna) was the most powerful light in the night sky, and physicians from Hippocrates onward recorded how patients\' symptoms seemed to shift with its phases.',
  },

  marathon: {
    word: 'marathon',
    phonetic: '/ˈmærəθ(ə)n/',
    pos: 'noun',
    definition: 'A long-distance running race of 26.2 miles; any long, exhausting task.',
    etymology: [
      {
        era: 'Modern English · 19th century',
        root: 'marathon',
        meaning: 'Introduced as a race in the first modern Olympics (1896), named in honor of the legendary run.',
        lang: 'English',
        type: 'modern',
      },
      {
        era: 'Classical legend · 490 BCE',
        root: 'Pheidippides',
        meaning: 'A messenger said to have run from the battlefield of Marathon to Athens (about 40 km) to announce the Greek victory over Persia, then died on the spot. The story inspired the modern race.',
        lang: 'Greek (historical)',
        type: 'greek',
      },
      {
        era: 'Ancient Greek',
        root: 'Μαραθών (Marathōn)',
        meaning: 'The plain of Marathon, northeast of Athens. Possibly meaning "fennel field" — from marathos (fennel), which grew abundantly there.',
        lang: 'Ancient Greek',
        type: 'greek',
      },
    ],
    related: ['fennel', 'Athens', 'Olympics', 'Persia', 'stamina'],
    funFact: 'The modern marathon distance (26.2 miles) was fixed in 1908 when the London Olympics extended the course so the race could finish in front of the royal box. A herb — fennel — named both the battlefield and the endurance race that memorializes it.',
  },

  muscle: {
    word: 'muscle',
    phonetic: '/ˈmʌs(ə)l/',
    pos: 'noun',
    definition: 'A band of fibrous tissue in the body that can contract to produce movement.',
    etymology: [
      {
        era: 'Modern English · 15th century',
        root: 'muscle',
        meaning: 'Contractile tissue of the body; later also "strength, brawn."',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Middle French',
        root: 'muscle',
        meaning: 'The body tissue; borrowed from Latin anatomical vocabulary.',
        lang: 'Middle French',
        type: 'french',
      },
      {
        era: 'Latin · Classical period',
        root: 'musculus',
        meaning: '"Little mouse." Romans thought a muscle flexing under skin looked like a mouse moving under a cloth. Musculus also meant the mussel shellfish.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Proto-Indo-European',
        root: '*mūs-',
        meaning: '"Mouse." Same root gives us "mouse" (the animal), "mussel" (the shellfish), and "muscle."',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['mussel', 'mouse', 'musk', 'muscular', 'musculature'],
    funFact: 'Mouse, mussel, and muscle are all the same Latin word — musculus. Ancient anatomists saw flexing arm muscles as little mice running under the skin. The humble mouse shaped how we name the body.',
  },

  navigate: {
    word: 'navigate',
    phonetic: '/ˈnævɪɡeɪt/',
    pos: 'verb',
    definition: 'To plan and direct the route of a ship, aircraft, or other vehicle; to find one\'s way.',
    etymology: [
      {
        era: 'Modern English · 16th century',
        root: 'navigate',
        meaning: 'To steer a ship; to travel by sea; later extended to any directed travel or wayfinding.',
        lang: 'English',
        type: 'modern',
      },
      {
        era: 'Latin · Classical period',
        root: 'navigare',
        meaning: '"To sail" — from navis (ship) + agere (to drive, lead). To navigate is literally to drive a ship.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Proto-Indo-European',
        root: '*neh₂u-',
        meaning: '"Boat, ship." The same root gives Greek naus (ship), nautical, nausea (seasickness), astronaut, and the English word navy.',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['navy', 'nautical', 'nausea', 'astronaut', 'cosmonaut'],
    funFact: 'Nausea is literally seasickness — from Greek naus (ship). Astronaut means "star-sailor." Every time you feel queasy, or look up at the night sky, the ancient word for boat is quietly present.',
  },

  news: {
    word: 'news',
    phonetic: '/njuːz/',
    pos: 'noun',
    definition: 'Newly received information about recent events.',
    etymology: [
      {
        era: 'Modern English · 14th century',
        root: 'news',
        meaning: 'New information; tidings. Treated as plural in origin — "new things."',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Middle English',
        root: 'newes',
        meaning: 'Plural of "new" used as a noun — "new things, new matters." Modelled on French nouvelles and Latin nova.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Latin',
        root: 'nova',
        meaning: 'Neuter plural of novus (new). "Nova" in astronomy — a star that suddenly brightens — uses exactly this word.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Proto-Indo-European',
        root: '*néwo-',
        meaning: '"New." The root of new, novel, novice, innovate, neo-, neon (the newest element when discovered), and Nova.',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['novel', 'novice', 'innovate', 'nova', 'neo-', 'neon'],
    funFact: 'News is grammatically plural — it is "new things." This is why we say "the news is good" (treating the collection as singular) but older usage had "the news are." A newspaper headline and an exploding star share the root word nova.',
  },

  ocean: {
    word: 'ocean',
    phonetic: '/ˈəʊʃ(ə)n/',
    pos: 'noun',
    definition: 'A vast expanse of salt water covering most of the Earth\'s surface.',
    etymology: [
      {
        era: 'Modern English · 13th century',
        root: 'ocean',
        meaning: 'The great sea surrounding the known world; later any of the major bodies of salt water.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old French',
        root: 'occean',
        meaning: 'The great outer sea believed to encircle the world.',
        lang: 'Old French',
        type: 'french',
      },
      {
        era: 'Latin',
        root: 'oceanus',
        meaning: 'The great river encircling the earth, personified as the Titan Oceanus.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Ancient Greek',
        root: 'Ὠκεανός (Ōkeanos)',
        meaning: 'The divine personification of the world-river. Possibly from a pre-Greek word, origin uncertain. Some connect it to Sanskrit a-śayana ("resting place").',
        lang: 'Ancient Greek',
        type: 'greek',
      },
    ],
    related: ['Oceania', 'oceanic', 'Tethys', 'Poseidon', 'pelagic'],
    funFact: 'The ancient Greeks conceived the ocean not as a body of water but as a river — Oceanus — that flowed in a great ring around the flat disc of the world. The Titans who personified it predate the Olympian gods, suggesting the concept is almost as old as Greek mythology itself.',
  },

  palace: {
    word: 'palace',
    phonetic: '/ˈpæləs/',
    pos: 'noun',
    definition: 'A large, impressive building that is the official residence of a ruler or head of state.',
    etymology: [
      {
        era: 'Modern English · 13th century',
        root: 'palace',
        meaning: 'A royal or magnificent residence.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old French',
        root: 'palais',
        meaning: 'A royal court or residence; the seat of government.',
        lang: 'Old French',
        type: 'french',
      },
      {
        era: 'Latin · Classical period',
        root: 'Palatium',
        meaning: 'The Palatine Hill in Rome — one of the seven hills, where Augustus built his residence. All subsequent imperial residences were called "palatium" after it.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Origin: Roman geography',
        root: 'Mons Palatinus',
        meaning: 'The Palatine Hill, traditional founding place of Rome. Possibly named for the goddess Pales (protector of shepherds) or from palus (stake, palisade).',
        lang: 'Latin',
        type: 'latin',
      },
    ],
    related: ['palatial', 'Palatine', 'paladin', 'palazzo', 'Buckingham'],
    funFact: 'Every palace in every language traces its name to one hill in Rome. When Augustus built his home on the Palatine, no one could have predicted that the hill\'s name would become the generic word for royal residence in English, French, Spanish, Italian, German, and beyond.',
  },

  pupil: {
    word: 'pupil',
    phonetic: '/ˈpjuːpɪl/',
    pos: 'noun',
    definition: 'A student; also the dark circular opening in the center of the iris of the eye.',
    etymology: [
      {
        era: 'Modern English · 15th century',
        root: 'pupil',
        meaning: 'Both a student and the aperture of the eye — remarkably, both senses come from the same Latin word.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Latin · Classical period',
        root: 'pupilla',
        meaning: 'The pupil of the eye — literally "little doll." When you look into someone\'s eyes, you see a tiny reflection of yourself.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Latin · Classical period',
        root: 'pupillus / pupilla',
        meaning: 'An orphaned minor, a ward under a guardian. The "student" sense derives from this — a young person under a teacher\'s care.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Latin root',
        root: 'pupa',
        meaning: '"Girl, doll, puppet." The same root gives pupa (the insect stage), puppet, and puppy (a little doll-like dog).',
        lang: 'Latin',
        type: 'latin',
      },
    ],
    related: ['puppet', 'puppy', 'pupa', 'doll', 'ward'],
    funFact: 'The pupil of your eye is named "little doll" because of the tiny reflected image you see of yourself in another person\'s eye. Puppy, puppet, and pupa (a chrysalis — a creature wrapped like a doll) are the same word. You carry a doll inside your eye.',
  },

  quarantine: {
    word: 'quarantine',
    phonetic: '/ˈkwɒrəntiːn/',
    pos: 'noun',
    definition: 'A period of isolation imposed to prevent the spread of disease.',
    etymology: [
      {
        era: 'Modern English · 17th century',
        root: 'quarantine',
        meaning: 'A period of enforced isolation for ships or people arriving from plague-affected regions.',
        lang: 'English',
        type: 'modern',
      },
      {
        era: 'French',
        root: 'quarantaine',
        meaning: 'A period of forty days.',
        lang: 'French',
        type: 'french',
      },
      {
        era: 'Italian · 14th century',
        root: 'quarantina / quarantina giorni',
        meaning: '"Forty days" — Venice instituted a 40-day isolation period for ships arriving during the Black Death (1347). Ships anchored in the lagoon for quaranta giorni.',
        lang: 'Italian (Venetian)',
        type: 'other',
      },
      {
        era: 'Latin',
        root: 'quadraginta',
        meaning: '"Forty" — from quadra (four) + ginta (tens). Connected to Lent (quaresima, forty days) and the forty days Jesus spent in the wilderness.',
        lang: 'Latin',
        type: 'latin',
      },
    ],
    related: ['forty', 'Lent', 'Quadrant', 'quadrangle', 'squad'],
    funFact: 'Quarantine is forty in disguise. Venice chose forty days because of its biblical resonance — the Flood, the Exodus, Lent, Christ\'s fast. Medieval medicine and medieval theology agreed: forty days was the sacred number for endurance and purification.',
  },

  robot: {
    word: 'robot',
    phonetic: '/ˈrəʊbɒt/',
    pos: 'noun',
    definition: 'A machine capable of carrying out complex actions automatically; an autonomous mechanical agent.',
    etymology: [
      {
        era: 'Modern English · 1923',
        root: 'robot',
        meaning: 'Introduced to English from the Czech play R.U.R. (Rossum\'s Universal Robots) by Karel Čapek, which premiered in 1921.',
        lang: 'English (borrowed)',
        type: 'modern',
      },
      {
        era: 'Czech · 1920',
        root: 'robot',
        meaning: 'Coined by Karel Čapek (suggested by his brother Josef) from robota — forced labor, drudgery. The play featured artificial humans created to do all labor.',
        lang: 'Czech',
        type: 'other',
      },
      {
        era: 'Old Church Slavonic',
        root: 'rabota (работа)',
        meaning: '"Work, servitude, forced labor" — from rab (slave). The same root underlies the Russian word for work, rabota.',
        lang: 'Old Church Slavonic',
        type: 'other',
      },
      {
        era: 'Proto-Indo-European',
        root: '*orbho-',
        meaning: '"Orphan, one deprived of their parents" — originally connoting one forced to work due to having no family. The same root gives "orphan."',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['orphan', 'work', 'automaton', 'android', 'cyborg'],
    funFact: 'Robot and orphan share the same ancient root — a word for a child without parents, forced to labor. The first literary robots were explicitly enslaved workers. Every automated system and AI assistant carries this etymology of servitude in its name.',
  },

  sinister: {
    word: 'sinister',
    phonetic: '/ˈsɪnɪstə/',
    pos: 'adjective',
    definition: 'Giving the impression that something harmful or evil is happening; threatening.',
    etymology: [
      {
        era: 'Modern English · 15th century',
        root: 'sinister',
        meaning: 'Evil, villainous; suggesting bad intent. In heraldry, the left side of a shield.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Latin · Classical period',
        root: 'sinister',
        meaning: '"Left, on the left side." In Roman augury, birds seen on the left were unlucky omens — giving the left side its evil connotation.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Proto-Indo-European',
        root: '*sen-',
        meaning: 'Possibly related to a root meaning "this side, same side" or "better" — ironically, since the word took on such negative meaning.',
        lang: 'PIE',
        type: 'pie',
      },
    ],
    related: ['left', 'gauche', 'dexterous', 'ambidextrous', 'dexter'],
    funFact: 'Roman augurs faced north when reading omens. Birds on the right (east, toward the rising sun) were lucky — dexterous. Birds on the left (west, toward the setting sun) were sinister. Left-handedness was viewed as dangerous, strange, or unlucky in cultures from Rome to medieval Europe — a prejudice buried in the language.',
  },

  tragedy: {
    word: 'tragedy',
    phonetic: '/ˈtrædʒɪdi/',
    pos: 'noun',
    definition: 'An event causing great suffering and distress; a dramatic genre depicting such events.',
    etymology: [
      {
        era: 'Modern English · 14th century',
        root: 'tragedy',
        meaning: 'A serious drama with an unhappy ending; a terrible event in real life.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old French',
        root: 'tragédie',
        meaning: 'A play with a grave, disastrous ending.',
        lang: 'Old French',
        type: 'french',
      },
      {
        era: 'Latin',
        root: 'tragoedia',
        meaning: 'A tragic play; borrowed directly from Greek.',
        lang: 'Latin',
        type: 'latin',
      },
      {
        era: 'Ancient Greek · 5th century BCE',
        root: 'τραγῳδία (tragōidia)',
        meaning: '"Goat song" — from tragos (goat) + ōidē (song). The most debated etymology in classical scholarship: possibly because a goat was the prize, or because performers wore goat skins, or related to the cult of Dionysus.',
        lang: 'Ancient Greek',
        type: 'greek',
      },
    ],
    related: ['comedy', 'ode', 'drama', 'thespian', 'Dionysus', 'catharsis'],
    funFact: 'The greatest literary genre in Western culture may literally mean "goat song." Scholars have debated this for centuries. One theory: early actors wore goat skins in Dionysian rituals. Another: a goat was sacrificed or awarded as a prize. The goat refuses to be explained away.',
  },

  utopia: {
    word: 'utopia',
    phonetic: '/juːˈtəʊpɪə/',
    pos: 'noun',
    definition: 'An imagined perfect society or community; an ideal but impractical scheme.',
    etymology: [
      {
        era: 'Modern English · 16th century',
        root: 'utopia',
        meaning: 'An ideal, perfect place or state of society — now also implying an impossible ideal.',
        lang: 'English',
        type: 'modern',
      },
      {
        era: 'New Latin · 1516',
        root: 'Utopia',
        meaning: 'Coined by Sir Thomas More as the title of his book describing a fictional perfect island commonwealth.',
        lang: 'New Latin',
        type: 'latin',
      },
      {
        era: 'Ancient Greek (constructed)',
        root: 'οὐ (ou) + τόπος (topos)',
        meaning: '"No-place" — ou (not) + topos (place). More punned deliberately: "Utopia" sounds like "Eutopia" (good place) but actually means "nowhere." He was signaling from the start that the perfect society does not exist.',
        lang: 'Ancient Greek',
        type: 'greek',
      },
    ],
    related: ['dystopia', 'topology', 'topography', 'eutopia', 'nowhere'],
    funFact: 'Thomas More hid a joke in the title: Utopia sounds like "good place" (eu-topia) but means "no place" (ou-topia). He knew his readers\' Greek. Every idealistic social vision since 1516 carries a built-in admission that it doesn\'t exist.',
  },

  villain: {
    word: 'villain',
    phonetic: '/ˈvɪlən/',
    pos: 'noun',
    definition: 'A person who is wicked or criminal; the antagonist of a story.',
    etymology: [
      {
        era: 'Modern English · 14th century',
        root: 'villain',
        meaning: 'A wicked, evil person; the antagonist of a narrative. The moral meaning displaced the social one.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Anglo-Norman French · 13th century',
        root: 'villain / vilain',
        meaning: 'A feudal serf; a low-born rustic person. Used as a term of contempt by the nobility.',
        lang: 'Anglo-Norman',
        type: 'french',
      },
      {
        era: 'Medieval Latin',
        root: 'villanus',
        meaning: '"Farm worker, serf" — from villa (country house, farm estate). A villanus was a person bound to a villa.',
        lang: 'Medieval Latin',
        type: 'latin',
      },
      {
        era: 'Latin · Classical period',
        root: 'villa',
        meaning: '"Country house, estate." The same root gives village, villa, villain, and civil (from civis — citizen of a city, contrasted with the rural villa-dweller).',
        lang: 'Latin',
        type: 'latin',
      },
    ],
    related: ['village', 'villa', 'villein', 'peasant', 'serf'],
    funFact: 'Villain simply meant "someone who lives on a farm." Medieval aristocrats used it as an insult for anyone rural and low-born — and through centuries of contempt, it became a word for evil. The English language has many words (boor, churl, villain, knave) that began as neutral terms for working people.',
  },

  volcano: {
    word: 'volcano',
    phonetic: '/vɒlˈkeɪnəʊ/',
    pos: 'noun',
    definition: 'A mountain or hill with a crater through which lava, hot gases, and ash are ejected.',
    etymology: [
      {
        era: 'Modern English · 17th century',
        root: 'volcano',
        meaning: 'A fire-emitting mountain; adopted directly from Italian by English travelers in Italy.',
        lang: 'English (from Italian)',
        type: 'modern',
      },
      {
        era: 'Italian · 16th century',
        root: 'volcano',
        meaning: 'Named specifically for Vulcano, one of the Aeolian Islands north of Sicily, which was believed to be the chimney of Vulcan\'s forge.',
        lang: 'Italian',
        type: 'other',
      },
      {
        era: 'Latin · Classical period',
        root: 'Vulcanus',
        meaning: 'Vulcan, the Roman god of fire and the forge. His workshop was believed to be beneath volcanic islands in the Mediterranean.',
        lang: 'Latin',
        type: 'latin',
      },
    ],
    related: ['Vulcan', 'vulcanize', 'Hephaestus', 'igneous', 'lava'],
    funFact: 'Charles Goodyear\'s process for strengthening rubber (1844) is called vulcanization — after Vulcan, the fire god. Every car tire on earth carries the name of the Roman deity of the forge, who in turn gave his name to the geological phenomenon of fire-breathing mountains.',
  },

  weird: {
    word: 'weird',
    phonetic: '/wɪəd/',
    pos: 'adjective',
    definition: 'Suggesting something supernatural; very strange or unusual.',
    etymology: [
      {
        era: 'Modern English · 15th century',
        root: 'weird',
        meaning: 'Strange, uncanny — originally an adjective meaning "having power over fate." The supernatural meaning came first; "strange" is secondary.',
        lang: 'English',
        type: 'modern',
      },
      {
        era: 'Middle English · 13th century',
        root: 'weird / wyrd',
        meaning: 'A noun meaning fate or destiny, especially in the phrase "the Weird Sisters" (the Fates). Shakespeare used this: Macbeth\'s "weird sisters" are fate-weavers.',
        lang: 'Middle English',
        type: 'modern',
      },
      {
        era: 'Old English',
        root: 'wyrd',
        meaning: '"Fate, destiny; that which befalls one." From weorthan — to become, to happen. Wyrd was a central concept in Anglo-Saxon philosophy — an inevitable fate.',
        lang: 'Old English',
        type: 'germanic',
      },
      {
        era: 'Proto-Germanic',
        root: '*wurðiz',
        meaning: '"That which becomes, fate." Related to "worth" (as in worthwhile — what is fitting or fated to be valuable).',
        lang: 'Proto-Germanic',
        type: 'pie',
      },
    ],
    related: ['fate', 'destiny', 'wyrd', 'worth', 'become'],
    funFact: 'The Old English poem Beowulf uses "wyrd" to describe the inescapable doom of heroes. "Weird" began as one of the most serious words in the language — fate itself. Its drift to mean merely "strange" or "eccentric" is a remarkable deflation across centuries.',
  },

  xenophobia: {
    word: 'xenophobia',
    phonetic: '/ˌzɛnəˈfəʊbɪə/',
    pos: 'noun',
    definition: 'An intense or irrational dislike or fear of people from other countries.',
    etymology: [
      {
        era: 'Modern English · late 19th century',
        root: 'xenophobia',
        meaning: 'A scholarly compound coined in the era of nationalism and mass migration to describe fear and hostility toward foreigners.',
        lang: 'New Latin / English',
        type: 'modern',
      },
      {
        era: 'Ancient Greek',
        root: 'ξένος (xenos)',
        meaning: '"Stranger, foreigner" — but crucially, also "guest." In Greek culture, xenos meant both the stranger-to-be-feared and the guest-to-be-honored. Hospitality (xenia) was a sacred obligation.',
        lang: 'Ancient Greek',
        type: 'greek',
      },
      {
        era: 'Ancient Greek',
        root: 'φόβος (phobos)',
        meaning: '"Fear, panic." The personification of fear in Greek mythology; the root of all English -phobia words.',
        lang: 'Ancient Greek',
        type: 'greek',
      },
    ],
    related: ['xenia', 'xenon', 'phobia', 'philoxenia', 'hospitality'],
    funFact: 'Xenos meant both "stranger" and "guest" — Greek culture encoded the dual nature of the outsider into a single word. The gods themselves traveled in disguise; Zeus punished those who violated xenia (guest-friendship). Xenophobia and hospitality are etymological opposites built from the same root.',
  },

  zero: {
    word: 'zero',
    phonetic: '/ˈzɪərəʊ/',
    pos: 'noun',
    definition: 'The number denoting no quantity or amount; the point between positive and negative numbers.',
    etymology: [
      {
        era: 'Modern English · 17th century',
        root: 'zero',
        meaning: 'The number 0; nothing; the lowest point on a scale.',
        lang: 'English',
        type: 'modern',
      },
      {
        era: 'French / Italian · 16th century',
        root: 'zéro / zero',
        meaning: 'Adopted from Italian mathematical vocabulary as European scholars encountered Hindu-Arabic numerals.',
        lang: 'Italian',
        type: 'other',
      },
      {
        era: 'Medieval Latin · 13th century',
        root: 'zephirum',
        meaning: 'Transliteration of the Arabic, introduced by Fibonacci in his Liber Abaci (1202), which popularized Hindu-Arabic numerals in Europe.',
        lang: 'Medieval Latin',
        type: 'latin',
      },
      {
        era: 'Arabic · 9th century',
        root: 'ṣifr (صفر)',
        meaning: '"Empty, void, nothing." The Arabic translation of the Sanskrit concept of śūnya (emptiness, void). The same Arabic word gives us "cipher."',
        lang: 'Arabic',
        type: 'other',
      },
      {
        era: 'Sanskrit · ancient',
        root: 'śūnya (शून्य)',
        meaning: '"Empty, void." The Hindu mathematical concept of nothingness — one of the greatest intellectual leaps in human history.',
        lang: 'Sanskrit',
        type: 'pie',
      },
    ],
    related: ['cipher', 'cipher', 'null', 'naught', 'śūnyatā'],
    funFact: 'Zero traveled from the Indian concept of emptiness (śūnya) through Arab mathematicians to Fibonacci to European banks. Without zero, positional arithmetic is impossible. Every calculation you do, every computer instruction, every bank transaction depends on an ancient Sanskrit word for the void.',
  },

};

/* ---- Common word suggestions (for autocomplete) ---- */
const ALL_WORDS = [
  ...Object.keys(WORDS),
  'abacus', 'academy', 'adventure', 'algorithm',
  'almanac', 'alphabet', 'anatomy', 'anchor', 'ancient', 'animal',
  'bank', 'bizarre', 'blossom', 'breeze', 'bronze', 'bureaucracy',
  'calculate', 'calendar', 'camera', 'capital', 'carnival', 'chaos',
  'chocolate', 'citizen', 'clock', 'comet', 'crisis', 'culture',
  'democracy', 'design', 'divine', 'document', 'drama',
  'earth', 'eclipse', 'economy', 'element', 'emotion', 'empire',
  'fable', 'family', 'fate', 'flower', 'fortune',
  'genius', 'geography', 'geometry', 'glory', 'government',
  'harbor', 'harmony', 'history', 'horizon', 'hurricane',
  'idea', 'identity', 'illuminate', 'imagination', 'influence',
  'justice', 'jungle',
  'knowledge',
  'language', 'legend', 'library', 'logic', 'lunar',
  'magic', 'manuscript', 'map', 'mathematics', 'medicine', 'memory',
  'nature', 'nectar', 'noble',
  'origin', 'oracle',
  'passion', 'planet', 'poetry', 'politics', 'problem',
  'question',
  'reason', 'religion', 'republic', 'revelation', 'rhythm', 'ritual',
  'science', 'silence', 'solar', 'soul', 'spirit', 'symbol',
  'theory', 'time', 'treasure', 'truth',
  'universe', 'urban',
  'virtue', 'vision',
  'wisdom', 'wonder', 'world',
  'zenith', 'zodiac',
];

/* ================================================================
   UI ELEMENTS
   ================================================================ */
const form         = document.getElementById('search-form');
const input        = document.getElementById('word-input');
const suggestions  = document.getElementById('suggestions');
const resultSection = document.getElementById('result-section');
const historyPanel  = document.getElementById('history-panel');
const historyList   = document.getElementById('history-list');
const navHistoryBtn = document.getElementById('nav-history-btn');
const closeHistoryBtn = document.getElementById('close-history');
const clearHistoryBtn = document.getElementById('clear-history');

/* ================================================================
   SEARCH HISTORY (localStorage)
   ================================================================ */
const HISTORY_KEY = 'etymroot_history';

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function addToHistory(word) {
  let history = getHistory();
  history = history.filter(h => h.word !== word);
  history.unshift({ word, time: Date.now() });
  if (history.length > 20) history = history.slice(0, 20);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function renderHistory() {
  const history = getHistory();
  historyList.innerHTML = '';
  if (!history.length) {
    historyList.innerHTML = '<li style="padding:1rem 1.4rem;color:var(--bark-400);font-style:italic;font-size:0.92rem;">No searches yet.</li>';
    return;
  }
  history.forEach(({ word, time }) => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `<span class="history-word">${escHtml(word)}</span><span class="history-time">${timeAgo(time)}</span>`;
    li.addEventListener('click', () => {
      input.value = word;
      closeHistory();
      performSearch(word);
    });
    historyList.appendChild(li);
  });
}

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

/* ================================================================
   HISTORY PANEL TOGGLE
   ================================================================ */
navHistoryBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (historyPanel.hasAttribute('hidden')) {
    openHistory();
  } else {
    closeHistory();
  }
});
closeHistoryBtn.addEventListener('click', closeHistory);
clearHistoryBtn.addEventListener('click', () => {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
});

function openHistory() {
  renderHistory();
  historyPanel.removeAttribute('hidden');
}
function closeHistory() {
  historyPanel.setAttribute('hidden', '');
}

/* ================================================================
   AUTOCOMPLETE
   ================================================================ */
let selectedSuggestion = -1;

input.addEventListener('input', () => {
  const val = input.value.trim().toLowerCase();
  if (!val || val.length < 2) {
    closeSuggestions();
    return;
  }
  const matches = ALL_WORDS
    .filter(w => w.startsWith(val) && w !== val)
    .slice(0, 6);
  if (!matches.length) { closeSuggestions(); return; }
  renderSuggestions(matches, val);
});

input.addEventListener('keydown', (e) => {
  const items = suggestions.querySelectorAll('.suggestion-item');
  if (!items.length) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedSuggestion = Math.min(selectedSuggestion + 1, items.length - 1);
    updateSuggestionSelection(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedSuggestion = Math.max(selectedSuggestion - 1, -1);
    updateSuggestionSelection(items);
  } else if (e.key === 'Escape') {
    closeSuggestions();
  } else if (e.key === 'Enter' && selectedSuggestion >= 0) {
    e.preventDefault();
    input.value = items[selectedSuggestion].textContent;
    closeSuggestions();
    performSearch(input.value.trim());
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-form')) closeSuggestions();
});

function renderSuggestions(matches, query) {
  suggestions.innerHTML = '';
  matches.forEach(w => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.setAttribute('role', 'option');
    div.setAttribute('tabindex', '-1');
    const highlighted = w.replace(new RegExp(`^(${escReg(query)})`, 'i'), '<mark>$1</mark>');
    div.innerHTML = highlighted;
    div.addEventListener('mousedown', (e) => {
      e.preventDefault();
      input.value = w;
      closeSuggestions();
      performSearch(w);
    });
    suggestions.appendChild(div);
  });
  suggestions.classList.add('open');
  selectedSuggestion = -1;
}

function updateSuggestionSelection(items) {
  items.forEach((item, i) => {
    item.setAttribute('aria-selected', i === selectedSuggestion ? 'true' : 'false');
  });
  if (selectedSuggestion >= 0) {
    input.value = items[selectedSuggestion].textContent;
  }
}

function closeSuggestions() {
  suggestions.classList.remove('open');
  suggestions.innerHTML = '';
  selectedSuggestion = -1;
}

/* ================================================================
   SEARCH FORM SUBMIT
   ================================================================ */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;
  closeSuggestions();
  performSearch(query);
});

/* Quick chips */
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const word = chip.dataset.word;
    input.value = word;
    performSearch(word);
  });
});

/* Related chips (delegated) */
resultSection.addEventListener('click', (e) => {
  const chip = e.target.closest('.related-chip');
  if (chip) {
    const word = chip.textContent.trim();
    input.value = word;
    performSearch(word);
  }
  const actionBtn = e.target.closest('.action-btn[data-action="copy"]');
  if (actionBtn) {
    copyResult(actionBtn);
  }
});

/* ================================================================
   PERFORM SEARCH
   ================================================================ */
function performSearch(query) {
  const word = query.toLowerCase().trim();
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  /* Show loading */
  resultSection.innerHTML = `<div class="loading-state">
    <div class="loading-ring" aria-hidden="true"></div>
    <p>Tracing the roots of <em>${escHtml(query)}</em>…</p>
  </div>`;

  /* Simulate async lookup */
  setTimeout(() => {
    const entry = WORDS[word];
    if (entry) {
      addToHistory(word);
      resultSection.innerHTML = buildResultCard(entry);
    } else {
      resultSection.innerHTML = buildNotFound(query);
    }
  }, 380);
}

/* ================================================================
   BUILD RESULT CARD
   ================================================================ */
function buildResultCard(entry) {
  const timeline = entry.etymology.map((step, i) => `
    <li class="timeline-item" style="animation-delay:${0.05 + i * 0.07}s">
      <div class="timeline-marker">
        <div class="marker-dot ${step.type || 'other'}"></div>
      </div>
      <div class="timeline-content">
        <div class="timeline-era">${escHtml(step.era)}</div>
        <div class="timeline-root">${escHtml(step.root)}</div>
        <div class="timeline-meaning">${escHtml(step.meaning)}</div>
        <span class="timeline-lang">${escHtml(step.lang)}</span>
      </div>
    </li>
  `).join('');

  const related = entry.related.map(w =>
    `<button class="related-chip" type="button">${escHtml(w)}</button>`
  ).join('');

  return `
  <div class="result-card" role="article" aria-label="Etymology of ${escHtml(entry.word)}">
    <div class="card-header">
      <div class="word-display">
        <span class="word-main">${escHtml(entry.word)}</span>
        <span class="word-phonetic">${escHtml(entry.phonetic)}</span>
        <span class="word-pos">${escHtml(entry.pos)}</span>
      </div>
      <p class="word-definition">${escHtml(entry.definition)}</p>
      <div class="card-header-badge" aria-hidden="true">
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 4 C30 4 16 16 16 28 C16 38 24 46 30 52" stroke="${'var(--green-700)'}" stroke-width="3" stroke-linecap="round"/>
          <path d="M30 52 C36 46 44 38 44 28 C44 16 30 4 30 4" stroke="${'var(--green-700)'}" stroke-width="3" stroke-linecap="round"/>
          <path d="M30 52 C30 56 27 59 24 60" stroke="${'var(--green-600)'}" stroke-width="2" stroke-linecap="round"/>
          <path d="M30 52 C30 56 33 59 36 60" stroke="${'var(--green-600)'}" stroke-width="2" stroke-linecap="round"/>
          <path d="M30 52 C30 57 30 60 30 60" stroke="${'var(--green-600)'}" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </div>

    <h2 class="sr-only">Etymology timeline</h2>
    <ol class="etymology-timeline" aria-label="Etymology timeline">
      ${timeline}
    </ol>

    ${entry.related && entry.related.length ? `
    <div class="related-section">
      <p class="related-title">Related words sharing this root</p>
      <div class="related-chips" role="list">${related}</div>
    </div>` : ''}

    ${entry.funFact ? `
    <div class="funfact-section" aria-label="Fun fact">
      <span class="funfact-icon" aria-hidden="true">🌿</span>
      <p class="funfact-text">${escHtml(entry.funFact)}</p>
    </div>` : ''}

    <div class="card-actions">
      <button class="action-btn" type="button" data-action="copy" aria-label="Copy etymology summary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
        </svg>
        Copy summary
      </button>
      <button class="action-btn" type="button" onclick="window.open('https://en.wiktionary.org/wiki/${encodeURIComponent(entry.word)}','_blank')" aria-label="View on Wiktionary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        Wiktionary
      </button>
    </div>
  </div>`;
}

/* ================================================================
   NOT FOUND STATE
   ================================================================ */
function buildNotFound(query) {
  /* Suggest similar words from database */
  const similar = Object.keys(WORDS)
    .filter(w => {
      const a = w.toLowerCase();
      const b = query.toLowerCase();
      return a.includes(b.slice(0,3)) || b.includes(a.slice(0,3));
    })
    .slice(0, 4);

  const suggestions_html = similar.length
    ? `<div style="margin-top:1.2rem;">
        <p style="font-size:0.9rem;color:var(--bark-400);margin-bottom:0.6rem;">Try one of these instead:</p>
        <div class="related-chips">
          ${similar.map(w => `<button class="related-chip" type="button">${escHtml(w)}</button>`).join('')}
        </div>
      </div>`
    : '';

  return `
  <div class="error-state">
    <p style="font-size:1.5rem;margin-bottom:0.5rem;">🌱</p>
    <p style="font-family:var(--font-display);font-size:1.2rem;font-weight:700;margin-bottom:0.5rem;">
      No roots found for "<em>${escHtml(query)}</em>"
    </p>
    <p style="font-size:0.97rem;line-height:1.6;">
      This word isn't in our local database yet. Try one of the featured words, or open Wiktionary for any word.
    </p>
    ${suggestions_html}
    <div style="margin-top:1.2rem;">
      <button class="action-btn" type="button"
        onclick="window.open('https://www.etymonline.com/search?q=${encodeURIComponent(query)}','_blank')"
        style="margin:0 auto;display:inline-flex;">
        Search Etymonline ↗
      </button>
    </div>
  </div>`;
}

/* ================================================================
   COPY SUMMARY
   ================================================================ */
function copyResult(btn) {
  const card = btn.closest('.result-card');
  const word = card.querySelector('.word-main').textContent;
  const def  = card.querySelector('.word-definition').textContent;
  const steps = [...card.querySelectorAll('.timeline-item')].map(li => {
    const root = li.querySelector('.timeline-root').textContent;
    const lang = li.querySelector('.timeline-lang').textContent;
    const meaning = li.querySelector('.timeline-meaning').textContent;
    return `  ${lang}: ${root} — ${meaning}`;
  });
  const text = `${word}\n${def}\n\nEtymology:\n${steps.join('\n')}\n\nSource: EtymRoot`;
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Copied!';
    btn.style.color = 'var(--green-600)';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.color = '';
    }, 2000);
  }).catch(() => {
    alert('Copy failed. Please select and copy the text manually.');
  });
}

/* ================================================================
   HELPERS
   ================================================================ */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escReg(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* ================================================================
   INIT: Load first word if hash present
   ================================================================ */
(function init() {
  const hash = window.location.hash.slice(1);
  if (hash) {
    input.value = decodeURIComponent(hash);
    performSearch(input.value);
  }
})();
