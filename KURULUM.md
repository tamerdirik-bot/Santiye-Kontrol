# Şantiye Kontrol — Kurulum

Klasördeki dosyalar hazır bir web sitesidir. Kurulumdan önce de açılır ve **demo modunda** çalışır (veri yalnızca o cihazda durur).
Ekip kullanımı için iki adım var: siteyi yayınlamak ve ortak veritabanını bağlamak. Toplam 10-15 dakika.

## 1. Siteyi GitHub Pages'e koyun
1. GitHub'da yeni bir **public** depo açın (ör. `santiye`).
2. Bu klasördeki bütün dosyaları depoya yükleyin (Add file > Upload files).
3. Settings > Pages > Source: "Deploy from a branch", Branch: `main`, klasör `/ (root)` > Save.
4. Birkaç dakika sonra adres hazır olur: `https://KULLANICIADINIZ.github.io/santiye/`

## 2. Firebase'i (ücretsiz plan) açın
1. https://console.firebase.google.com > proje ekleyin (Analytics gerekmez).
2. **Firestore Database** > Create database > "production mode" > konum olarak Avrupa (eur3) seçin.
3. Firestore > **Rules** sekmesi: içeriği silip bu klasördeki `firestore.rules` dosyasının tamamını yapıştırın > Publish.
4. **Authentication** > Get started > Sign-in method > **Email/Password** > Enable.
5. Authentication > Settings > Authorized domains > `KULLANICIADINIZ.github.io` ekleyin.
6. Proje ayarları (dişli) > Your apps > Web (`</>`) > uygulamayı kaydedin > ekranda çıkan `firebaseConfig = { ... }` kutusunu kopyalayın.

(Firebase konsolundaki menü adları zamanla küçük değişiklikler gösterebilir.)

## 3. Uygulamayı bağlayın
1. Siteyi açın > demo adınızı yazıp girin > **Ayarlar > Ekip kurulumu** > kopyaladığınız kutuyu yapıştırın > Bağlan.
2. "Hesabım yok" ile e-posta + şifreyle hesap açın. İlk giren kişi **yönetici** olur; şirket adını yazın.
3. **Ayarlar > Davet bağlantısını kopyala** > bağlantıyı ekibe gönderin (WhatsApp, e-posta).
   Bağlantıyı açan kişi kendi e-posta + şifresiyle hesap açar ve doğrudan ekibe girer.
4. Telefonda: Safari/Chrome'da açıp "Ana Ekrana Ekle" deyin.

İsterseniz 3.1 yerine `config.js` dosyasındaki `firebase: null` satırına yapılandırmayı yazabilirsiniz; o zaman her cihaz kendiliğinden bağlanır.

## Bilmeniz gerekenler
- Ücretsiz planın günlük sınırı 50.000 okuma / 20.000 yazma, toplam 1 GB. 5-6 kişilik ekip için fazlasıyla yeter.
- Dekont görselleri küçültülüp veritabanına yazılır (Firebase'in dosya deposu ücretli plana geçtiği için kullanılmıyor). PDF en fazla 650 KB.
- Bildirimler uygulama içindedir: açıkken anlık düşer, kapalıyken sonraki açılışta zil üzerinde sayı görünür.
- Bir kişinin erişimini Ayarlar > Ekip'ten kapatabilirsiniz. Davet kodunu bilen herkes katılabilir; bağlantıyı yalnızca ekibe verin.
