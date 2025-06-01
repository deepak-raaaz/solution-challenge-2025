import mongoose, { Schema, Document, Types } from 'mongoose';

// Interface for Sentiment
export interface ISentiment {
    score: string;
    message: string;
}

// Interface for Stats
export interface IStats {
    likes: Types.ObjectId[];
    views: number;
    shares: number;
}

// Interface for Review
export interface IReview {
    userId: Types.ObjectId;
    rating: number;
    comment: string;
    parentId: Types.ObjectId; // Reference to Resource, Lesson, Module, or Playlist
    parentType: 'Resource' | 'Lesson' | 'Module' | 'Playlist';
    createdAt: Date;
    updatedAt: Date;
}

// Interface for Comment
export interface IComment {
    userId: Types.ObjectId;
    text: string;
    parentId: Types.ObjectId; // Reference to Resource, Lesson, Module, or Playlist
    parentType: 'Resource' | 'Lesson' | 'Module' | 'Playlist';
    createdAt: Date;
    updatedAt: Date;
    isEdited: boolean;
}

// Interface for FAQ
export interface IFAQ {
    question: string;
    answer: string;
    createdAt: Date;
}

// Interface for Search Phrases in Lesson
export interface ISearchPhrases {
    video?: string[];
    article?: string[];
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
    commentsEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Interface for Lesson
export interface ILesson extends Document {
    lessonId: string;
    title: string;
    description: string;
    topics: string[]; // Optional topics for the lesson
    moduleId: Types.ObjectId; // Reference to Module
    resourceIds: Types.ObjectId[]; // References to Resources
    status: 'draft' | 'published' | 'archived';
    duration: number;
    searchPhrases: ISearchPhrases;
    commentsEnabled: boolean;
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
    commentsEnabled: boolean;
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
    overview: string;
    thumbnailUrl?: string; // Optional thumbnail URL for the playlist
    tags: string[];
    moduleIds: Types.ObjectId[]; // References to Modules
    status: 'draft' | 'published' | 'archived';
    metadata: Record<string, any>; // For future extensibility (e.g., course category, difficulty)
    stats: IStats;
    commentsEnabled: boolean;
    faqIds: Types.ObjectId[];
    enrolledUsers: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

// Sentiment Schema
const SentimentSchema = new Schema<ISentiment>({
    score: { type: String, required: true, }, // Ensure score is numeric string
    message: { type: String, required: true, trim: true },
});

const StatsSchema = new Schema<IStats>({
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    views: { type: Number, default: 0, min: 0 },
    shares: { type: Number, default: 0, min: 0 },
});

// Review Schema
const ReviewSchema = new Schema<IReview>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    parentId: { type: Schema.Types.ObjectId, required: true },
    parentType: {
        type: String,
        enum: ['Resource', 'Lesson', 'Module', 'Playlist'],
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Comment Schema
const CommentSchema = new Schema<IComment>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, trim: true },
    parentId: { type: Schema.Types.ObjectId, required: true },
    parentType: {
        type: String,
        enum: ['Resource', 'Lesson', 'Module', 'Playlist'],
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// FAQ Schema
const FAQSchema = new Schema<IFAQ>({
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
});

// Search Phrases Schema
const SearchPhrasesSchema = new Schema<ISearchPhrases>({
    video: [{ type: String, trim: true }],
    article: [{ type: String, trim: true }]
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
        commentsEnabled: { type: Boolean, default: false },
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
        topics: [{ type: String, trim: true }], // Optional topics for the lesson
        moduleId: { type: Schema.Types.ObjectId, ref: 'Module', required: true, index: true },
        resourceIds: [{ type: Schema.Types.ObjectId, ref: 'Resource', index: true }],
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft',
        },
        duration: { type: Number, required: false, min: 0, default: 0 },
        searchPhrases: { type: SearchPhrasesSchema, default: {} },
        commentsEnabled: { type: Boolean, default: false },
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
        commentsEnabled: { type: Boolean, default: false },
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
        overview: { type: String, required: false, trim: true, default: '' },
        thumbnailUrl: { type: String, trim: true }, // Optional thumbnail URL for the playlist
        tags: [{ type: String, trim: true }],
        moduleIds: [{ type: Schema.Types.ObjectId, ref: 'Module', index: true }],
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft',
        },
        metadata: { type: Schema.Types.Mixed, default: {} },
        stats: { type: StatsSchema, default: {} },
        commentsEnabled: { type: Boolean, default: true },
        faqIds: [{ type: Schema.Types.ObjectId, ref: 'FAQ', index: true }],
        enrolledUsers: [{ type: Schema.Types.ObjectId, ref: 'User', index: true }],
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
ReviewSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
CommentSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});


// Pre-save hooks for comments to update `isEdited`
CommentSchema.pre('save', function (next) {
    if (this.isModified('text')) {
        this.isEdited = true;
    }
    this.updatedAt = new Date();
    next();
});

// Export models
export const Resource = mongoose.model<IResource>('Resource', ResourceSchema);
export const Lesson = mongoose.model<ILesson>('Lesson', LessonSchema);
export const Module = mongoose.model<IModule>('Module', ModuleSchema);
export const Playlist = mongoose.model<IPlaylist>('Playlist', PlaylistSchema);
export const Review = mongoose.model<IReview>('Review', ReviewSchema);
export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
export const FAQ = mongoose.model<IFAQ>('FAQ', FAQSchema);