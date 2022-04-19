import { reactive, watchEffect } from "vue"
import { Data } from '../typings/types'

export interface IStore {
  data: Data[]
}

const store = reactive<IStore>({
  data: []
})

export const setData = (data: Data[]): void => {
  store.data = data
}

type Callback = (store: IStore) => void
const subscribers: Callback[] = []
export const subscribe = (callback: Callback) => {
  callback(store)
  subscribers.push(callback)
}

watchEffect(() => {
  const payload = {
    ...store,
  }
  subscribers.forEach((fn) => fn(payload))
})

export default store
