declare global {
  interface Window {
    $store: Store
  }
}

export interface Store {
  get(key?: string): any
  set(key: string, payload: any): any
}