import React, { useState, useEffect } from 'react';
import TabBar from './componenthome/tabbar';
import { Redirect } from 'react-router-dom';
import Notification from './componenthome/Notification';
import Setting from './componenthome/setting';
import Searchbutton from './componenthome/image/search.png';
import avatar from './componenthome/image/avata.png';
import picture from './componenthome/image/picture.png';
import reaction from './componenthome/image/reaction.png';
import eduicon from './componenthome/image/education icon.png';
import logo from './componenthome/image/logo.jpg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import calendar from './calendar.css';
import Axios from 'axios';
import { io } from 'socket.io-client';
function Home() {
  const [activePage, setActivePage] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState(new Date());
  const [avatarImage, setAvatarImage] = useState(avatar);
  const [postContent, setPostContent] = useState('');
  const [postedContents, setPostedContents] = useState({});
  const [commentContents, setCommentContents] = useState({});
  const [userData, setUserData] = useState({ id: '', name: '', major: '' });
  const [comments, setComments] = useState({});
  const [lastPostedContentId, setLastPostedContentId] = useState(null);
  const [lastPostedContent, setLastPostedContent] = useState([]);
  const [socket, setSocket] = useState(null);
  const onChange = newDate => {
    setDate(newDate);
  };

  const handleSearchChange = event => {
    setSearchText(event.target.value);
  };

  const handleAvatarChange = async e => {
    // Xử lý thay đổi avata
  };

  const clearPostContent = () => {
    setPostContent('');
  };

  const handleCommentChange = (postId, event) => {
    const { value } = event.target;
    setCommentContents(prevState => ({ ...prevState, [postId]: value }));
  };

  const handleCommentPost = async (postId, commentContent) => {
    try {
      const apiUrl = 'http://localhost:5000/api/cmtstudent';
      const commenterId =
        userData.major === 'Student' || userData.major === 'Teacher'
          ? userData.id
          : userData.someOtherId; // Sửa thành trường id phù hợp với trường hợp không phải sinh viên

      const postData = {
        post_id: postId,
        commenter_id: commenterId,
        content: commentContent,
      };

      const response = await Axios.post(apiUrl, postData);

      if (response.data.message === 'Comment posted successfully') {
        const newComment = `${userData.name}: ${commentContent}`;
        setComments(prevState => ({
          ...prevState,
          [postId]: prevState[postId] ? [...prevState[postId], newComment] : [newComment],
        }));

        const localStorageKey = `comments_${postId}`;
        const existingComments = localStorage.getItem(localStorageKey);
        const updatedComments = existingComments
          ? [...JSON.parse(existingComments), newComment]
          : [newComment];
        localStorage.setItem(localStorageKey, JSON.stringify(updatedComments));

        setCommentContents(prevState => ({ ...prevState, [postId]: '' }));
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
 
  useEffect(() => {
    const newSocket = io('http://localhost:5000'); 
    setSocket(newSocket);

    return () => newSocket.close();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log("token", token)
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await Axios.get('http://localhost:5000/api/user', {
          headers: { Authorization: token },
        });
        if (res.data.message === "Success") {
          setUserData(res.data.user);
          const userId = res.data.user.id;
          localStorage.setItem('userIdhaha',userId)       
          console.log("useridhaha",userId)
        } else {
          console.log('Error: Unable to fetch user information');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchData();
  }, []);
  

  const handleContentChange = (postId, newContent) => {
    setPostedContents(prevState => ({
      ...prevState,
      [postId]: { ...prevState[postId], content: newContent },
    }));
  };

  const handleNameChange = (postId, newName) => {
    setPostedContents(prevState => ({
      ...prevState,
      [postId]: { ...prevState[postId], name: newName },
    }));
  };

  const handlePostButtonClick = async () => {
    try {
      if (!postContent.trim()) {
        console.error('Post content is empty');
        return;
      }
      const apiUrl = 'http://localhost:5000/api/poststatus';
      const postData = {
        poster_id: userData.id,
        content: postContent
      };
      const response = await Axios.post(apiUrl, postData);
      if (response.data.message === 'Post successfully posted') {
        const newPostedContent = {
          name: userData.name,
          avatarImage: avatarImage,
          content: postContent,
          id: response.data.postId
        };
        setPostedContents(prevState => ({
          ...prevState,
          [newPostedContent.id]: newPostedContent,
        }));
        // Cập nhật giá trị lastPostedContent thành nội dung mới
        setLastPostedContent(postContent);
        clearPostContent();
      } else {
        console.error('Error posting:', response.data.error);
      }
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'http://localhost:5000/api/getpoststatus';
        if (lastPostedContentId && userData.id && lastPostedContent) {
          const params = {
            id: lastPostedContentId,
            poster_id: userData.id,
            content: lastPostedContent,
          };
          const res = await Axios.get(apiUrl, { params });
          if (res.data.message === 'Success') {
            setPostedContents(res.data.posts); // Sử dụng dữ liệu từ API để cập nhật postedContents
          }
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchData();
  }, [lastPostedContentId, userData.id, lastPostedContent]);
  const handleDeletePost = postId => {
    setPostedContents(prevState => {
      const updatedContents = { ...prevState };
      delete updatedContents[postId];
      return updatedContents;
    });
  };

  const handleInputChange = event => {
    setPostContent(event.target.value);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <img src={logo} alt="education icon" style={avatarStyle} />
            </div>

            <div style={{ flexGrow: 1 }}>
              <input type="text" value={searchText} onChange={handleSearchChange} placeholder="Search..." style={{ width: '100%' }} />
            </div>

            <div>
              <button style={{ backgroundColor: '#ccc', border: 'none', padding: '5px' }}>
                <img src={Searchbutton} alt="Search" style={{ width: '25px', height: '25px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <TabBar setActivePage={setActivePage} activePage={activePage} />
            <div className="underline"></div>
          </div>
          <div className="col-md-6">
            <div style={{ padding: '5px' }}>
              <div style={containerStyle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={avatarImage} alt="Avatar" style={avatarStyle} />
                  <textarea
                    placeholder="Write something..."
                    value={postContent}
                    onChange={handleInputChange}
                    style={{
                      ...postTextStyle,
                      width: '350px',
                      minHeight: '50px',
                      resize: 'none',
                      borderRadius: '10px',
                    }}
                  />
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', marginTop: '10px', marginLeft: '20px' }}>
                  <span style={{ marginRight: '90px' }}>Add to your post</span>
                  <button style={{ ...smallButtonStyle, background: 'linear-gradient(to right, #EE0000, #3399FF, #FFCC33,#CC99FF,#669999)', width: 'auto', height: '33px' }}>Aaa</button>
                  <button style={{ ...smallButtonStyle, backgroundColor: '#EAAD29' }}><img src={picture} alt="Search" style={{ width: '25px', height: '25px' }} /></button>
                  <button style={{ ...smallButtonStyle, backgroundColor: '#FEDE00' }}><img src={reaction} alt="Search" style={{ width: '25px', height: '25px' }} /></button>
                </div>
                <button style={postButtonStyle} onClick={handlePostButtonClick}>Post</button>
              </div>

              {Object.entries(postedContents).map(([postId, postedContent]) => (
                <div key={postId} style={containerStyle}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => handleDeletePost(postId)}>Delete</button>
                    {postedContent && postedContent.avatarImage && (
                      <img src={postedContent.avatarImage} alt="Avatar" style={avatarStyle} />
                    )}
                    <input
                      type="text"
                      value={postedContent ? postedContent.name : ''}
                      onChange={e => handleNameChange(postId, e.target.value)}
                      onKeyDown={e => e.preventDefault()}
                      onKeyPress={e => e.preventDefault()}
                      onKeyUp={e => e.preventDefault()}
                      style={inforTextStyle}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }} >
                    <textarea
                      type="text"
                      value={postedContent ? postedContent.content : ''}
                      onChange={e => handleContentChange(postId, e.target.value)}
                      style={{
                        ...postTextStyle,
                        marginLeft: '40px',
                        backgroundColor: '#FFFFFF',
                        minHeight: '50px',
                        resize: 'none',
                      }}
                    />
                  </div>
                  {comments[postId] && comments[postId].map((comment, commentIndex) => (
                    <div key={commentIndex} style={{ marginLeft: '30px', marginTop: '10px' }}>
                      {comment}
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <textarea
                      type="text"
                      placeholder="Write a comment..."
                      value={commentContents[postId] || ''}
                      onChange={event => handleCommentChange(postId, event)}
                      style={{ ...postTextStyle, marginTop: '10px', marginLeft: '20px' }}
                    />
                    <button style={{ marginTop: '10px' }} onClick={() => handleCommentPost(postId, commentContents[postId])}>Send</button>
                  </div>
                </div>
              ))}

            </div>
          </div>
          <div className="col-3">
            <div style={{}}>
              <div style={rightContainerStyle}>
                {isLoggedIn && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={avatarImage} alt="Avatar" style={avatarStyle} />
                    <input
                      type="text"
                      value={userData.name}
                      onChange={e => setUserData({ ...userData, name: e.target.value })}
                      onKeyDown={e => e.preventDefault()}
                      onKeyPress={e => e.preventDefault()}
                      onKeyUp={e => e.preventDefault()}
                      style={inforTextStyle}
                    />
                    <input
                      type="text"
                      value={userData.major}
                      onChange={e => setUserData({ ...userData, major: e.target.value })}
                      onKeyDown={e => e.preventDefault()}
                      onKeyPress={e => e.preventDefault()}
                      onKeyUp={e => e.preventDefault()}
                      style={inforTextStyle}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      id="avatarInput"
                      style={{ display: 'none' }}
                      onChange={handleAvatarChange}
                    />
                    <button style={{ marginTop: '10px' }} onClick={() => document.getElementById('avatarInput').click()}>
                      Change Avatar
                    </button>
                  </div>
                )}
              </div>
              <div style={rightContainerStyle}>
                <Calendar
                  onChange={onChange}
                  value={date}
                  calendarType="US"
                  style={{ calendar }}
                />
                </div>
                <div style={rightContainerStyle}>
  <span> List users</span>
  <ul>
    {userData.name}
  </ul>
</div>

                     </div>
                </div>
              </div>
            </div>
          </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  borderRadius: '6px',
  backgroundColor: '#EEEEEE',
  height: 'auto',
  marginLeft: '20px',
  flexGrow: 1,
};

const avatarStyle = {
  marginTop: '10px',
  marginLeft: '10px',
  width: '50px',
  height: '50px',
  marginRight: '10px',
};

const postTextStyle = {
  width: '350px',
  marginRight: '10px',
  flex: 1,
  overflow: 'hidden',
};

const inforTextStyle = {
  width: '200px',
  marginRight: '10px',
  marginTop: '10px',
  height: '25px',
  backgroundColor: '#EEEEEE',
  borderRadius: '6px',
  border: 'none',
};

const smallButtonStyle = {
  marginLeft: '15px',
  marginRight: '10px',
  borderRadius: '10px',
};

const postButtonStyle = {
  marginTop: '20px',
  marginLeft: '70px',
  width: '350px',
};

const rightContainerStyle = {
  padding: '20px',
  marginLeft: '10px',
  marginBottom: '10px',
  height: 'auto',
};

export default Home;