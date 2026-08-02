
import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const { _id = '', title = '', summary = '', category = '', authorId = {}, createdAt = '' } = post;

  return (
    <Link to={`/post/${_id}`} className="block h-full"> {/* Make the Link a block element and ensure it takes full height */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full"> {/* Add cursor-pointer and h-full for consistent sizing */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-500">{category}</span>
            <span className="text-sm text-gray-400">{createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800 transition-colors duration-300">{title}</h2> {/* Removed Link from h2 */}
          <p className="text-gray-600 mb-4">{summary}</p>
          <div className="flex items-center">
            <p className="text-sm font-semibold text-gray-700">{authorId?.name || 'Bilinmeyen Yazar'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;

