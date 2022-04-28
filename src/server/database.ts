import { Datastore } from '@google-cloud/datastore'

const datastore = new Datastore({
  projectId: 'upheld-beach-347714',
})

export const insert = (key: string, data: unknown) => {
  return datastore.save({ key: datastore.key(key), data })
}

export const get = async (key: string) => {
  const query = datastore.createQuery(key).order('timestamp', { descending: true }).limit(10)
  const [entities] = await datastore.runQuery(query)
  return entities.map((entity) => {
    return {
      ...entity,
      _entityKey: entity[datastore.KEY],
      _id: entity[datastore.KEY].id,
      _path: entity[datastore.KEY].path,
    }
  })
}

export const getSingleData = async (key: string, id: string) => {
  const datastoreKey = datastore.key([key, datastore.int(id)])
  const [entity] = await datastore.get(datastoreKey)
  return {
    ...entity,
    _entityKey: entity[datastore.KEY],
    _id: entity[datastore.KEY].id,
    _path: entity[datastore.KEY].path,
  }
}

export const update = async (key: string, id: string, data: unknown) => {
  const datastoreKey = datastore.key([key, datastore.int(id)])
  return await datastore.update({
    key: datastoreKey,
    data,
  })
}

export const remove = async (key: string, id: string) => {
  const datastoreKey = datastore.key([key, datastore.int(id)])
  return await datastore.delete(datastoreKey)
}
