import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  addDoc,
  doc,
  DocumentReference,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

import type { Task } from './Model';
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

var block = false;

function App({}: AppProps) {
  const [user, loading] = useAuthState();
  const [statusBarShown, setStatusBarShown] = useState<boolean>(false);
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  useEffect(() => {
    if (block) return;

    if (!user) return;
    setDoc<Task>(
      doc(
        db,
        'users',
        user.uid,
        'tasks',
        'testuidtestuidWithScheduledDate',
      ) as DocumentReference<Task>,
      {
        done: false,
        name: 'TypeScript で Scheme の処理系を書いてみる',
        scheduleDate: new Date(2021, 7 - 1, 26),
      },
    )
      .then((docRef) => {
        console.log('Document written.');
      })
      .catch((e) => {
        console.error('Error adding document: ', e);
      });
  }, [user, loading]);

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
