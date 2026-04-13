import type { DevLogger } from "../../interfaces/DevLogger"
import type { Transport } from "../../interfaces/Transport"
import type { TransferableSerializer } from "./TransferableSerializer"

export function createWebWorkerTransport(
  worker: Worker,
  serializer: TransferableSerializer,
  devLogger?: DevLogger
): Transport {
  // worker.onmessage =
  const transport: Transport = {
    async send(payload) {
      const serializedPayload = serializer.serialize(payload)
      devLogger?.log("Serialized Payload", serializedPayload)
      devLogger?.log(
        "Buffer Bytelength?",
        (serializedPayload["message"] as Uint8Array).buffer.byteLength
      )
      worker.postMessage(serializedPayload, serializedPayload.transfer)
      devLogger?.log(
        "Buffer Bytelength After Transfer?",
        (serializedPayload["message"] as Uint8Array).buffer.byteLength
      )
    }
  }
  return transport
}
