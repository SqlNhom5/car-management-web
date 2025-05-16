import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    if (totalPages <= maxPagesToShow) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages - 2, currentPage + 2);
      if (startPage > 1) {
        pages.push('...');
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage < totalPages - 2) {
        pages.push('...');
      }
      if (totalPages > 1) {
        pages.push(totalPages - 1);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
        className={`px-3 py-1 rounded ${
          currentPage === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Đầu
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`px-3 py-1 rounded ${
          currentPage === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Trước
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : page === '...'
              ? 'bg-white text-gray-500 cursor-default'
              : 'bg-white text-blue-500 hover:bg-blue-100'
          }`}
        >
          {typeof page === 'number' ? page + 1 : '...'}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages - 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Sau
      </button>
      <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages - 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Cuối
      </button>
    </div>
  );
};

export default Pagination;