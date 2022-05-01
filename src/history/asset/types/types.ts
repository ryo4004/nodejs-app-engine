type Time = {
  timestamp: number
  date: string
  time?: string
  label?: string
}

type Conductor = {
  name: string
}

type Guest = {
  name: string
  instrument: string
  url?: string
  blog?: string
  belong?: string
}

type Content = {
  label: string
  music: Array<number>
}

type Data = {
  audio?: number
  video?: number
  title: string
  composer?: string
  arranger?: string
  movement?: Array<string>
  add?: Array<string>
}

export type Concert = {
  id: string
  type: 'main'
  title: string
  time: Time
  place?: Array<string>
  conductor: Array<Conductor>
  guest?: Array<Guest>
  poster?: string
  guide?: string
  contents: Array<Content>
  data: Array<Data>
}

type AudioData = {
  available: boolean
  data: number
  path: string
  addtitle?: string
}

export type Audio = {
  id: string
  status: boolean
  baseSrc?: string
  data?: Array<AudioData>
}

export type Video = Audio & { poster?: string }
