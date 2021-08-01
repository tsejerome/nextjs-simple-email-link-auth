interface UserMongo {
  email: string,
  secrete: string,
  last_updated: Date,
  created_at: Date,
}

export type { UserMongo }