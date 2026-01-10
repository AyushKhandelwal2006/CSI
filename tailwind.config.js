module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brutalYellow: "#FFD600",
        brutalBlue: "#4D96FF",
        brutalRed: "#FF4C4C",
        brutalGreen: "#4DFF88"
      },
      boxShadow: {
        brutal: "4px 4px 0 #000"
      },
      borderRadius: {
        brutal: "12px"
      }
    }
  },
  plugins: []
}
