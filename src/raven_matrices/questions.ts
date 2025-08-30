// Data for Raven's Matrices questions
export interface RavenQuestion {
  id: string;
  difficulty: 'easy' | 'hard';
  prompt: string; // For now, a simple text or emoji grid
  options: string[]; // 6 options
  answer: number; // index of correct answer
}

export const ravenQuestions: RavenQuestion[] = [
  // Easy math matrix questions
  {
    id: 'easy-1',
    difficulty: 'easy',
    prompt: `2  3  4\n5  6  7\n8  9  ?`,
    options: ['10', '11', '12', '13', '14', '15'],
    answer: 0 // 10
  },
  {
    id: 'easy-2',
    difficulty: 'easy',
    prompt: `1  2  3\n4  5  6\n7  8  ?`,
    options: ['9', '10', '11', '12', '13', '14'],
    answer: 0 // 9
  },
  {
    id: 'easy-3',
    difficulty: 'easy',
    prompt: `2  4  6\n8 10 12\n14 16 ?`,
    options: ['18', '20', '22', '24', '26', '28'],
    answer: 0 // 18
  },
  {
    id: 'easy-4',
    difficulty: 'easy',
    prompt: `3  6  9\n12 15 18\n21 24 ?`,
    options: ['27', '30', '33', '36', '39', '42'],
    answer: 0 // 27
  },
  {
    id: 'easy-5',
    difficulty: 'easy',
    prompt: `5 10 15\n20 25 30\n35 40 ?`,
    options: ['45', '50', '55', '60', '65', '70'],
    answer: 0 // 45
  },
  // Hard math/series matrix questions
  {
    id: 'hard-1',
    difficulty: 'hard',
    prompt: `1  1  2\n3  5  8\n13 21 ?`,
    options: ['34', '32', '30', '28', '26', '24'],
    answer: 0 // 34 (Fibonacci)
  },
  {
    id: 'hard-2',
    difficulty: 'hard',
    prompt: `2  4  8\n16 32 64\n128 256 ?`,
    options: ['512', '1024', '2048', '4096', '8192', '16384'],
    answer: 0 // 512 (powers of 2)
  },
  {
    id: 'hard-3',
    difficulty: 'hard',
    prompt: `2  3  5\n7 11 13\n17 19 ?`,
    options: ['23', '29', '31', '37', '41', '43'],
    answer: 0 // 23 (consecutive primes)
  },
  {
    id: 'hard-4',
    difficulty: 'hard',
    prompt: `1  4  9\n16 25 36\n49 64 ?`,
    options: ['81', '100', '121', '144', '169', '196'],
    answer: 0 // 81 (squares)
  },
  {
    id: 'hard-5',
    difficulty: 'hard',
    prompt: `2  3  5\n7 11 13\n17 19 ?`,
    options: ['23', '29', '31', '37', '41', '43'],
    answer: 0 // 23 (primes)
  }
];
