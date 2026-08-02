import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const { _id = '', title = '', summary = '', category = '', authorId = {}, createdAt = '' } = post;

  return (
    <Link to={`/post/${_id}`} className="block h-full group">
      <div className="bg-app rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full border border-card group-hover:border-heading">
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-heading uppercase tracking-wider">{category}</span>
            <span className="text-sm text-heading">{createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-heading">{title}</h2>
          <p className="text-heading mb-4">{summary}</p>
          <div className="flex items-center">
            <p className="text-sm font-semibold text-heading">{authorId?.name || 'Bilinmeyen Yazar'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
