import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FactFindingData {
  // Personal Information
  clientName: string;
  clientAge: string;
  clientOccupation: string;
  clientMaritalStatus: string;

  // Financial Information
  monthlyIncome: string;
  monthlyExpenses: string;
  currentSavings: string;
  existingInsurance: string;

  // Financial Goals
  shortTermGoal: string;
  longTermGoal: string;
  targetAmount: string;
  timeHorizon: string;

  // Risk Profile
  riskTolerance: string;
  investmentExperience: string;

  // Insurance Needs
  familyDependents: string;
  healthCondition: string;
  existingMedicalConditions: string;

  // Metadata
  submittedAt?: string;
}

interface FactFindingState {
  formData: FactFindingData | null;
  isSubmitted: boolean;
  loading: boolean;
  error: string | null;
  recentForms: FactFindingData[];
}

const loadRecentForms = (): FactFindingData[] => {
  try {
    const stored = localStorage.getItem('factFinding_recentForms');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading recent forms:', error);
    return [];
  }
};

const saveRecentForms = (forms: FactFindingData[]) => {
  try {
    localStorage.setItem('factFinding_recentForms', JSON.stringify(forms));
  } catch (error) {
    console.error('Error saving recent forms:', error);
  }
};

const initialState: FactFindingState = {
  formData: null,
  isSubmitted: false,
  loading: false,
  error: null,
  recentForms: loadRecentForms(),
};

const factFindingSlice = createSlice({
  name: 'factFinding',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FactFindingData>) => {
      const formDataWithTimestamp = {
        ...action.payload,
        submittedAt: new Date().toISOString(),
      };

      state.formData = formDataWithTimestamp;
      state.isSubmitted = true;
      state.error = null;

      // Add to recent forms (keep only last 5)
      const updatedRecentForms = [formDataWithTimestamp, ...state.recentForms.slice(0, 4)];
      state.recentForms = updatedRecentForms;

      // Save to localStorage
      saveRecentForms(updatedRecentForms);
    },
    clearFormData: (state) => {
      state.formData = null;
      state.isSubmitted = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    refreshRecentForms: (state) => {
      state.recentForms = loadRecentForms();
    },
    clearRecentForms: (state) => {
      state.recentForms = [];
      saveRecentForms([]);
    },
  },
});

export const {
  setFormData,
  clearFormData,
  setLoading,
  setError,
  refreshRecentForms,
  clearRecentForms
} = factFindingSlice.actions;
export default factFindingSlice.reducer;
