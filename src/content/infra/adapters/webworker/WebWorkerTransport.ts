import type { DevLogger } from "@infra/ports/DevLogger"
import type { Serializer, Transport } from "src/content/infra/ports/Transport"

// serializer
export interface WebWorkerSerializer extends Serializer {
  serialize(payload: any): [message: any, transfer: Transferable[]]
}
export function createTransferableSerializer(
  devLogger?: DevLogger
): WebWorkerSerializer {
  const transferableSerializer = {
    serialize(data) {
      const transfer: Transferable[] = []

      // simple transferable testing with json stringify
      const encoder = new TextEncoder()
      const uint8Array = encoder.encode(JSON.stringify(data))
      devLogger?.log("Transferable Serializer", "uint8Array", [uint8Array])
      transfer.push(uint8Array.buffer)
      devLogger?.log("Transferable Serializer", "Transferable[]", [transfer])
      return [uint8Array, transfer]

      // if typed array
      // if (data instanceof Uint8Array || data instanceof Float32Array) {
      //   devLogger?.log("Transferable Serializer", "IS TYPED ARRAY!")
      //   transfer.push(data.buffer)
      // } else if (data instanceof ArrayBuffer) {
      //   transfer.push(data)
      // }
      // return [data, transfer]
    },
    deserialize(data) {
      const decoder = new TextDecoder()
      const jsonString = decoder.decode(data)
      const parsedData = JSON.parse(jsonString)
      return parsedData
    }
  } satisfies WebWorkerSerializer
  return transferableSerializer
}

// transport
export function createWebWorkerTransport(
  worker: Worker,
  serializer: WebWorkerSerializer,
  devLogger?: DevLogger
): Transport {
  // worker.onmessage =
  const transport: Transport = {
    async send(payload) {
      const serializedPayload = serializer.serialize(payload)
      devLogger?.log("Serialized Payload", serializedPayload)
      devLogger?.log(
        "Buffer Bytelength?",
        (serializedPayload[0] as Uint8Array).buffer.byteLength
      )
      worker.postMessage(...serializedPayload)
      devLogger?.log(
        "Buffer Bytelength After Transfer?",
        (serializedPayload[0] as Uint8Array).buffer.byteLength
      )
    }
  }
  return transport
}
