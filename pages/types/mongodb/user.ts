import { ObjectId } from 'mongodb';
interface UserMongo {
  _id: ObjectId,
  email: string,
  secrete: string,
  last_updated: Date,
  created_at: Date,
}

export type { UserMongo }