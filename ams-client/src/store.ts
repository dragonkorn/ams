import { configureStore } from '@reduxjs/toolkit'
import reportCreatorReducer from './modules/report_creator/reportCreatorSlice'
import factFindingReducer from './modules/factFinding/slices/factFindingSlice'

export const store = configureStore({
  reducer: {
    reportCreator: reportCreatorReducer,
    factFinding: factFindingReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch