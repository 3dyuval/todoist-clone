import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  doc,
  DocumentReference,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

import useAuthState from './util/useAuthState';
import SignInStatusBar from './SignInStatusBar';
import Header from './Header';
import Sidebar from './Sidebar';
import Mainbar from './Mainbar';

import './App.css';

// Firestore
//----------------------------------------------
const db = getFirestore();

interface AppProps {}

interface User {
  first: string;
  last: string;
  born: number;
}

function App({}: AppProps) {
  const [user, loading] = useAuthState();
  const [statusBarShown, setStatusBarShown] = useState<boolean>(false);
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  // useEffect(() => {
  //   if (!userId) return;
  //   setDoc<User>(doc(db, 'users', userId) as DocumentReference<User>, {
  //     first: 'NewUi',
  //     last: 'Hoge',
  //     born: 1815,
  //   })
  //     .then((docRef) => {
  //       console.log('Document written.');
  //     })
  //     .catch((e) => {
  //       console.error('Error adding document: ', e);
  //     });
  // }, []);

  if (loading) return <div style={{ color: '#ccc' }}>loading...</div>;

  return (
    <div className="App">
      {(statusBarShown || !user) && <SignInStatusBar user={user} />}
      <Header
        onClickMenuHandler={() => setSidebarExpanded((prev) => !prev)}
        onClickAvatarHandler={() => setStatusBarShown((prev) => !prev)}
      />
      <DivBars>
        {sidebarExpanded && <Sidebar />}
        <Mainbar />
      </DivBars>
    </div>
  );
}

const DivBars = styled.div`
  display: flex;
  height: 100%;
`;

export default App;
