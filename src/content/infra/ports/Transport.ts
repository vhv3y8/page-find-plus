export interface Serializer {
  serialize(data: any): any
  deserialize(data: any): any
}

export interface Transport {
  send(payload: any): Promise<any>
}
