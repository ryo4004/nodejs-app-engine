import { Datastore } from '@google-cloud/datastore'

const datastore = new Datastore({
  projectId: 'upheld-beach-347714',
})

export const insert = (key: string, data: unknown) => {
  return datastore.save({ key: datastore.key(key), data })
}

export const get = async (key: string) => {
  const query = datastore.createQuery(key).order('timestamp', { descending: true }).limit(10)
  return await datastore.runQuery(query)
}

export const remove = async (key: string, id: string) => {
  return await datastore.delete(id)
}
