module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    
    extend: {
      colors: {
        'primary': '#e0f1fff4',
        'secundary': 'ffffff',
        'black': '#09090b',
      },
      boxShadow: {
        card: "0px 35px 120px -15px #1e3135",
      },
      screens: {
        xs: "400px",
        ns: "300px",
      },
      
    },
  },
  plugins: [],
};
