import mongoose, { Schema } from 'mongoose';

export interface IStudyReview extends Document {
  study: mongoose.Types.ObjectId;
  reviewer: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}

const studyReviewSchema = new Schema<IStudyReview>(
  {
    study: { type: Schema.Types.ObjectId, ref: 'Study', required: true },
    reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

const StudyReview = mongoose.model<IStudyReview>(
  'StudyReview',
  studyReviewSchema
);
export default StudyReview;
