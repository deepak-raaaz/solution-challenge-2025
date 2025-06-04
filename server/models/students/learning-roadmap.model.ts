import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILearningRoadmap extends Document {
    userId: Types.ObjectId;
    assessment: Types.ObjectId;
    playlistPersonalization: Types.ObjectId;
    title: string;
    description: string;
    overview: string;
    tags: string[];
    modules: Types.ObjectId[];
    status: 'draft' | 'active' | 'completed';
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

const LearningRoadmapSchema = new Schema<ILearningRoadmap>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        assessment: { type: Schema.Types.ObjectId, ref: 'Assessment', required: true, index: true },
        playlistPersonalization: { type: Schema.Types.ObjectId, ref: 'PlaylistPersonalization', required: true, index: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        overview: { type: String, default: '', trim: true },
        tags: [{ type: String, trim: true }],
        modules: [{ type: Schema.Types.ObjectId, ref: 'Module', index: true }],
        status: { type: String, enum: ['draft', 'active', 'completed'], default: 'draft' },
        metadata: { type: Schema.Types.Mixed, default: {} },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

LearningRoadmapSchema.index({ userId: 1, status: 1 });

LearningRoadmapSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const LearningRoadmap = mongoose.model<ILearningRoadmap>('LearningRoadmap', LearningRoadmapSchema);
