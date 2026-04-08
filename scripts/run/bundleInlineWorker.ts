import { parentPort, workerData } from "node:worker_threads"
import { build as viteBuild } from "vite"

async function runBuild() {
  try {
    // 메인 스레드에서 보낸 JS Object(workerData)를 그대로 사용
    const result = await viteBuild(workerData)

    // 결과 전송 (객체 형태 그대로 반환 가능)
    parentPort?.postMessage({
      success: true,
      output: result[0].output[0].code
    })
  } catch (error: any) {
    parentPort?.postMessage({ success: false, error: error?.message })
  }
}

runBuild()
