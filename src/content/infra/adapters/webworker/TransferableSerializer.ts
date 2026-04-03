import type { Serializer } from "../../ports/Serializer"

export const TransferableSerializer = {
  serialize(data) {},
  deserialize(data) {}
} satisfies Serializer

export function createTransferableSerializer(): Serializer {}
