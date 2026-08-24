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

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "Ana Yemekler",
    price: "",
    calories: "",
    allergens: [],
    image: "",
  });

  const [menuImage, setMenuImage] = useState("");

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
    "Ana Yemekler",
    "Başlangıçlar",
    "Burgerler",
    "Pizza",
    "Salatalar",
    "Tatlılar",
    "İçecekler",
  ];

  function addProduct() {
    if (!product.name || !product.price) {
      alert("Lütfen ürün adı ve fiyat girin.");
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

  function handleProductImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProduct((p) => ({
      ...p,
      image: imageUrl,
    }));
  }

  function handleMenuImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    setMenuImage(URL.createObjectURL(file));
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}

      <header style={styles.header}>
        <strong style={styles.logo}>MenuCraft QR</strong>

        <span style={styles.panelText}>
          Yönetim Paneli
        </span>
      </header>

      <main style={styles.container}>

        {/* BAŞLIK */}

        <div style={{ marginBottom: 25 }}>
          <h1 style={styles.title}>
            Menünüzü Oluşturun
          </h1>

          <p style={styles.subtitle}>
            Restoran bilgilerinizi ve ürünlerinizi ekleyin.
          </p>
        </div>

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
            style={{
              ...styles.input,
              minHeight: 90,
              resize: "vertical",
            }}
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

        {/* ÜRÜN EKLE */}

        <section style={styles.card}>
          <h2>🍔 Ürün Ekle</h2>

          <label style={styles.label}>
            Ürün Fotoğrafı
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleProductImage}
            style={styles.fileInput}
          />

          {product.image && (
            <img
              src={product.image}
              alt="Ürün"
              style={styles.uploadPreview}
            />
          )}

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
            style={{
              ...styles.input,
              minHeight: 80,
            }}
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

          <div style={styles.allergenContainer}>
            {allergens.map((item) => {
              const selected =
                product.allergens.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleAllergen(item)}
                  style={{
                    ...styles.allergen,
                    background: selected
                      ? "#fee2e2"
                      : "#ffffff",
                    color: selected
                      ? "#b91c1c"
                      : "#344054",
                    borderColor: selected
                      ? "#fca5a5"
                      : "#d0d5dd",
                  }}
                >
                  {selected ? "✓ " : ""}
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

        {/* MENÜ ÖNİZLEME */}

        <section style={styles.card}>
          <h2>👁️ Menü Önizleme</h2>

          <div style={styles.menuPreview}>

            <div style={styles.menuHeader}>
              <div>
                <h2 style={{ margin: 0 }}>
                  {restaurant.name}
                </h2>

                <p style={styles.menuDescription}>
                  {restaurant.description}
                </p>
              </div>

              <div style={styles.qrFake}>
                QR
              </div>
            </div>

            {/* KATEGORİLER */}

            {categories.map((category) => {
              const categoryProducts =
                products.filter(
                  (item) => item.category === category
                );

              if (categoryProducts.length === 0)
                return null;

              return (
                <div key={category}>

                  <h3 style={styles.categoryTitle}>
                    {category}
                  </h3>

                  {categoryProducts.map(
                    (item, index) => (
                      <div
                        key={index}
                        style={styles.productCard}
                      >

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={styles.productImage}
                          />
                        ) : (
                          <div
                            style={
                              styles.productPlaceholder
                            }
                          >
                            🍽️
                          </div>
                        )}

                        <div
                          style={
                            styles.productContent
                          }
                        >
                          <div
                            style={
                              styles.productTop
                            }
                          >
                            <strong
                              style={{
                                fontSize: 17,
                              }}
                            >
                              {item.name}
                            </strong>

                            <strong
                              style={{
                                color: "#2563eb",
                                whiteSpace:
                                  "nowrap",
                              }}
                            >
                              {item.price} TL
                            </strong>
                          </div>

                          {item.description && (
                            <p
                              style={
                                styles.productDescription
                              }
                            >
                              {item.description}
                            </p>
                          )}

                          <div
                            style={
                              styles.infoRow
                            }
                          >
                            {item.calories && (
                              <span>
                                🔥 {item.calories} kcal
                              </span>
                            )}

                            {item.allergens.length >
                              0 && (
                              <span
                                style={{
                                  color: "#b91c1c",
                                }}
                              >
                                ⚠️{" "}
                                {item.allergens.join(
                                  ", "
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* MENÜ FOTOĞRAFI */}

        <section style={styles.card}>
          <h2>
            📸 Menü Fotoğrafından Otomatik Oluştur
          </h2>

          <p style={styles.subtitle}>
            Restoran menüsünün fotoğrafını yükleyin.
            İlerleyen aşamada yapay zeka ile fotoğraftaki
            ürünleri otomatik olarak okuyup menüye
            aktaracağız.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleMenuImage}
            style={styles.fileInput}
          />

          {menuImage && (
            <div style={{ marginTop: 15 }}>
              <img
                src={menuImage}
                alt="Menü"
                style={styles.menuPhoto}
              />

              <p style={styles.success}>
                ✓ Menü fotoğrafı yüklendi
              </p>
            </div>
          )}
        </section>

        {/* QR */}

        <section style={styles.card}>
          <h2>📱 QR Menü</h2>

          <p style={styles.subtitle}>
            Menünüz hazır olduğunda restoranınıza özel
            QR kod oluşturulacak.
          </p>

          <button
            style={styles.primaryButton}
            onClick={() =>
              alert(
                "QR kod sistemi bir sonraki aşamada aktif edilecek."
              )
            }
          >
            QR Kod Oluştur
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

  logo: {
    fontSize: 22,
  },

  panelText: {
    fontSize: 15,
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
    background: "white",
    padding: 24,
    borderRadius: 18,
    marginBottom: 20,
    border: "1px solid #e5e7eb",
    boxSizing: "border-box",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 13,
    marginBottom: 12,
    borderRadius: 10,
    border: "1px solid #d0d5dd",
    fontSize: 15,
    fontFamily: "inherit",
  },

  label: {
    display: "block",
    marginBottom: 8,
    fontWeight: "bold",
  },

  fileInput: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    border: "1px dashed #98a2b3",
    borderRadius: 10,
    background: "#f9fafb",
    boxSizing: "border-box",
  },

  uploadPreview: {
    width: 150,
    height: 120,
    objectFit: "cover",
    borderRadius: 12,
    marginBottom: 15,
  },

  allergenContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },

  allergen: {
    padding: "9px 12px",
    borderRadius: 20,
    border: "1px solid",
    fontSize: 13,
    cursor: "pointer",
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

  menuPreview: {
    background: "#ffffff",
    borderRadius: 18,
    padding: 22,
    border: "1px solid #e5e7eb",
  },

  menuHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 18,
    borderBottom: "1px solid #eee",
  },

  menuDescription: {
    color: "#667085",
    marginBottom: 0,
  },

  qrFake: {
    width: 55,
    height: 55,
    borderRadius: 10,
    background: "#111827",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  categoryTitle: {
    marginTop: 25,
    marginBottom: 12,
    color: "#2563eb",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: 8,
  },

  productCard: {
    display: "flex",
    gap: 15,
    padding: "15px 0",
    borderBottom: "1px solid #eee",
  },

  productImage: {
    width: 105,
    height: 95,
    objectFit: "cover",
    borderRadius: 12,
    flexShrink: 0,
  },

  productPlaceholder: {
    width: 105,
    height: 95,
    borderRadius: 12,
    background: "#f2f4f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 35,
    flexShrink: 0,
  },

  productContent: {
    flex: 1,
    minWidth: 0,
  },

  productTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  },

  productDescription: {
    color: "#667085",
    fontSize: 14,
    margin: "8px 0",
  },

  infoRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    fontSize: 12,
    color: "#667085",
  },

  menuPhoto: {
    width: "100%",
    maxHeight: 500,
    objectFit: "contain",
    borderRadius: 15,
    border: "1px solid #e5e7eb",
  },

  success: {
    color: "#15803d",
    fontWeight: "bold",
  },
};

export default App;
