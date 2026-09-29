export type Language = 'en' | 'zh' | 'fr' | 'es' | 'hi' | 'bn' | 'as';

export const LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'zh', label: 'Chinese (Singapore)', nativeLabel: '简体中文' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'as', label: 'Assamese', nativeLabel: 'অসমীয়া' },
];

export type TextScale = 1 | 2 | 3 | 4;

export type CareCondition = 'dementia' | 'parkinsons' | 'stroke' | 'mci' | 'healthy_aging';

export interface ConditionInfo {
  id: CareCondition;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  iconName: 'Brain' | 'Activity' | 'HeartPulse' | 'Sparkles' | 'Sun';
  color: string;
  tips: string[];
}

export const CONDITIONS: ConditionInfo[] = [
  {
    id: 'dementia',
    title: 'Dementia & Alzheimer’s Support',
    tagline: 'Memory reassurance, gentle routines, and familiar family faces.',
    description: 'Specialized for memory loss, confusion, and anxiety. Focuses on safe daily rhythms and photo recognition.',
    badge: 'Memory & Reassurance',
    iconName: 'Brain',
    color: 'honey',
    tips: [
      'Speak in short, reassuring sentences with loving tone.',
      'Maintain consistent daily meal and medication timings.',
      'Review family photos together to stimulate positive emotional memories.',
    ],
  },
  {
    id: 'parkinsons',
    title: 'Parkinson’s Disease & Mobility',
    tagline: 'Strict medication alarms, motor support, and tremor-friendly touch.',
    description: 'Optimized for Parkinson’s care with dopamine/levodopa exact-time alarms, hydration prompts, and high-contrast large buttons.',
    badge: 'Motor & Timing Precision',
    iconName: 'Activity',
    color: 'teal',
    tips: [
      'Punctual medicine timing is vital for "on/off" motor control.',
      'Encourage gentle stretching and hydration before meals.',
      'Use large button interface to ease interaction during tremors.',
    ],
  },
  {
    id: 'stroke',
    title: 'Post-Stroke & Aphasia Recovery',
    tagline: 'Visual communication cards, speech recovery, and cognitive rebuilding.',
    description: 'Designed for stroke survivors recovering speech and motor skills, featuring pictorial flashcards and daily speech exercises.',
    badge: 'Speech & Cognitive Rehab',
    iconName: 'HeartPulse',
    color: 'coral',
    tips: [
      'Allow extra time for responses without finishing sentences.',
      'Use picture cards to communicate wants and feelings.',
      'Celebrate small daily milestones in routine tasks.',
    ],
  },
  {
    id: 'mci',
    title: 'Mild Cognitive Impairment (MCI)',
    tagline: 'Mental sharpness, daily task lists, and active independence.',
    description: 'For seniors experiencing early memory shifts who want to stay active, independent, and intellectually engaged.',
    badge: 'Sharpness & Autonomy',
    iconName: 'Sparkles',
    color: 'amber',
    tips: [
      'Encourage daily puzzle games and memory recall.',
      'Promote independent completion of daily checklists.',
      'Stay socially active and maintain outdoor walks.',
    ],
  },
  {
    id: 'healthy_aging',
    title: 'Senior Living & Loneliness Support',
    tagline: 'Social check-ins, family calls, hydration, and wellbeing.',
    description: 'A comforting digital companion for elderly individuals to stay connected with family, take vitamins, and feel loved.',
    badge: 'Wellness & Connection',
    iconName: 'Sun',
    color: 'sage',
    tips: [
      'Schedule regular family calls and video visits.',
      'Set reminders for daily water intake and light walks.',
      'Encourage sharing life stories and favorite songs.',
    ],
  },
];
export interface Reminder {
  id: string;
  type: 'medicine' | 'meal' | 'appointment' | 'activity' | 'call' | 'task';
  title: string;
  time: string;
  description: string;
  done: boolean;
  icon: string;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  year: string;
  image: string;
  caption: string;
  detail: string;
}

export interface Person {
  id: string;
  name: string;
  relationship: string;
  image: string;
  info: string;
  phone: string;
}

export type GameCategory = 'memory' | 'motor' | 'speech' | 'focus' | 'zen';

export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  category: GameCategory;
  categoryLabel: string;
  conditionTarget?: 'dementia' | 'parkinsons' | 'stroke' | 'mci' | 'healthy_aging' | 'all';
  recommendedFor: string;
  benefit: string;
}

export interface Patient {
  name: string;
  greetingName: string;
}

export const mockReminders: Reminder[] = [
  {
    id: 'r1',
    type: 'medicine',
    title: 'Take Your Medicine',
    time: '9:00 AM',
    description: 'Your morning medicine with water.',
    done: false,
    icon: 'pill',
  },
  {
    id: 'r2',
    type: 'meal',
    title: 'Breakfast Time',
    time: '9:30 AM',
    description: 'Time for a healthy breakfast.',
    done: false,
    icon: 'utensils',
  },
  {
    id: 'r3',
    type: 'call',
    title: 'Call Priya',
    time: '11:00 AM',
    description: 'Your daughter would love to hear from you.',
    done: false,
    icon: 'phone',
  },
  {
    id: 'r4',
    type: 'activity',
    title: 'Play a Game',
    time: '3:00 PM',
    description: 'Enjoy a fun brain activity.',
    done: false,
    icon: 'gamepad',
  },
  {
    id: 'r5',
    type: 'meal',
    title: 'Lunch Time',
    time: '1:00 PM',
    description: 'A warm, healthy lunch is ready.',
    done: true,
    icon: 'utensils',
  },
  {
    id: 'r6',
    type: 'medicine',
    title: 'Evening Medicine',
    time: '6:00 PM',
    description: 'Your evening medicine with water.',
    done: false,
    icon: 'pill',
  },
];

export const mockMemories: Memory[] = [
  {
    id: 'm1',
    title: "Priya's Wedding",
    description: 'A special day with your family.',
    year: '2018',
    image: 'family-wedding',
    caption: 'This is your daughter Priya ❤️',
    detail: 'This photo was taken on her wedding day. The whole family came together to celebrate.',
  },
  {
    id: 'm2',
    title: 'Trip to Kaziranga',
    description: 'A beautiful journey to the national park.',
    year: '2019',
    image: 'kaziranga',
    caption: 'You visited Kaziranga National Park 🌿',
    detail: 'You saw the one-horned rhinoceros and many beautiful birds. It was a sunny, happy day.',
  },
  {
    id: 'm3',
    title: 'Festival of Bihu',
    description: 'Celebrating with friends and family.',
    year: '2021',
    image: 'bihu',
    caption: 'You celebrated Bihu with your community 🎉',
    detail: 'Everyone danced and shared food. You wore your finest traditional clothes.',
  },
  {
    id: 'm4',
    title: 'Grandchild Born',
    description: 'A new member of the family.',
    year: '2020',
    image: 'grandchild',
    caption: 'This is your grandchild, Aarav 👶',
    detail: 'He was born in the morning. You held him in your arms and he smiled at you.',
  },
];

export const mockPeople: Person[] = [
  {
    id: 'p1',
    name: 'Priya',
    relationship: 'Your Daughter ❤️',
    image: 'priya',
    info: 'Priya is your daughter. She lives with her family in Guwahati. She loves cooking and gardening.',
    phone: '+91 98XXX XXX21',
  },
  {
    id: 'p2',
    name: 'Rohan',
    relationship: 'Your Son ❤️',
    image: 'rohan',
    info: 'Rohan is your son. He works as a teacher. He visits you every weekend.',
    phone: '+91 98XXX XXX45',
  },
  {
    id: 'p3',
    name: 'Aarav',
    relationship: 'Your Grandchild 👶',
    image: 'aarav',
    info: 'Aarav is your grandchild. He is 4 years old. He loves drawing and playing with you.',
    phone: '+91 98XXX XX78',
  },
  {
    id: 'p4',
    name: 'Meena',
    relationship: 'Your Caregiver 🤝',
    image: 'meena',
    info: 'Meena helps you every day. She is kind and patient. She makes sure you are safe and happy.',
    phone: '+91 98XXX XX90',
  },
];

export const mockGames: Game[] = [
  // Category 1: Memory & Reminiscence (Dementia / Alzheimer's)
  {
    id: 'g1',
    title: 'Picture Matching',
    description: 'Find matching pairs of gentle nature and animal cards.',
    icon: 'puzzle',
    gradient: 'from-honey-300 to-honey-500',
    category: 'memory',
    categoryLabel: 'Memory & Recall',
    conditionTarget: 'dementia',
    recommendedFor: 'Alzheimer’s & Dementia',
    benefit: 'Visual association & working memory stimulation',
  },
  {
    id: 'g2',
    title: 'Familiar Faces',
    description: 'Recognize and remember cherished family members and friends.',
    icon: 'users',
    gradient: 'from-sage-300 to-sage-500',
    category: 'memory',
    categoryLabel: 'Memory & Recall',
    conditionTarget: 'dementia',
    recommendedFor: 'Alzheimer’s & Dementia',
    benefit: 'Long-term social connection & emotional grounding',
  },

  // Category 2: Motor Control & Tremor Pacing (Parkinson's)
  {
    id: 'g3',
    title: 'Steady Rhythm Tap',
    description: 'Tap gently on the pulsing circle to maintain steady motor cadence.',
    icon: 'activity',
    gradient: 'from-amber-300 to-amber-500',
    category: 'motor',
    categoryLabel: 'Motor & Rhythm',
    conditionTarget: 'parkinsons',
    recommendedFor: 'Parkinson’s Disease',
    benefit: 'Tremor regulation, pacing & fine-motor coordination',
  },
  {
    id: 'g4',
    title: 'Peaceful Bubble Catch',
    description: 'Tap slow-floating gentle bubbles with forgiving, tremor-safe buttons.',
    icon: 'sparkles',
    gradient: 'from-teal-300 to-teal-500',
    category: 'motor',
    categoryLabel: 'Motor & Rhythm',
    conditionTarget: 'parkinsons',
    recommendedFor: 'Parkinson’s Disease',
    benefit: 'Hand-eye coordination without stress or rush',
  },

  // Category 3: Speech & Word Recovery (Post-Stroke & Aphasia)
  {
    id: 'g5',
    title: 'Word & Object Connect',
    description: 'Name everyday objects like tea, books, and water with gentle cues.',
    icon: 'messageSquare',
    gradient: 'from-sky-300 to-sky-500',
    category: 'speech',
    categoryLabel: 'Speech & Words',
    conditionTarget: 'stroke',
    recommendedFor: 'Post-Stroke & Aphasia',
    benefit: 'Word-finding, lexical recall & expressive speech recovery',
  },
  {
    id: 'g6',
    title: 'Sentence Companion',
    description: 'Complete heartwarming daily sentences using simple pictorial words.',
    icon: 'volume2',
    gradient: 'from-indigo-300 to-indigo-500',
    category: 'speech',
    categoryLabel: 'Speech & Words',
    conditionTarget: 'stroke',
    recommendedFor: 'Post-Stroke & Aphasia',
    benefit: 'Language syntax rebuilding and verbal confidence',
  },

  // Category 4: Focus & Daily Logic (Mild Cognitive Impairment - MCI)
  {
    id: 'g7',
    title: 'Daily Item Sorting',
    description: 'Place common household items into their rightful rooms.',
    icon: 'palette',
    gradient: 'from-coral-300 to-coral-500',
    category: 'focus',
    categoryLabel: 'Focus & Daily Logic',
    conditionTarget: 'mci',
    recommendedFor: 'Mild Cognitive Impairment',
    benefit: 'Executive functioning & daily life categorization',
  },
  {
    id: 'g8',
    title: 'Morning Routine Order',
    description: 'Arrange daily morning steps in their natural, calming order.',
    icon: 'puzzle',
    gradient: 'from-violet-300 to-violet-500',
    category: 'focus',
    categoryLabel: 'Focus & Daily Logic',
    conditionTarget: 'mci',
    recommendedFor: 'Mild Cognitive Impairment',
    benefit: 'Sequential planning & episodic daily memory',
  },

  // Category 5: Zen & Vitality (Active Senior Living / Healthy Aging)
  {
    id: 'g9',
    title: 'Zen Flower Bloom',
    description: 'Tap colorful petals to bloom serene flowers with uplifting thoughts.',
    icon: 'sparkles',
    gradient: 'from-emerald-300 to-emerald-500',
    category: 'zen',
    categoryLabel: 'Zen & Vitality',
    conditionTarget: 'healthy_aging',
    recommendedFor: 'Active Senior Living',
    benefit: 'Stress reduction, color harmony & peaceful mindfulness',
  },
  {
    id: 'g10',
    title: 'Serene Breathing Circle',
    description: 'Follow the gentle expanding ring for mindful, soothing breathing.',
    icon: 'activity',
    gradient: 'from-rose-300 to-rose-500',
    category: 'zen',
    categoryLabel: 'Zen & Vitality',
    conditionTarget: 'healthy_aging',
    recommendedFor: 'Active Senior Living',
    benefit: 'Autonomic nervous relaxation & mental clarity',
  },
];
