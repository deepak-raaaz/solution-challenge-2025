import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUserProgress extends Document {
    userId: Types.ObjectId;
    roadmapId: Types.ObjectId;
    completedResources: Types.ObjectId[];
    completedLessons: Types.ObjectId[];
    completedModules: Types.ObjectId[];
    completedQuizzes: Types.ObjectId[];
    failedQuizLessons: Types.ObjectId[];
    totalXp: number;
    progressPercentage: number;
    lastUpdated: Date;
}

const UserProgressSchema = new Schema<IUserProgress>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        roadmapId: { type: Schema.Types.ObjectId, ref: 'LearningRoadmap', required: true, index: true },
        completedResources: [{ type: Schema.Types.ObjectId, ref: 'Resource', default: [] }],
        completedLessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson', default: [] }],
        completedModules: [{ type: Schema.Types.ObjectId, ref: 'Module', default: [] }],
        failedQuizLessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson', default: [] }], // Added
        totalXp: { type: Number, default: 0, min: 0 },
        progressPercentage: { type: Number, default: 0, min: 0, max: 100 },
        lastUpdated: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

UserProgressSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });
UserProgressSchema.pre('save', function (next) {
    this.lastUpdated = new Date();
    next();
});

export const UserProgress = mongoose.model<IUserProgress>('LearningRoadmapUserProgress', UserProgressSchema);