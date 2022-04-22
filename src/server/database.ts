import { Datastore } from '@google-cloud/datastore'

const datastore = new Datastore({
  projectId: 'upheld-beach-347714',
})

export const insertVisit = (visit) => {
  return datastore.save({
    key: datastore.key('visit'),
    data: visit,
  })
}

export const getVisits = () => {
  const query = datastore.createQuery('visit').order('timestamp', { descending: true }).limit(10)

  return datastore.runQuery(query)
}
