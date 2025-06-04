import mongoose, { Schema, Document, Types } from 'mongoose';

interface IQuestion {
  type: 'Multiple Choice' | 'Coding Challenge';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface IQuizAttempt {
  score: number;
  total: number;
  xp: number;
  userAnswers: { questionIndex: number; selectedAnswer: string }[];
  createdAt: Date;
}

export interface IQuiz extends Document {
  quizId: string;
  parentId: Types.ObjectId;
  parentType: 'Lesson' | 'Module';
  questions: IQuestion[];
  attempts: IQuizAttempt[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  type: { type: String, enum: ['Multiple Choice', 'Coding Challenge'], required: true },
  question: { type: String, required: true, trim: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String, required: true, trim: true },
});

const QuizAttemptSchema = new Schema<IQuizAttempt>({
  score: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true, min: 0 },
  xp: { type: Number, required: true, min: 0 },
  userAnswers: [
    { questionIndex: { type: Number, required: true }, selectedAnswer: { type: String, required: true } }
  ],
  createdAt: { type: Date, default: Date.now },
});

const QuizSchema = new Schema<IQuiz>(
  {
    quizId: { type: String, required: true, unique: true },
    parentId: { type: Schema.Types.ObjectId, required: true, index: true },
    parentType: { type: String, enum: ['Lesson', 'Module'], required: true },
    questions: [QuestionSchema],
    attempts: [QuizAttemptSchema],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

QuizSchema.index({ parentId: 1, parentType: 1, isActive: 1 });
QuizSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const Quiz = mongoose.model<IQuiz>('LearningRoadmapQuiz', QuizSchema);