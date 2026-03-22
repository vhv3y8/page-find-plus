// tree and search logics can run at different threads like web worker.
export interface Runner {
  run(): Promise<void>
}
