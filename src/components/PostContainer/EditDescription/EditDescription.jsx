/* eslint-disable react/jsx-props-no-spreading */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { EditInput } from './inputStyles';

export default function EditDescription({
  value, setEditDesc, token, userData, postId, setDescState,
}) {
  const [waiting, setWaiting] = useState(false);
  const {
    register, setFocus, setValue, getValues,
  } = useForm();

  useEffect(() => {
    setValue('edit', value);
    setFocus('edit');
  }, []);
  function handleKeys(event) {
    if (event.key === 'Escape') {
      setEditDesc(false);
    }
    if (event.key === 'Enter') {
      const config = {
        headers: { userId: userData.id, Authorization: `Bearer ${token}` },
      };
      const description = getValues('edit');
      const body = { description };
      setWaiting(true);

      axios.patch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, body, config)
        .then(() => {
          setEditDesc(false);
          setDescState(description);
        })
        .catch((err) => {
          setWaiting(false);
          setEditDesc(false);
          setValue('edit', description);
          setFocus('edit');
          alert(err.response.data.message);
        })
        .finally(() => setWaiting(false));
    }
  }
  return (
    <EditInput
      type="text"
      {...register('edit')}
      disabled={waiting}
      onKeyDown={handleKeys}
      data-test="edit-input"
    />
  );
}
