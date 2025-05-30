import mongoose, { Schema, Document, Types } from 'mongoose';

// Interface for Sentiment
export interface ISentiment {
    score: string;
    message: string;
}

// Interface for Resource (Videos, Articles, etc.)
export interface IResource extends Document {
    resourceId: string;
    type: 'youtube' | 'vimeo' | 'article' | 'blog' | 'documentation' | 'quiz' | 'podcast'; // Extensible for future types
    title: string;
    url: string;
    thumbnailUrl?: string; // Optional thumbnail URL for resources like videos
    sentiment: ISentiment;
    metadata: Record<string, any>; // For future extensibility (e.g., duration, author)
    lessonId: Types.ObjectId; // Reference to Lesson
    createdAt: Date;
    updatedAt: Date;
}

// Interface for Lesson
export interface ILesson extends Document {
    lessonId: string;
    title: string;
    description: string;
    moduleId: Types.ObjectId; // Reference to Module
    resourceIds: Types.ObjectId[]; // References to Resources
    status: 'draft' | 'published' | 'archived';
    duration: number;
    createdAt: Date;
    updatedAt: Date;
}

// Interface for Module
export interface IModule extends Document {
    moduleId: string;
    title: string;
    description: string;
    playlistId: Types.ObjectId; // Reference to Playlist
    lessonIds: Types.ObjectId[]; // References to Lessons
    status: 'draft' | 'published' | 'archived';
    createdAt: Date;
    updatedAt: Date;
}

// Interface for Playlist
export interface IPlaylist extends Document {
    userId: Types.ObjectId;
    assessmentId: Types.ObjectId;
    playlistPersonalizationId: Types.ObjectId;
    title: string;
    description: string;
    tags: string[];
    moduleIds: Types.ObjectId[]; // References to Modules
    status: 'draft' | 'published' | 'archived';
    createdAt: Date;
    updatedAt: Date;
    metadata: Record<string, any>; // For future extensibility (e.g., course category, difficulty)
}

// Sentiment Schema
const SentimentSchema = new Schema<ISentiment>({
    score: { type: String, required: true,}, // Ensure score is numeric string
    message: { type: String, required: true, trim: true },
});

// Resource Schema
const ResourceSchema = new Schema<IResource>(
    {
        resourceId: { type: String, required: true, unique: true },
        type: {
            type: String,
            enum: ['youtube', 'vimeo', 'article', 'blog', 'documentation', 'quiz', 'podcast'],
            required: true,
        },
        title: { type: String, required: true, trim: true },
        url: { type: String, required: true, trim: true },
        thumbnailUrl: { type: String, trim: true }, // Optional for video resources
        sentiment: { type: SentimentSchema, required: true },
        lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true, index: true },
        metadata: { type: Schema.Types.Mixed, default: {} },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// Lesson Schema
const LessonSchema = new Schema<ILesson>(
    {
        lessonId: { type: String, required: true, unique: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        moduleId: { type: Schema.Types.ObjectId, ref: 'Module', required: true, index: true },
        resourceIds: [{ type: Schema.Types.ObjectId, ref: 'Resource', index: true }],
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft',
        },
        duration: { type: Number, required: false, min: 0, default: 0 },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// Module Schema
const ModuleSchema = new Schema<IModule>(
    {
        moduleId: { type: String, required: true, unique: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        playlistId: { type: Schema.Types.ObjectId, ref: 'Playlist', required: true, index: true },
        lessonIds: [{ type: Schema.Types.ObjectId, ref: 'Lesson', index: true }],
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft',
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// Playlist Schema
const PlaylistSchema = new Schema<IPlaylist>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        assessmentId: { type: Schema.Types.ObjectId, ref: 'Assessment', required: true, index: true },
        playlistPersonalizationId: { type: Schema.Types.ObjectId, ref: 'PlaylistPersonalization', required: true, index: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        tags: [{ type: String, trim: true }],
        moduleIds: [{ type: Schema.Types.ObjectId, ref: 'Module', index: true }],
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft',
        },
        metadata: { type: Schema.Types.Mixed, default: {} },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// Indexes for better query performance
ResourceSchema.index({ lessonId: 1, type: 1 });
LessonSchema.index({ moduleId: 1, status: 1 });
ModuleSchema.index({ playlistId: 1, status: 1 });
PlaylistSchema.index({ userId: 1, assessmentId: 1, status: 1 });

// Pre-save hook to update `updatedAt` timestamp for all models
ResourceSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
LessonSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
ModuleSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
PlaylistSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Export models
export const Resource = mongoose.model<IResource>('Resource', ResourceSchema);
export const Lesson = mongoose.model<ILesson>('Lesson', LessonSchema);
export const Module = mongoose.model<IModule>('Module', ModuleSchema);
export const Playlist = mongoose.model<IPlaylist>('Playlist', PlaylistSchema);