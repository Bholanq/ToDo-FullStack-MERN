import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ArrowLeftIcon, PencilIcon, SaveIcon, XIcon } from 'lucide-react';
import { formatDate } from '../lib/utils';

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
        setNote(res.data);
        setEditedTitle(res.data.title);
        setEditedContent(res.data.content);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSave = async () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }

    setSaving(true);
    try {
      const res = await axios.put(`http://localhost:5001/api/notes/${id}`, {
        title: editedTitle,
        content: editedContent,
      });
      setNote(res.data);
      toast.success("Note updated successfully");
      setEditing(false);
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary">Loading note...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error">Note not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/" className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            {editing ? (
              <>
                <input
                  className="input input-bordered text-xl font-semibold mb-4"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Title"
                />
                <textarea
                  className="textarea textarea-bordered min-h-[150px]"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  placeholder="Note content"
                />
                <div className="flex gap-2 mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    <SaveIcon className="size-4 mr-1" />
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button className="btn btn-ghost" onClick={() => setEditing(false)}>
                    <XIcon className="size-4 mr-1" />
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="card-title text-3xl font-bold text-base-content">
                  {note.title}
                </h1>
                <p className="text-sm text-base-content/60 mb-4">
                  Created at: {formatDate(new Date(note.createdAt))}
                </p>
                <p className="text-base-content whitespace-pre-line">{note.content}</p>
                <button
                  className="btn btn-outline btn-sm mt-6"
                  onClick={() => setEditing(true)}
                >
                  <PencilIcon className="size-4 mr-1" />
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
