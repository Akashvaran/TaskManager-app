import React, { useState, useEffect } from "react";
import './Userdetails.css';
import Axios from "../axios/Axios";

const Userdetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteUserId, setDeleteUserId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await Axios.get("/User/getuser");
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openDeleteModal = (userId) => {
    setDeleteUserId(userId);
    setModalOpen(true);
  };

  const deleteUser = async () => {
    try {
      console.log(deleteUserId);
      await Axios.delete(`/User/delete/${deleteUserId}`);
      setUsers(users.filter((user) => user._id !== deleteUserId));
      setModalOpen(false);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id} className="user-list-item">
            <span className="user-info">{user.name}</span>
            <span className="user-info">{user.email}</span>
            <span className="user-info role">{user.role}</span>
            <button className="delete-btn" onClick={() => openDeleteModal(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this user?</h3>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={deleteUser}>Yes</button>
              <button className="cancel-btn" onClick={() => setModalOpen(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userdetails;
