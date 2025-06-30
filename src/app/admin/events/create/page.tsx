"use client";

import { useState, useEffect } from "react";
import { createEventAction } from "../actions"; // Adjust path as needed
import { useRouter } from "next/navigation";
import { EditorState, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const Editor: any = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

export default function CreateEventPage() {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
  }>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });
  const [userId, setUserId] = useState('');
  const [editorState, setEditorState] = useState<any>(EditorState.createEmpty());
  const router = useRouter();
  useEffect(() => {
    // Retrieve userId from localStorage on mount
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) setUserId(storedUserId);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (!userId || userId === 'mockUserId') {
      alert('User not authenticated. Please log in with a real account and reload the page.');
      return;
    }

    console.log('Submitting event with userId:', userId); // Debug log

    const data = new FormData();
    data.append('userId', userId);
    data.append('title', formData.title);
    data.append('date', formData.date);
    data.append('time', formData.time);
    data.append('location', formData.location);

    try {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      // Convert editor state to HTML and append to FormData
      data.append('description', draftToHtml(rawContentState));
      await createEventAction(data);
      router.push('/admin/events');
    } catch (error) {
      console.error('Error creating event:', error);
      // Optionally, display an error message to the user
    }
  };

  const handleEditorStateChange = (newEditorState: any) => {
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
    <div className="container mx-auto py-6 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 max-w-2xl">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-center">Create New Event</h1>

      { (!userId || userId === 'mockUserId') && (
        <div className="mb-4 p-3 sm:p-4 bg-yellow-100 text-yellow-800 rounded text-center text-sm sm:text-base">
          User not authenticated. Please log in with a real account and reload the page.<br />
          <span className="text-xs">Current userId: {userId || 'none'}</span>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-4 bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8" encType="multipart/form-data">
        {/* Add hidden userId input for server action authentication */}
        <input type="hidden" name="userId" value={userId} />
        {/* File input for event image */}
        <div>
          <label htmlFor="image" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Event Image (optional)
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="block w-full text-xs sm:text-sm text-gray-700 border border-gray-300 rounded-md p-2 bg-white focus:ring-blue-500 focus:border-blue-500"
            style={{ display: 'block' }}
          />
        </div>

        {/* Retained basic input fields for simplicity with FormData */}
        <div>
          <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          {/* @ts-ignore */}
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorStateChange}
            editorClassName="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 min-h-[120px] sm:min-h-[160px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="date" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="time" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}