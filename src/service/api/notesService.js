import { makeRequest } from '@/service/api/requestMaker';
import { addNote as addExploreNote, removeNote as removeExploreNote, editNote as editExploreNote} from '@/lib/features/exploreNotesSlice';
import { addNote as addOwnNote, removeNote as removeOwnNote, editNote as editOwnNote } from '@/lib/features/ownNotesSlice';
import ApiUrls from '@/service/api/urls';


class NotesService {
    static async fetchNotes(dispatch) {
        try {
            const response = await makeRequest(ApiUrls.fetchNotes, { body: {} });

            dispatch(addExploreNote(response.notes));

            return { success: true, message: "Notes fetched successfully" };
        } catch (error) {
            return { success: false, message: error };
        }
    }

    static async fetchOwnNotes(dispatch) {
        try {
            const response = await makeRequest(ApiUrls.fetchOwnNotes, { body: {} });

            dispatch(addOwnNote(response.notes));

            return { success: true, message: "Own notes fetched successfully" };
        } catch (error) {
            return { success: false, message: error };
        }
    }

    static async createNote(title, description, visibility, dispatch) {
        try {
            const response = await makeRequest(ApiUrls.createNote, {
                body: {
                    'title': title,
                    'description': description,
                    'public_visibility': visibility

                }
            });

            dispatch(addOwnNote([response]));

            return { success: true, message: "Note created successfully" };
        } catch (error) {
            return { success: false, message: error };
        }
    }

    static async deleteNote(noteId, dispatch) {
        try {
            const response = await makeRequest(ApiUrls.deleteNote, { body: { 'note_id': noteId } });

            dispatch(removeOwnNote(response.note_id));
            dispatch(removeExploreNote(response.note_id));

            return { success: true, message: "Note deleted successfully" };
        } catch (error) {
            return { success: false, message: error };
        }
    }

    static async editNote(noteId, title, description, visibility, dispatch) {
        try {
            const response = await makeRequest(ApiUrls.editNote, {
                body: {
                    'note_id': noteId,
                    'title': title,
                    'description': description,
                    'public_visibility': visibility
                }
            });
            
            dispatch(editExploreNote(response))
            dispatch(editOwnNote(response))
            
            return { success: true, message: "Note edit successfully"}
        }
        catch (e) {
            return { success: false, message: e };
        }
    }
}

export default NotesService;