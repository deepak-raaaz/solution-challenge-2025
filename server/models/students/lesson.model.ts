import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILesson extends Document {
    lessonId: string;
    moduleId: Types.ObjectId;
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'locked';
    resourceIds: Types.ObjectId[];
    quizId: Types.ObjectId | null;
    topics: string[];
    isSupplemental: boolean; // Added
    metadata: Record<string, any>; // Added
    createdAt: Date;
    updatedAt: Date;
}

const LessonSchema = new Schema<ILesson>(
    {
        lessonId: { type: String, required: true, unique: true },
        moduleId: { type: Schema.Types.ObjectId, ref: 'Module', required: true, index: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        status: { type: String, enum: ['completed', 'in-progress', 'locked'], default: 'locked' },
        resourceIds: [{ type: Schema.Types.ObjectId, ref: 'Resource', index: true }],
        quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', default: null },
        topics: [{
            type: String, trim: true,
            isSupplemental: { type: Boolean, default: false }, // Added
            metadata: { type: Schema.Types.Mixed, default: {} }, // Added
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now }
        }],
    },
    { timestamps: true }
);

LessonSchema.index({ moduleId: 1, status: 1 });
LessonSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const Lesson = mongoose.model<ILesson>('LearningRoadmapLesson', LessonSchema);