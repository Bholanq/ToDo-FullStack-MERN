import React from 'react';
import { Link } from 'react-router-dom';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { formatDate } from '../lib/utils';

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:5001/api/notes/${id}`);

      if (res.status === 200) {
        // ✅ Safely call setNotes only if it's a function
        if (typeof setNotes === 'function') {
          setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        }
        toast.success("Note deleted successfully");
      } else {
        toast.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#653b0e]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
