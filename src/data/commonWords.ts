import type { SeedEntry } from '../models/Entry';

/**
 * Pre-populated starter dictionary. Each entry carries the corrected Finglish
 * spelling, an English meaning, and matched formal + informal usage examples:
 * both usages express the SAME meaning, differing only in register (informal
 * uses `to`, colloquial verb forms and the "-e" copula; formal uses `shoma`,
 * `ast`/`hastid`, `lotfan`, and full verb forms). The `normalizedKey` and
 * `aliases` indexes are derived at seed time, so only human-meaningful fields
 * live here. Ambiguous user-supplied spellings keep a `note` with the most
 * likely reading.
 */
export const commonWords: SeedEntry[] = [
  {
    term: 'ādat bokon',
    meaning: 'get used to it',
    tags: ['phrase'],
    aliases: ['adat bokon', 'aadat kon'],
    usages: [
      { register: 'informal', finglish: 'behesh aadat bokon', english: 'Get used to it.' },
      {
        register: 'formal',
        finglish: 'lotfan behesh aadat konid',
        english: 'Please get used to it.',
      },
    ],
  },
  {
    term: 'āb',
    meaning: 'water',
    farsi: 'آب',
    tags: ['noun'],
    aliases: ['ab', 'aab'],
    note: 'Pronounced with a long "ā" (as in "father"), not short "a" (as in "aziz").',
    usages: [
      {
        register: 'informal',
        finglish: 'ye livān āb bede',
        farsi: 'یه لیوان آب بده',
        english: 'Give me a glass of water.',
      },
      {
        register: 'formal',
        finglish: 'lotfan ye livān āb bedid',
        farsi: 'لطفاً یه لیوان آب بدید',
        english: 'Please give me a glass of water.',
      },
    ],
  },
  {
    term: 'ahmagh',
    meaning: 'idiot, stupid',
    tags: ['noun', 'adjective', 'offensive'],
    note: 'A direct insult. Softer than vulgar swearing, but still rude.',
    usages: [
      { register: 'informal', finglish: 'enghadr ahmagh nabash', english: "Don't be so foolish." },
      {
        register: 'formal',
        finglish: 'lotfan inghadr ahmagh nabashid',
        english: "Please don't be so foolish.",
      },
    ],
  },
  {
    term: 'alān',
    meaning: 'now, right now',
    tags: ['adjective'],
    usages: [
      { register: 'informal', finglish: 'alan miam', english: "I'm coming right now." },
      { register: 'formal', finglish: 'alan miyayam', english: "I'm coming right now." },
    ],
  },
  {
    term: 'aragh',
    meaning: 'sweat; also a distilled spirit (arak)',
    tags: ['noun'],
    aliases: ['argh', 'argheh', 'aragheh'],
    note: 'Means "sweat" in everyday use; the same spelling also names the distilled drink arak.',
    usages: [
      {
        register: 'informal',
        finglish: 'az garma aragh kardam',
        english: 'I sweated from the heat.',
      },
      {
        register: 'formal',
        finglish: 'be ellate garma aragh kardam',
        english: 'I sweated because of the heat.',
      },
    ],
  },
  {
    term: 'ārūm',
    meaning: 'calm, gently, slowly, quiet',
    tags: ['adjective'],
    aliases: ['aram', 'aroum'],
    usages: [
      { register: 'informal', finglish: 'aroom bash', english: 'Calm down.' },
      { register: 'formal', finglish: 'lotfan aaram bashid', english: 'Please calm down.' },
    ],
  },
  {
    term: 'artesh',
    meaning: 'army',
    tags: ['noun'],
    usages: [
      {
        register: 'informal',
        finglish: 'baradaram tu arteshe',
        english: 'My brother is in the army.',
      },
      {
        register: 'formal',
        finglish: 'baradar-e man dar artesh ast',
        english: 'My brother is in the army.',
      },
    ],
  },
  {
    term: 'ārezū',
    meaning: 'wish, desire (also a given name)',
    tags: ['noun'],
    aliases: ['arezoo'],
    usages: [
      { register: 'informal', finglish: 'arezut chie?', english: 'What is your wish?' },
      { register: 'formal', finglish: 'arezu-ye shoma chist?', english: 'What is your wish?' },
    ],
  },
  {
    term: 'āshegh',
    meaning: 'in love; a lover',
    tags: ['adjective', 'noun'],
    aliases: ['ashogh', 'ashegham'],
    usages: [
      { register: 'informal', finglish: 'asheghetam', english: 'I am in love with you.' },
      {
        register: 'formal',
        finglish: 'ashegh-e shoma hastam',
        english: 'I am in love with you.',
      },
    ],
  },
  {
    term: 'ashk',
    meaning: 'tear, tears',
    tags: ['noun'],
    aliases: ['ashkayeh', 'ashkha'],
    usages: [
      { register: 'informal', finglish: 'ashkam dar umad', english: 'My tears welled up.' },
      { register: 'formal', finglish: 'ashkam dar amad', english: 'My tears welled up.' },
    ],
  },
  {
    term: 'āsūn',
    meaning: 'easy',
    tags: ['adjective'],
    aliases: ['asan', 'aasun', 'asoon'],
    usages: [
      { register: 'informal', finglish: 'kheyli asune', english: 'It is very easy.' },
      { register: 'formal', finglish: 'kheyli asan ast', english: 'It is very easy.' },
    ],
  },
  {
    term: 'ātefe',
    meaning: 'affection, tenderness, emotion (also the name Atefeh)',
    tags: ['noun'],
    aliases: ['atehfeh', 'atefeh'],
    usages: [
      { register: 'informal', finglish: 'kheyli ba atefast', english: 'She is very affectionate.' },
      {
        register: 'formal',
        finglish: 'ishan kheyli ba atefe hastand',
        english: 'She is very affectionate.',
      },
    ],
  },
  {
    term: 'atr',
    meaning: 'perfume, fragrance',
    tags: ['noun'],
    aliases: ['atre', 'atreh'],
    usages: [
      {
        register: 'informal',
        finglish: 'atret kheyli khoobe',
        english: 'Your perfume is very nice.',
      },
      {
        register: 'formal',
        finglish: 'atr-e shoma kheyli khoob ast',
        english: 'Your perfume is very nice.',
      },
    ],
  },
  {
    term: 'azīz',
    meaning: 'dear, beloved, precious',
    farsi: 'عزیز',
    tags: ['adjective', 'noun'],
    aliases: ['azizam'],
    note: 'Short "a" (as in "cat"), not long "ā" (as in "āb"). The initial letter is ع (eyn).',
    usages: [
      {
        register: 'informal',
        finglish: 'azizam, khoobi?',
        farsi: 'عزیزم، خوبی؟',
        english: 'My dear, are you well?',
      },
      {
        register: 'formal',
        finglish: 'aziz-e man, haletan khoob ast?',
        farsi: 'عزیزِ من، حالتان خوب است؟',
        english: 'My dear, are you well?',
      },
    ],
  },
  {
    term: 'bābā',
    meaning: 'dad; also a casual "come on!" / "oh man!"',
    tags: ['noun'],
    note: '"baba" is the casual word for father; the formal equivalent is "pedar".',
    usages: [
      { register: 'informal', finglish: 'babam khoonast', english: 'My dad is home.' },
      { register: 'formal', finglish: 'pedaram dar khane hastand', english: 'My father is home.' },
    ],
  },
  {
    term: 'bache',
    meaning: 'child, kid',
    tags: ['noun'],
    aliases: ['bacheh', 'bache'],
    note: '"bache" is casual; "koodak" is the more formal word for child.',
    usages: [
      {
        register: 'informal',
        finglish: 'in bache kheyli baadabe',
        english: 'This child is very polite.',
      },
      {
        register: 'formal',
        finglish: 'in koodak kheyli baadab ast',
        english: 'This child is very polite.',
      },
    ],
  },
  {
    term: 'bad',
    meaning: 'bad',
    tags: ['adjective'],
    usages: [
      { register: 'informal', finglish: 'halam bade', english: 'I feel bad.' },
      { register: 'formal', finglish: 'halam bad ast', english: 'I feel unwell.' },
    ],
  },
  {
    term: 'bāhāl',
    meaning: 'cool, fun, enjoyable (slang)',
    tags: ['adjective', 'slang'],
    aliases: ['bahal', 'bahaal'],
    usages: [
      {
        register: 'informal',
        finglish: 'in film kheyli bahale',
        english: 'This movie is really cool.',
      },
      {
        register: 'formal',
        finglish: 'in film kheyli bahal ast',
        english: 'This movie is really cool.',
      },
    ],
  },
  {
    term: 'bāhūsh',
    meaning: 'smart, intelligent, clever',
    tags: ['adjective'],
    aliases: ['ba hoosh', 'bahush'],
    usages: [
      { register: 'informal', finglish: 'kheyli bahooshe', english: 'He is very smart.' },
      {
        register: 'formal',
        finglish: 'ishan kheyli bahoosh hastand',
        english: 'He is very smart.',
      },
    ],
  },
  {
    term: 'bale',
    meaning: 'yes (polite)',
    tags: ['phrase'],
    aliases: ['baleh', 'areh', 'are'],
    note: '"bale" is polite; "areh" is the casual "yeah".',
    usages: [
      { register: 'informal', finglish: 'areh, doroste', english: "Yeah, that's right." },
      { register: 'formal', finglish: 'bale, dorost ast', english: "Yes, that's right." },
    ],
  },
  {
    term: 'bebakhshīd',
    meaning: 'excuse me, sorry, pardon',
    tags: ['phrase'],
    aliases: ['bebakhsh', 'bbakhshid'],
    note: '"bebakhshid" is formal/polite; "bebakhsh" is the informal form.',
    usages: [
      { register: 'informal', finglish: 'bebakhsh dir kardam', english: "Sorry I'm late." },
      { register: 'formal', finglish: 'bebakhshid dir kardam', english: "Sorry I'm late." },
    ],
  },
  {
    term: 'bedūn-e',
    meaning: 'without',
    tags: ['phrase'],
    aliases: ['bedooneh', 'bedoon', 'bedune'],
    usages: [
      { register: 'informal', finglish: 'bedoone to nemiram', english: "I won't go without you." },
      {
        register: 'formal',
        finglish: 'bedun-e shoma nemiravam',
        english: "I won't go without you.",
      },
    ],
  },
  {
    term: 'be khodet biyā',
    meaning: 'pull yourself together; come to your senses',
    tags: ['phrase'],
    aliases: ['bekhod', 'be khod', 'be khodet biya'],
    usages: [
      { register: 'informal', finglish: 'be khodet bia', english: 'Pull yourself together.' },
      {
        register: 'formal',
        finglish: 'lotfan be khodetan biyaeed',
        english: 'Please pull yourself together.',
      },
    ],
  },
  {
    term: 'bemīre',
    meaning: 'drop dead; (may he/she) die — exasperated exclamation',
    tags: ['phrase', 'slang', 'offensive'],
    aliases: ['bimordeh', 'bemiri', 'bemiram'],
    note: 'Ambiguous spelling; most likely the colloquial curse "bemireh/bemiri", used in mock-exasperation rather than literally. "bemiram baat" instead means "I adore you".',
    usages: [
      {
        register: 'informal',
        finglish: 'bemireh, baz dir kard',
        english: 'Ugh, he was late again.',
      },
      {
        register: 'formal',
        finglish: 'moteasefane baz ham dir kard',
        english: 'Unfortunately, he was late again.',
      },
    ],
  },
  {
    term: 'berenj',
    meaning: 'rice (uncooked)',
    tags: ['noun'],
    usages: [
      {
        register: 'informal',
        finglish: 'berenj-e irani kheyli khoobe',
        english: 'Iranian rice is really good.',
      },
      {
        register: 'formal',
        finglish: 'berenj-e irani kheyli marghoob ast',
        english: 'Iranian rice is really good.',
      },
    ],
  },
  {
    term: 'beshnavad',
    meaning: '(so that) he/she hears; may he/she hear — from shenidan, "to hear"',
    tags: ['verb'],
    aliases: ['beeshnavad', 'beshno', 'beshnave'],
    note: 'Subjunctive of "shenidan". The everyday imperative "listen!" is "beshno / goosh kon".',
    usages: [
      {
        register: 'informal',
        finglish: 'boland begu ke beshnave',
        english: 'Say it loudly so he hears.',
      },
      {
        register: 'formal',
        finglish: 'lotfan boland begooid ta beshnavand',
        english: 'Please say it loudly so they hear.',
      },
    ],
  },
  {
    term: 'bīkhiyāl',
    meaning: 'never mind; forget it; easy-going',
    tags: ['phrase', 'slang'],
    aliases: ['bikhiyal', 'beekhiaal', 'bikhi'],
    usages: [
      {
        register: 'informal',
        finglish: 'bikhial, mohem nist',
        english: "Forget it, it's not important.",
      },
      {
        register: 'formal',
        finglish: 'bikhiyalash shavid, mohem nist',
        english: "Never mind it, it's not important.",
      },
    ],
  },
  {
    term: 'bīkhod',
    meaning: 'pointless, for no reason; uninvited',
    tags: ['adjective', 'slang'],
    aliases: ['beekhood', 'bikhud'],
    usages: [
      {
        register: 'informal',
        finglish: 'bikhod negaran nasho',
        english: "Don't worry for nothing.",
      },
      {
        register: 'formal',
        finglish: 'bikhod negaran nashavid',
        english: "Don't worry for nothing.",
      },
    ],
  },
  {
    term: 'bīsharaf',
    meaning: 'dishonorable person; scoundrel',
    tags: ['noun', 'offensive'],
    aliases: ['beesharaf', 'bee sharaf'],
    note: 'A strong insult (literally "without honor").',
    usages: [
      { register: 'informal', finglish: 'kheyli bisharafe', english: 'He is a real scoundrel.' },
      {
        register: 'formal',
        finglish: 'fard-e bisharafi ast',
        english: 'He is a dishonorable person.',
      },
    ],
  },
  {
    term: 'bīshūr',
    meaning: 'rude, tactless, ill-mannered',
    tags: ['adjective', 'offensive'],
    aliases: ['beeshoor', 'bishur'],
    usages: [
      { register: 'informal', finglish: 'kheyli bishoori', english: 'You are very rude.' },
      {
        register: 'formal',
        finglish: 'shoma kheyli bishoor hastid',
        english: 'You are very rude.',
      },
    ],
  },
  {
    term: 'bītāb',
    meaning: 'restless, impatient, eagerly longing',
    tags: ['adjective'],
    aliases: ['betahb', 'bitaab'],
    usages: [
      {
        register: 'informal',
        finglish: 'baraye didanet bitabam',
        english: 'I am restless to see you.',
      },
      {
        register: 'formal',
        finglish: 'baraye didar-e shoma bitabam',
        english: 'I am restless to see you.',
      },
    ],
  },
  {
    term: 'biyā',
    meaning: 'come (imperative)',
    tags: ['verb'],
    aliases: ['bia'],
    note: 'Casual "biya"; the everyday-polite form is "lotfan biyaeed".',
    usages: [
      { register: 'informal', finglish: 'biya inja', english: 'Come here.' },
      { register: 'formal', finglish: 'lotfan biyaeed inja', english: 'Please come here.' },
    ],
  },
  {
    term: 'boro',
    meaning: 'go (imperative)',
    tags: ['verb'],
    aliases: ['boru'],
    note: 'Casual "boro"; the everyday-polite form is "lotfan beravid".',
    usages: [
      { register: 'informal', finglish: 'boro khoone', english: 'Go home.' },
      {
        register: 'formal',
        finglish: 'lotfan beravid khane',
        english: 'Please go home.',
      },
    ],
  },
  {
    term: 'bozorg',
    meaning: 'big, large; great',
    tags: ['adjective'],
    usages: [
      { register: 'informal', finglish: 'che khoone-ye bozorgi', english: 'What a big house.' },
      { register: 'formal', finglish: 'che khane-ye bozorgi', english: 'What a big house.' },
    ],
  },
  {
    term: 'chāy',
    meaning: 'tea',
    tags: ['noun'],
    aliases: ['chaei', 'chayi'],
    usages: [
      { register: 'informal', finglish: 'chai mikhori?', english: 'Would you like some tea?' },
      { register: 'formal', finglish: 'chai mayel hastid?', english: 'Would you like some tea?' },
    ],
  },
  {
    term: 'chākeretam',
    meaning:
      'I’m your humble servant — a warm, deferential way to say "thank you / I’m at your service"',
    tags: ['phrase'],
    aliases: ['chakere to', 'chakeret', 'nokaret', 'nokaretam', 'shakere to'],
    note: 'Affectionate ta’arof. "nokaretam" is a close synonym. Used among friends to show devotion.',
    usages: [
      { register: 'informal', finglish: 'chakeretam dadash', english: 'I am at your service.' },
      { register: 'formal', finglish: 'chaker-e shoma hastam', english: 'I am at your service.' },
    ],
  },
  {
    term: 'chand',
    meaning: 'how many, how much; a few',
    tags: ['phrase'],
    usages: [
      { register: 'informal', finglish: 'chande?', english: 'How much is it?' },
      { register: 'formal', finglish: 'gheymatash chand ast?', english: 'How much is it?' },
    ],
  },
  {
    term: 'chekār mikoni',
    meaning: 'what are you doing?',
    tags: ['phrase'],
    aliases: ['chikar mikoni', 'che kar mikoni'],
    usages: [
      { register: 'informal', finglish: 'chikar mikoni?', english: 'What are you doing?' },
      { register: 'formal', finglish: 'che kar mikonid?', english: 'What are you doing?' },
    ],
  },
  {
    term: 'cherā',
    meaning: 'why',
    tags: ['phrase'],
    usages: [
      { register: 'informal', finglish: 'chera nayoomadi?', english: "Why didn't you come?" },
      {
        register: 'formal',
        finglish: 'chera nayamadid?',
        english: "Why didn't you come?",
      },
    ],
  },
  {
    term: 'chert',
    meaning: 'nonsense, rubbish; (as "chort") a doze/nap',
    tags: ['noun', 'slang'],
    aliases: ['chort', 'chrt'],
    note: '"chert nago" = stop talking nonsense. With the other vowel, "chort zadan" means to doze off.',
    usages: [
      { register: 'informal', finglish: 'chert nago', english: "Don't talk nonsense." },
      {
        register: 'formal',
        finglish: 'lotfan sokhan-e bipaye nagooid',
        english: "Please don't talk nonsense.",
      },
    ],
  },
  {
    term: 'chetorī',
    meaning: 'how are you? (informal)',
    farsi: 'چطوری',
    tags: ['phrase', 'greeting'],
    aliases: ['chetory', 'chejuri', 'chitori'],
    note: 'Casual. The formal version is "hāletān chetor ast / chetor hastid".',
    usages: [
      { register: 'informal', finglish: 'chetori?', farsi: 'چطوری؟', english: 'How are you?' },
      {
        register: 'formal',
        finglish: 'hāletān chetor ast?',
        farsi: 'حالتان چطور است؟',
        english: 'How are you?',
      },
    ],
  },
  {
    term: 'chī',
    farsi: 'چی',
    meaning: 'what',
    tags: ['phrase'],
    aliases: ['che'],
    usages: [
      { register: 'informal', finglish: 'chi shod?', farsi: 'چی شد؟', english: 'What happened?' },
      { register: 'formal', finglish: 'che shod?', farsi: 'چه شد؟', english: 'What happened?' },
    ],
  },
  {
    term: 'damet garm',
    meaning: 'thanks! / well done! / bravo! (lit. "may your breath be warm")',
    tags: ['phrase', 'slang'],
    aliases: ['damat garm', 'dametgarm', 'damet garmm'],
    note: 'Warm, informal gratitude or praise among friends; the formal equivalent is a plain thank-you.',
    usages: [
      { register: 'informal', finglish: 'damet garm dadash', english: 'Thank you so much.' },
      { register: 'formal', finglish: 'kheyli az shoma mamnoonam', english: 'Thank you so much.' },
    ],
  },
  {
    term: 'delam barāt tang shode',
    meaning: 'I miss you (lit. "my heart has grown tight for you")',
    tags: ['phrase'],
    aliases: ['delam barat tang shod', 'delam barat tang shodeh'],
    usages: [
      { register: 'informal', finglish: 'delam barat tang shode', english: 'I miss you.' },
      {
        register: 'formal',
        finglish: 'delam baraye shoma tang shode ast',
        english: 'I miss you.',
      },
    ],
  },
  {
    term: 'dīrūz',
    meaning: 'yesterday',
    tags: ['noun'],
    aliases: ['dirooz'],
    usages: [
      { register: 'informal', finglish: 'diruz koja boodi?', english: 'Where were you yesterday?' },
      {
        register: 'formal',
        finglish: 'diruz koja boodid?',
        english: 'Where were you yesterday?',
      },
    ],
  },
  {
    term: 'do',
    meaning: 'two',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'do ta bede', english: 'Give me two.' },
      { register: 'formal', finglish: 'lotfan do ta bedid', english: 'Please give me two.' },
    ],
  },
  {
    term: 'dokhtar',
    meaning: 'girl; daughter',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'oon dokhtar kie?', english: 'Who is that girl?' },
      { register: 'formal', finglish: 'an dokhtar kist?', english: 'Who is that girl?' },
    ],
  },
  {
    term: 'dūset dāram',
    meaning: 'I love you / I like you (informal)',
    farsi: 'دوست دارم',
    tags: ['phrase'],
    aliases: ['doset daram', 'dooset daram', 'dooset daaram', 'dustet daram'],
    note: 'Casual affection with "to"; the polite form uses "shomā".',
    usages: [
      { register: 'informal', finglish: 'dooset dāram', english: 'I love you.' },
      { register: 'formal', finglish: 'shomā rā dust dāram', english: 'I love you.' },
    ],
  },
  {
    term: 'dūst',
    meaning: 'friend',
    tags: ['noun'],
    aliases: ['dost', 'dust'],
    usages: [
      { register: 'informal', finglish: 'doost-e khoobi hasti', english: 'You are a good friend.' },
      {
        register: 'formal',
        finglish: 'doost-e khoobi hastid',
        english: 'You are a good friend.',
      },
    ],
  },
  {
    term: 'dūst dāram',
    farsi: 'دوست دارم',
    meaning: 'I like / I love (something or someone)',
    tags: ['phrase'],
    aliases: ['doost daram'],
    usages: [
      {
        register: 'informal',
        finglish: 'in ahang ro dust daram',
        farsi: 'این آهنگ رو دوست دارم',
        english: 'I like this song.',
      },
      {
        register: 'formal',
        finglish: 'in ahang ra dust daram',
        farsi: 'این آهنگ را دوست دارم',
        english: 'I like this song.',
      },
    ],
  },
  {
    term: 'edāme',
    meaning: 'continuation; "edame bede" = keep going',
    tags: ['noun'],
    aliases: ['edameh', 'edame bede'],
    usages: [
      { register: 'informal', finglish: 'edame bede', english: 'Keep going.' },
      { register: 'formal', finglish: 'lotfan edame bedid', english: 'Please continue.' },
    ],
  },
  {
    term: 'edārī',
    meaning: 'administrative; office-related',
    tags: ['adjective'],
    usages: [
      {
        register: 'informal',
        finglish: 'ye kar-e edari daram',
        english: 'I have some office work.',
      },
      {
        register: 'formal',
        finglish: 'yek kar-e edari daram',
        english: 'I have some office work.',
      },
    ],
  },
  {
    term: 'ehtiyāj',
    meaning: 'need; "ehtiaj daram" = I need',
    tags: ['noun'],
    aliases: ['ehtiyaj', 'ehtiaaj'],
    usages: [
      { register: 'informal', finglish: 'be komaket ehtiaj daram', english: 'I need your help.' },
      {
        register: 'formal',
        finglish: 'be komak-e shoma ehtiaj daram',
        english: 'I need your help.',
      },
    ],
  },
  {
    term: 'ejāze',
    meaning: 'permission; "ejaze midi?" = may I?',
    tags: ['noun'],
    aliases: ['ejazeh', 'ejaze midi'],
    usages: [
      { register: 'informal', finglish: 'ejaze midi beram?', english: 'May I go?' },
      { register: 'formal', finglish: 'ejaze midid beravam?', english: 'May I go?' },
    ],
  },
  {
    term: 'elāhī',
    meaning: 'divine; also a tender exclamation "oh, bless you / oh dear"',
    tags: ['phrase'],
    aliases: ['elahee', 'elaahi'],
    note: 'As an exclamation it conveys sympathy or affection, e.g. "elahi ghorbunet beram".',
    usages: [
      { register: 'informal', finglish: 'elahi, che naze!', english: 'Oh, how adorable!' },
      { register: 'formal', finglish: 'elahi, kheyli naaz ast', english: 'Oh, how adorable.' },
    ],
  },
  {
    term: 'emkān',
    meaning: 'possibility; "emkan dare?" = is it possible?',
    tags: ['noun'],
    aliases: ['emkam', 'emkaan'],
    note: 'The spelling "emkam" is most likely "emkan".',
    usages: [
      {
        register: 'informal',
        finglish: 'emkan dare zoodtar biay?',
        english: 'Is it possible for you to come earlier?',
      },
      {
        register: 'formal',
        finglish: 'momken-e zoodtar biyaeed?',
        english: 'Is it possible for you to come earlier?',
      },
    ],
  },
  {
    term: 'emrūz',
    meaning: 'today',
    tags: ['noun'],
    aliases: ['emrooz'],
    usages: [
      {
        register: 'informal',
        finglish: 'emruz chikar mikoni?',
        english: 'What are you doing today?',
      },
      {
        register: 'formal',
        finglish: 'emruz che kar mikonid?',
        english: 'What are you doing today?',
      },
    ],
  },
  {
    term: 'eshgh',
    meaning: 'love; "eshgham" = my love',
    tags: ['noun'],
    aliases: ['esghgh', 'eshgham', 'eshq'],
    usages: [
      {
        register: 'informal',
        finglish: 'eshgh-e zendegimi',
        english: 'You are the love of my life.',
      },
      {
        register: 'formal',
        finglish: 'shoma eshgh-e zendegi-ye man hastid',
        english: 'You are the love of my life.',
      },
    ],
  },
  {
    term: 'etebār',
    meaning: 'trust; credit, credibility',
    tags: ['noun'],
    aliases: ['ehtemad', 'etemad'],
    note: 'The spelling "ehtemad" most likely means "etemad" (trust).',
    usages: [
      { register: 'informal', finglish: 'behet etemad daram', english: 'I trust you.' },
      { register: 'formal', finglish: 'be shoma etemad daram', english: 'I trust you.' },
    ],
  },
  {
    term: "e'teraz",
    meaning: 'objection, protest',
    tags: ['noun'],
    aliases: ['ehteraz', 'eteraz'],
    usages: [
      { register: 'informal', finglish: 'be inkar e’teraz daram', english: 'I object to this.' },
      { register: 'formal', finglish: 'be in amr e’teraz daram', english: 'I object to this.' },
    ],
  },
  {
    term: 'ettefāghan',
    meaning: 'actually; as it happens; by coincidence',
    tags: ['phrase'],
    aliases: ['ekhtefaghan', 'etefaghan', 'ettefaaghan'],
    usages: [
      {
        register: 'informal',
        finglish: 'ettefaghan manam hamino fekr mikardam',
        english: 'Actually, I was thinking the same thing.',
      },
      {
        register: 'formal',
        finglish: 'ettefaghan bande ham hamin nazar ra dashtam',
        english: 'Actually, I was thinking the same thing.',
      },
    ],
  },
  {
    term: 'ehsās',
    meaning: 'feeling, sense; "ehsas mikonam / hes mikonam" = I feel',
    tags: ['noun'],
    aliases: ['ehsas konam', 'hess konam', 'hes mikonam', 'ehsaas'],
    usages: [
      { register: 'informal', finglish: 'ehsas mikonam khastam', english: 'I feel tired.' },
      { register: 'formal', finglish: 'ehsas-e khastegi mikonam', english: 'I feel tired.' },
    ],
  },
  {
    term: 'fake',
    meaning: 'fake, insincere (English loanword used in Finglish slang)',
    tags: ['adjective', 'slang'],
    note: 'Borrowed straight from English; common among younger speakers. A native synonym is "ghalabi".',
    usages: [
      { register: 'informal', finglish: 'in account fake-e', english: 'This account is fake.' },
      { register: 'formal', finglish: 'in hesab ja’li ast', english: 'This account is fake.' },
    ],
  },
  {
    term: 'farāmūsham kon',
    meaning: 'forget me',
    tags: ['phrase'],
    aliases: ['faramusham kon'],
    usages: [
      { register: 'informal', finglish: 'faramoosham kon', english: 'Forget me.' },
      { register: 'formal', finglish: 'lotfan mara faramoosh konid', english: 'Please forget me.' },
    ],
  },
  {
    term: 'fardā',
    meaning: 'tomorrow',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'farda mibinamet', english: 'See you tomorrow.' },
      { register: 'formal', finglish: 'farda shoma ra mibinam', english: 'See you tomorrow.' },
    ],
  },
  {
    term: 'fohsh',
    meaning: 'a swear word, insult; "fohsh dadan" = to curse at someone',
    tags: ['noun'],
    aliases: ['fosh', 'fosht', 'fohsh dadan'],
    usages: [
      { register: 'informal', finglish: 'fohsh nade', english: "Don't curse." },
      { register: 'formal', finglish: 'lotfan fohsh nadahid', english: "Please don't curse." },
    ],
  },
  {
    term: 'forūsh',
    meaning: 'sale, selling; "beforush" = sell it',
    tags: ['noun'],
    aliases: ['forsh bedeh', 'foroosh', 'forush bede'],
    note: 'Reading "forsh bedeh" as "forush/beforoosh" (to sell). If you meant cursing, see "fohsh".',
    usages: [
      { register: 'informal', finglish: 'in mashin ro beforoosh', english: 'Sell this car.' },
      {
        register: 'formal',
        finglish: 'lotfan in mashin ra beforooshid',
        english: 'Please sell this car.',
      },
    ],
  },
  {
    term: 'gāeede',
    meaning: 'vulgar past form of the verb "to f***" (gāyidan)',
    tags: ['verb', 'vulgar', 'offensive'],
    aliases: ['gayiedeh', 'gaeedeh', 'gaide'],
    note: 'Extremely vulgar and offensive. Listed for understanding only; avoid using it. The figurative "gaeede shod" can mean "it got ruined / I’m screwed".',
    usages: [
      {
        register: 'informal',
        finglish: 'avza gaeede shode',
        english: 'The situation is ruined. (very vulgar)',
      },
      {
        register: 'formal',
        finglish: 'sharayet kheyli bad shode ast',
        english: 'The situation is ruined. (clean equivalent)',
      },
    ],
  },
  {
    term: 'ghabūl',
    meaning: 'accepted, agreed; "ghaboole" = it’s a deal',
    tags: ['adjective'],
    aliases: ['ghabul', 'ghabool dari', 'qabul'],
    usages: [
      { register: 'informal', finglish: 'ghaboole', english: "It's a deal." },
      { register: 'formal', finglish: 'ghabool ast', english: 'It is accepted.' },
    ],
  },
  {
    term: 'ghafas',
    meaning: 'cage',
    tags: ['noun'],
    aliases: ['ghafass', 'qafas'],
    usages: [
      { register: 'informal', finglish: 'parande tu ghafase', english: 'The bird is in the cage.' },
      {
        register: 'formal',
        finglish: 'parande dar ghafas ast',
        english: 'The bird is in the cage.',
      },
    ],
  },
  {
    term: 'ghalyūn',
    meaning: 'hookah, water pipe (qalyan)',
    tags: ['noun'],
    aliases: ['ghaliyoon', 'ghalyan', 'qalyan'],
    usages: [
      { register: 'informal', finglish: 'ghalyoon mikeshi?', english: 'Do you smoke hookah?' },
      { register: 'formal', finglish: 'ghalyoon mikeshid?', english: 'Do you smoke hookah?' },
    ],
  },
  {
    term: 'gharūr',
    meaning: 'pride, arrogance; "maghroor" = proud/arrogant',
    tags: ['noun'],
    aliases: ['ghoroor', 'ghorur', 'qorur'],
    note: 'Can be positive (self-respect) or negative (arrogance) depending on context.',
    usages: [
      {
        register: 'informal',
        finglish: 'enghadr maghroor nabash',
        english: "Don't be so arrogant.",
      },
      {
        register: 'formal',
        finglish: 'lotfan inghadr maghroor nabashid',
        english: "Please don't be so arrogant.",
      },
    ],
  },
  {
    term: 'ghashang',
    meaning: 'pretty, beautiful, nice',
    tags: ['adjective'],
    aliases: ['qashang'],
    usages: [
      { register: 'informal', finglish: 'che ghashang shodi', english: 'How pretty you look.' },
      { register: 'formal', finglish: 'che ghashang shodid', english: 'How pretty you look.' },
    ],
  },
  {
    term: 'ghātī',
    meaning: 'mixed up, confused; (slang) unhinged',
    tags: ['adjective', 'slang'],
    aliases: ['qati', 'ghaati'],
    usages: [
      {
        register: 'informal',
        finglish: 'ghati kardam, sabr kon',
        english: 'I got confused, hold on.',
      },
      {
        register: 'formal',
        finglish: 'ghati kardam, lotfan sabr konid',
        english: 'I got confused, please hold on.',
      },
    ],
  },
  {
    term: 'ghazā',
    meaning: 'food, meal',
    tags: ['noun'],
    aliases: ['qaza', 'ghazaa'],
    usages: [
      { register: 'informal', finglish: 'ghaza hazere', english: 'The food is ready.' },
      { register: 'formal', finglish: 'ghaza amade ast', english: 'The food is ready.' },
    ],
  },
  {
    term: 'ghūl',
    meaning: 'giant, ogre; "ghoole" = it’s a giant',
    tags: ['noun'],
    aliases: ['ghooleh', 'ghul', 'qul'],
    note: 'Note: "ghol/ghowl" with a different spelling means "a promise".',
    usages: [
      { register: 'informal', finglish: 'mese ghoole', english: 'He is like a giant.' },
      { register: 'formal', finglish: 'mesl-e ghool ast', english: 'He is like a giant.' },
    ],
  },
  {
    term: 'ghorbūnet beram',
    meaning: 'an endearment: "I’d sacrifice myself for you" (≈ "you’re so dear to me")',
    tags: ['phrase'],
    aliases: ['ghorboon', 'ghorbanet', 'ghorbunet beram', 'ghorboonet'],
    note: 'Very common ta’arof of affection or thanks; not literal.',
    usages: [
      {
        register: 'informal',
        finglish: 'ghorboonet beram, mersi',
        english: 'Bless you, thank you.',
      },
      {
        register: 'formal',
        finglish: 'ghorban-e shoma, motshakeram',
        english: 'Bless you, thank you.',
      },
    ],
  },
  {
    term: 'gorosne',
    meaning: 'hungry',
    tags: ['adjective'],
    aliases: ['gorosneh', 'goshne', 'gorosna'],
    usages: [
      { register: 'informal', finglish: 'kheyli gorosname', english: 'I am very hungry.' },
      { register: 'formal', finglish: 'kheyli gorosne hastam', english: 'I am very hungry.' },
    ],
  },
  {
    term: 'gūsht',
    meaning: 'meat',
    tags: ['noun'],
    aliases: ['goosht'],
    usages: [
      { register: 'informal', finglish: 'gusht dust dari?', english: 'Do you like meat?' },
      { register: 'formal', finglish: 'gusht dust darid?', english: 'Do you like meat?' },
    ],
  },
  {
    term: 'habs',
    meaning: 'prison, imprisonment; "habs kardan" = to imprison',
    tags: ['noun'],
    aliases: ['haps', 'habss'],
    usages: [
      { register: 'informal', finglish: 'oono habs kardan', english: 'They put him in prison.' },
      {
        register: 'formal',
        finglish: 'oo ra be habs andakhtand',
        english: 'They put him in prison.',
      },
    ],
  },
  {
    term: 'hadeaghal',
    meaning: 'at least; minimum',
    tags: ['phrase'],
    aliases: ['haghdaghal', 'hadaghal', 'haddeaghal'],
    usages: [
      {
        register: 'informal',
        finglish: 'hadeaghal ye zang bezan',
        english: 'At least give me a call.',
      },
      {
        register: 'formal',
        finglish: 'hadeaghal yek tamas begirid',
        english: 'At least give me a call.',
      },
    ],
  },
  {
    term: 'harekat',
    meaning: 'movement, action, gesture; (slang) "a move / a stunt"',
    tags: ['noun', 'slang'],
    aliases: ['harikat', 'harifikat', 'herekat'],
    usages: [
      { register: 'informal', finglish: 'che harekat-e ghashangi', english: 'What a nice move.' },
      { register: 'formal', finglish: 'che harekat-e ziba-i', english: 'What a nice move.' },
    ],
  },
  {
    term: 'hayāt',
    meaning: 'courtyard, yard; (different word) life',
    tags: ['noun'],
    aliases: ['hayaat'],
    note: 'Two senses by vowel: "hayat" = yard, "hayāt" = life.',
    usages: [
      {
        register: 'informal',
        finglish: 'tu hayat bazi mikardim',
        english: 'We were playing in the yard.',
      },
      {
        register: 'formal',
        finglish: 'dar hayat bazi mikardim',
        english: 'We were playing in the yard.',
      },
    ],
  },
  {
    term: 'jahān',
    meaning: 'world',
    farsi: 'جهان',
    tags: ['noun'],
    aliases: ['jahaan'],
    usages: [
      { register: 'informal', finglish: 'jahan ro begard', english: 'Travel the world.' },
      { register: 'formal', finglish: 'jahan ra begardid', english: 'Travel the world.' },
    ],
  },
  {
    term: 'jodā',
    meaning: 'separate, apart; "jodā shodan" = to separate / break up',
    farsi: 'جدا',
    tags: ['adjective'],
    aliases: ['joda', 'juda', 'jodaa'],
    usages: [
      {
        register: 'informal',
        finglish: 'az ham jodā shodim',
        english: 'We separated / broke up.',
      },
      {
        register: 'formal',
        finglish: 'az yekdigar jodā shodim',
        english: 'We separated from each other.',
      },
    ],
  },
  {
    term: 'jalāl',
    meaning: 'glory, splendor, majesty (also a given name)',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'che jalali', english: 'What splendor.' },
      { register: 'formal', finglish: 'che jalal-o shokoohi', english: 'What splendor.' },
    ],
  },
  {
    term: 'jān',
    meaning: 'dear, life, soul; an affectionate suffix (e.g., "Ali-jan")',
    tags: ['noun'],
    aliases: ['joon', 'joon', 'jaan'],
    usages: [
      { register: 'informal', finglish: 'Sara jan, biya inja', english: 'Sara dear, come here.' },
      {
        register: 'formal',
        finglish: 'Sara jan, biyaeed',
        english: 'Sara dear, please come here.',
      },
    ],
  },
  {
    term: 'jorm',
    meaning: 'crime, offense',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'in ke jorm nist', english: "That's not a crime." },
      { register: 'formal', finglish: 'in amal jorm nist', english: 'This act is not a crime.' },
    ],
  },
  {
    term: 'kār',
    meaning: 'work, job, task',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'sar-e karam', english: 'I am at work.' },
      { register: 'formal', finglish: 'sar-e kar hastam', english: 'I am at work.' },
    ],
  },
  {
    term: 'kelīd',
    meaning: 'key',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'kelid ro gom kardam', english: 'I lost the key.' },
      { register: 'formal', finglish: 'kelid ra gom kardam', english: 'I lost the key.' },
    ],
  },
  {
    term: 'ketāb',
    meaning: 'book',
    tags: ['noun'],
    aliases: ['ketaab'],
    usages: [
      { register: 'informal', finglish: 'in ketab ro bekhoon', english: 'Read this book.' },
      {
        register: 'formal',
        finglish: 'lotfan in ketab ra bekhanid',
        english: 'Please read this book.',
      },
    ],
  },
  {
    term: 'khaste',
    meaning: 'tired; "khaste nabashi" = "well done / thanks for your effort"',
    tags: ['adjective'],
    aliases: ['khasteh', 'khaste nabashi'],
    usages: [
      { register: 'informal', finglish: 'kheyli khastam', english: 'I am very tired.' },
      { register: 'formal', finglish: 'kheyli khaste hastam', english: 'I am very tired.' },
    ],
  },
  {
    term: 'khatarnāk',
    meaning: 'dangerous',
    tags: ['adjective'],
    aliases: ['khatarnaki', 'khatarnaak'],
    usages: [
      {
        register: 'informal',
        finglish: 'in kheyli khatarnake',
        english: 'This is very dangerous.',
      },
      {
        register: 'formal',
        finglish: 'in kheyli khatarnak ast',
        english: 'This is very dangerous.',
      },
    ],
  },
  {
    term: 'khātere',
    meaning: 'memory, recollection',
    tags: ['noun'],
    aliases: ['khaterah', 'khatereh'],
    usages: [
      {
        register: 'informal',
        finglish: 'che khatere-ye khoobi bood',
        english: 'What a good memory that was.',
      },
      {
        register: 'formal',
        finglish: 'che khatere-ye khoobi ast',
        english: 'What a good memory that is.',
      },
    ],
  },
  {
    term: 'khedmat',
    meaning: 'service; "dar khedmatetoon" = at your service',
    tags: ['noun'],
    aliases: ['khetmatoon', 'khedmatetoon', 'khedmatoon'],
    usages: [
      { register: 'informal', finglish: 'dar khedmatetam', english: 'I am at your service.' },
      {
        register: 'formal',
        finglish: 'dar khedmat-e shoma hastam',
        english: 'I am at your service.',
      },
    ],
  },
  {
    term: 'khejālat bekesh',
    meaning: 'shame on you; be ashamed',
    tags: ['phrase'],
    aliases: ['jalat bekesh', 'khejalat bekesh', 'khejalat'],
    usages: [
      { register: 'informal', finglish: 'khejalat bekesh!', english: 'Shame on you!' },
      { register: 'formal', finglish: 'khejalat bekeshid', english: 'You should be ashamed.' },
    ],
  },
  {
    term: 'khiyāl',
    meaning: 'thought, imagination, notion; "khiyalet rahat" = rest assured',
    tags: ['noun'],
    aliases: ['khial', 'khiaal'],
    usages: [
      { register: 'informal', finglish: 'khiyalet rahat', english: 'Rest assured.' },
      { register: 'formal', finglish: 'khiyaletan rahat', english: 'Rest assured.' },
    ],
  },
  {
    term: 'khodāhāfez',
    meaning: 'goodbye (lit. "God protect you")',
    farsi: 'خداحافظ',
    tags: ['phrase', 'greeting'],
    aliases: ['khodahafez', 'khoda hafez', 'khodafez', 'khdahafez'],
    usages: [
      { register: 'informal', finglish: 'khodāfez, movāzeb bāsh', english: 'Bye, take care.' },
      {
        register: 'formal',
        finglish: 'khodāhāfez, movāzeb-e khodetān bāshid',
        english: 'Goodbye, take care.',
      },
    ],
  },
  {
    term: 'khūb',
    meaning: 'good, well',
    farsi: 'خوب',
    tags: ['adjective'],
    aliases: ['khub', 'khoub'],
    usages: [
      {
        register: 'informal',
        finglish: 'khoobam, mersi',
        farsi: 'خوبم، مرسی',
        english: 'I am good, thanks.',
      },
      {
        register: 'formal',
        finglish: 'man khoob hastam, motshakeram',
        farsi: 'من خوب هستم، متشکرم',
        english: 'I am well, thank you.',
      },
    ],
  },
  {
    term: 'khoshhāl',
    meaning: 'happy, glad',
    tags: ['adjective'],
    aliases: ['khoshhaal', 'khoshhaal'],
    usages: [
      { register: 'informal', finglish: 'kheyli khoshhalam', english: 'I am very happy.' },
      { register: 'formal', finglish: 'kheyli khoshhal hastam', english: 'I am very happy.' },
    ],
  },
  {
    term: 'khūbam',
    farsi: 'خوبم',
    meaning: 'I’m good / I’m fine',
    tags: ['phrase', 'greeting'],
    aliases: ['khobam', 'khoobam', 'khubaam'],
    note: 'The classic answer to "chetori?". All these spellings converge to the same word.',
    usages: [
      {
        register: 'informal',
        finglish: 'khubam, to chetori?',
        farsi: 'خوبم، تو چطوری؟',
        english: 'I am good, how about you?',
      },
      {
        register: 'formal',
        finglish: 'khubam, shoma chetorid?',
        farsi: 'خوبم، شما چطورید؟',
        english: 'I am well, how are you?',
      },
    ],
  },
  {
    term: 'khūne',
    meaning: 'house, home',
    tags: ['noun'],
    aliases: ['khaneh', 'khoone', 'khane'],
    note: '"khoone" is the casual pronunciation; "khane/manzel" is more formal.',
    usages: [
      { register: 'informal', finglish: 'khoonei?', english: 'Are you home?' },
      { register: 'formal', finglish: 'manzel hastid?', english: 'Are you home?' },
    ],
  },
  {
    term: 'khānegī',
    meaning: 'homemade; domestic, home-based',
    tags: ['adjective'],
    aliases: ['khoonegi', 'khunegi', 'khanegui'],
    usages: [
      {
        register: 'informal',
        finglish: 'ghaza-ye khoonegi kheyli khoobe',
        english: 'Homemade food is really good.',
      },
      {
        register: 'formal',
        finglish: 'ghaza-ye khanegi kheyli khoob ast',
        english: 'Homemade food is really good.',
      },
    ],
  },
  {
    term: 'khāhesh mikonam',
    meaning: 'you’re welcome; please (when requesting)',
    tags: ['phrase'],
    aliases: ['khahesh mikonam', 'khaahesh mikonam'],
    usages: [
      {
        register: 'informal',
        finglish: 'khahesh mikonam, ghabeli nadasht',
        english: "You're welcome, it was nothing.",
      },
      {
        register: 'formal',
        finglish: 'khahesh mikonam, vazife bood',
        english: "You're welcome, it was my pleasure.",
      },
    ],
  },
  {
    term: 'khosh āmadīd',
    meaning: 'welcome',
    tags: ['phrase', 'greeting'],
    aliases: ['khosh oomadi', 'khosh amadi', 'khosh oomadid'],
    usages: [
      { register: 'informal', finglish: 'khosh oomadi', english: 'Welcome!' },
      { register: 'formal', finglish: 'khosh amadid', english: 'Welcome.' },
    ],
  },
  {
    term: 'kī',
    meaning: 'who; (also "key") when',
    tags: ['phrase'],
    aliases: ['key'],
    usages: [
      { register: 'informal', finglish: 'ki bood?', english: 'Who was it?' },
      { register: 'formal', finglish: 'che kasi bood?', english: 'Who was it?' },
    ],
  },
  {
    term: 'kojā',
    meaning: 'where',
    tags: ['phrase'],
    aliases: ['kojaa'],
    usages: [
      { register: 'informal', finglish: 'koja miri?', english: 'Where are you going?' },
      {
        register: 'formal',
        finglish: 'koja mirid?',
        english: 'Where are you going?',
      },
    ],
  },
  {
    term: 'kūdak',
    meaning: 'child, infant',
    tags: ['noun'],
    aliases: ['kudak', 'koudak'],
    usages: [
      { register: 'informal', finglish: 'bache khabide', english: 'The child is asleep.' },
      { register: 'formal', finglish: 'koodak khabide ast', english: 'The child is asleep.' },
    ],
  },
  {
    term: 'kūche',
    meaning: 'alley, lane, side street',
    tags: ['noun'],
    aliases: ['koocheh', 'koche', 'kucheh'],
    usages: [
      {
        register: 'informal',
        finglish: 'sar-e kuche mibinamet',
        english: 'I will meet you at the corner of the alley.',
      },
      {
        register: 'formal',
        finglish: 'sar-e kuche khedmat miresam',
        english: 'I will meet you at the corner of the alley.',
      },
    ],
  },
  {
    term: 'kūchīk',
    meaning: 'small, little',
    tags: ['adjective'],
    aliases: ['koochik', 'kuchak', 'koochak'],
    usages: [
      { register: 'informal', finglish: 'ye kuchik mikham', english: 'I want a small one.' },
      {
        register: 'formal',
        finglish: 'yek adad-e kuchak mikhaham',
        english: 'I would like a small one.',
      },
    ],
  },
  {
    term: 'lāmasab',
    meaning: 'you wretch / you devil (mild curse, often playful; lit. "without faith")',
    tags: ['phrase', 'slang'],
    aliases: ['lamasad', 'lamasb', 'lamazhab'],
    note: 'Mild and often affectionate-exasperated, like "you rascal".',
    usages: [
      {
        register: 'informal',
        finglish: 'lamasab, baz dir kardi',
        english: 'You rascal, you were late again.',
      },
      {
        register: 'formal',
        finglish: 'baz ham dir kardid',
        english: 'You were late again.',
      },
    ],
  },
  {
    term: "la'nat",
    meaning: 'damn, curse; "la’nati" = damned (one)',
    tags: ['phrase', 'offensive'],
    aliases: ['lahnat', 'lanat', 'lanati', 'lahnati', 'laanat'],
    note: 'A curse word; "la’nat be..." = "damn...". Moderately strong.',
    usages: [
      { register: 'informal', finglish: 'la’nat behet', english: 'A curse upon you.' },
      { register: 'formal', finglish: 'nefrin bar to', english: 'A curse upon you.' },
    ],
  },
  {
    term: 'lāle',
    meaning: 'tulip (also a given name)',
    tags: ['noun'],
    aliases: ['lale'],
    usages: [
      { register: 'informal', finglish: 'laleha shekoftan', english: 'The tulips have bloomed.' },
      {
        register: 'formal',
        finglish: 'laleha shekofte and',
        english: 'The tulips have bloomed.',
      },
    ],
  },
  {
    term: 'lotfan',
    farsi: 'لطفاً',
    meaning: 'please',
    tags: ['phrase'],
    aliases: ['lotfaa'],
    usages: [
      {
        register: 'informal',
        finglish: 'lotfan sabr kon',
        farsi: 'لطفاً صبر کن',
        english: 'Please wait.',
      },
      {
        register: 'formal',
        finglish: 'lotfan sabr konid',
        farsi: 'لطفاً صبر کنید',
        english: 'Please wait.',
      },
    ],
  },
  {
    term: 'mā',
    farsi: 'ما',
    meaning: 'we, us',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'ma miaim', farsi: 'ما میایم', english: 'We are coming.' },
      {
        register: 'formal',
        finglish: 'ma miyaeem',
        farsi: 'ما می‌آییم',
        english: 'We are coming.',
      },
    ],
  },
  {
    term: 'māmān',
    meaning: 'mom, mum',
    tags: ['noun'],
    aliases: ['maaman'],
    note: '"maman" is casual; "madar" is the formal word for mother.',
    usages: [
      { register: 'informal', finglish: 'maman kojast?', english: 'Where is mom?' },
      { register: 'formal', finglish: 'madar koja hastand?', english: 'Where is mother?' },
    ],
  },
  {
    term: 'mamnūn',
    meaning: 'thankful; thanks',
    farsi: 'ممنون',
    tags: ['phrase'],
    aliases: ['mamnun', 'mamnoon', 'merci'],
    usages: [
      {
        register: 'informal',
        finglish: 'mamnoon dādāsh',
        farsi: 'ممنون داداش',
        english: 'Thank you very much.',
      },
      {
        register: 'formal',
        finglish: 'kheyli mamnoonam',
        farsi: 'خیلی ممنونم',
        english: 'Thank you very much.',
      },
    ],
  },
  {
    term: 'man',
    farsi: 'من',
    meaning: 'I, me',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'man miam', farsi: 'من میام', english: 'I will come.' },
      { register: 'formal', finglish: 'man miyayam', farsi: 'من میایم', english: 'I will come.' },
    ],
  },
  {
    term: 'mard',
    meaning: 'man',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'mard-e khoobiye', english: 'He is a good man.' },
      { register: 'formal', finglish: 'mard-e khoobi ast', english: 'He is a good man.' },
    ],
  },
  {
    term: 'marg',
    meaning: 'death; "marget" = "your death" (used in curses)',
    tags: ['noun', 'offensive'],
    aliases: ['margeht', 'marget', 'margh'],
    note: '"marg bar..." = "death to...". "margeht/marget" is rude; here the polite version simply asks for quiet.',
    usages: [
      { register: 'informal', finglish: 'marg, sedaato bebor', english: 'Be quiet! (very rude)' },
      { register: 'formal', finglish: 'lotfan saaket shavid', english: 'Please be quiet.' },
    ],
  },
  {
    term: 'māshīn',
    meaning: 'car; machine',
    tags: ['noun'],
    aliases: ['maashin'],
    usages: [
      { register: 'informal', finglish: 'mashinam kharab shod', english: 'My car broke down.' },
      {
        register: 'formal',
        finglish: 'mashin-e man kharab shod',
        english: 'My car broke down.',
      },
    ],
  },
  {
    term: 'mast',
    meaning: 'drunk; (also "mast" = yogurt)',
    tags: ['adjective'],
    aliases: ['mast shodi', 'mast shodee'],
    note: '"mast shodi" = you got drunk. The identical spelling "mast" also means yogurt.',
    usages: [
      { register: 'informal', finglish: 'mast shodi?', english: 'Did you get drunk?' },
      { register: 'formal', finglish: 'mast shodid?', english: 'Did you get drunk?' },
    ],
  },
  {
    term: 'mehrabūn',
    farsi: 'مهربون',
    meaning: 'kind, compassionate',
    tags: ['adjective'],
    aliases: ['mehrabun', 'mehraban', 'mehraboon'],
    usages: [
      {
        register: 'informal',
        finglish: 'to kheili mehrabooni',
        farsi: 'تو خیلی مهربونی',
        english: 'You are very kind.',
      },
      {
        register: 'formal',
        finglish: 'shoma kheili mehraboon hastid',
        farsi: 'شما خیلی مهربون هستید',
        english: 'You are very kind.',
      },
    ],
  },
  {
    term: 'mīsāze',
    meaning: 'it agrees with / suits (me); "nemisaze" = it doesn’t agree with me',
    tags: ['verb'],
    aliases: ['nemisaze', 'misazeh', 'nemisazeh'],
    note: 'Used for food, weather, or situations that do or don’t suit one.',
    usages: [
      {
        register: 'informal',
        finglish: 'in ghaza behem nemisaze',
        english: "This food doesn't agree with me.",
      },
      {
        register: 'formal',
        finglish: 'in ghaza ba man saazgar nist',
        english: "This food doesn't agree with me.",
      },
    ],
  },
  {
    term: 'montazer',
    meaning: 'waiting; "montazeram" = I’m waiting',
    tags: ['adjective'],
    aliases: ['montazerah', 'montazeram', 'montazere'],
    usages: [
      { register: 'informal', finglish: 'montazeretam', english: 'I am waiting for you.' },
      {
        register: 'formal',
        finglish: 'montazer-e shoma hastam',
        english: 'I am waiting for you.',
      },
    ],
  },
  {
    term: 'moteasefāne',
    meaning: 'unfortunately',
    tags: ['phrase'],
    aliases: ['mortasefaneh', 'moteasefaneh', 'motasefane'],
    usages: [
      {
        register: 'informal',
        finglish: 'moteasefane natunestam biam',
        english: "Unfortunately I couldn't come.",
      },
      {
        register: 'formal',
        finglish: 'moteasefane natavanestam biyayam',
        english: "Unfortunately I couldn't come.",
      },
    ],
  },
  {
    term: 'motenafer',
    meaning: 'disgusted, loathing; "motenaferam" = I loathe it',
    tags: ['adjective'],
    aliases: ['motanaferam', 'motenaferam', 'motenafser'],
    usages: [
      { register: 'informal', finglish: 'azash motenaferam', english: 'I loathe it.' },
      { register: 'formal', finglish: 'az an motenafer hastam', english: 'I loathe it.' },
    ],
  },
  {
    term: 'mojavvez',
    meaning: 'permit, license, authorization',
    tags: ['noun'],
    aliases: ['mojaveh', 'mojavez', 'mojavvaz'],
    note: 'Reading the ambiguous "mojaveh" as "mojavvez" (permit).',
    usages: [
      { register: 'informal', finglish: 'mojavvez dari?', english: 'Do you have a permit?' },
      { register: 'formal', finglish: 'mojavvez darid?', english: 'Do you have a permit?' },
    ],
  },
  {
    term: 'mūshak',
    meaning: 'missile, rocket',
    tags: ['noun'],
    aliases: ['moshak', 'mushak'],
    usages: [
      {
        register: 'informal',
        finglish: 'mese mooshak raft',
        english: 'He took off like a rocket.',
      },
      {
        register: 'formal',
        finglish: 'mesle mooshak raft',
        english: 'He took off like a rocket.',
      },
    ],
  },
  {
    term: 'mordeshūr',
    meaning: 'corpse-washer; used in the strong curse "mordeshooreto bebaran"',
    tags: ['noun', 'offensive'],
    aliases: ['mordehshoor', 'mordeshoor', 'mordeshooreto'],
    note: 'Part of a harsh traditional curse; here the polite version simply states the situation is awful.',
    usages: [
      {
        register: 'informal',
        finglish: 'mordeshoore in vaz’o bebaran',
        english: 'This situation is awful. (very rude)',
      },
      {
        register: 'formal',
        finglish: 'in vaziyat kheyli naagovaar ast',
        english: 'This situation is awful.',
      },
    ],
  },
  {
    term: 'na',
    meaning: 'no',
    tags: ['phrase'],
    usages: [
      { register: 'informal', finglish: 'na baba', english: 'No, thanks.' },
      { register: 'formal', finglish: 'na, motshakeram', english: 'No, thank you.' },
    ],
  },
  {
    term: 'nān',
    meaning: 'bread',
    tags: ['noun'],
    aliases: ['noon', 'naan'],
    note: '"noon" is the casual pronunciation of "nan".',
    usages: [
      { register: 'informal', finglish: 'noon biyar', english: 'Bring bread.' },
      { register: 'formal', finglish: 'lotfan nan biyavarid', english: 'Please bring bread.' },
    ],
  },
  {
    term: 'nārāhat',
    meaning: 'upset, sad, uncomfortable',
    tags: ['adjective'],
    aliases: ['naraahat'],
    usages: [
      { register: 'informal', finglish: 'narahat nasho', english: "Don't be upset." },
      { register: 'formal', finglish: 'narahat nashavid', english: "Please don't be upset." },
    ],
  },
  {
    term: 'nashe',
    meaning: 'high, intoxicated; "nashe shodi" = you got high',
    tags: ['adjective', 'slang'],
    aliases: ['nasheh', 'nasheh shodee', 'nashe shodi'],
    usages: [
      { register: 'informal', finglish: 'nashe shodi?', english: 'Did you get high?' },
      { register: 'formal', finglish: 'nashe shodid?', english: 'Did you get high?' },
    ],
  },
  {
    term: 'ū',
    meaning: 'he, she',
    tags: ['noun'],
    aliases: ['u'],
    note: '"oo" is neutral; "ishan" is the polite/honorific third person.',
    usages: [
      { register: 'informal', finglish: 'oo nayoomad', english: "He didn't come." },
      {
        register: 'formal',
        finglish: 'ishan nayamadand',
        english: "He didn't come.",
      },
    ],
  },
  {
    term: 'oskol',
    meaning: 'dimwit, idiot (slang insult)',
    tags: ['noun', 'slang', 'offensive'],
    aliases: ['osgal', 'oskal', 'oskul'],
    note: 'Casual insult among friends; still rude to strangers.',
    usages: [
      { register: 'informal', finglish: 'oskol bazi darnyar', english: "Don't act like a fool." },
      {
        register: 'formal',
        finglish: 'lotfan ablahane raftar nakonid',
        english: "Please don't act foolishly.",
      },
    ],
  },
  {
    term: 'pāk',
    meaning: 'clean, pure; "pak kardan" = to erase/clean',
    tags: ['adjective', 'verb'],
    aliases: ['paak'],
    usages: [
      { register: 'informal', finglish: 'in khat ro pak kon', english: 'Erase this line.' },
      {
        register: 'formal',
        finglish: 'lotfan in khat ra pak konid',
        english: 'Please erase this line.',
      },
    ],
  },
  {
    term: 'parvāne',
    meaning: 'butterfly; also a license (e.g., business permit), and a given name',
    tags: ['noun'],
    aliases: ['parvaneh'],
    usages: [
      {
        register: 'informal',
        finglish: 'che parvane-ye ghashangi',
        english: 'What a pretty butterfly.',
      },
      {
        register: 'formal',
        finglish: 'che parvane-ye ziba-i',
        english: 'What a pretty butterfly.',
      },
    ],
  },
  {
    term: 'pedar',
    meaning: 'father',
    tags: ['noun'],
    note: '"baba" is the casual word; "pedar" is the formal word for father.',
    usages: [
      { register: 'informal', finglish: 'babat chetore?', english: 'How is your father?' },
      { register: 'formal', finglish: 'pedaretan chetorand?', english: 'How is your father?' },
    ],
  },
  {
    term: 'pesar',
    meaning: 'boy; son',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'pesar-e khoobiye', english: 'He is a good boy.' },
      { register: 'formal', finglish: 'pesar-e khoobi ast', english: 'He is a good boy.' },
    ],
  },
  {
    term: 'pūl',
    meaning: 'money',
    tags: ['noun'],
    aliases: ['pul'],
    usages: [
      { register: 'informal', finglish: 'pool nadaram', english: "I don't have any money." },
      { register: 'formal', finglish: 'pooli nadaram', english: "I don't have any money." },
    ],
  },
  {
    term: 'porrū',
    meaning: 'cheeky, insolent, shameless',
    tags: ['adjective', 'slang'],
    aliases: ['poro', 'porru', 'poroo'],
    usages: [
      { register: 'informal', finglish: 'kheyli porroei', english: 'You are so cheeky.' },
      {
        register: 'formal',
        finglish: 'shoma kheyli porroo hastid',
        english: 'You are so cheeky.',
      },
    ],
  },
  {
    term: "ro'yat",
    meaning: 'sighting, viewing; "ghabel-e ro’yat" = visible',
    tags: ['noun'],
    aliases: ['royat', 'roeyat'],
    note: 'Formal word for "seeing/observing". Note "roya" (with no glottal stop) means "dream".',
    usages: [
      { register: 'informal', finglish: 'maah ghabel-e didane', english: 'The moon is visible.' },
      { register: 'formal', finglish: 'maah ghabel-e ro’yat ast', english: 'The moon is visible.' },
    ],
  },
  {
    term: 'royā',
    meaning: 'dream (also a given name)',
    tags: ['noun'],
    aliases: ['roia', 'rouya'],
    usages: [
      { register: 'informal', finglish: 'royahato donbal kon', english: 'Follow your dreams.' },
      {
        register: 'formal',
        finglish: 'royahaye khod ra donbal konid',
        english: 'Follow your dreams.',
      },
    ],
  },
  {
    term: 'rūz',
    meaning: 'day',
    tags: ['noun'],
    aliases: ['ruz'],
    usages: [
      { register: 'informal', finglish: 'rooz-e khoobi dashte bashi', english: 'Have a good day.' },
      {
        register: 'formal',
        finglish: 'rooz-e khoobi dashte bashid',
        english: 'Have a good day.',
      },
    ],
  },
  {
    term: 'sāat',
    meaning: 'hour; clock; watch',
    tags: ['noun'],
    aliases: ['saaat'],
    usages: [
      { register: 'informal', finglish: 'saat chande?', english: 'What time is it?' },
      { register: 'formal', finglish: 'saat chand ast?', english: 'What time is it?' },
    ],
  },
  {
    term: 'sāde',
    meaning: 'simple, plain; naive',
    tags: ['adjective'],
    aliases: ['sadeh', 'saade'],
    usages: [
      { register: 'informal', finglish: 'kheyli sadast', english: 'It is very simple.' },
      { register: 'formal', finglish: 'kheyli sade ast', english: 'It is very simple.' },
    ],
  },
  {
    term: 'safar',
    meaning: 'trip, journey, travel',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'safar khosh begzare', english: 'Have a nice trip.' },
      {
        register: 'formal',
        finglish: 'safar-e khoshi dashte bashid',
        english: 'Have a nice trip.',
      },
    ],
  },
  {
    term: 'salām',
    meaning: 'hello, hi (lit. "peace")',
    farsi: 'سلام',
    tags: ['greeting', 'phrase'],
    aliases: ['salam', 'salaam', 'sallam'],
    usages: [
      {
        register: 'informal',
        finglish: 'salām, chetori?',
        farsi: 'سلام، چطوری؟',
        english: 'Hi, how are you?',
      },
      {
        register: 'formal',
        finglish: 'salām, haletan chetor ast?',
        farsi: 'سلام، حالتان چطور است؟',
        english: 'Hello, how are you?',
      },
    ],
  },
  {
    term: 'sardār',
    meaning: 'commander, general (military leader)',
    tags: ['noun'],
    aliases: ['sardaar'],
    usages: [
      {
        register: 'informal',
        finglish: 'mese sardara dastoor mide',
        english: 'He gives orders like a commander.',
      },
      {
        register: 'formal',
        finglish: 'mesle yek sardar dastoor midahad',
        english: 'He gives orders like a commander.',
      },
    ],
  },
  {
    term: 'se',
    meaning: 'three',
    tags: ['noun'],
    aliases: ['seh'],
    usages: [
      { register: 'informal', finglish: 'se ta mikham', english: 'I want three.' },
      { register: 'formal', finglish: 'se adad mikhaham', english: 'I would like three.' },
    ],
  },
  {
    term: 'shab',
    meaning: 'night',
    tags: ['noun'],
    aliases: ['shab bekheir', 'shab bekheyr'],
    usages: [
      { register: 'informal', finglish: 'shab bekheir', english: 'Good night.' },
      { register: 'formal', finglish: 'shabetan bekheir', english: 'Good night.' },
    ],
  },
  {
    term: 'shavad',
    meaning: '(it) becomes; may it be — formal of shodan; colloquial "beshe"',
    tags: ['verb'],
    aliases: ['beshe', 'shaved'],
    usages: [
      {
        register: 'informal',
        finglish: 'har chi beshe, beshe',
        english: 'Whatever happens, happens.',
      },
      {
        register: 'formal',
        finglish: 'har che bayad shavad, khahad shod',
        english: 'Whatever must be, will be.',
      },
    ],
  },
  {
    term: 'shīr',
    meaning: 'milk; (also) lion; faucet',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'shir mikhori?', english: 'Would you like some milk?' },
      { register: 'formal', finglish: 'shir mayel hastid?', english: 'Would you like some milk?' },
    ],
  },
  {
    term: "sho'le",
    meaning: 'flame (also "sholeh", a kind of porridge/dessert)',
    tags: ['noun'],
    aliases: ['sholeh', 'shole'],
    usages: [
      {
        register: 'informal',
        finglish: 'sho’le-ye atish boland shod',
        english: 'The flame of the fire rose.',
      },
      {
        register: 'formal',
        finglish: 'sho’le-ye atash boland shod',
        english: 'The flame of the fire rose.',
      },
    ],
  },
  {
    term: 'shomā',
    meaning: 'you (formal or plural)',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'nazaret chie?', english: 'What is your opinion?' },
      { register: 'formal', finglish: 'nazar-e shoma chist?', english: 'What is your opinion?' },
    ],
  },
  {
    term: 'shotor',
    meaning: 'camel',
    tags: ['noun'],
    aliases: ['shotur'],
    usages: [
      {
        register: 'informal',
        finglish: 'shotor tu kavir zendegi mikone',
        english: 'The camel lives in the desert.',
      },
      {
        register: 'formal',
        finglish: 'shotor dar kavir zendegi mikonad',
        english: 'The camel lives in the desert.',
      },
    ],
  },
  {
    term: 'siyāh',
    meaning: 'black',
    tags: ['adjective'],
    aliases: ['siyah'],
    usages: [
      { register: 'informal', finglish: 'lebas-e siah pooshid', english: 'He wore black clothes.' },
      {
        register: 'formal',
        finglish: 'lebas-e siah pooshidand',
        english: 'He wore black clothes.',
      },
    ],
  },
  {
    term: 'sobh bekheyr',
    meaning: 'good morning',
    tags: ['phrase', 'greeting'],
    aliases: ['sobh bekheir', 'sobh bxeir'],
    usages: [
      { register: 'informal', finglish: 'sobh bekheir', english: 'Good morning.' },
      { register: 'formal', finglish: 'sobhetan bekheir', english: 'Good morning.' },
    ],
  },
  {
    term: 'sūrākh',
    meaning: 'hole, opening',
    tags: ['noun'],
    aliases: ['surakh', 'soraakh'],
    usages: [
      { register: 'informal', finglish: 'joorab soorakh shode', english: 'The sock has a hole.' },
      {
        register: 'formal',
        finglish: 'joorab soorakh shode ast',
        english: 'The sock has a hole.',
      },
    ],
  },
  {
    term: 'tākhīr',
    meaning: 'delay; (also "taghir" = change)',
    tags: ['noun'],
    aliases: ['takir', 'taakhir', 'taghir'],
    note: 'Reading "takir" as "ta’khir" (delay). If you meant "taghir", that means "change".',
    usages: [
      { register: 'informal', finglish: 'dir resid', english: 'It arrived late.' },
      { register: 'formal', finglish: 'ba taakhir resid', english: 'It arrived with a delay.' },
    ],
  },
  {
    term: 'tāblo',
    meaning: 'sign, board; (slang) obvious, conspicuous',
    tags: ['noun', 'slang'],
    aliases: ['tablo ist', 'tabloo', 'tablo-e ist'],
    note: '"tablo-e ist" = a stop sign. As slang, "tabloee" = you’re being too obvious.',
    usages: [
      { register: 'informal', finglish: 'enghadr tablo nakon', english: "Don't be so obvious." },
      {
        register: 'formal',
        finglish: 'enghadr tablo raftar nakonid',
        english: "Don't be so obvious.",
      },
    ],
  },
  {
    term: 'tahvīl',
    meaning: 'delivery, handover; "tahvil gereftan" = to welcome / pay attention to someone',
    tags: ['noun'],
    aliases: ['tahil', 'tahvil gereftan'],
    note: 'Reading the ambiguous "tahil" as "tahvil". A near-homophone "tahlil" means "analysis".',
    usages: [
      {
        register: 'informal',
        finglish: 'aslan tahvilam nagereft',
        english: 'He paid me no attention at all.',
      },
      {
        register: 'formal',
        finglish: 'aslan be man tavajjoh nakard',
        english: 'He paid me no attention at all.',
      },
    ],
  },
  {
    term: 'tanbal',
    meaning: 'lazy',
    tags: ['adjective'],
    aliases: ['tambal'],
    usages: [
      { register: 'informal', finglish: 'tanbal nabash', english: "Don't be lazy." },
      { register: 'formal', finglish: 'lotfan tanbal nabashid', english: "Please don't be lazy." },
    ],
  },
  {
    term: 'tekke',
    meaning: 'a piece, chunk; (slang) a witty jab ("tikke andakhtan")',
    tags: ['noun', 'slang'],
    aliases: ['takkeh', 'tikke', 'teke'],
    usages: [
      {
        register: 'informal',
        finglish: 'ye tekke noon bede',
        english: 'Give me a piece of bread.',
      },
      {
        register: 'formal',
        finglish: 'lotfan yek tekke nan bedid',
        english: 'Please give me a piece of bread.',
      },
    ],
  },
  {
    term: 'teshne',
    meaning: 'thirsty',
    tags: ['adjective'],
    aliases: ['teshneh', 'teshna'],
    usages: [
      { register: 'informal', finglish: 'kheyli teshname', english: 'I am very thirsty.' },
      { register: 'formal', finglish: 'kheyli teshne hastam', english: 'I am very thirsty.' },
    ],
  },
  {
    term: 'to',
    meaning: 'you (informal singular)',
    tags: ['noun'],
    aliases: ['toh'],
    usages: [
      { register: 'informal', finglish: 'to chi fekr mikoni?', english: 'What do you think?' },
      {
        register: 'formal',
        finglish: 'shoma chi fekr mikonid?',
        english: 'What do you think?',
      },
    ],
  },
  {
    term: 'vahshatnāk',
    meaning: 'terrifying, horrible; (slang) terribly, intensely',
    tags: ['adjective', 'slang'],
    aliases: ['vashatnak', 'vahshatnaak'],
    usages: [
      {
        register: 'informal',
        finglish: 'kheyli vahshatnak bood',
        english: 'It was really terrifying.',
      },
      {
        register: 'formal',
        finglish: 'kheyli vahshatnak bood',
        english: 'It was really terrifying.',
      },
    ],
  },
  {
    term: 'vasīle',
    meaning: 'tool, device, means, thing',
    tags: ['noun'],
    aliases: ['vaseereh', 'vasileh', 'vasle'],
    note: 'Reading the ambiguous "vaseereh" as "vasile" (tool/means).',
    usages: [
      { register: 'informal', finglish: 'in vasile chie?', english: 'What is this thing?' },
      { register: 'formal', finglish: 'in vasile chist?', english: 'What is this thing?' },
    ],
  },
  {
    term: 'vasī',
    meaning: 'wide, vast, spacious',
    tags: ['adjective'],
    aliases: ['vasieh', 'vasi’', 'vasee'],
    note: 'Reading the ambiguous "vasieh" as "vasi’" (wide). A look-alike "vasiyat" means "a will/testament".',
    usages: [
      { register: 'informal', finglish: 'che ja-ye vasi-e', english: 'What a spacious place.' },
      { register: 'formal', finglish: 'che ja-ye vasi-i ast', english: 'What a spacious place.' },
    ],
  },
  {
    term: 'yār',
    meaning: 'companion, partner, beloved; teammate',
    tags: ['noun'],
    aliases: ['yaar'],
    usages: [
      { register: 'informal', finglish: 'yar-e ghadimimi', english: 'You are my old companion.' },
      {
        register: 'formal',
        finglish: 'yar-e ghadimi-ye man hastid',
        english: 'You are my old companion.',
      },
    ],
  },
  {
    term: 'yek',
    meaning: 'one',
    tags: ['noun'],
    aliases: ['ye', 'yeki'],
    usages: [
      { register: 'informal', finglish: 'ye lahze sabr kon', english: 'Wait a moment.' },
      { register: 'formal', finglish: 'yek lahze sabr konid', english: 'Please wait a moment.' },
    ],
  },
  {
    term: 'zahmat',
    meaning: 'trouble, effort; "bi zahmat" = please / if you don’t mind',
    tags: ['noun'],
    aliases: ['zahmad', 'zahmate', 'zahmat keshidi'],
    usages: [
      { register: 'informal', finglish: 'bi zahmat oono bede', english: 'Please pass that.' },
      { register: 'formal', finglish: 'bi zahmat an ra bedid', english: 'Please pass that.' },
    ],
  },
  {
    term: 'zahremār',
    meaning: 'snake venom — an interjection like "shut up! / damn it!"',
    tags: ['phrase', 'slang', 'offensive'],
    aliases: ['zahreh mar', 'zahre mar', 'zahlimordeh', 'zahremaar'],
    note: 'Rude/dismissive. Sometimes snapped to brush someone off. "zahlimordeh" is treated as a related scolding; the polite version simply asks them to stop.',
    usages: [
      { register: 'informal', finglish: 'zahremar, hey nagu', english: 'Stop saying that!' },
      { register: 'formal', finglish: 'lotfan digar nagooid', english: 'Please stop saying that.' },
    ],
  },
  {
    term: 'zakhm',
    meaning: 'wound, injury, sore',
    tags: ['noun'],
    usages: [
      { register: 'informal', finglish: 'zakhmet khoob shod?', english: 'Did your wound heal?' },
      {
        register: 'formal',
        finglish: 'zakhmetan behboud yaft?',
        english: 'Did your wound heal?',
      },
    ],
  },
  {
    term: 'zālū',
    meaning: 'leech; (figurative) a clingy, exploitative person',
    tags: ['noun'],
    aliases: ['zaloheh', 'zaloo', 'zalou'],
    note: 'Reading the ambiguous "zaloheh" as "zalu" (leech).',
    usages: [
      { register: 'informal', finglish: 'mese zalu chasbide', english: 'He clings like a leech.' },
      {
        register: 'formal',
        finglish: 'mesle zalu chasbide ast',
        english: 'He clings like a leech.',
      },
    ],
  },
  {
    term: 'zan',
    meaning: 'woman; wife',
    tags: ['noun'],
    note: '"zan/bacha" is casual; "hamsar/farzand" is more formal.',
    usages: [
      {
        register: 'informal',
        finglish: 'zan-o bacha khooban?',
        english: 'Are your wife and kids well?',
      },
      {
        register: 'formal',
        finglish: 'hamsar va farzandan khoob hastand?',
        english: 'Are your wife and children well?',
      },
    ],
  },
  {
    term: 'zart',
    meaning: '(slang) the sound of flatulence; "zart-o-port" = empty boastful talk',
    tags: ['noun', 'slang', 'vulgar'],
    aliases: ['zert', 'zart o port'],
    note: 'Crude/childish. "zart-o-port nakon" = stop talking nonsense/boasting.',
    usages: [
      { register: 'informal', finglish: 'zart-o-port nakon', english: 'Stop the empty boasting.' },
      {
        register: 'formal',
        finglish: 'lotfan edde’a-ye bi-asas nakonid',
        english: "Please don't make baseless claims.",
      },
    ],
  },
  {
    term: 'zerzer',
    meaning: 'whining, nagging, blubbering; "zerzer nakon" = stop whining',
    tags: ['noun', 'slang'],
    aliases: ['zer zer', 'zerzeru'],
    usages: [
      { register: 'informal', finglish: 'enghadr zerzer nakon', english: 'Stop whining so much.' },
      {
        register: 'formal',
        finglish: 'lotfan inghadr gele nakonid',
        english: "Please don't complain so much.",
      },
    ],
  },
  {
    term: 'zesht',
    meaning: 'ugly; (also) inappropriate, unseemly',
    tags: ['adjective'],
    usages: [
      { register: 'informal', finglish: 'in kar zeshte', english: 'This behavior is improper.' },
      {
        register: 'formal',
        finglish: 'in raftar zesht ast',
        english: 'This behavior is improper.',
      },
    ],
  },
  {
    term: 'zībā',
    meaning: 'beautiful',
    tags: ['adjective'],
    aliases: ['zibaa'],
    usages: [
      {
        register: 'informal',
        finglish: 'che manzare-ye ziba-i',
        english: 'What a beautiful view.',
      },
      {
        register: 'formal',
        finglish: 'che manzare-ye ziba-i ast',
        english: 'What a beautiful view.',
      },
    ],
  },
];
