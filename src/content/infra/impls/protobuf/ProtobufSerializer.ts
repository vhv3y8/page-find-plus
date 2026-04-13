import type { DevLogger } from "@infra/interfaces/DevLogger"
import type { Serializer } from "@infra/interfaces/Serializer"
import * as TreeProto from "./proto/Tree.proto"

export class ProtobufSerializer implements Serializer {
  constructor(public devLogger?: DevLogger) {}

  serialize(payload: any): any {
    return { message: payload, transfer: [] }
  }
  deserialize(data: any) {}
}

const tree = TreeProto
console.error("[tree]", tree)
