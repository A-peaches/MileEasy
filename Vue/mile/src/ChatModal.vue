<template>
  <div class="modals" v-if="isOpen">
    <div class="modals-content">
      <span class="close" @click="$emit('close')">&times;</span>

      <div class="header">
        <span class="title">이지 챗</span>
      </div>

      <div class="chatBox" id="chatBox">
        <div
          v-for="(message, index) in chatMessages"
          :key="index"
          :class="{
            'message-container': true,
            'user-message': message.type === 'user',
            'bot-message': message.type === 'bot',
          }"
        >
          <div v-if="message.type === 'bot'" class="message-content">
            <img src="./assets/img/chat.gif" alt="Bot" class="bot-image" />
            <div class="message-text">{{ message.content }}</div>
          </div>
          <div v-if="message.type === 'user'" class="message-content">
            <div class="message-text">{{ message.content }}</div>
          </div>
        </div>
      </div>

      <div class="input-container">
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          v-model="message"
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">전송</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api/axios';

export default {
  data() {
    return {
      message: '',
      chatList: [],
      chatMessages: [],
    };
  },
  props: {
    isOpen: Boolean,
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
  },
  methods: {
    async chatData() {
      try {
        const response = await api.get('/user/chatList');
        this.chatList = response.data;
      } catch (error) {
        console.error('챗에러:', error);
      }
    },
    sendMessage() {
  if (this.message.trim()) {
    const userInput = this.message.toLowerCase();
    // 사용자 입력에 포함된 단어들을 분리
    const userWords = userInput.split(/\s+/);
    
    // 사용자 입력의 일부가 포함된 모든 채팅 응답을 찾음
    const matchedChats = this.chatList.filter(chat => 
      userWords.some(word => 
        chat.chat_tag.toLowerCase().includes(word) ||
        chat.chat_content.toLowerCase().includes(word)
      )
    );

    if (matchedChats.length > 0) {
      // 가장 연관성 높은 응답 선택 (여기서는 첫 번째 매치를 사용)
      const bestMatch = matchedChats[0];
      this.chatMessages.push({ type: 'user', content: this.message });
      this.chatMessages.push({
        type: 'bot',
        content: bestMatch.chat_content,
      });
    } else {
      this.chatMessages.push({ type: 'user', content: this.message });
      this.chatMessages.push({
        type: 'bot',
        content: '검색어를 정확하게 입력해주세요.',
      });
    }
    this.message = '';
    this.$nextTick(() => {
      const chatBox = document.getElementById('chatBox');
      chatBox.scrollTop = chatBox.scrollHeight; // 자동 스크롤
    });
  }
},
    sendGreeting() {
      if (this.isOpen) {
        this.chatMessages.push({
          type: 'bot',
          content: '안녕하세요! 저는 리브뚝뚝입니다. 무엇이든 물어보세요!',
        });
      }
    },
  },
  mounted() {
    this.chatData();
  },
  watch: {
    isOpen: {
      handler(newVal) {
        if (newVal) {
          this.sendGreeting();
        }
      },
      immediate: true, // 처음 렌더링 시에도 호출되도록
    },
  },
};
</script>

<style scoped>
.modals {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modals-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 700px;
  height: 600px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24pt;
  font-weight: bold;
  color: #333;
}

.chatBox {
  border: solid 1px #ddd;
  border-radius: 8px;
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
}

.message-container {
  display: flex;
  margin: 5px 0;
}

.message-content {
  display: flex;
  align-items: center;
}

.bot-message {
  justify-content: flex-start;
}

.user-message {
  justify-content: flex-end;
}

.bot-message .message-content {
  align-items: flex-start;
}

.user-message .message-content {
  align-items: flex-end;
  flex-direction: row-reverse; /* 사용자 메시지의 내용이 오른쪽으로 배치되도록 함 */
}

.bot-image {
  width: 40px;
  height: 40px;
  margin-right: 10px; /* 이미지와 메시지 사이에 공간 추가 */
}

.message-text {
  background-color: #cce5ff;
  padding: 10px;
  border-radius: 8px;
}

.user-message .message-text {
  background-color: #d1e7dd;
}

.input-container {
  display: flex;
  align-items: center;
}

input[type='text'] {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
}

button {
  background-color: #19c99b;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #17b88d;
}
</style>
