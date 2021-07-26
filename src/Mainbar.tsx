import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  addDoc,
  collection,
  CollectionReference,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';

import { Task as TaskModel } from './Model';
import Task from './Task';
import AddTask from './AddTask';
import MoreHorizontalIcon from './svg/more-horizontal';

// Firestore
//----------------------------------------------
const db = getFirestore();

type Props = {
  userId: string;
};

const Mainbar: React.FC<Props> = (props) => {
  const [tasks, setTasks] = useState<Array<TaskModel>>([]);

  useEffect(() => {
    const tasksRef = collection(
      db,
      `users/${props.userId}/tasks`,
    ) as CollectionReference<TaskModel>;
    const unsubscribe = onSnapshot(tasksRef, {
      next: (snapshot) => {
        const newTasks: Array<TaskModel> = [];
        snapshot.forEach((obj) => {
          const task = obj.data();
          newTasks.push(task);
        });
        setTasks(newTasks);
      },
    });
    return unsubscribe;
  }, []);

  return (
    <DivMainBar>
      <DivInnerContainer>
        <DivHeader>
          <DivTitle>インボックス</DivTitle>
          <DivMenu className="control">
            <MoreHorizontalIcon />
          </DivMenu>
        </DivHeader>
        <DivContent>
          {tasks.map((task) => (
            <Task
              done={task.done}
              name={task.name}
              schedule={task.scheduleDate}
            />
          ))}
          <AddTask />
        </DivContent>
      </DivInnerContainer>
    </DivMainBar>
  );
};

const DivMainBar = styled.div`
  background: white;
  width: 100%;
`;

const DivInnerContainer = styled.div`
  max-width: 818px;
  margin: 36px auto 0px auto;
`;

const DivHeader = styled.div`
  padding: 36px 55px auto 55px;
  height: 36px;

  display: flex;
  align-items: center;

  .control {
    display: none;
  }
  &:hover .control {
    display: block;
    cursor: pointer;
  }
`;

const DivTitle = styled.div`
  color: #202020;
  font-size: 20px;
  font-weight: 700;
`;

const DivMenu = styled.div`
  margin-left: auto;
  padding: 2px;

  svg {
    fill: gray;
    width: 20px;
  }
`;

const DivContent = styled.div``;

export default Mainbar;
