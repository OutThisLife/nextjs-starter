declare module '*.scss'
declare module '*.svg'

declare interface IObject {
  [key: string]: any
}

declare interface Page {
  id: number | string
  pid: number | string
  title: string
  url: string
  slug: string
  type: string
}
