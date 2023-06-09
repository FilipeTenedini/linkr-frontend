import { BsSend } from 'react-icons/bs';
import { useContext, useState } from 'react';
import axios from 'axios';
import { InputContainer } from './inpuStyles';
import { UserContext } from '../../../../context/userContext';

export default function CommentInput({
  photo, postId, refresh, setRefresh,
}) {
  const [form, setForm] = useState({ comment: '' });
  const [waiting, setWaiting] = useState(false);
  const { userData } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem('linkr_token'));

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  function postComment(event) {
    event.preventDefault();
    const config = {
      headers: { userId: userData.id, Authorization: `Bearer ${token}` },
    };
    const body = { description: form.comment };
    setForm({ comment: '' });
    axios.post(`${process.env.REACT_APP_API_URL}/comments/posts/${postId}`, body, config)
      .then(() => {
        setRefresh(!refresh);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }
  return (
    <InputContainer>
      <img src={photo} />
      <form onSubmit={postComment}>
        <input
          data-test="comment-input"
          type="text"
          placeholder="write a comment..."
          name="comment"
          value={form.comment}
          onChange={handleChange}
          autoComplete="off"
          disabled={waiting}
          required
        />
        <button data-test="comment-submit" type="submit" disabled={waiting}>
          <BsSend />
        </button>
      </form>
    </InputContainer>
  );
}
