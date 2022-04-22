import * as database from './database'

const DATABASE_KEY = 'visit'

export const insertVisit = (visit) => {
  return database.insert(DATABASE_KEY, visit)
}

export const getVisits = async () => {
  return await database.get(DATABASE_KEY)
}
