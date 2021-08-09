import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { UserContext } from './context/user';
import type { TaskGroup } from './Model';
import { Inbox } from './Model';
import { SignInStatusBar } from './SignInStatusBar';
import { Header } from './Header';
import { Mainbar } from './Mainbar';
import { Sidebar } from './Sidebar';

export const AppWithContext: React.FC = () => {
  const user = useContext(UserContext);
  const [statusBarShown, setStatusBarShown] = useState<boolean>(false);
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const [focusedTaskGroup, setFocusedTaskGroup] = useState<TaskGroup>(Inbox);

  return (
    <DivContainer>
      {(statusBarShown || !user) && <SignInStatusBar />}
      <Header
        onClickMenuHandler={() => setSidebarExpanded((prev) => !prev)}
        onClickAvatarHandler={() => setStatusBarShown((prev) => !prev)}
      />
      {user && (
        <DivBars>
          {sidebarExpanded && <Sidebar switcher={setFocusedTaskGroup} />}
          <Mainbar taskGroup={focusedTaskGroup} />
        </DivBars>
      )}
    </DivContainer>
  );
};

const DivContainer = styled.div`
  height: 100%;
`;

const DivBars = styled.div`
  display: flex;
  height: 100%;
`;

export default AppWithContext;
