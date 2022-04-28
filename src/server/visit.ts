import * as database from './database'

const DATABASE_KEY = 'visit'

class NotFoundError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export const insertVisit = (visit) => {
  return database.insert(DATABASE_KEY, visit)
}

export const getVisits = async () => {
  return await database.get(DATABASE_KEY)
}

export const getVisit = async (id: string) => {
  const entity = await database.getSingleData(DATABASE_KEY, id)
  if (!entity) {
    throw new NotFoundError()
  }
  return entity
}

export const updateVisit = async (id: string, visit: any) => {
  return await database.update(DATABASE_KEY, id, visit)
}

export const removeVisits = async (id: string) => {
  return await database.remove(DATABASE_KEY, id)
}
