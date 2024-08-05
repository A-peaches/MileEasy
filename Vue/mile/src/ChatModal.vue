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
            'user-message': message.type === 'user',
            'bot-message': message.type === 'bot',
          }"
        >
          {{ message.content }}
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

        // chat_tag 또는 chat_content에서 일치하는 항목 찾기
        const matchedChat = this.chatList.find(
          (chat) =>
            userInput.includes(chat.chat_tag.toLowerCase()) ||
            userInput.includes(chat.chat_content.toLowerCase())
        );

        if (matchedChat) {
          this.chatMessages.push({ type: 'user', content: this.message });
          this.chatMessages.push({
            type: 'bot',
            content: matchedChat.chat_content,
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
  },
  mounted() {
    this.chatData();
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

.user-message {
  align-self: flex-end;
  background-color: #d1e7dd;
  padding: 10px;
  border-radius: 8px;
  margin: 5px 0;
}

.bot-message {
  align-self: flex-start;
  background-color: #cce5ff;
  padding: 10px;
  border-radius: 8px;
  margin: 5px 0;
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
  background-color: #007bff;
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
  background-color: #0056b3;
}
</style>
