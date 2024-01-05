import { createSlice } from "@reduxjs/toolkit";
import { getAllResume } from "./asyncAction";

const initialState = {
  savedResume: {},
  editingResume: {
    about: {},
    address: {},
    experience: [],
    education: [],
    skills: [],
    social: [],
  },
  templates: "temp_one",
  loading: false,
  msg: "",
};

export const userSlice = createSlice({
  name: "resume",
  initialState,
  //RESUME EDITING
  reducers: {
    editingAbout: (state, action) => {
      state.editingResume.about = action?.payload;
    },
    editingAddress: (state, action) => {
      state.editingResume.address = action?.payload;
    },
    editingEducation: (state, action) => {
      state.editingResume.education = action?.payload;
    },
    editingExperience: (state, action) => {
      state.editingResume.experience = action?.payload;
    },
    editingSkills: (state, action) => {
      state.editingResume.skills = action?.payload;
    },
    editingSocial: (state, action) => {
      state.editingResume.social = action?.payload;
    },
    editingRemove: (state, action) => {
      state.editingResume = initialState.editingResume;
    },
    setEditMode: (state, action) => {
      console.log(" action?.payload", action?.payload);
      state.editingResume = action?.payload;
    },
    changeTemplate: (state, action) => {
      state.templates = action?.payload;
    },
    updateSavedResume: (state, action) => {
      console.log("action?.payload", action?.payload);
      state.savedResume = action?.payload;
    },
  },
  //FOR ASYNC ACTION
  extraReducers(builder) {
    builder
      .addCase(getAllResume.pending, (state) => {
        state.loading = true;
        state.msg = "Pending";
      })
      .addCase(getAllResume.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = "Success";
        console.log("action.payload?.data", action.payload?.data);
        state.savedResume = action.payload?.data;
      })
      .addCase(getAllResume.rejected, (state) => {
        state.loading = false;
        state.msg = "Failed";
      });
    //others will come here
  },
});

// Action creators are generated for each case reducer function
export const {
  editingAbout,
  editingAddress,
  editingEducation,
  editingExperience,
  editingSkills,
  editingSocial,
  editingRemove,
  setEditMode,
  changeTemplate,
  updateSavedResume,
} = userSlice.actions;

export default userSlice.reducer;
