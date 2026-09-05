# Görev Formu Oluşturucu — Uygulama Paketi

Bu klasör, "Görev Formu Oluşturucu" aracının **kurulabilir uygulama (PWA)** sürümüdür.
Telefonuna veya bilgisayarına "gerçek bir uygulama" gibi kurulabilmesi için bunun
bir web adresinde (HTTPS) yayınlanması gerekir — tarayıcıların "Yükle / Ana Ekrana Ekle"
özelliği sadece bir web adresi üzerinden çalışır, tek bir dosyayı çift tıklayarak açtığında çalışmaz.

İçindekiler:
- `index.html` — uygulamanın kendisi
- `manifest.json` — uygulama adı, ikonu, renk teması (PWA'yı "yüklenebilir" yapan dosya)
- `service-worker.js` — internetsizken de açılabilmesini sağlayan arka plan betiği
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` — uygulama ikonları

## En hızlı yol: Netlify Drop (ücretsiz, hesap gerekmez ilk seferde)

1. https://app.netlify.com/drop adresine git
2. Bu klasördeki **tüm dosyaları** (index.html, manifest.json, service-worker.js, ikonlar) sürükleyip bırak
3. Sana `https://xxxx.netlify.app` gibi bir adres verecek — bu adres kalıcı olsun istersen ücretsiz bir Netlify hesabıyla giriş yap

## Kalıcı ve profesyonel yol: GitHub Pages (ücretsiz)

1. GitHub'da yeni bir repo oluştur (örn. `gorev-formu`)
2. Bu klasördeki dosyaları o repoya yükle
3. Repo → Settings → Pages → Branch olarak `main` / `root` seç, Save'e bas
4. Birkaç dakika sonra `https://kullaniciadin.github.io/gorev-formu/` adresinde yayında olur

## Kendi alan adın / hosting'in varsa

Dosyaları herhangi bir web hosting'e (cPanel, Vercel, kendi sunucun vb.) olduğu gibi
yükle — hiçbir sunucu/veritabanı gerektirmiyor, sadece statik dosyalar. Tek şart: **HTTPS**
üzerinden servis edilmesi (kurulum istemi için tarayıcılar bunu şart koşuyor).

## Kurulumu telefonda/bilgisayarda nasıl yaparım?

Yayınladığın adresi tarayıcıda açtıktan sonra:

- **Android (Chrome):** Sağ üstteki ⋮ menüsü → "Uygulamayı yükle" ya da sayfa
  içindeki "⬇️ Uygulamayı Yükle" butonuna dokun.
- **iPhone/iPad (Safari):** Paylaş (⬆️) simgesine dokun → "Ana Ekrana Ekle".
  (iOS'ta tarayıcı otomatik yükleme istemi göstermez, bu adım manuel yapılır —
  uygulama içinde bu bilgi otomatik olarak gösteriliyor.)
- **Bilgisayar (Chrome/Edge):** Adres çubuğunun sağındaki yükleme (⊕/bilgisayar) simgesine
  tıkla, ya da sayfadaki "Uygulamayı Yükle" butonunu kullan.

Kurulduktan sonra uygulama kendi penceresinde, tarayıcı çubuğu olmadan açılır ve
ana ekranda/uygulamalar listesinde bir ikon olarak durur.

## Veri nerede saklanıyor?

Yüklediğin Excel/CSV verisi ve üst bilgi ayarların (okul adı, dönem vb.) yalnızca
**kendi cihazındaki tarayıcı belleğinde** tutulur — internete veya bir sunucuya
gönderilmez. Uygulamayı kapatıp tekrar açtığında kaldığın yerden devam eder.
Farklı bir cihazda aynı veriyi görmek istersen Excel dosyasını tekrar o cihazdan yüklemen gerekir.

## Güncelleme

Aracı ileride geliştirirsen (örn. yeni bir alan eklemek), sadece `index.html` dosyasını
güncelleyip aynı adrese tekrar yüklemen yeterli — kullanıcıların bir şey yapmasına gerek yok,
sayfayı yeniledikleri anda yeni sürüm devreye girer.
