import { mount } from "svelte"
import App from "./app/App.svelte"
// inject global css files as inline
import globalStyle from "./app/style/app.css?inline"

// inject ui as shadow dom
const host = document.createElement("div")
host.id = "chrome-extension::page-search-plus::ui-shadow-host"
const shadowRoot = host.attachShadow({ mode: "closed" })
document.body.appendChild(host)

const styleTag = document.createElement("style")
styleTag.textContent = globalStyle
shadowRoot.appendChild(styleTag)

// mount entry svelte component
mount(App, { target: shadowRoot })
