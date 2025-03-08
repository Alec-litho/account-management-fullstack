import { Sequelize } from 'sequelize-typescript';

export async function seed(app) {
  const sequelize = app.get(Sequelize);
  const User = sequelize.models.User;

  try {
    const existingUsers = await User.count();
    if (existingUsers < 3) {
      await User.bulkCreate([
        {
          fullName: 'Иванова И.И.',
          login: 'Alec-litho',
          password:
            '$2b$10$CovkP/2C35p45xxRMZVKLOIYEQE5u5iS7BUGjOYVJODjJ.r5RzeWO',
          tabNumber: 222,
        },
        {
          fullName: 'Иванова И.И.',
          login: 'zustzero123@gmail.com',
          password:
            '$2b$10$DvGMJID4lYv7wmkJclRACugD.aUHUUsVYi6ac5QS7Rac9lDtPXtXK',
          tabNumber: 111,
        },
        {
          fullName: 'Иванова И.И.',
          login: 'opallitho@gmail.com',
          password:
            '$2b$10$Uda6i3.5Wss/HR/xA57U9umFUwSkwXECwC1KdUGkSlmUMPVzq9DYi',
          tabNumber: 12345,
        },
      ]);
      console.log('Seed data inserted');
    } else {
      console.log('Database already has data.');
    }
  } catch (err) {
    console.error('Seed failed:', err);
  }
}
