import mongoose, { Schema, Document, Types } from 'mongoose';

interface ISentiment {
    score: string;
    message: string;
}

export interface IResource extends Document {
    resourceId: string;
    lessonId: Types.ObjectId;
    title: string;
    type: 'youtube' | 'article' | 'blog' | 'podcast';
    status: 'completed' | 'in-progress' | 'locked';
    url: string;
    thumbnailUrl?: string;
    sentiment: ISentiment;
    xpEarned: number; // Added
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

const SentimentSchema = new Schema<ISentiment>({
    score: { type: String, required: true },
    message: { type: String, required: true, trim: true },
});

const ResourceSchema = new Schema<IResource>(
    {
        resourceId: { type: String, required: true, unique: true },
        lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true, index: true },
        title: { type: String, required: true, trim: true },
        type: { type: String, enum: ['youtube', 'article', 'blog', 'podcast'], required: true },
        status: { type: String, enum: ['completed', 'in-progress', 'locked'], default: 'locked' },
        url: { type: String, required: true, trim: true },
        thumbnailUrl: { type: String, trim: true },
        sentiment: { type: SentimentSchema, required: true },
        xpEarned: { type: Number, default: 0, min: 0 }, // Added
        metadata: { type: Schema.Types.Mixed, default: {} },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

ResourceSchema.index({ lessonId: 1, status: 1 });
ResourceSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const Resource = mongoose.model<IResource>('LearningRoadmapResource', ResourceSchema);