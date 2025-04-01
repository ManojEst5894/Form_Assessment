import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  data: {
    dropdown1: string;
    dropdown2: string;
    textInput1: string;
    textInput2: string;
    textInputWithButton: string;
  } | null;
}

const initialState: FormState = {
  data: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveFormData(state, action: PayloadAction<FormState["data"]>) {
      state.data = action.payload;
    },
  },
});

export const { saveFormData } = formSlice.actions;
export default formSlice.reducer;
