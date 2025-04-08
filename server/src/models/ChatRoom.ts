import mongoose, { Document, Schema } from 'mongoose';

export interface IChatRoom extends Document {
  /**
   * 채팅방 이름
   * 그룹 채팅인 경우 필수, 1:1 채팅은 선택적
   */
  name: string;
  
  /**
   * 채팅방 참여자들의 사용자 ID 배열
   * 최소 2명 이상의 참여자가 필요
   */
  participants: mongoose.Types.ObjectId[];
  
  /**
   * 그룹 채팅 여부
   * true: 그룹 채팅, false: 1:1 채팅
   */
  isGroupChat: boolean;
  
  /**
   * 채팅방 생성자의 사용자 ID
   */
  createdBy: mongoose.Types.ObjectId;
  
  createdAt: Date;
  updatedAt: Date;
}

const chatRoomSchema = new Schema<IChatRoom>(
  {
    name: { 
      type: String, 
      required: function(this: IChatRoom) {
        return this.isGroupChat;
      },
      trim: true 
    },
    participants: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }],
    isGroupChat: { 
      type: Boolean, 
      default: false 
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  },
  { timestamps: true }
);

// 1:1 채팅방 중복 생성 방지를 위한 인덱스
chatRoomSchema.index(
  { 
    participants: 1, 
    isGroupChat: 1 
  }, 
  { 
    unique: true,
    partialFilterExpression: { isGroupChat: false }
  }
);

const ChatRoom = mongoose.model<IChatRoom>('ChatRoom', chatRoomSchema);
export default ChatRoom;