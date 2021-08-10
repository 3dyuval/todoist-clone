import {
  Timestamp,
  FirestoreDataConverter,
  serverTimestamp,
} from 'firebase/firestore';

export type Task = {
  __type: 'task';
  id?: string;
  createdAt?: Date;
  done: boolean;
  name: string;
  scheduledAt: Date | null;
};

export const newTask: () => Task = () => {
  return {
    __type: 'task',
    done: false,
    name: '',
    scheduledAt: null,
  };
};

export const TaskConverter: FirestoreDataConverter<Task> = {
  toFirestore: (task) => {
    return {
      __type: 'task',
      done: task.done,
      name: task.name,
      scheduledAt: task.scheduledAt
        ? Timestamp.fromDate(task.scheduledAt)
        : null,
      createdAt: task.createdAt
        ? Timestamp.fromDate(task.createdAt)
        : serverTimestamp(),
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const task = {
      id: snapshot.id,
      ...data,
      scheduledAt: data.scheduledAt?.toDate(),
      createdAt: data.createdAt?.toDate(),
    } as Task;
    task.id = snapshot.id;
    return task;
  },
};
