import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RatelimitedUI'
import axios from 'axios'
import { toast } from "react-hot-toast";
import NoteCard from '../components/NoteCard';

const HomePage = () => {
  const [isRatelimited,setisRatelimited] = useState(false);
  const [notes,setnotes] = useState([])
  const [loading,setLoading] = useState(true)

useEffect(() => {
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/notes");
      console.log(res.data);
      setnotes(res.data);
      setisRatelimited(false)
    } catch (error) {
      console.log("Error fetching notes");
      if(error.response.status === 429)
      {
        setisRatelimited(true)
      }
      else {
        toast.error("Failed to load notes")
      }
    } finally {
      setLoading(false);
    }
  };

  fetchNotes(); 
}, []);

  return( 

    <div className='min-h-screen'>
        <Navbar/>
        {isRatelimited && <RateLimitedUI/>}
        <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary'> Loading notes..</div>}
        
{notes.length > 0 && !isRatelimited && (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
    {notes.map((note) => (
      <NoteCard key={note._id} note = {note}/>
      
    ))}
  </div>
)}
        
        </div>
    </div>
  )
}

export default HomePage;
