import Link from 'next/link';
import React, { useEffect } from 'react';


interface PlaylistModalProps {
    playlist: any;
    onClose: () => void;
}

export const PlaylistModal: React.FC<PlaylistModalProps> = ({ playlist, onClose }) => {
    const startPlaylist = () => {
        window.location.hash = '#learning-roadmap';
        onClose();
    };

    const joinDiscussion = () => {
        window.location.hash = '#community-hub';
        onClose();
    };

    const addToWishlist = () => {
        alert('Added to wishlist!');
        onClose();
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        const handleTab = (e: KeyboardEvent) => {
            const modal = document.getElementById('playlist-modal');
            if (!modal) return;

            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('keydown', handleTab);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('keydown', handleTab);
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div id="playlist-modal" className="fixed inset-0 z-[60]" aria-modal="true" aria-hidden="false">
            <div className="fixed inset-0 bg-black/60 bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="bg-[#0E1217] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/40">
                    <div className="flex items-center justify-between p-6 border-b border-gray-700/40">
                        <h2 className="text-2xl font-bold text-[#E6E6E6]">{playlist.title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-neutral-700/50 transition-colors duration-200"
                        >
                            <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <img
                                    src={playlist?.thumbnailUrl}
                                    alt={playlist?.title}
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />
                                <p className="text-neutral-400 mb-4 line-clamp-2">{playlist?.description}</p>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium w-20 text-[#E6E6E6]">Mentor:</span>
                                        <span className="text-sm text-neutral-400">{playlist?.userId?.name}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium w-20 text-[#E6E6E6]">Duration:</span>
                                        <span className="text-sm text-neutral-400">{playlist?.playlistPersonalizationId?.estimatedDuration}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium w-20 text-[#E6E6E6]">Level:</span>
                                        <span className="text-sm text-neutral-400">{playlist?.playlistPersonalizationId.difficulty}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium w-20 text-[#E6E6E6]">Price:</span>
                                        <span
                                            className="text-sm px-2 py-1 rounded-full text-white"
                                            style={{ backgroundColor: playlist?.price === 'Free' ? '#10B981' : '#F59E0B' }}
                                        >
                                            {playlist?.playlistPersonalizationId.resourcesType}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-4 text-[#E6E6E6]">Course Modules</h3>
                                <div className="space-y-3">
                                    {playlist?.moduleIds.map((module: any, index: any) => (
                                        <div
                                            key={index}
                                            className="flex items-center p-3 rounded-lg border border-gray-700/40 bg-[#0E1217]"
                                        >
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-[#1E90FF]">
                                                <span className="text-sm font-medium text-white">{index + 1}</span>
                                            </div>
                                            <span className="text-sm text-[#E6E6E6]">{module.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <Link href={`/playlists/${playlist._id}`} >
                            <button
                                // onClick={startPlaylist}
                                className="px-6 py-3 rounded-lg font-medium text-white transition-colors duration-200 hover:opacity-90 bg-[#1E90FF]"
                            >
                                Start Learning
                            </button>
                            </Link>
                            <button
                                onClick={joinDiscussion}
                                className="px-6 py-3 rounded-lg font-medium border border-gray-700/40 transition-colors duration-200 hover:bg-neutral-700/50 text-[#E6E6E6]"
                            >
                                Join Discussion
                            </button>
                            <button
                                onClick={addToWishlist}
                                className="px-6 py-3 rounded-lg font-medium border border-gray-700/40 transition-colors duration-200 hover:bg-neutral-700/50 text-[#E6E6E6]"
                            >
                                Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};