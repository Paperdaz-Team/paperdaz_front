export default {
  updateChats(state, chat) {
    const ch = state.sub.chats;
    if (ch.filter(e => e.id === chat.id).length === 0) {
      state.sub.chats.push(chat);
    }
  },

  updateUser(state, user) {
    state.sub.chatUser = user;
  },


  resetState(state) {
    state.sub = {
      chats: [],
      chatUser: {
        name: null,
        chatId: null,
      },
    };
  },
};
