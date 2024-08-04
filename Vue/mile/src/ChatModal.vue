<template>
  <div class="modals" v-if="isOpen">
    <div class="modals-content">
      <span class="close" @click="$emit('close')">&times;</span>

      <div class="header">
        <span class="title">이지 챗</span>
      </div>

      <div class="chatBox" id="chatBox"></div>

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
//import Swal from 'sweetalert2';

export default {
  data() {
    return {
      message: '',
      chatList: [],
    };
  },
  props: {
    isOpen: Boolean,
  },
  computed: {
    ...mapGetters('login', ['getLoginInfo']),
  },
  methods: {
    sendMessage() {
      if (this.message.trim()) {
        // 메시지를 전송하거나 처리하는 로직을 추가합니다.
        console.log('Message sent:', this.message);

        // 입력 필드를 초기화합니다.
        this.message = '';
      }
    },
    async chatData() {
      try {
        const response = await api.get('/user/chatList');
        console.log('챗:', response.data);
        this.chatList = response.data;
      } catch (error) {
        console.error('챗에러:', error);
      }
    },
  },

  mounted() {
    this.chatData();
  },
};
</script>

<style scoped>
.btn-green {
  box-shadow: 3px 5px 7px rgba(172, 172, 172, 0.3) !important;
}
.modals {
  background-color: transparent;
}

.modals-content {
  background-color: #fff; /* 흰색 배경 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 700px;
  height: 600px; /* 모달의 높이를 지정 */
  display: flex;
  flex-direction: column;
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
  flex: 1; /* 가용 공간을 모두 차지 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 */
  padding: 10px;
  margin-bottom: 20px;
  background-color: #f9f9f9; /* 배경색 */
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
