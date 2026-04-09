export type Invert<T extends Record<any, any>> = {
  [K in keyof T as T[K]]: K
}

export type AnyFunc = (...args: any[]) => any

export type ValueOf<T> = T[keyof T]
