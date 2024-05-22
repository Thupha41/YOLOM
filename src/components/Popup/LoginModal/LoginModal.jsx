import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-xl font-bold mb-4">You need to log in to continue</h2>
        <div className="flex justify-end space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Login</button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md">Sign Up</button>
          </Link>
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md">Close</button>
        </div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
