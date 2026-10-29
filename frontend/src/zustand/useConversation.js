import { create } from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    messages: [],
    setMessage: (messages) => set({ messages }),
    addMessage: (message) => set((state) => {
        if (state.messages.some((item) => item._id === message._id)) {
            return state;
        }
        return { messages: [...state.messages, message] };
    }),
}));

export default useConversation;
