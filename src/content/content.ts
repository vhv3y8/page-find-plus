import { mount } from "svelte"
import App from "./app/App.svelte"
// inject global css files as inline
import globalStyle from "./app/app.css?inline"

// inject ui as shadow dom
const host = document.createElement("div")
host.id = "chrome-extension::page-find-plus::ui-shadow-host"
// host.style.width = "100vw"
// host.style.height = "100vh"
// host.style.position = "fixed"
// host.style.top = "0"
// host.style.left = "0"
export const shadowRoot = host.attachShadow({ mode: "closed" })
document.body.appendChild(host)

const styleTag = document.createElement("style")
styleTag.textContent = globalStyle
shadowRoot.appendChild(styleTag)

// add overlay container
// const overlayContainer = document.createElement("div")
// overlayContainer.id = "chrome-extension::page-find-plus::overlay-container"
// document.body.appendChild(overlayContainer)

// mount entry svelte component
mount(App, { target: shadowRoot })
