import React ,{useState} from 'react';
import './Feed.scss';
import Message from './Message/Message';
import Input from './Input/Input';
import Image1 from '../../../../assets/fd-30.jpg';
import Image2 from '../../../../assets/fd-36.jpg';

const Feed = () => {
  const userOne = {
    backgroundImage: `url(${Image1})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    alignSelf: 'end',
  };

  const userTwo = {
    backgroundImage: `url(${Image2})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    alignSelf: 'end',
  };

  const [messages, setMessages] = useState([]);
  const handleAddMessage = (message) => {
    // Add the new message to the messages state
    setMessages([...messages, message]);
  };

  return (
    <div className="feed-wrapper">
      <div className="trim" />
      <div className="feed-container">
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
        <div>
      
      <ul>
        {messages.map((message, index) => (
          // <li key={index}>{message}</li>
          <Message userImage={userOne} message={message} key={index} />
        ))}
      </ul>
    </div>
      </div>
      <Input onAddMessage={handleAddMessage}/>
    </div>
  );
};

export default Feed;
