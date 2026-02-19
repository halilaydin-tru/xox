# 🎮 XOX Oyunu - P2P Multiplayer

Vercel'de canlı yayında olan, iki oyunculu XOX (Tic-Tac-Toe) oyunu.

## 🚀 Özellikler

- **P2P Çok Oyunculu**: PeerJS kullanarak direkt bağlantı
- **Oda Sistemi**: Odanın kodunu arkadaşına göndererek birlikte oyn
- **Çoklu Boyutlar**: 3x3, 4x4, 5x5 oyun alanları
- **Puan Takibi**: Oynanan tüm oyunlar boyunca puanlar kaydedilir
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Hızlı Deployment**: Vercel'de tek tıkla deploy

## 🎯 Nasıl Oylanır

1. **Oda Kur**: Birinci oyuncu oyun boyutunu seçer ve kodu alır
2. **Kodu Gönder**: Kodu arkadaşına WhatsApp, SMS, vb. ile gönderir
3. **Odaya Gir**: İkinci oyuncu kodu yapıştırıp "Bağlan" düğmesine tıklar
4. **Oyun Başlat**: Otomatik olarak oyun başlar!

## 🛠️ Teknolojiler

- **React 19** - UI Framework
- **TypeScript** - Tip güvenliği
- **Vite** - Build tool
- **PeerJS** - P2P iletişim
- **CSS3** - Modern styling

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Build'i görüntüle
npm run preview
```

## 🌐 Vercel'e Deployment

1. GitHub'a push et
2. Vercel'e bağlan (https://vercel.com)
3. Repository seç
4. Deploy düğmesine tıkla

Vercel otomatik olarak build et ve deploy edecektir!

## 📱 Mobil Desteği

Oyun tamamı mobil cihazlarda oynanabilir. Arkadaşınızla farklı telefonlarda oyun kodu paylaşıp birlikte oynayabilirsiniz.

## 📝 Lisans

Açık kaynak - İstediğiniz gibi kullanın!
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
