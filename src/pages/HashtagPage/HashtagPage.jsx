/* eslint-disable react/jsx-props-no-spreading, no-unused-vars, no-restricted-syntax */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListPosts } from './PostsList/PostsList.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import {
  Container, Title, SubContainer, Main, SideBar,
} from './hashtagStyles.js';
import { UserContext } from '../../context/userContext.jsx';
import Header from '../../components/Header/Header.jsx';

export default function HashtagPage() {
  const { hashtag } = useParams();
  const [listPosts, setListPosts] = useState([]);
  const { userData } = useContext(UserContext);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('linkr_token'));
    if (userData) {
      const config = {
        headers: { userId: userData.id, Authorization: `Bearer ${token}` },
      };
      axios.get(`${process.env.REACT_APP_API_URL}/trending/${hashtag}`, config)
        .then((res) => {
          const trendings = res.data;
          setListPosts(trendings);
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  }, [hashtag, refresh]);

  return (
    <>
      <Header />
      <Container>
        <Title data-test="hashtag-title">
          #
          {' '}
          {hashtag}
        </Title>
        <SubContainer>
          <Main>
            <ListPosts listPosts={listPosts} refresh={refresh} setRefresh={setRefresh} />
          </Main>
          <SideBar>
            <Sidebar />
          </SideBar>
        </SubContainer>
      </Container>
    </>

  );
}
