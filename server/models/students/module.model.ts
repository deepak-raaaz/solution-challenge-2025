import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IModule extends Document {
    moduleId: string;
    roadmapId: Types.ObjectId;
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'locked';
    lessonIds: Types.ObjectId[];
    quizId: Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
}

const ModuleSchema = new Schema<IModule>(
    {
        moduleId: { type: String, required: true, unique: true },
        roadmapId: { type: Schema.Types.ObjectId, ref: 'LearningRoadmap', required: true, index: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        status: { type: String, enum: ['completed', 'in-progress', 'locked'], default: 'locked' },
        lessonIds: [{ type: Schema.Types.ObjectId, ref: 'Lesson', index: true }],
        quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', default: null },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

ModuleSchema.index({ roadmapId: 1, status: 1 });
ModuleSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const Module = mongoose.model<IModule>('LearningRoadmapModule', ModuleSchema);