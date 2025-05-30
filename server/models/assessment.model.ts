import mongoose, { Schema, Document, Types } from 'mongoose';

// Define TypeScript interfaces for type safety
interface IQuestion {
    type: 'Multiple Choice' | 'Coding Challenge' | 'Practical Project';
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

interface IUserAnswer {
    questionIndex: number;
    selectedAnswer: string;
}

export interface IAssessment extends Document {
    playlistPersonalizationId: Types.ObjectId;
    userId: Types.ObjectId;
    questions: IQuestion[];
    userAnswers: IUserAnswer[];
    isSubmitted: boolean;
    score: number;
    maxScore: number;
    createdAt: Date;
    updatedAt: Date;
}

const AssessmentSchema = new Schema<IAssessment>({
    playlistPersonalizationId: {
        type: Schema.Types.ObjectId,
        ref: 'PlaylistPersonalization',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questions: [
        {
            type: {
                type: String,
                enum: ['Multiple Choice', 'Coding Challenge', 'Practical Project'],
                required: true,
            },
            question: {
                type: String,
                required: true,
            },
            options: [
                {
                    type: String,
                    required: true,
                },
            ],
            correctAnswer: {
                type: String,
                required: true,
            },
            explanation: {
                type: String,
                required: true,
            },
        },
    ],
    userAnswers: [
        {
            questionIndex: {
                type: Number,
                required: true,
            },
            selectedAnswer: {
                type: String,
                required: true,
            },
        },
    ],
    isSubmitted: {
        type: Boolean,
        default: false,
    },
    score: {
        type: Number,
        default: 0,
    },
    maxScore: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update `updatedAt` on save
AssessmentSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const Assessment = mongoose.model<IAssessment>('Assessment', AssessmentSchema);