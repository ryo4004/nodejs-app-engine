import { Datastore, Entity } from '@google-cloud/datastore'
import { v4 as uuidv4 } from 'uuid'

const datastore = new Datastore({
  projectId: 'upheld-beach-347714',
})

const addId = (data: object) => {
  return { ...data, _id: uuidv4() }
}

const resolveEntityMeta = (datastore: Datastore) => {
  return (entity: Entity) => ({
    ...entity,
    _entityKey: entity[datastore.KEY],
    _id: entity[datastore.KEY].id,
    _path: entity[datastore.KEY].path,
  })
}

const removeEntityMeta = (entity: Entity) => {
  const { _entityKey, _id, _path, ...rest } = entity
  return rest
}

export const insert = async (path: string, data: object) => {
  const newData = addId(data)
  const key = datastore.key(path)
  return await datastore.save({ key, data: newData })
}

export const get = async (path: string) => {
  const query = datastore.createQuery(path).order('timestamp', { descending: true }).limit(10)
  const [entities] = await datastore.runQuery(query)
  return entities.map(resolveEntityMeta(datastore))
}

export const getSingleData = async (path: string, id: string) => {
  const key = datastore.key([path, datastore.int(id)])
  const [entity] = await datastore.get(key)
  const resolver = resolveEntityMeta(datastore)
  return resolver(entity)
}

export const update = async (path: string, id: string, data: unknown) => {
  const key = datastore.key([path, datastore.int(id)])
  return await datastore.update({ key, data: removeEntityMeta(data) })
}

export const remove = async (path: string, id: string) => {
  const key = datastore.key([path, datastore.int(id)])
  return await datastore.delete(key)
}
