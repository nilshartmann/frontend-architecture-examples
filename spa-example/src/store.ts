import { create } from "zustand";

type CommentFormContent = {
  name: string;
  comment: string;
};

type CommentEditorState = {
  forms: Record<string, CommentFormContent>;
  updateName(postId: string, nameName: string): void;
  updateComment(postId: string, nameComment: string): void;
};

export const useFormState = create<CommentEditorState>()((set) => ({
  forms: {},

  updateName(postId: string, newName: string) {
    return set((state) => {
      const currentForm = state.forms[postId] || { name: "", comment: "" };
      return { forms: { ...state.forms, [postId]: { ...currentForm, name: newName } } };
    });
  },

  updateComment(postId: string, newComment: string) {
    return set((state) => {
      const currentForm = state.forms[postId] || { name: "", comment: "" };
      return { forms: { ...state.forms, [postId]: { ...currentForm, comment: newComment } } };
    });
  },
}));
