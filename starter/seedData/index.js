/* eslint-disable no-console */
import userModel from '../api/users/userModel';

const users = [
  {
    username: 'user1',
    password: 'test1',
  },
  {
    username: 'user2',
  },
  {
    username: 'user3',
  },
];

// eslint-disable-next-line import/prefer-default-export
export async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    users.forEach((user) => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}
