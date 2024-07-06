import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`https://pygram-backend.onrender.com/api/setting/${userId}`);
          setUserData(response.data.user);
        } else {
          console.error('User ID not found in local storage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const formattedBirthday = new Date(userData.birthday).toLocaleDateString('vi-VN');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        ...userData,
        birthday: new Date(userData.birthday).toISOString().split('T')[0] // Format date to YYYY-MM-DD
      };
  
      const response = await axios.put('https://pygram-backend.onrender.com/api/update', updatedData);
      if (response.status === 200) {
        alert('Cập nhật thông tin thành công');
        setIsEditing(false);
      } else {
        alert('Lỗi khi cập nhật thông tin');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Lỗi khi cập nhật thông tin');
    }
  };
  

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card" style={{ maxWidth: '500px', width: '500px', maxHeight: '500px', height: '500px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Personal Information</h2>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    className="form-control mb-2"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="gender"
                    value={userData.gender}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="major"
                    value={userData.major}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <p className="mb-2">Name: {userData.name}</p>
                  <p className="mb-2">Email: {userData.email}</p>
                  <p className="mb-2">Gender: {userData.gender}</p>
                  <p className="mb-0">Birthday: {formattedBirthday}</p>
                  <p className="mb-0">Major: {userData.major}</p>
                </>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4" style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
            {isEditing ? (
              <button className="btn btn-primary mr-3" onClick={handleSave}>Save</button>
            ) : (
              <button className="btn btn-primary mr-3" onClick={handleEdit}>Edit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;