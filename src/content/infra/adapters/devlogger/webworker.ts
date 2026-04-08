class DevLogger {
  private isDev = import.meta.env.MODE === "development"
  private appName = "Page Search Plus"
  constructor(private additionalGetters?: Array<() => string>) {}

  log(...input: any[]) {
    if (this.isDev) {
      let msg = [this.appName]
      // additional getters
      if (this.additionalGetters) {
        for (const getter of this.additionalGetters) {
          const str = getter()
          if (str !== "") msg.push(str)
        }
      }
      // given input
      if (Array.isArray(input)) {
        for (const item of input) {
          if (item === null || item === undefined || item === "") continue
          msg.push(item)
        }
      }
      // else if (input !== "" && input !== null && input !== undefined) {
      //   msg.push(input)
      // }
      // log
      console.log(
        ...msg.map((item) => {
          if (typeof item === "string") return `[${item}]`
          else return item
        })
      )
    }
  }
}

export const workerDevLogger = new DevLogger([() => "WEBWORKER"])
