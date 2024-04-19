import { createSlice } from '@reduxjs/toolkit';

const initialState = []

const ownNotesSlice = createSlice({
    name: 'ownNotes',
    initialState,
    reducers: {
        addNote(state, action) {
            action.payload.forEach(note => {
                const id = note.note_id;
                const title = note.title;
                const description = note.description;
                const createdAt = note.create_date_time;
                const visibility = note.public_visibility;
        
                // Check if the note with the same id already exists in the state
                const existingNoteIndex = state.findIndex(existingNote => existingNote.id === id);
        
                if (existingNoteIndex !== -1) {
                    // If the note exists, update it
                    state[existingNoteIndex] = { id, title, description, createdAt, visibility };
                } else {
                    // If the note doesn't exist, add it to the state, append at start
                    state.unshift({ id, title, description, createdAt, visibility });
                }
            });
        
            // Sort the notes by date
            state.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
            // Change the format of the date
            state.forEach(note => {
                const date = new Date(note.createdAt);
                // Format the date to be more readable in 'dd/mm/yyyy hh:mm am/pm' format
                note.createdAt = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getHours() >= 12 ? 'pm' : 'am'}`;
            });
        },
        removeNote(state, action) {
            const noteIndex = state.findIndex(note => note.id === action.payload);
            if (noteIndex !== -1) state.splice(noteIndex, 1);
        },
        editNote(state, action) {
            const id = action.payload.note_id;
            const title = action.payload.title;
            const description = action.payload.description;
            const visibility = action.payload.public_visibility;

            const noteIndex = state.findIndex(note => note.id === id);

            if (noteIndex !== -1) {
                const prevNote = state[noteIndex]
                state[noteIndex] = { id, title, description, visibility, createdAt: prevNote.createdAt };
            }
        }
    }
})

export const { addNote, removeNote, editNote} = ownNotesSlice.actions

export default ownNotesSlice.reducer