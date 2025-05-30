import mongoose, { Schema, Document, Types } from 'mongoose';

// Define TypeScript interfaces for type safety
interface IPlatform {
    name: 'YouTube' | 'Coursera' | 'edX' | 'Udemy' | 'Other';
    type: 'Free' | 'Paid';
}

export interface ITopic {
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface IPlaylistPersonalization extends Document {
    userId: Types.ObjectId;
    estimatedDuration: string;
    resourcesType: 'Free' | 'Paid' | 'Mixed (Free + Paid)';
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    language: string;
    pace: 'Relaxed' | 'Moderate' | 'Intensive';
    prompt: string;
    platforms: IPlatform[];
    questionsTypes: ('Multiple Choice' | 'Coding Challenges' | 'Practical Projects')[];
    resources: ('Video Tutorials' | 'Articles' | 'Books' | 'Interactive Labs')[];
    topics: ITopic[];
    createdAt: Date;
    updatedAt: Date;
}

const PlaylistPersonalizationSchema = new Schema<IPlaylistPersonalization>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    estimatedDuration: {
        type: String,
        required: true,
    },
    resourcesType: {
        type: String,
        enum: ['Free', 'Paid', 'Mixed (Free + Paid)'],
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
    },
    language: {
        type: String,
        required: true,
        default: 'en',
    },
    pace: {
        type: String,
        enum: ['Relaxed', 'Moderate', 'Intensive'],
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    platforms: [
        {
            name: {
                type: String,
                required: true,
                default: 'YouTube',
                enum: ['YouTube', 'Coursera', 'edX', 'Udemy', 'Other'],
            },
            type: {
                type: String,
                enum: ['Free', 'Paid'],
                default: 'Free',
                required: true,
            },
        },
    ],
    questionsTypes: [
        {
            type: String,
            default: 'Multiple Choice',
            enum: ['Multiple Choice', 'Coding Challenges', 'Practical Projects'],
            required: true,
        },
    ],
    resources: [
        {
            type: String,
            default: 'Video Tutorials',
            enum: ['Video Tutorials', 'Articles', 'Books', 'Interactive Labs'],
            required: true,
        },
    ],
    topics: [
        {
            name: {
                type: String,
                required: true,
            },
            level: {
                type: String,
                enum: ['Beginner', 'Intermediate', 'Advanced'],
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

PlaylistPersonalizationSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});


export const PlaylistPersonalization = mongoose.model<IPlaylistPersonalization>('PlaylistPersonalization', PlaylistPersonalizationSchema);