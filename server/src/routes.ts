import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourTominutes';

const routes = express();

interface ScheduleDTO {
  week_day: string;
  from: string;
  to: string;
}

routes.post('/classes', async (request, response) => {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule
  } = request.body;

  const insertUserIds = await db('users').insert({
    name,
    avatar,
    whatsapp,
    bio,
  });

  const user_id = insertUserIds[0];

  const insertClassesId = await db('classes').insert({
    subject,
    cost,
    user_id,
  });

  const class_id = insertClassesId[0];

  const classSchedule = schedule.map((scheduleDTO: ScheduleDTO) => {
    return {
      week_day: scheduleDTO.week_day,
      from: convertHourToMinutes(scheduleDTO.from),
      to: convertHourToMinutes(scheduleDTO.to),
      class_id
    }
  })

  await db('class_schedule').insert(classSchedule);

  return response.send();
});

export default routes;
