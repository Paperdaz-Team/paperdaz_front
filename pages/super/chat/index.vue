<template>
  <section
    class="container"
    style="padding-top: 50px;">
    <b-row v-if="chatos.length  !==  0">
      <b-col
        :class="activated"
        class="olf"
        cols="12"
        lg="3"
        md="3"
        sm="12"
        style="max-height: 450px">
        <b-nav vertical>
          <b-nav-item
            :active="currentChat === chatter"
            :key="index"
            @click="setCurrent(chatter)"
            v-for="(chatter, index) in chatos">
            <span
              style="text-transform: capitalize; font-size: 12px; color: black">{{ chats.find(e=>e.from === chatter).user }}</span><br><span
              style="font-size: 9px; text-transform: lowercase !important; color: black">{{ chatter }}</span>
          </b-nav-item>
        </b-nav>
      </b-col>
      <b-col
        cols="12"
        lg="6"
        md="6"
        v-if="currentChat.length>1">
        <v-container>
          <v-layout style="padding: auto 30px; margin-top: 300px">
            <div class="chat col-lg-12 col-xs-12">
              <div class="chat-title">
                <h1>
                  <span style="text-transform: capitalize;">{{ chats.find(e=>e.from === currentChat).user }}</span>
                </h1>
                <h2>
                  <span style="font-size: 9px; color: black !important;">{{ currentChat }}</span>
                </h2>
                <button
                  @click="currentChat = ''"
                  class="btn btn-warning visible-md visible-xs mt-3 btn-sm ti ti-arrow-left" />
              </div>

              <div class="messages">
                <div
                  class="messages-content olf"
                  id="messages-content">
                  <div
                    :class="messageType(msg.from)"
                    class="message"
                    v-for="msg in thisChat">
                    <b><span style="text-transform: capitalize;">{{ msg.to === 'Admin'?chats.find(e=>e.from === currentChat).user: 'You' }}</span></b><br>
                    {{ msg.message }}
                    <br>
                    {{ readableTime(msg.date_sent) }}
                  </div>
                  <div
                    :class="typing_class"
                    class="message"
                    v-if="is_typing">
                    <span />
                  </div>
                </div>
              </div>
              <div class="message-box">
                <input
                  @keyup="keyupFunction"
                  class="message-input"
                  id="inp"
                  placeholder="Type message..."
                  type="text"
                  v-model="message">
                <button
                  @click="sendMessage"
                  class="message-submit"
                  type="submit">
                  Send
                </button>
              </div>
            </div>
          </v-layout>
        </v-container>
        <div
          class="visible-xs"
          style="height: 200px;" />
      </b-col>
    </b-row>
    <b-row
      style="width: 100%;"
      v-else>
      <b-col
        class="text-center"
        cols="12"
        lg="12"
        md="12">
        <i class="ti ti-comments fa-5x" /><br><br>
        No Chats found at this time
      </b-col>
    </b-row>
  </section>
</template>


<script type="text/javascript">
import io from 'socket.io-client';
import { mapActions, mapGetters } from 'vuex';
import { API_URL } from '@/plugins/config.js';

export default {
  meta: { requiresAuth: true },
  layout: 'super_layout',
  head: {
    title: 'Chats',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Super admin chat' },
    ],
  },
  props: ['open'],
  data() {
    return {
      socket: io(API_URL),
      is_typing: false,
      who_is_typing: '',
      newChat: true,
      email: '',
      name: '',
      message: '',
      currentChat: '',
    };
  },
  methods: {
    ...mapActions('chats', ['addToChats', 'setChatUser', 'reset']),
    keyupFunction(e) {
      if (e.key === 'Enter') {
        this.sendMessage();
      } else {
        const t = this;
        this.socket.emit('IS_TYPING', {
          to: this.currentChat,
          from: 'Admin',
          type: 'admin',
        });
        setTimeout(() => {
          t.socket.emit('IS_NOT_TYPING', {
            to: t.currentChat,
            from: 'Admin',
            type: 'admin',
          });
        }, 2000);
      }
    },
    clearChat() {
      this.reset();
    },
    saveUser() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.setChatUser({
            name: this.name,
            chatId: this.email,
          });
          this.newChat = false;
        } else {
          this.$message.info({
            message: 'All fields are required',
          });
        }
      });
    },
    messageType(type) {
      if (type === 'Admin') {
        return 'new';
      }
      return 'message-personal';
    },
    readableTime(time) {
      const t = new Date(time);
      return `${t.getHours()}:${t.getMinutes()}`;
    },
    scrollBottom() {
      const objDiv = document.getElementById('messages-content');
      document.getElementById('inp').focus();
      objDiv.scrollTop = objDiv.scrollHeight;
    },
    setCurrent(c) {
      this.currentChat = c;
      const t = this;
      this.socket.emit('IS_TYPING', {
        to: this.currentChat,
        from: 'Admin',
        type: 'admin',
      });
      setTimeout(() => {
        t.socket.emit('IS_NOT_TYPING', {
          to: t.currentChat,
          from: 'Admin',
          type: 'admin',
        });
      }, 500);
    },
    sendMessage() {
      this.socket.emit('SEND_MESSAGE', {
        user: this.chatUser.name,
        from: 'Admin',
        to: this.currentChat,
        message: this.message,
      });
      this.message = '';
      this.socket.emit('IS_NOT_TYPING', {
        to: this.currentChat,
        from: 'Admin',
        type: 'User',
      });
    },
  },
  mounted() {
    this.socket.on('MESSAGE', (data) => {
      if (data.to === 'Admin' || data.from === 'Admin') {
        this.addToChats(data);
        this.scrollBottom();
      }
    });

    this.socket.on('IS_TYPING', (data) => {
      if (data.to === 'Admin' || data.from === 'Admin') {
        this.is_typing = true;
        this.typing_class = `loading ${data.to}` === 'Admin' ? 'message-personal' : 'new';
        if (data.type === 'admin') {
          this.typing_class = 'loading new';
        } else if (data.type === 'User') {
          this.typing_class = 'loading message-personal';
        }
        this.scrollBottom();
      }
    });

    this.socket.on('IS_NOT_TYPING', (data) => {
      if (data.to === 'Admin' || data.from === 'Admin') {
        this.is_typing = false;
        this.typing_class = '';
        this.scrollBottom();
      }
    });
  },
  computed: {
    ...mapGetters('chats', ['chats', 'chatUser']),
    ...mapGetters('user_mgt', ['isLoggedIn', 'user']),
    openDrawer: {
      // getter
      get() {
        return this.open;
      },
      // setter
      set(newValue) {
        this.$emit('close', newValue);
      },
    },
    // 0696364909
    typing() {
      if (this.is_typing) {
        return `loading ${this.who_is_typing.toLowerCase()}`;
      }
    },

    chatos() {
      const dofos = [];
      const toros = this.chats.filter(e => e.from   !==   'Admin');

      for (let i = 0; i < toros.length; i++) {
        if (dofos.indexOf(toros[i].from) === -1) {
          dofos.push(toros[i].from);
        }
      }
      return dofos;
    },
    thisChat() {
      if (this.currentChat.length > 1) {
        return this.chats.filter(e => e.from === this.currentChat || e.to === this.currentChat);
      }
    },
    activated() {
      if (this.currentChat.length > 1) {
        return 'hidden-xs';
      }
      return '';
    },
    activatedChat() {
      if (this.currentChat.length > 1) {
        return 'visible-xs';
      }
      return 'hidden-xs';
    },
  },
};
</script>


<style scoped type="text/css">

  .active {
    border-right: 2px solid green;
    background: white;
  }

  /*--------------------
  Chat
  --------------------*/
  .chat {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    height: 100vh;
    max-height: 550px;
    z-index: 2;
    overflow: hidden;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
    /*background: rgba(0, 0, 0, 0.5);*/
    /*border-radius: 20px;*/
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  /*--------------------
  Chat Title
  --------------------*/
  .chat-title {
    -webkit-box-flex: 0;
    -webkit-flex: 0 1 45px;
    -ms-flex: 0 1 45px;
    flex: 0 1 45px;
    position: relative;
    z-index: 2;
    /*background: rgba(0, 0, 0, 0.2);*/
    color: black;
    text-transform: uppercase;
    text-align: left;
    padding: 10px 10px 10px 20px;
  }

  .chat-title h1, .chat-title h2 {
    font-weight: normal;
    font-size: 10px;
    margin: 0;
    padding: 0;
  }

  .chat-title h2 {
    color: rgba(255, 255, 255, 0.5);
    font-size: 8px;
    letter-spacing: 1px;
  }

  .chat-title .avatar {
    position: absolute;
    z-index: 1;
    top: 8px;
    left: 9px;
    border-radius: 30px;
    width: 30px;
    height: 30px;
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: 2px solid rgba(255, 255, 255, 0.24);
  }

  .chat-title .avatar img {
    width: 100%;
    height: auto;
  }

  /*--------------------
  Messages
  --------------------*/
  .messages {
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    color: rgba(255, 255, 255, 0.5);
    overflow: hidden;
    position: relative;
    width: 100%;
    margin-top: 10px;

  }

  .messages .messages-content {
    position: absolute;
    top: 0;
    left: 0;
    height: 101%;
    width: 100%;
    padding-right: 10px;
    overflow-y: auto;
  }

  .messages .message {
    clear: both;
    float: left;
    padding: 6px 10px 7px;
    border-radius: 10px 10px 10px 0;
    background: rgba(0, 0, 0, 0.3);
    margin: 8px 0;
    font-size: 11px;
    line-height: 1.4;
    margin-left: 5px;
    position: relative;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  }

  .messages .message .timestamp {
    position: absolute;
    bottom: -15px;
    font-size: 9px;
    color: rgba(255, 255, 255, 0.3);
  }

  .messages .message::before {
    content: '';
    position: absolute;
    bottom: -6px;
    border-top: 6px solid rgba(0, 0, 0, 0.3);
    left: 0;
    border-right: 7px solid transparent;
  }

  .messages .message .avatar {
    position: absolute;
    z-index: 1;
    bottom: -15px;
    left: -35px;
    border-radius: 30px;
    width: 30px;
    height: 30px;
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: 2px solid rgba(255, 255, 255, 0.24);
  }

  .messages .message .avatar img {
    width: 100%;
    height: auto;
  }

  .messages .message.message-personal {
    float: right;
    color: #fff;
    text-align: right;
    background: -webkit-linear-gradient(330deg, #248A52, #257287);
    background: linear-gradient(120deg, #248A52, #257287);
    border-radius: 10px 10px 0 10px;
  }

  .messages .message.message-personal::before {
    left: auto;
    right: 0;
    border-right: none;
    border-left: 5px solid transparent;
    border-top: 4px solid #257287;
    bottom: -4px;
  }

  .messages .message:last-child {
    margin-bottom: 30px;
  }

  .messages .message.new {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-animation: bounce 500ms linear both;
    animation: bounce 500ms linear both;
  }

  .messages .message.loading::before {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    content: '';
    display: block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    z-index: 2;
    margin-top: 4px;
    -webkit-animation: ball 0.45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
    animation: ball 0.45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
    border: none;
    -webkit-animation-delay: .15s;
    animation-delay: .15s;
  }

  .messages .message.loading span {
    display: block;
    font-size: 0;
    width: 20px;
    height: 10px;
    position: relative;
  }

  .messages .message.loading span::before {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    content: '';
    display: block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    z-index: 2;
    margin-top: 4px;
    -webkit-animation: ball 0.45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
    animation: ball 0.45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
    margin-left: -7px;
  }

  .messages .message.loading span::after {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    content: '';
    display: block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    z-index: 2;
    margin-top: 4px;
    -webkit-animation: ball 0.45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
    animation: ball 0.45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
    margin-left: 7px;
    -webkit-animation-delay: .3s;
    animation-delay: .3s;
  }

  /*--------------------
  Message Box
  --------------------*/
  .message-box {
    -webkit-box-flex: 0;
    -webkit-flex: 0 1 40px;
    -ms-flex: 0 1 40px;
    flex: 0 1 40px;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
    position: relative;
  }

  .message-box .message-input {
    background: none;
    border: none;
    outline: none !important;
    /*resize: none;*/
    color: rgba(255, 255, 255, 0.7);
    font-size: 11px;
    height: 17px;
    margin: 0;
    padding-right: 20px;
    width: 265px;
  }

  .message-box input:focus:-webkit-placeholder {
    color: transparent;
  }

  .message-box .message-submit {
    position: absolute;
    z-index: 1;
    top: 9px;
    right: 10px;
    color: #fff;
    border: none;
    background: #248A52;
    font-size: 10px;
    text-transform: uppercase;
    line-height: 1;
    padding: 6px 10px;
    border-radius: 10px;
    outline: none !important;
    -webkit-transition: background .2s ease;
    transition: background .2s ease;
  }

  .message-box .message-submit:hover {
    background: #1D7745;
  }

  /*--------------------
  Custom Srollbar
  --------------------*/
  .mCSB_scrollTools {
    margin: 1px -3px 1px 0;
    opacity: 0;
  }

  .mCSB_inside > .mCSB_container {
    margin-right: 0px;
    padding: 0 10px;
  }

  .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }

  /*--------------------
  Bounce
  --------------------*/
  @-webkit-keyframes bounce {
    0% {
      -webkit-transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    4.7% {
      -webkit-transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    9.41% {
      -webkit-transform: matrix3d(0.883, 0, 0, 0, 0, 0.883, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0.883, 0, 0, 0, 0, 0.883, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    14.11% {
      -webkit-transform: matrix3d(1.141, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(1.141, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    18.72% {
      -webkit-transform: matrix3d(1.212, 0, 0, 0, 0, 1.212, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(1.212, 0, 0, 0, 0, 1.212, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    24.32% {
      -webkit-transform: matrix3d(1.151, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(1.151, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    29.93% {
      -webkit-transform: matrix3d(1.048, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(1.048, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    35.54% {
      -webkit-transform: matrix3d(0.979, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0.979, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    41.04% {
      -webkit-transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    52.15% {
      -webkit-transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    63.26% {
      -webkit-transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    85.49% {
      -webkit-transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    100% {
      -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
  }

  @keyframes bounce {
    0% {
      -webkit-transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    4.7% {
      -webkit-transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    9.41% {
      -webkit-transform: matrix3d(0.883, 0, 0, 0, 0, 0.883, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0.883, 0, 0, 0, 0, 0.883, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    14.11% {
      -webkit-transform: matrix3d(1.141, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(1.141, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    18.72% {
      -webkit-transform: matrix3d(1.212, 0, 0, 0, 0, 1.212, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(1.212, 0, 0, 0, 0, 1.212, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    24.32% {
      -webkit-transform: matrix3d(1.151, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(1.151, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    29.93% {
      -webkit-transform: matrix3d(1.048, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(1.048, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    35.54% {
      -webkit-transform: matrix3d(0.979, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0.979, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    41.04% {
      -webkit-transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    52.15% {
      -webkit-transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    63.26% {
      -webkit-transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    85.49% {
      -webkit-transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    100% {
      -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
  }

  @-webkit-keyframes ball {
    from {
      -webkit-transform: translateY(0) scaleY(0.8);
      transform: translateY(0) scaleY(0.8);
    }
    to {
      -webkit-transform: translateY(-10px);
      transform: translateY(-10px);
    }
  }

  @keyframes ball {
    from {
      -webkit-transform: translateY(0) scaleY(0.8);
      transform: translateY(0) scaleY(0.8);
    }
    to {
      -webkit-transform: translateY(-10px);
      transform: translateY(-10px);
    }
  }


</style>

<style type="text/css">

  .olf:hover::-webkit-scrollbar {
    width: 5px;
    transition: all 1s ease;
  }

  .olf::-webkit-scrollbar {
    width: 0px;
    transition: all 1s ease;
  }

  .olf::-webkit-scrollbar-thumb {
    border-radius: 2px !important;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;
    background-color: green;
    transition: all 1s ease;
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
  }

  .olf::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1) !important;
    border-radius: 50px;

    transition: all 1s ease;
  }
</style>
