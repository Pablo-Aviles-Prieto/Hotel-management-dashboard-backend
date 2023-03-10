import mongoose from 'mongoose';
import { ContactModel } from '../models';
import { ControllerError } from '../errors';
import { Request, Response, NextFunction } from 'express';

export const getContactsList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contactList = await ContactModel.find().exec();
    if (contactList.length === 0) {
      next(new ControllerError({ name: 'Error contact list', message: `Couldn't find any contact`, status: 404 }));
      return;
    }
    res.status(200).json({ result: contactList });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(
        new ControllerError({
          name: 'Error contact list',
          message: 'Error getting the contact list from DB',
          status: 400,
          additionalMessage: error.message
        })
      );
      return;
    }
    next(new ControllerError({ name: 'Error contacts list', message: 'Error getting the contacts list', status: 500 }));
  }
};

export const createContact = async (req: Request, res: Response, next: NextFunction) => {
  const { date, user, message, archived } = req.body;

  try {
    const contact = new ContactModel({
      date,
      user,
      message,
      archived
    });

    const result = await contact.save();
    res.status(201).json({ result });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(
        new ControllerError({
          name: 'Error creating contact',
          message: 'Error creating the contact on DB',
          status: 400,
          additionalMessage: error.message
        })
      );
      return;
    }
    next(new ControllerError({ name: 'Error creating contact', message: 'Error creating the contact', status: 500 }));
  }
};

export const getSingleContact = async (req: Request, res: Response, next: NextFunction) => {
  const { contactId } = req.params;

  try {
    const contact = await ContactModel.findById(contactId).exec();
    if (!contact) {
      next(
        new ControllerError({
          name: 'Error single contact',
          message: `Couldn't find the selected contact`,
          status: 404
        })
      );
      return;
    }
    res.status(200).json({ result: contact });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(
        new ControllerError({
          name: 'Error single contact',
          message: 'Error getting the contact from DB',
          status: 400,
          additionalMessage: error.message
        })
      );
      return;
    }
    next(new ControllerError({ name: 'Error single contact', message: 'Error getting the contact', status: 500 }));
  }
};

export const editContact = async (req: Request, res: Response, next: NextFunction) => {
  const { contactId } = req.params;

  try {
    const existContact = await ContactModel.findById(contactId).exec();
    if (!existContact) {
      next(
        new ControllerError({
          name: 'Error editing contact',
          message: `Couldn't find the selected contact`,
          status: 404
        })
      );
      return;
    }

    for (const property in req.body) {
      if (property === 'user') {
        const newUserProps = {
          ...existContact.user,
          ...req.body.user
        };
        existContact.user = newUserProps;
        continue;
      }
      if (property === 'message') {
        const newMessageProps = {
          ...existContact.message,
          ...req.body.message
        };
        existContact.message = newMessageProps;
        continue;
      }
      existContact[property] = req.body[property];
    }

    await existContact.save();

    res.status(202).json({ result: existContact });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(
        new ControllerError({
          name: 'Error editing contact',
          message: 'Error editing the contact on DB',
          status: 400,
          additionalMessage: error.message
        })
      );
      return;
    }
    next(new ControllerError({ name: 'Error editing contact', message: 'Error editing the contact', status: 500 }));
  }
};

export const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
  const { contactId } = req.params;

  try {
    const existContact = await ContactModel.findById(contactId).exec();
    if (!existContact) {
      next(
        new ControllerError({
          name: 'Error deleting contact',
          message: `Couldn't find the selected contact`,
          status: 400
        })
      );
      return;
    }

    await existContact.delete();

    res.status(202).json({ result: 'Contact deleted successfully' });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(
        new ControllerError({
          name: 'Error deleting contact',
          message: 'Error deleting the contact on DB',
          status: 400,
          additionalMessage: error.message
        })
      );
      return;
    }
    next(new ControllerError({ name: 'Error deleting contact', message: 'Error deleting the contact', status: 500 }));
  }
};
