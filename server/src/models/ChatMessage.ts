import mongoose, { Document, Schema } from 'mongoose';

export interface IChatMessage extends Document {
  /**
   * 메시지가 속한 채팅방의 ID
   * ChatRoom 모델을 참조
   */
  chatRoom: mongoose.Types.ObjectId;
  
  /**
   * 메시지를 보낸 사용자의 ID
   * User 모델을 참조
   */
  sender: mongoose.Types.ObjectId;
  
  /**
   * 메시지 내용
   * 최대 1000자까지 작성 가능
   */
  message: string;
  
  /**
   * 메시지를 읽은 사용자들의 ID 배열
   * 읽음 확인 기능을 위해 사용
   */
  readBy: mongoose.Types.ObjectId[];
  
  createdAt: Date;
  updatedAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>(
  {
    chatRoom: { 
      type: Schema.Types.ObjectId, 
      ref: 'ChatRoom', 
      required: true 
    },
    sender: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    message: { 
      type: String, 
      required: true, 
      maxlength: 1000 
    },
    readBy: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }]
  },
  { timestamps: true }
);

// 채팅방별 메시지 조회 성능 향상을 위한 인덱스
chatMessageSchema.index({ chatRoom: 1, createdAt: -1 });

const ChatMessage = mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema);
export default ChatMessage;
