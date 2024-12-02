const express = require("express");
const app = express();

// URL fallback jika aplikasi tidak terinstal
const PLAY_STORE_URL =
  "https://play.google.com/store/search?q=gamaku&c=apps&hl=en&pli=1";
const APP_STORE_URL = "https://apps.apple.com/app/id123456789";

// Menangani dynamic link
app.get("/dynamic-link", (req, res) => {
  const { id } = req.query; // Mengambil parameter `id` dari query string
  const userAgent = req.headers["user-agent"]; // Mendapatkan user-agent untuk mendeteksi platform

  const isAndroid = userAgent.includes("Android");
  const isIOS = /iPhone|iPad|iPod/.test(userAgent);

  // Jika Android, redirect ke aplikasi menggunakan Android App Links
  if (isAndroid) {
    res.redirect(`myapp://dynamic-link?id=${id}`);
  } else if (isIOS) {
    // Jika iOS, menggunakan deep link biasa
    res.redirect(`myapp://dynamic-link?id=${id}`);
  } else {
    // Redirect ke Play Store atau App Store jika platform tidak dikenal
    res.redirect(isAndroid ? PLAY_STORE_URL : APP_STORE_URL);
  }
});

// Menjalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
