/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,ejs}"],
  theme: {
    extend: {
      colors : {
        bg : '#E0F4FF',
        sec : '#87C4FF'
      }
    },
  },
  plugins: [],
  // purge: [
  //   // 'views/**/*.ejs', // ระบุแท็ก EJS ของคุณที่อยู่ในโฟลเดอร์ views
  // ],
}