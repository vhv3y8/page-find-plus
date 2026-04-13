import type { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire"
import type { DevLogger } from "@infra/interfaces/DevLogger"
import type { Serializer } from "@infra/interfaces/Serializer"

// ts-proto
interface TsProtoCodecWrapper<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter
  decode(input: BinaryReader | Uint8Array, length?: number): T
  fromPartial(object: any): T
}

export class ProtobufSerializer<T> implements Serializer {
  constructor(
    public codec: TsProtoCodecWrapper<T>,
    public devLogger?: DevLogger
  ) {}

  serialize(payload: Partial<T>): Uint8Array {
    const message = this.codec.fromPartial(payload)
    return this.codec.encode(message).finish()
  }

  deserialize(buffer: Uint8Array): T {
    return this.codec.decode(buffer)
  }
}
