import React, { useState, useEffect } from 'react';
import TabBar from './componenthome/tabbar';
import { Redirect } from 'react-router-dom';
import Notification from './componenthome/Notification';
import Message from './componenthome/Message';
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
import ImageIcon from './componenthome/icons/image.icon';
import VideoIcon from './componenthome/icons/video.icon';
import ActivityIcon from './componenthome/icons/activity.icon';
import DeleteIcon from './componenthome/icons/delete.icon';
import LikeIcon from './componenthome/icons/like.icon';
import CommentIcon from './componenthome/icons/comment.icon';
import ShareIcon from './componenthome/icons/share.icon';
import './home.css';
import { useSocket } from './SocketContext';
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
  const [loggedInUsers, setLoggedInUsers] = useState([]);
  const [commentsOfPosts, setCommentsOfPosts] = useState([]);
  const [listUserLogin, setListUserLogin] = useState([]);
  const {newLoginUser, newLogoutUser, userslogin, getUsersLogin} = useSocket();

  const onChange = newDate => {
    setDate(newDate);
  };

  const handleSearchChange = event => {
    setSearchText(event.target.value);
  };


  const handleSearchClick = async () => {
    if (searchText.trim() !== '') {
      try {
        const apiUrl = `http://localhost:5000/api/search?query=${searchText}`;
        const response = await Axios.get(apiUrl);
        const searchResults = response.data.results;

        if (searchResults && searchResults.length > 0) {
          // Lấy tên người dùng từ kết quả tìm kiếm đầu tiên
          const userName = searchResults[0].name;

          // Chuyển hướng đến trang /search và truyền tên người dùng qua query parameter
          window.location.href = `/search?name=${encodeURIComponent(userName)}`; // Sửa lỗi ở đây
        } else {
          console.log('No search results found');
        }
      } catch (error) {
        console.error('Error searching:', error);
      }
    }
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
      const commenterId = localStorage.getItem('userId');

      const postData = {
        post_id: parseInt(postId),
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
        fetchCommentOfPostData();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
  useEffect(() => {
    console.log('demo: ',JSON.stringify(localStorage.getItem('userslogin')));
    fetchPostData();
    fetchCommentOfPostData();
  }, []);

  // useEffect(() => { 
  //   if(newLoginUser !== null && newLoginUser.id !== localStorage.getItem('userId')) {
  //     setListUserLogin((prevMessages) => [...prevMessages, {
  //       ...newLoginUser,
  //       status: 'online'
  //     }]);
  //   }

  // }, [newLoginUser]);
  useEffect(() => {
 
    let data = [];
    console.log('asasasasasasasasa', userslogin);
    if(userslogin === null || userslogin.length === 0) {
      data = JSON.parse(localStorage.getItem('usersLogin'))
      console.log('data', data);
      if(data === null || data === ''|| data === '[]') {
        data=[];
      }
      console.log("asasasasasasasasa");
    }else {
      console.log("asasasasasasasasa");
      data = userslogin.filter(item => item.id !== localStorage.getItem('userId'))
      localStorage.setItem('usersLogin', JSON.stringify(data))
    }
    
    if(newLogoutUser !== null && newLogoutUser !== '') {
      data = data.filter(item => item.id !== newLogoutUser.id);
    }
   
    setListUserLogin(data.map(item => {
      return {
        ...item,
        status: 'online'
      }
    }))
  }, [userslogin])

  // Rendering list of logged-in users
  useEffect(() => {
    const loggedInUsersFromStorage = localStorage.getItem('loggedInUsers');
    if (loggedInUsersFromStorage) {
      setLoggedInUsers(JSON.parse(loggedInUsersFromStorage));
    }
  }, []);


  // Rendering list of logged-in users



  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log("token", token)
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await Axios.get(`http://localhost:5000/api/user/${localStorage.getItem('userId')}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        if (res.data.message === "Success") {
          setUserData(res.data.user);
          const userId = res.data.user.userId;
          localStorage.setItem('userIdhaha', userId)
          setLoggedInUsers(prevUsers => [...prevUsers, userData]);
          console.log("useridhaha", userId)
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
        poster_id: localStorage.getItem('userId'),
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
        fetchPostData();
        clearPostContent();
      } else {
        console.error('Error posting:', response.data.error);
      }
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  const fetchPostData = async () => {
    try {
      const apiUrl = 'http://localhost:5000/api/getpoststatus';
      const res = await Axios.get(apiUrl);
      if (res.data.message === 'Success') {
        setPostedContents(res.data.posts); // Sử dụng dữ liệu từ API để cập nhật postedContents
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  const formatDate = (date) => {
    const targetDate = new Date(date);

    // Format target date to the desired format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return targetDate.toLocaleDateString('en-US', options);
  } 
  const fetchCommentOfPostData = async () => {
    try {
      const apiUrl = 'http://localhost:5000/api/getcmt';
      const res = await Axios.get(apiUrl);
      if (res.status === 200) {
        setCommentsOfPosts(res.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  const getCommentByPost = (postId) => {
    console.log("postID" + postId);
    let comments = [];
    for (let item of commentsOfPosts) {
      if (item.post_id === postId) {
        comments.push(...item.comments);
      }
    }
    console.log(comments);
    return comments;
  }



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
      {/* <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <img src={logo} alt="education icon" style={avatarStyle} />
            </div>

            <div style={{ flexGrow: 1 }}>
              <input type="text" value={searchText} onChange={handleSearchChange} placeholder="Search..." style={{ width: '100%' }} />
            </div>

            <div>
              <button style={{ backgroundColor: '#ccc', border: 'none', padding: '5px' }} onClick={handleSearchClick}>
                <img src={Searchbutton} alt="Search" style={{ width: '25px', height: '25px' }} />
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <TabBar setActivePage={setActivePage} activePage={activePage} />
            <div className="underline"></div>
          </div>
          <div className="col-md-6">
            <div className='mt-3'>
              <div style={containerStyle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={avatarImage} alt="Avatar" style={avatarStyle} />
                  <textarea
                    placeholder="Write something..."
                    value={postContent}
                    onChange={handleInputChange}
                    style={{
                      ...postTextStyle,
                      width: '700px',
                      minHeight: '50px',
                      resize: 'none',
                      borderRadius: '20px',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', }} className='mt-2'>
                  {/* <span style={{ marginRight: '90px' }}>Add to your post</span> */}
                  {/* <button style={{ ...smallButtonStyle, background: 'linear-gradient(to right, #EE0000, #3399FF, #FFCC33,#CC99FF,#669999)', width: 'auto', height: '33px' }}>Aaa</button>
                  <button style={{ ...smallButtonStyle, backgroundColor: '#EAAD29' }}><img src={picture} alt="Search" style={{ width: '25px', height: '25px' }} /></button>
                  <button style={{ ...smallButtonStyle, backgroundColor: '#FEDE00' }}><img src={reaction} alt="Search" style={{ width: '25px', height: '25px' }} /></button> */}
                  <div className='mx-5' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <VideoIcon style={{ color: 'red', width: '30px', height: '30px', margin: '5px' }}></VideoIcon>
                    <p style={{ margin: 'auto' }}>Video</p>
                  </div>
                  <div className='mx-5' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <ImageIcon style={{ color: 'green', width: '30px', height: '30px', margin: '5px' }}></ImageIcon>
                    <p style={{ margin: 'auto' }}>Photo</p>
                  </div>
                  <div className='mx-5' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <ActivityIcon style={{ color: 'orange', width: '30px', height: '30px', margin: '5px' }}></ActivityIcon>
                    <p style={{ margin: 'auto' }}>Activity</p>
                  </div>
                </div>
                <button style={postButtonStyle} onClick={handlePostButtonClick}>Post</button>
              </div>

              {Object.entries(postedContents).map(([postId, postedContent]) => (
                <div key={postId} style={containerStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <img src={avatarImage} alt="Avatar" style={{ width: '40px', height: '40px' }} />
                      <p style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{postedContent.student_name? postedContent.student_name : postedContent.teacher_name}</span>
                        <span style={{ fontSize: '13px' }}>{formatDate(postedContent.created_at)}</span>
                      </p>
                    </div>
                    <div type="button" onClick={() => handleDeletePost(postId)}>
                      <DeleteIcon style={{ color: 'black', width: '30px', height: '30px', margin: '5px' }}></DeleteIcon>
                    </div>
                  </div>
                  <div>
                    {postedContent ? postedContent.content : ''}
                  </div>
                  <hr></hr>
                  <div style={{ display: 'flex', justifyContent: 'center', }}>

                    <div className='mx-5' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <LikeIcon style={{ color: 'black', width: '30px', height: '30px', margin: '5px' }}></LikeIcon>
                      <p style={{ margin: 'auto' }}>Like</p>
                    </div>
                    <div className='mx-5' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <CommentIcon style={{ color: 'black', width: '30px', height: '30px', margin: '5px' }}></CommentIcon>
                      <p style={{ margin: 'auto' }}>Comments</p>
                    </div>
                    <div className='mx-5' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <ShareIcon style={{ color: 'black', width: '30px', height: '30px', margin: '5px' }}></ShareIcon>
                      <p style={{ margin: 'auto' }}>Share</p>
                    </div>
                  </div>
                  <hr></hr>
                  {getCommentByPost(postedContent.id).map((comment, commentIndex) => (
                    <div key={commentIndex} style={{margin: '5px'}}>
                        <img src={avatarImage} alt="Avatar" style={{ width: '30px', height: '30px', marginRight: '3px' }} />
                        <span style={{ fontSize: '15px', fontWeight: "bold"}}>{comment.student_id ? comment.student_name : comment.teacher_name} </span>
                        <span style={{ fontSize: '15px'}}>{comment.content}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentContents[postId] || ''}
                      onChange={event => handleCommentChange(postId, event)}
                      style={{
                        ...postTextCommentStyle,
                        width: '700px',
                      
                        resize: 'none',
                        borderRadius: '20px',
                      }}
                    />
                    <div type='button' style={{ marginTop: '10px' }} onClick={() => handleCommentPost(postedContent.id, commentContents[postId])}>
                      <CommentIcon style={{ color: 'black', width: '30px', height: '30px', margin: '5px' }}></CommentIcon>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
          <div className="col-3">
            <div style={{}}>
              {/* <div style={rightContainerStyle}>
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
              </div> */}
              <div style={rightContainerStyle}>
                <div className='ms-3 mt-3' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <div type='button' onClick={() => document.getElementById('avatarInput').click()}>
                    <input
                      type="file"
                      accept="image/*"
                      id="avatarInput"
                      style={{ display: 'none' }}
                      onChange={handleAvatarChange}
                    />
                    <img src={avatarImage} alt="Avatar" style={avatarStyle} />
                  </div>

                  <div style={{ marginRight: '130px', display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '-3px', marginTop: '3px' }}>{localStorage.getItem('loggedInUserjj')}</p>
                    <p style={{ fontSize: '14px', fontWeight: 'inherit' }}>{userData.email}</p>
                  </div>
                </div>
                <Calendar
                  onChange={onChange}
                  value={date}
                  calendarType="US"
                  style={{ calendar }}
                />
                <div>
                  {Object.entries(listUserLogin).map(([index, item]) => (
                    <div className="chat-item">
                    <div className="avatar">
                      <img src={avatar} alt="Avatar" />
                      {item.status === 'online' && <span className="chat-status online"></span>}
                    </div>
                    <div className="chat-details">
                        <span className="chat-name">{item.name}</span>
                    </div>
                  </div>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  borderRadius: '10px',
  backgroundColor: '#EEEEEE',
  height: 'auto',
  marginLeft: '20px',
  padding: '20px',
  marginTop: '10px'
};

const avatarStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '90%',
};

const postTextStyle = {
  width: '350px',
  marginRight: '10px',
  flex: 1,
  overflow: 'hidden',
  padding: '10px'
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
  width: '100%',
  borderRadius: '10px',
  padding: '5px',
  marginTop: '10px'
};

const rightContainerStyle = {
  marginLeft: '50px',
  marginBottom: '10px',
  height: 'auto',
};

const postTextCommentStyle = {
  width: '350px',
  marginRight: '10px',
  flex: 1,
  overflow: 'hidden',
  padding: '5px'
};

export default Home;