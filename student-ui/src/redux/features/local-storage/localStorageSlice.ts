import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface for a single question
interface Question {
  type: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// Interface for the assessment data
interface Assessment {
  message: string;
  assessmentId: string;
  questions: Question[];
}

// Interface for test results
interface TestResults {
  score: number;
  totalQuestions: number;
  selectedTopic: string;
  completedAt: string;
}

// State interface
interface QueryState {
  query: string;
  assessment: Assessment | null;
  testResults: TestResults | null; // Add test results field
}

const initialState: QueryState = {
  query: '',
  assessment: null,
  testResults: null, // Initialize test results
};

const localStorageSlice = createSlice({
  name: 'localStorage',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setAssessment: (state, action: PayloadAction<Assessment>) => {
      state.assessment = action.payload;
    },
    clearAssessment: (state) => {
      state.assessment = null;
    },
    setTestResults: (state, action: PayloadAction<TestResults>) => {
      state.testResults = action.payload;
    },
    clearTestResults: (state) => {
      state.testResults = null; // Optional: to clear test results
    },
  },
});

export const { setQuery, setAssessment, clearAssessment, setTestResults, clearTestResults } = localStorageSlice.actions;
export default localStorageSlice.reducer;