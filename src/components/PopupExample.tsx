import React, { useState } from "react";
import { Star, Camera, ChevronDown } from 'lucide-react';

interface PopupProps {
    open: boolean;
    onClose: () => void;
}

const StarRating = ({ rating, onRatingChange, interactive = false }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    interactive?: boolean;
}) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-6 h-6 ${star <= rating
                        ? 'fill-orange-400 text-orange-400'
                        : interactive
                            ? 'text-gray-300 hover:text-orange-400 cursor-pointer'
                            : 'text-gray-300'
                        } ${interactive ? 'transition-colors' : ''}`}
                    onClick={interactive ? () => onRatingChange?.(star) : undefined}
                />
            ))}
        </div>
    );
};

export default function Popup({ open, onClose }: PopupProps) {
    const [selectedRating, setSelectedRating] = useState(0);
    if (!open) return null; // don't render when false

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
                <div className="mb-6  flex justify-center">
                    <StarRating
                        rating={selectedRating}
                        onRatingChange={setSelectedRating}
                        interactive={true}
                    />
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
