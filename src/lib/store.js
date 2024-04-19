import { configureStore } from '@reduxjs/toolkit'
import ownNotesReducer from './features/ownNotesSlice'
import exploreNotesReducer from './features/exploreNotesSlice'
import userProfileReducer from './features/userProfileSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      ownNotes: ownNotesReducer,
      exploreNotes: exploreNotesReducer,
      userProfile: userProfileReducer,
    }
  })
}