export interface DynamicStrategy {
  getStrategy(...any: any): any
  judgeAndSetStrategy(...any: any): any
}
