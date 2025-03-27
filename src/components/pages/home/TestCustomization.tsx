'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SectionHeading from '@/components/shared/SectionHeading';

// Define interfaces and constants (unchanged)
interface Subject {
  id: string;
  name: string;
  icon: string;
}

interface QuestionType {
  id: string;
  name: string;
  description: string;
}

const subjects: Subject[] = [
  { id: 'math', name: 'Mathematics', icon: '📐' },
  { id: 'physics', name: 'Physics', icon: '⚡' },
  { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
  { id: 'biology', name: 'Biology', icon: '🧬' },
  { id: 'computer', name: 'Computer Science', icon: '💻' },
  { id: 'english', name: 'English', icon: '📚' },
];

const questionTypes: QuestionType[] = [
  { id: 'multiple', name: 'Multiple Choice', description: 'Questions with multiple options' },
  { id: 'short', name: 'Short Answer', description: 'Brief text-based answers' },
  { id: 'long', name: 'Long Answer', description: 'Detailed explanatory answers' },
  { id: 'truefalse', name: 'True/False', description: 'Binary choice questions' },
];

// Separate component to handle useSearchParams
export default function TestCustomization() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>('medium');
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(['multiple']);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [customTopics, setCustomTopics] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const config = {
      selectedSubjects: searchParams.get('selectedSubjects')?.split(',') || [],
      difficulty: searchParams.get('difficulty') || 'medium',
      selectedQuestionTypes: searchParams.get('selectedQuestionTypes')?.split(',') || [],
      questionCount: parseInt(searchParams.get('questionCount') || '10'),
      customTopics: searchParams.get('customTopics') || '',
    };

    setSelectedSubjects(config.selectedSubjects);
    setDifficulty(config.difficulty);
    setSelectedQuestionTypes(config.selectedQuestionTypes);
    setQuestionCount(config.questionCount);
    setCustomTopics(config.customTopics);

    const query = searchParams.get('query');
    if (query) {
      setQuery(decodeURIComponent(query));
      const queryLower = query.toLowerCase();
      const relevantSubjects = subjects
        .filter(subject => 
          queryLower.includes(subject.id) || 
          queryLower.includes(subject.name.toLowerCase())
        )
        .map(subject => subject.id);

      if (relevantSubjects.length > 0) {
        setSelectedSubjects(relevantSubjects);
      }
    }
  }, [searchParams]);

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleQuestionTypeToggle = (typeId: string) => {
    setSelectedQuestionTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSubjects.length === 0) {
      alert('Please select at least one subject');
      return;
    }

    if (selectedQuestionTypes.length === 0) {
      alert('Please select at least one question type');
      return;
    }

    const params = new URLSearchParams({
      selectedSubjects: selectedSubjects.join(','),
      difficulty,
      selectedQuestionTypes: selectedQuestionTypes.join(','),
      questionCount: questionCount.toString(),
      customTopics,
      query
    });

    router.push(`/test/questions?${params.toString()}`);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title="Customize Your Test"
          subtitle="Tailor your test experience by selecting your preferences below"
          className="text-center"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subjects Selection */}
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-md dark:shadow-gray-900/20">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Select Subjects</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {subjects.map(subject => (
                <button
                  key={subject.id}
                  type="button"
                  onClick={() => handleSubjectToggle(subject.id)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedSubjects.includes(subject.id)
                      ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <div className="text-xl mb-1">{subject.icon}</div>
                  <div className="font-medium text-sm text-gray-900 dark:text-white">{subject.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-md dark:shadow-gray-900/20">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Difficulty Level</h2>
            <div className="grid grid-cols-3 gap-3">
              {['easy', 'medium', 'hard'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`p-2.5 rounded-lg border transition-all ${
                    difficulty === level
                      ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <div className="font-medium text-sm text-gray-900 dark:text-white capitalize">{level}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question Types */}
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-md dark:shadow-gray-900/20">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Question Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {questionTypes.map(type => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleQuestionTypeToggle(type.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedQuestionTypes.includes(type.id)
                      ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <div className="font-medium text-sm text-gray-900 dark:text-white">{type.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-md dark:shadow-gray-900/20">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Number of Questions</h2>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="50"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">{questionCount}</span>
            </div>
          </div>

          {/* Custom Topics */}
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-md dark:shadow-gray-900/20">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Custom Topics</h2>
            <textarea
              value={customTopics}
              onChange={(e) => setCustomTopics(e.target.value)}
              placeholder="Enter specific topics you'd like to be tested on (optional)"
              className="w-full h-20 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800/50 dark:text-white text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Generate Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};