import React from 'react';

const DeleteConfirmation = ({ onConfirm, onCancel, message }) => {
  return (
    <div className="text-center">
      <p className="mb-4">{message}</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Hủy
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
