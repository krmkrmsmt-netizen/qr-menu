import React, { useState } from "react";

function App() {
  const [restaurant, setRestaurant] = useState({
    name: "Restoranınız",
    description: "Lezzetli yemekler ve özel tatlar",
  });

  const [products, setProducts] = useState([
    {
      name: "Örnek Burger",
      description: "Özel soslu dana burger",
      category: "Burgerler",
      price: "250",
      calories: "650",
      allergens: ["Gluten", "Süt"],
      image: "",
    },
  ]);

  const [menuImage, setMenuImage] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "Ana Yemekler",
    price: "",
    calories: "",
    allergens: [],
    image: "",
  });

  const allergens = [
    "Gluten",
    "Süt",
    "Yumurta",
    "Fıstık",
    "Soya",
    "Balık",
    "Kabuklu Deniz Ürünleri",
    "Susam",
  ];

  const categories = [
    "Başlangıçlar",
    "Ana Yemekler",
    "Burgerler",
    "Pizza",
    "Salatalar",
    "Tatlılar",
    "İçecekler",
  ];

  function handleMenuImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setMenuImage(url);
    setAnalysisDone(false);
  }

  function analyzeMenu() {
    if (!menuImage) {
      alert("Önce bir menü fotoğrafı yükleyin.");
      return;
    }

    setAnalyzing(true);

    /*
      Şimdilik demo analiz.
      Gerçek OCR/AI bağlantısını sonraki aşamada
      buraya bağlayacağız.
    */

    setTimeout(() => {
      setProducts([
        {
          name: "Izgara Köfte",
          description: "Izgara köfte, pilav ve salata",
          category: "Ana Yemekler",
          price: "320",
          calories: "720",
          allergens: [],
          image: "",
        },
        {
          name: "Cheeseburger",
          description: "Dana eti, cheddar peyniri ve özel sos",
          category: "Burgerler",
          price: "280",
          calories: "680",
          allergens: ["Gluten", "Süt"],
          image: "",
        },
        {
          name: "Çikolatalı Sufle",
          description: "Sıcak çikolatalı sufle",
          category: "Tatlılar",
          price: "180",
          calories: "520",
          allergens: ["Gluten", "Yumurta", "Süt"],
          image: "",
        },
      ]);

      setAnalyzing(false);
      setAnalysisDone(true);
    }, 1800);
  }

  function addProduct() {
    if (!product.name || !product.price) {
      alert("Ürün adı ve fiyat zorunludur.");
      return;
    }

    setProducts([...products, product]);

    setProduct({
      name: "",
      description: "",
      category: "Ana Yemekler",
      price: "",
      calories: "",
      allergens: [],
      image: "",
    });
  }

  function toggleAllergen(name) {
    setProduct((p) => ({
      ...p,
      allergens: p.allergens.includes(name)
        ? p.allergens.filter((a) => a !== name)
        : [...p.allergens, name],
    }));
  }

  return (
    <div style={styles.page}>

      <header style={styles.header}>
        <strong style={styles.logo}>MenuCraft QR</strong>
        <span>Yönetim Paneli</span>
      </header>

      <main style={styles.container}>

        <h1 style={styles.title}>
          Menü Yönetimi
        </h1>

        <p style={styles.subtitle}>
          Menünüzü fotoğraftan otomatik oluşturun veya
          ürünlerinizi kendiniz ekleyin.
        </p>

        {/* RESTORAN */}

        <section style={styles.card}>
          <h2>🏪 Restoran Bilgileri</h2>

          <input
            style={styles.input}
            value={restaurant.name}
            onChange={(e) =>
              setRestaurant({
                ...restaurant,
                name: e.target.value,
              })
            }
            placeholder="Restoran adı"
          />

          <textarea
            style={styles.textarea}
            value={restaurant.description}
            onChange={(e) =>
              setRestaurant({
                ...restaurant,
                description: e.target.value,
              })
            }
            placeholder="Restoran açıklaması"
          />
        </section>

        {/* FOTOĞRAFTAN MENÜ */}

        <section style={styles.card}>

          <div style={styles.sectionHeader}>
            <div>
              <h2>📸 Fotoğraftan Menü Oluştur</h2>

              <p style={styles.subtitle}>
                Menü fotoğrafınızı yükleyin. Sistem
                ürünleri, kategorileri ve fiyatları
                otomatik olarak çıkarmaya hazırlanacak.
              </p>
            </div>

            <div style={styles.aiBadge}>
              ✨ AI
            </div>
          </div>

          <label style={styles.uploadBox}>

            <div style={{ fontSize: 42 }}>
              📷
            </div>

            <strong>
              Menü fotoğrafı seç
            </strong>

            <span style={styles.smallText}>
              JPG, PNG veya WEBP
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleMenuImage}
              style={{ display: "none" }}
            />

          </label>

          {menuImage && (
            <div style={{ marginTop: 20 }}>

              <img
                src={menuImage}
                alt="Yüklenen menü"
                style={styles.menuImage}
              />

              <button
                onClick={analyzeMenu}
                style={styles.primaryButton}
                disabled={analyzing}
              >
                {analyzing
                  ? "🤖 Menü analiz ediliyor..."
                  : "✨ Menüyü Analiz Et"}
              </button>

            </div>
          )}

          {analysisDone && (
            <div style={styles.successBox}>
              <strong>✓ Analiz tamamlandı</strong>

              <p>
                Menüde bulunan örnek ürünler aşağıya
                aktarıldı. Yayınlamadan önce bilgileri
                kontrol edip düzenleyebilirsiniz.
              </p>
            </div>
          )}

        </section>

        {/* ÜRÜN EKLE */}

        <section style={styles.card}>

          <h2>🍔 Manuel Ürün Ekle</h2>

          <input
            style={styles.input}
            placeholder="Ürün adı"
            value={product.name}
            onChange={(e) =>
              setProduct({
                ...product,
                name: e.target.value,
              })
            }
          />

          <textarea
            style={styles.textarea}
            placeholder="Ürün açıklaması"
            value={product.description}
            onChange={(e) =>
              setProduct({
                ...product,
                description: e.target.value,
              })
            }
          />

          <select
            style={styles.input}
            value={product.category}
            onChange={(e) =>
              setProduct({
                ...product,
                category: e.target.value,
              })
            }
          >
            {categories.map((category) => (
              <option key={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            style={styles.input}
            type="number"
            placeholder="Fiyat (TL)"
            value={product.price}
            onChange={(e) =>
              setProduct({
                ...product,
                price: e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Kalori (kcal)"
            value={product.calories}
            onChange={(e) =>
              setProduct({
                ...product,
                calories: e.target.value,
              })
            }
          />

          <h3>⚠️ Alerjenler</h3>

          <div style={styles.allergens}>
            {allergens.map((item) => {
              const active =
                product.allergens.includes(item);

              return (
                <button
                  key={item}
                  onClick={() => toggleAllergen(item)}
                  style={{
                    ...styles.allergen,
                    background: active
                      ? "#fee2e2"
                      : "#fff",
                    color: active
                      ? "#b91c1c"
                      : "#344054",
                  }}
                >
                  {active ? "✓ " : ""}
                  {item}
                </button>
              );
            })}
          </div>

          <button
            onClick={addProduct}
            style={styles.primaryButton}
          >
            + Ürünü Ekle
          </button>

        </section>

        {/* ÜRÜNLER */}

        <section style={styles.card}>

          <h2>🍽️ Menü Ürünleri</h2>

          {products.map((item, index) => (
            <div
              key={index}
              style={styles.adminProduct}
            >

              <div style={{ flex: 1 }}>

                <strong>
                  {item.name}
                </strong>

                <p style={styles.productDescription}>
                  {item.description}
                </p>

                <span style={styles.meta}>
                  {item.category}
                </span>

                {item.calories && (
                  <span style={styles.meta}>
                    🔥 {item.calories} kcal
                  </span>
                )}

                {item.allergens.length > 0 && (
                  <div style={styles.allergenText}>
                    ⚠️ {item.allergens.join(", ")}
                  </div>
                )}

              </div>

              <strong style={styles.price}>
                {item.price} TL
              </strong>

            </div>
          ))}

        </section>

        {/* QR */}

        <section style={styles.card}>

          <h2>📱 QR Menü</h2>

          <p style={styles.subtitle}>
            Menünüz hazır olduğunda müşterileriniz
            QR kodu okutarak dijital menünüze
            ulaşabilecek.
          </p>

          <button
            style={styles.primaryButton}
            onClick={() =>
              alert(
                "QR kod sistemi bir sonraki aşamada bağlanacak."
              )
            }
          >
            🔳 QR Kod Oluştur
          </button>

        </section>

      </main>
    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    fontFamily: "Arial, sans-serif",
    color: "#172033",
  },

  header: {
    background: "#111827",
    color: "white",
    padding: "18px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: 22,
  },

  container: {
    maxWidth: 1100,
    margin: "auto",
    padding: "30px 18px",
  },

  title: {
    fontSize: 38,
    marginBottom: 8,
  },

  subtitle: {
    color: "#667085",
    lineHeight: 1.6,
  },

  card: {
    background: "#fff",
    padding: 24,
    borderRadius: 18,
    marginBottom: 20,
    border: "1px solid #e5e7eb",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
  },

  aiBadge: {
    background: "#eef2ff",
    color: "#4338ca",
    padding: "8px 14px",
    borderRadius: 20,
    height: "fit-content",
    fontWeight: "bold",
  },

  uploadBox: {
    marginTop: 15,
    minHeight: 180,
    border: "2px dashed #cbd5e1",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: "pointer",
    background: "#f8fafc",
  },

  smallText: {
    color: "#667085",
    fontSize: 13,
  },

  menuImage: {
    width: "100%",
    maxHeight: 500,
    objectFit: "contain",
    borderRadius: 15,
    border: "1px solid #e5e7eb",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 13,
    marginBottom: 12,
    borderRadius: 10,
    border: "1px solid #d0d5dd",
    fontSize: 15,
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: 13,
    marginBottom: 12,
    borderRadius: 10,
    border: "1px solid #d0d5dd",
    minHeight: 80,
    fontFamily: "Arial, sans-serif",
    fontSize: 15,
  },

  primaryButton: {
    marginTop: 18,
    padding: "14px 22px",
    border: "none",
    borderRadius: 11,
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    cursor: "pointer",
  },

  successBox: {
    marginTop: 18,
    padding: 16,
    borderRadius: 12,
    background: "#ecfdf3",
    color: "#166534",
  },

  allergens: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },

  allergen: {
    padding: "9px 12px",
    borderRadius: 20,
    border: "1px solid #d0d5dd",
    cursor: "pointer",
  },

  adminProduct: {
    display: "flex",
    gap: 15,
    padding: "18px 0",
    borderBottom: "1px solid #eee",
  },

  productDescription: {
    color: "#667085",
    margin: "6px 0",
  },

  meta: {
    display: "inline-block",
    marginRight: 12,
    color: "#667085",
    fontSize: 13,
  },

  allergenText: {
    marginTop: 7,
    color: "#b91c1c",
    fontSize: 13,
  },

  price: {
    color: "#2563eb",
    whiteSpace: "nowrap",
  },
};

export default App;
