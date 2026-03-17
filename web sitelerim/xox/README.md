# XOX Oyunu - Tic-Tac-Toe Game

React + Vite ile yapılmış **MULTIPLAYER** mobil uyumlu bir XOX (Tic-Tac-Toe) oyunudur.

## 🆕 Multiplayer Özellikleri

✨ **Oda Tabanlı Sistem**: Bir oyuncu oda oluşturuyor, diğer oyuncu oda kodunu girerek katılıyor  
👥 **Gerçek Zamanlı Senkronizasyon**: Firebase Realtime Database ile anlık hamle güncellemeleri  
🎯 **Karşılıklı Oyun**: İlk oyuncu (X), ikinci oyuncu (O) - sırayla hamle yapıyorlar  
📱 **İki Cihazdan Oynanabilir**: Farklı telefonlardan veya bilgisayarlardan oynanabilir  

## 📋 Oyun Modları

### 👤 Tek Oyuncu
- Bilgisayar olmadan iki oyuncunun aynı cihazda oynaması
- Geri Al butonu
- Yeni Oyun butonu

### 👥 Multiplayer
1. **Oda Oluştur**: Yeni oda oluşturup oda kodunu al
2. **Odaya Katıl**: Arkadaşının oda kodunu girerek katıl
3. **Karşılıklı Oyun**: Sırayla hamle yaparak oyunuz

## 🚀 Hızlı Başlangıç

### Kurulum

```bash
# Projeyi klonlayın
git clone <repo-url>
cd xox

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu çalıştırın
npm run dev

# Üretim için derleyin
npm run build

# Derlenmiş dosyalara bakın
npm run preview
```

### Firebase Kurulumu (Multiplayer İçin)

Multiplayer modunun çalışması için Firebase Realtime Database gereklidir.

**[📘 Firebase Setup Rehberi](FIREBASE_SETUP.md) - Detaylı adımlar için tıklayın**

Hızlı özet:
1. [Firebase Console](https://console.firebase.google.com) açın
2. Yeni proje oluşturun
3. Web uygulaması ekleyin
4. Config değerlerini `src/config/firebase.ts` dosyasına yapıştırın
5. Realtime Database oluşturun (Test mode)

## 🎮 Kullanım

### Tek Oyuncu Modu

1. Ana menüde "Tek Oyuncu" butonuna tıklayın
2. Boş bir kutuya tıklayarak hamle yapın
3. Yatay, dikey veya çapraz olarak 3 işareti sıralayın
4. "Geri Al" ile son hamleyi geri alın
5. "Yeni Oyun" ile yeniden başlayın

### Multiplayer Modu

**Oyuncu 1 (Oda Sahibi):**
1. Ana menüde "Multiplayer" butonuna tıklayın
2. "Yeni Oda Oluştur" butonuna tıklayın
3. Oda kodu alın ve Oyuncu 2'ye iletin

**Oyuncu 2 (Katılımcı):**
1. Ana menüde "Multiplayer" butonuna tıklayın
2. "Odaya Katıl" butonuna tıklayın
3. Adınızı ve oda kodunu girin
4. "Katıl" butonuna tıklayın

**Oynan Sırada:**
- Oyuncu 1 her zaman **X** ile oynar
- Oyuncu 2 her zaman **O** ile oynar
- Sırayla hamle yapılır
- İlk kazanan oyunu sonlandırır
- "Yeni Oyun" ile tekrar oynanabilir

## 📱 Multiplayer'i Telefondan Test Etme

### Aynı Ağda (Wifi)

1. Terminal'de şu komutu çalıştırın:
```bash
npm run dev -- --host
```

2. Çıktıda gösterilen `Network:` IP adresini kopyalayın (ör: `192.168.1.5:5173`)

3. Her iki telefonun tarayıcısında bu adresi açın

4. Birinde "Yeni Oda Oluştur", diğerinde "Odaya Katıl"

### Vercel Üzerinden (Her Yerden)

1. Projeyi Vercel'e push edin
2. Vercel URL'sini iki telefonun tarayıcısında açın
3. Multiplayer oynanabilir!

## 🛠️ Teknolojiler

- **React 18**: UI kütüphanesi
- **TypeScript**: Tip güvenliği
- **Vite**: Hızlı build tool
- **Firebase**: Real-time database
- **CSS3**: Responsive tasarım

## 📁 Proje Yapısı

```
xox/
├── src/
│   ├── components/
│   │   ├── TicTacToe.tsx        # Tek oyuncu oyun
│   │   ├── Lobby.tsx            # Multiplayer lobby
│   │   └── MultiplayerGame.tsx  # Multiplayer oyun
│   ├── config/
│   │   └── firebase.ts          # Firebase config
│   ├── styles/
│   │   ├── TicTacToe.css        # Tek oyuncu stilleri
│   │   ├── Lobby.css            # Lobby stilleri
│   │   └── MultiplayerGame.css  # Multiplayer stilleri
│   ├── App.tsx                  # Ana komponent
│   ├── App.css                  # App stilleri
│   ├── main.tsx                 # Başlangıç noktası
│   └── index.css                # Global stiller
├── .env                         # Firebase env vars (local)
├── index.html                   # HTML dosyası
├── package.json                 # Bağımlılıklar
├── tsconfig.json                # TypeScript ayarları
├── vite.config.ts               # Vite ayarları
├── vercel.json                  # Vercel ayarları
├── FIREBASE_SETUP.md            # Firebase Kurulum Rehberi
└── README.md                    # Bu dosya
```

## 🌐 Vercel'de Deployment

### 1. GitHub'a Push Etme

```bash
git add .
git commit -m "Multiplayer XOX oyunu Firebase ile"
git push origin main
```

### 2. Vercel'e Bağlama

1. [vercel.com](https://vercel.com) adresine gidin
2. GitHub hesabınızla giriş yapın
3. "New Project" butonuna tıklayın
4. Bu repository'yi seçin
5. Vercel otomatik olarak ayarları algılayacaktır

### 3. Environment Variables Ekleme

1. Vercel dashboard'ta "Settings" → "Environment Variables"
2. Firebase Config değerlerini ekleyin:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_DATABASE_URL`
   - vb.

### 4. Deploy

1. "Deploy" butonuna tıklayın
2. Deployment tamamlandıktan sonra canlı URL'ye erişin
3. Farklı cihazlardan oynanabilir!

## 🔄 Otomatik Deployment

GitHub'a push ettikten sonra Vercel otomatik olarak yeni version'u deploy eder. 👍

## 📝 Komutlar

- `npm run dev` - Geliştirme sunucusu (5173-5174 portu)
- `npm run build` - Üretim derlemesi
- `npm run preview` - Build preview'ı
- `npm run dev -- --host` - Ağ üzerinden erişim (test için)

## ⚙️ Firebase Security Rules

Üretim ortamında şu security rules kullanılmalıdır:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".validate": "newData.hasChildren(['player1', 'board', 'isXNext'])"
      }
    }
  }
}
```

[Firebase Setup Rehberi](FIREBASE_SETUP.md)'nde detaylı bilgi bulabilirsiniz.

## 🐛 Sorun Giderme

### Multiplayer çalışmıyor
- Firebase config değerlerini kontrol edin
- Realtime Database'nin aktif olduğunu kontrol edin
- Browser console'da (F12) hataya bakın

### Tarayıcı warningları
- `firebase` paketinin version uyumsuzluğu olabilir
- `npm audit fix` komutu proje stabilizasyonu için yardımcı olabilir

### Bağlantı problemi
- Güvenlik duvarı/VPN kontrol edin
- Firebase rules kontrol edin

## 📱 Mobile Test

- Chrome/Safari DevTools ile responsive test edin
- Telefon simulatörü kullanın
- Aslı telefondan test edin

## 🎨 Tema Özelleştirme

Renkleri [TicTacToe.css](src/styles/TicTacToe.css) ve [MultiplayerGame.css](src/styles/MultiplayerGame.css) dosyalarında değiştirebilirsiniz.

```css
/* Gradient renkleri */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Buton renkleri */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

## 📄 Lisans

MIT

## 👥 Destek

Sorularınız veya önerileriniz için issue açabilirsiniz.

---

**Oyunun Tadını Çıkarın! 🎮✨**

Multiplayer oyun için **[Firebase Setup Rehberi](FIREBASE_SETUP.md)**'ni okumayı unutmayın!
