import { useState } from 'react';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState('');
  const [category, setCategory] = useState('Machine Learning');
  const [description, setDescription] = useState('');

  const categories = [
    'Machine Learning',
    'Web Development',
    'Data Science',
    'Cybersecurity',
    'Blockchain',
  ];

  const handleSubmit = () => {
    console.log('Creating group:', { groupName, category, description });
    // Implement group creation logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
    >
      <div
        className="max-w-md w-full p-6 rounded-xl bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/20 text-gray-200 hover:scale-110 transition-transform"
        >
          ✕
        </button>
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">👥</div>
          <h2 className="text-xl font-bold mb-2 text-gray-200">Create Study Group</h2>
          <p className="text-sm text-gray-200 opacity-80">
            Start a new discussion group for your topic
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-200">Group Name</label>
            <input
              type="text"
              placeholder="e.g., Advanced Python Concepts"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-3 rounded-lg border-2 bg-gray-950 text-gray-200 border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-200">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-lg border-2 bg-gray-950 text-gray-200 border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-200">Description</label>
            <textarea
              placeholder="Describe what your group will discuss..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg border-2 h-20 resize-none bg-gray-950 text-gray-200 border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border-2 border-blue-500/50 text-gray-200 hover:scale-105 transition-transform"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:scale-105 transition-transform"
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
}