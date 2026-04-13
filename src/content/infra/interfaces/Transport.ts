export interface Transport {
  send(payload: any): Promise<any>
}
