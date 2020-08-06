import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourTominutes';

interface ScheduleDTO {
  week_day: string;
  from: string;
  to: string;
}

export default class ClassController {

  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if(!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to serach classes'
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class.schedule`.`week_day` = ?? ', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }

  async create (request:Request, response:Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;

    const trx = await db.transaction();

    try {
      const insertUserIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertUserIds[0];

      const insertClassesId = await trx('classes').insert({
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

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
        await trx.rollback();

        return response.status(400).json({
          error: 'Unexpected error while creating new class'
        })
      }
  }
}
