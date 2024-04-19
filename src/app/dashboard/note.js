import Link from 'next/link';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch } from '@/lib/hooks';
import { setUserProfile } from '@/lib/features/userProfileSlice';
import NotesService from '@/service/api/notesService';

export default function Note({ note, user }) {

  const dispatch = useAppDispatch();

  const [showOption, setShowOption] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editedNote, setEditedNote] = useState({ ...note });

  const open = Boolean(anchorEl);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      setShowOption(true);
    }
  }, []);


  const handleProfileClick = () => {
    const userIdHash = localStorage.getItem('userIdHash');

    if (userIdHash === note.userIdHash) { window.location.href = '/user/profile'; return; }

    localStorage.setItem('profile', note.userIdHash);
    window.location.href = '/profile'
  }

  const handleClick = (event) => {
    console.log('clicked');
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => { setAnchorEl(null); };

  

  const handleDelete = async () => {
    console.log('Note ID: ' + note.id)
    const { success, message } = await NotesService.deleteNote(note.id, dispatch);

    if (!success) console.log("Error deleting note: " + message);

    setAnchorEl(null);
  }

  const handleEdit = () => { setIsEditModalOpen(true); setAnchorEl(null); }

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
    setEditedNote((prevNote) => ({...note}))
  }

  async function editMessage(event) {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));


    (formData.visibility === "on") ? formData.visibility = true : formData.visibility = false;

    const { success, message } = await NotesService.editNote(note.id, formData.title, formData.description, formData.visibility, dispatch);

    if (!success) console.log("Error editing note: " + message);

    setIsEditModalOpen(!isEditModalOpen);

  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: type === 'checkbox' ? checked : value, 
    }));
  };


  return (
    <>
      <div className="p-6">
        <div className="grid items-start kBlack2 dark:kBlack2 hover:bg-neutral-700 rounded-lg p-6 space-y-4">
          <div className='flex'>
            <div className="flex-col mr-auto font-bold kCream dark:kCream leading-none text-3xl">{note.title}</div>
            {(showOption == true || user == true) && (
              <div>
                <IconButton aria-label="more" id="long-button" aria-controls={open ? 'basic-menu' : undefined} aria-expanded={open ? 'true' : undefined} aria-haspopup="true" onClick={handleClick} >
                  <MoreVertIcon style={{ color: 'white' }} />
                </IconButton>
                <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'long-button', }} PaperProps={{ style: { backgroundColor: 'gray', width: 150 }, }} >
                  <MenuItem onClick={handleEdit} sx={{ color: 'white' }}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete} sx={{ color: 'white' }}>Delete</MenuItem>
                </Menu>
              </div>)}
          </div>

          <hr className="border-white-500 dark:border-white-500" />
          <div className="text-lg text-white-500 dark:text-white-400 h-32">{note.description}</div>
          {typeof note.userIdHash === 'string' && (
            <div className="text-md text-gray-500 dark:text-gray-400 ">By
              <button onClick={handleProfileClick} className="text-white dark:text-white hover:underline ml-1 text-lg underline">
                {note.name}
              </button>
            </div>
          )}
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Created on {note.createdAt}</div>

        </div>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="relative z-50 bg-black rounded-lg shadow-lg w-3/4 p-12 ">
            <form onSubmit={editMessage}>
              <div className="mb-4 w-1/4">
                <label htmlFor="title" className="block text-lg font-medium text-white-700">Title</label>
                <input
                  value={editedNote.title}
                  onChange={handleChange}
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 text-gray-900 p-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                  placeholder="Enter title"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-lg font-medium text-white-700">Description</label>
                <textarea
                  value={editedNote.description}
                  onChange={handleChange}
                  id="descripition"
                  name="description"
                  rows="3"
                  className="mt-1 text-gray-900 p-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-32"
                  placeholder="Enter description"
                ></textarea>
              </div>
              <div className="flex items-center mb-4">
                <input
                  checked={editedNote.visibility}
                  onChange={handleChange}
                  id="visibility"
                  name="visibility"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="visibility" className="ml-2 block text-sm text-white-900">
                  Visible to others
                </label>
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={toggleEditModal} className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>

  );
};

