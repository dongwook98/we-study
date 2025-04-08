import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  /**
   * 댓글이 작성된 스터디 게시글의 ID
   * 각 댓글은 하나의 스터디 게시글에 속함
   */
  study: mongoose.Types.ObjectId;
  
  /**
   * 댓글 작성자의 사용자 ID
   * User 모델을 참조
   */
  author: mongoose.Types.ObjectId;
  
  /**
   * 댓글 내용
   * 최대 500자까지 작성 가능
   */
  content: string;
  
  /**
   * 부모 댓글의 ID (대댓글인 경우)
   * null이면 최상위 댓글, 값이 있으면 해당 ID의 댓글에 대한 답글
   */
  parentComment?: mongoose.Types.ObjectId;
  
  /**
   * 댓글 삭제 여부
   * true면 삭제된 댓글, false면 활성 댓글
   * 대댓글 구조 유지를 위해 실제 삭제 대신 사용
   */
  isDeleted: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    study: { type: Schema.Types.ObjectId, ref: 'Study', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { 
      type: String, 
      required: true, 
      maxlength: 500,
      trim: true 
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// 특정 스터디의 댓글 조회 성능 향상을 위한 인덱스
commentSchema.index({ study: 1, createdAt: -1 });

// 대댓글 조회 성능 향상을 위한 인덱스
commentSchema.index({ parentComment: 1 });

const Comment = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;
