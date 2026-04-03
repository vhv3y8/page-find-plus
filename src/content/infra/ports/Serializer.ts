export interface Serializer {
  serialize(data: any): any
  deserialize(data: any): any
}
