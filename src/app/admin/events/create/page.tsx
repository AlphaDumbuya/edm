"use client";

import { useState, useEffect } from "react";
import { createEventAction } from "../actions"; // Adjust path as needed
import { useRouter } from "next/navigation";
import { EditorState, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';
import draftToHtml from 'draftjs-to-html';
const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });
// Removed unused formData state and handleChange function as we will use FormData directly with server actions
export default function CreateEventPage() {const [formData, setFormData] = useState({    title: '',    description: '',    date: '',
 time: '',
    location: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const data = new FormData();
    data.append('title', formData.title);
    data.append('date', formData.date);
    data.append('time', formData.time);
    data.append('location', formData.location);

    try {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      // Convert editor state to HTML and append to FormData
      data.append('description', draftToHtml(rawContentState));
      await createEventAction(data);router.push('/admin/events');
    } catch (error) {
      console.error('Error creating event:', error);
      // Optionally, display an error message to the user
    }
  };


  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();

  useEffect(() => {
    // Import CSS on the client side
    import('react-draft-wysiwyg/dist/react-draft-wysiwyg.css' as any);
  }, []);

  const handleEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };


  // Define modules for the rich text editor
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Create New Event</h1>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          {/* Retained basic input fields for simplicity with FormData */}
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title" // Ensure ID matches htmlFor
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Editor
            editorState={editorState}            
            onEditorStateChange={handleEditorStateChange}
            editorClassName="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date" // Ensure ID matches htmlFor
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            id="time" // Ensure ID matches htmlFor
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location" // Ensure ID matches htmlFor
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}