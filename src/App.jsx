import React, { useState } from "react";

function App() {
  const [restaurant, setRestaurant] = useState({
    name: "Restoranınız",
    description: "Lezzetli yemekler ve özel tatlar",
    phone: "",
    address: "",
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Örnek Burger",
      description: "Özel soslu dana burger",
      category: "Burgerler",
      price: "250",
      calories: "650",
      allergens: ["Gluten", "Süt"],
      image: "",
    },
  ]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "Ana Yemekler",
    price: "",
    calories: "",
    allergens: [],
    image: "",
  });

  const [menuPhoto, setMenuPhoto] = useState("");
  const [menuPhotoName, setMenuPhotoName] = useState("");
  const [design, setDesign] = useState("modern");
  const [showQR, setShowQR] = useState(false);
  const [message, setMessage] = useState("");

  const allergens = [
    "Gluten",
    "Süt",
    "Yumurta",
    "Fıstık",
    "Soya",
    "Balık",
    "Kabuklu Deniz Ürünleri",
    "Susam",
    "Hardal",
    "Kereviz",
    "Kükürt",
  ];

  const categories = [
    "Ana Yemekler",
    "Başlangıçlar",
    "Çorbalar",
    "Burgerler",
    "Pizza",
    "Makarna",
    "Salatalar",
    "Tatlılar",
    "İçecekler",
  ];

  function toggleAllergen(name) {
    setProduct((p) => ({
      ...p,
      allergens: p.allergens.includes(name)
        ? p.allergens.filter((a) => a !== name)
        : [...p.allergens, name],
    }));
  }

  function addProduct() {
    if (!product.name || !product.price) {
      setMessage("Ürün adı ve fiyat zorunludur.");
      return;
    }

    setProducts([
      ...products,
      {
        ...product,
        id: Date.now(),
      },
    ]);

    setProduct({
      name: "",
      description: "",
      category: "Ana Yemekler",
      price: "",
      calories: "",
      allergens: [],
      image: "",
    });

    setMessage("Ürün menüye eklendi.");
  }

  function deleteProduct(id) {
    setProducts(products.filter((item) => item.id !== id));
  }

  function handleMenuPhoto(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setMenuPhotoName(file.name);

    const reader = new FileReader();

    reader.onload = () => {
      setMenuPhoto(reader.result);
      setMessage("Menü fotoğrafı yüklendi.");
    };

    reader.readAsDataURL(file);
  }

  function handleProductPhoto(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setProduct((p) => ({
        ...p,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  function analyzeMenu() {
    if (!menuPhoto) {
      setMessage("Önce menü fotoğrafı yükleyin.");
      return;
    }

    setMessage(
      "Fotoğraf analiz kuyruğuna alındı. AI menü okuma sistemi bir sonraki aşamada bağlanacak."
    );
  }

  function createQR() {
    setShowQR(true);
    setMessage("Restoranınıza özel QR menü bağlantısı hazırlandı.");
  }

  const menuUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/menu/" + restaurant.name
      : "https://menu.example.com";

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=" +
    encodeURIComponent(menuUrl);

  const designStyle = {
    modern: {
      background: "#f8fafc",
      card: "#ffffff",
      accent: "#2563eb",
    },
    dark: {
      background: "#111827",
      card: "#1f2937",
      accent: "#f59e0b",
    },
    elegant: {
      background: "#f6f1e8",
      card: "#fffdf8",
      accent: "#8b5e34",
    },
    green: {
      background: "#f0fdf4",
      card: "#ffffff",
      accent: "#15803d",
    },
  };

  const theme = designStyle[design];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <strong style={{ fontSize: 22 }}>MenuCraft QR</strong>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            Dijital Menü Sistemi
          </div>
        </div>

        <span style={styles.adminBadge}>Yönetim Paneli</span>
      </header>

      <main style={styles.container}>
        <section style={styles.hero}>
          <div>
            <h1 style={{ margin: 0 }}>Menünüzü Oluşturun</h1>
            <p style={styles.muted}>
              Restoranınızın dijital menüsünü dakikalar içinde hazırlayın.
            </p>
          </div>

          <div style={styles.heroIcon}>QR</div>
        </section>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        {/* RESTORAN */}
        <section style={styles.card}>
          <h2>🏪 Restoran Bilgileri</h2>

          <label style={styles.label}>Restoran Adı</label>

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

          <label style={styles.label}>Açıklama</label>

          <textarea
            style={{ ...styles.input, minHeight: 90 }}
            value={restaurant.description}
            onChange={(e) =>
              setRestaurant({
                ...restaurant,
                description: e.target.value,
              })
            }
            placeholder="Restoran açıklaması"
          />

          <label style={styles.label}>Telefon</label>

          <input
            style={styles.input}
            value={restaurant.phone}
            onChange={(e) =>
              setRestaurant({
                ...restaurant,
                phone: e.target.value,
              })
            }
            placeholder="0555 555 55 55"
          />

          <label style={styles.label}>Adres</label>

          <input
            style={styles.input}
            value={restaurant.address}
            onChange={(e) =>
              setRestaurant({
                ...restaurant,
                address: e.target.value,
              })
            }
            placeholder="Restoran adresi"
          />
        </section>

        {/* FOTOĞRAF */}
        <section style={styles.card}>
          <div style={styles.sectionTitleRow}>
            <div>
              <h2>📸 Fotoğraftan Menü Oluştur</h2>

              <p style={styles.muted}>
                Restoranın mevcut menüsünün fotoğrafını yükleyin.
                Sistem ürünleri, kategorileri ve fiyatları analiz
                etmek için hazırlayacak.
              </p>
            </div>

            <div style={styles.aiBadge}>✨ AI</div>
          </div>

          <label style={styles.upload}>
            {menuPhoto ? (
              <img
                src={menuPhoto}
                alt="Menü"
                style={styles.menuPhoto}
              />
            ) : (
              <>
                <div style={{ fontSize: 48 }}>📷</div>
                <strong>Menü fotoğrafı seç</strong>
                <span style={styles.muted}>
                  JPG, PNG veya WEBP
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleMenuPhoto}
              style={{ display: "none" }}
            />
          </label>

          {menuPhotoName && (
            <div style={styles.fileName}>
              📎 {menuPhotoName}
            </div>
          )}

          <button
            onClick={analyzeMenu}
            style={styles.aiButton}
          >
            ✨ Fotoğrafı AI ile Analiz Et
          </button>
        </section>

        {/* ÜRÜN */}
        <section style={styles.card}>
          <h2>🍔 Ürün Ekle</h2>

          <label style={styles.label}>Ürün Fotoğrafı</label>

          <label style={styles.smallUpload}>
            {product.image ? (
              <img
                src={product.image}
                alt="Ürün"
                style={styles.productUploadImage}
              />
            ) : (
              <>
                📷 Ürün fotoğrafı seç
              </>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleProductPhoto}
              style={{ display: "none" }}
            />
          </label>

          <label style={styles.label}>Ürün Adı</label>

          <input
            style={styles.input}
            placeholder="Örneğin: Karışık Pizza"
            value={product.name}
            onChange={(e) =>
              setProduct({
                ...product,
                name: e.target.value,
              })
            }
          />

          <label style={styles.label}>Ürün Açıklaması</label>

          <textarea
            style={{ ...styles.input, minHeight: 75 }}
            placeholder="Ürün açıklaması"
            value={product.description}
            onChange={(e) =>
              setProduct({
                ...product,
                description: e.target.value,
              })
            }
          />

          <label style={styles.label}>Kategori</label>

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
              <option key={category}>{category}</option>
            ))}
          </select>

          <div style={styles.twoColumn}>
            <div>
              <label style={styles.label}>Fiyat (TL)</label>

              <input
                style={styles.input}
                type="number"
                value={product.price}
                placeholder="250"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label style={styles.label}>Kalori (kcal)</label>

              <input
                style={styles.input}
                type="number"
                value={product.calories}
                placeholder="650"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    calories: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <h3>⚠️ Alerjenler</h3>

          <div style={styles.tags}>
            {allergens.map((item) => {
              const active =
                product.allergens.includes(item);

              return (
                <button
                  key={item}
                  onClick={() => toggleAllergen(item)}
                  style={{
                    ...styles.tag,
                    ...(active ? styles.activeTag : {}),
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
            + Ürünü Menüye Ekle
          </button>
        </section>

        {/* ÜRÜNLER */}
        <section style={styles.card}>
          <div style={styles.sectionTitleRow}>
            <h2>📋 Eklenen Ürünler</h2>

            <span style={styles.countBadge}>
              {products.length} ürün
            </span>
          </div>

          {products.map((item) => (
            <div key={item.id} style={styles.productRow}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.productImage}
                />
              ) : (
                <div style={styles.productPlaceholder}>
                  🍽️
                </div>
              )}

              <div style={{ flex: 1 }}>
                <strong>{item.name}</strong>

                <div style={styles.miniText}>
                  {item.category}
                  {item.calories
                    ? ` • ${item.calories} kcal`
                    : ""}
                </div>

                {item.allergens.length > 0 && (
                  <div style={styles.allergenText}>
                    ⚠️ {item.allergens.join(", ")}
                  </div>
                )}
              </div>

              <strong style={styles.price}>
                {item.price} TL
              </strong>

              <button
                onClick={() => deleteProduct(item.id)}
                style={styles.deleteButton}
              >
                ×
              </button>
            </div>
          ))}
        </section>

        {/* TASARIM */}
        <section style={styles.card}>
          <h2>🎨 Menü Tasarımı</h2>

          <p style={styles.muted}>
            Restoran için kullanılacak menü görünümünü seçin.
          </p>

          <div style={styles.designGrid}>
            {Object.keys(designStyle).map((item) => (
              <button
                key={item}
                onClick={() => setDesign(item)}
                style={{
                  ...styles.designButton,
                  ...(design === item
                    ? styles.selectedDesign
                    : {}),
                }}
              >
                <div
                  style={{
                    ...styles.designPreview,
                    background:
                      designStyle[item].background,
                  }}
                >
                  <span
                    style={{
                      color: designStyle[item].accent,
                    }}
                  >
                    Aa
                  </span>
                </div>

                <strong>
                  {item === "modern" && "Modern"}
                  {item === "dark" && "Dark"}
                  {item === "elegant" && "Elegant"}
                  {item === "green" && "Natural"}
                </strong>
              </button>
            ))}
          </div>
        </section>

        {/* MENÜ ÖNİZLEME */}
        <section style={styles.card}>
          <div style={styles.sectionTitleRow}>
            <div>
              <h2>👁️ Canlı Menü Önizleme</h2>
              <p style={styles.muted}>
                Müşterinin QR kodu okuttuğunda göreceği görünüm.
              </p>
            </div>
          </div>

          <div
            style={{
              ...styles.menuPreview,
              background: theme.background,
              color:
                design === "dark" ? "white" : "#172033",
            }}
          >
            <div style={styles.menuHeader}>
              <h2>{restaurant.name}</h2>

              <p
                style={{
                  color:
                    design === "dark"
                      ? "#d1d5db"
                      : "#667085",
                }}
              >
                {restaurant.description}
              </p>
            </div>

            {categories.map((category) => {
              const categoryProducts = products.filter(
                (item) => item.category === category
              );

              if (categoryProducts.length === 0) {
                return null;
              }

              return (
                <div key={category}>
                  <h3
                    style={{
                      color: theme.accent,
                      borderBottom:
                        "2px solid " + theme.accent,
                      paddingBottom: 8,
                    }}
                  >
                    {category}
                  </h3>

                  {categoryProducts.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        ...styles.menuItem,
                        background: theme.card,
                      }}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={styles.menuItemImage}
                        />
                      )}

                      <div style={{ flex: 1 }}>
                        <div
                          style={styles.menuItemTop}
                        >
                          <strong>{item.name}</strong>

                          <strong
                            style={{
                              color: theme.accent,
                            }}
                          >
                            {item.price} TL
                          </strong>
                        </div>

                        {item.description && (
                          <p style={styles.menuDescription}>
                            {item.description}
                          </p>
                        )}

                        {item.calories && (
                          <span style={styles.meta}>
                            🔥 {item.calories} kcal
                          </span>
                        )}

                        {item.allergens.length > 0 && (
                          <div
                            style={styles.allergenText}
                          >
                            ⚠️{" "}
                            {item.allergens.join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>

        {/* QR */}
        <section style={styles.card}>
          <h2>📱 QR Menü</h2>

          <p style={styles.muted}>
            Menünüz hazır olduğunda restoranınıza özel QR
            kod oluşturabilirsiniz.
          </p>

          <button
            onClick={createQR}
            style={styles.primaryButton}
          >
            📱 QR Kod Oluştur
          </button>

          {showQR && (
            <div style={styles.qrBox}>
              <h3>{restaurant.name}</h3>

              <img
                src={qrUrl}
                alt="QR Kod"
                style={styles.qr}
              />

              <p style={styles.muted}>
                Bu QR kod restoran menünüze yönlendirme
                altyapısını kullanır.
              </p>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(menuUrl);
                  setMessage("Menü bağlantısı kopyalandı.");
                }}
                style={styles.secondaryButton}
              >
                🔗 Menü bağlantısını kopyala
              </button>
            </div>
          )}
        </section>

        <footer style={styles.footer}>
          <strong>MenuCraft QR</strong>
          <span>Profesyonel Dijital Menü Sistemi</span>
        </footer>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    fontFamily:
      "Arial, Helvetica, sans-serif",
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

  adminBadge: {
    background: "#1f2937",
    padding: "9px 13px",
    borderRadius: 10,
    fontSize: 14,
  },

  container: {
    maxWidth: 1050,
    margin: "auto",
    padding: "25px 16px 50px",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 16,
    background: "#dbeafe",
    color: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  card: {
    background: "white",
    padding: 22,
    borderRadius: 18,
    marginBottom: 20,
    border: "1px solid #e5e7eb",
  },

  muted: {
    color: "#667085",
    lineHeight: 1.6,
  },

  message: {
    background: "#eff6ff",
    color: "#1d4ed8",
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
    border: "1px solid #bfdbfe",
  },

  label: {
    display: "block",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 7,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 13,
    marginBottom: 14,
    borderRadius: 10,
    border: "1px solid #d0d5dd",
    fontSize: 15,
    background: "white",
  },

  sectionTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },

  aiBadge: {
    background: "#eef2ff",
    color: "#4338ca",
    padding: 15,
    borderRadius: 16,
    fontWeight: "bold",
  },

  upload: {
    minHeight: 210,
    border: "2px dashed #cbd5e1",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    overflow: "hidden",
    textAlign: "center",
    gap: 8,
  },

  menuPhoto: {
    width: "100%",
    maxHeight: 450,
    objectFit: "contain",
  },

  fileName: {
    marginTop: 10,
    padding: 10,
    background: "#f8fafc",
    borderRadius: 8,
    fontSize: 13,
  },

  aiButton: {
    width: "100%",
    marginTop: 14,
    padding: 14,
    border: "none",
    borderRadius: 10,
    background: "#7c3aed",
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    cursor: "pointer",
  },

  smallUpload: {
    minHeight: 90,
    border: "1px dashed #cbd5e1",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginBottom: 15,
    overflow: "hidden",
  },

  productUploadImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
  },

  twoColumn: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 14,
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    padding: "9px 12px",
    borderRadius: 20,
    border: "1px solid #d0d5dd",
    background: "white",
    color: "#344054",
    cursor: "pointer",
  },

  activeTag: {
    background: "#fee2e2",
    borderColor: "#fca5a5",
    color: "#b91c1c",
  },

  primaryButton: {
    marginTop: 20,
    padding: "13px 20px",
    border: "none",
    borderRadius: 10,
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    cursor: "pointer",
  },

  secondaryButton: {
    padding: "12px 18px",
    border: "1px solid #d0d5dd",
    borderRadius: 10,
    background: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  countBadge: {
    background: "#eff6ff",
    color: "#2563eb",
    padding: "7px 11px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: "bold",
  },

  productRow: {
    display: "flex",
    alignItems: "center",
    gap: 13,
    padding: "14px 0",
    borderBottom: "1px solid #eee",
  },

  productImage: {
    width: 65,
    height: 65,
    objectFit: "cover",
    borderRadius: 12,
  },

  productPlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 12,
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
  },

  miniText: {
    color: "#667085",
    fontSize: 13,
    marginTop: 4,
  },

  allergenText: {
    color: "#b91c1c",
    fontSize: 12,
    marginTop: 6,
  },

  price: {
    color: "#2563eb",
    whiteSpace: "nowrap",
  },

  deleteButton: {
    width: 32,
    height: 32,
    border: "none",
    borderRadius: 8,
    background: "#fee2e2",
    color: "#b91c1c",
    fontSize: 20,
    cursor: "pointer",
  },

  designGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 12,
  },

  designButton: {
    border: "1px solid #d0d5dd",
    borderRadius: 14,
    background: "white",
    padding: 10,
    cursor: "pointer",
  },

  selectedDesign: {
    border: "2px solid #2563eb",
  },

  designPreview: {
    height: 80,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  menuPreview: {
    padding: 18,
    borderRadius: 18,
    minHeight: 300,
  },

  menuHeader: {
    textAlign: "center",
    marginBottom: 25,
  },

  menuItem: {
    display: "flex",
    gap: 13,
    padding: 14,
    borderRadius: 13,
    marginBottom: 10,
    boxShadow:
      "0 1px 3px rgba(0,0,0,.06)",
  },

  menuItemImage: {
    width: 85,
    height: 85,
    borderRadius: 10,
    objectFit: "cover",
  },

  menuItemTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
  },

  menuDescription: {
    margin: "6px 0",
    fontSize: 13,
    opacity: 0.7,
  },

  meta: {
    fontSize: 12,
    opacity: 0.7,
  },

  qrBox: {
    marginTop: 20,
    padding: 20,
    background: "#f8fafc",
    borderRadius: 16,
    textAlign: "center",
  },

  qr: {
    width: 220,
    height: 220,
    maxWidth: "100%",
    margin: "10px auto",
    display: "block",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    gap: 15,
    padding: "25px 5px",
    color: "#667085",
    fontSize: 13,
  },
};

export default App;
