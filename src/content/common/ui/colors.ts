export const overlayColors = {
  blueish: {
    borderColor: "#007bff",
    backgroundColor: "rgba(0, 123, 255, 0.1)"
  },
  green: {
    borderColor: "#27AE60",
    backgroundColor: "rgba(39, 174, 96, 0.15)"
  },
  orange: {
    borderColor: "#E67E22",
    backgroundColor: "rgba(230, 126, 34, 0.15)"
  },

  //
  skyblue: {
    borderColor: "#5DA5DA",
    backgroundColor: "rgba(93, 165, 218, 0.12)"
  },
  dustypurple: {
    borderColor: "#A29BFE",
    backgroundColor: "rgba(162, 155, 254, 0.12)"
  },

  // immediate overlay colors
  immediateGray: {
    borderColor: "rgba(128, 128, 128, 0.3)",
    backgroundColor: "rgba(128, 128, 128, 0.1)"
  }
} satisfies Record<string, { borderColor?: string; backgroundColor?: string }>
