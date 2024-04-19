import { createSlice } from '@reduxjs/toolkit';

const initialState = []

const exploreNotesSlice = createSlice({
    name: 'exploreNotes',
    initialState,
    reducers: {
        addNote(state, action) {
            const newState = [...state];

            for (const note of action.payload) {
                const id = note.note_id;
                const title = note.title;
                const description = note.description;
                const createdAt = note.create_date_time;
                const userIdHash = note.user_id_hash;
                const name = note.name;
                const visibility = note.public_visibility;

                // Check if the note with the same id already exists in the state
                const existingNoteIndex = newState.findIndex(note => note.id === id);

                if (existingNoteIndex !== -1) {
                    // If the note exists, update it
                    newState[existingNoteIndex] = { id, title, userIdHash, name, description, createdAt, visibility };
                } else {
                    // If the note doesn't exist, add it to the state, append at start
                    newState.unshift({ id, title, userIdHash, name, description, createdAt, visibility });
                }
            }

            // Sort the notes by date
            newState.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Change the format of the date
            newState.forEach(note => {
                const date = new Date(note.createdAt);
                // Format the date to be more readable in 'dd/mm/yyyy hh:mm am/pm' format
                note.createdAt = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getHours() >= 12 ? 'pm' : 'am'}`;

            });

            return newState; // Return the updated state
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
                if (visibility === false) state.splice(noteIndex, 1)

                const prevNote = state[noteIndex]
                state[noteIndex] = { id, title, description, visibility, createdAt: prevNote.createdAt, name: prevNote.name, userIdHash: prevNote.userIdHash };
            }
        }
    }
})

export const { addNote, removeNote, editNote } = exploreNotesSlice.actions

export default exploreNotesSlice.reducer