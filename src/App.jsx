import React, { useMemo, useRef, useState } from "react";

function App() {
  const [restaurant, setRestaurant] = useState({
    name: "Restoranınız",
    description: "Lezzetli yemekler ve özel tatlar",
    phone: "",
    address: "",
    logo: "",
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
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [message, setMessage] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const menuPhotoRef = useRef(null);
  const productPhotoRef = useRef(null);
  const logoRef = useRef(null);

  const categories = [
    "Ana Yemekler",
    "Başlangıçlar",
    "Burgerler",
    "Pizza",
    "Salatalar",
    "Tatlılar",
    "İçecekler",
  ];

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

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Tümü") return products;

    return products.filter(
      (item) => item.category === activeCategory
    );
  }, [products, activeCategory]);

  function showMessage(text) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  function handleImage(file, callback) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      callback(event.target.result);
    };

    reader.readAsDataURL(file);
  }

  function addProduct() {
    if (!product.name.trim()) {
      showMessage("Lütfen ürün adını yazın.");
      return;
    }

    if (!product.price.trim()) {
      showMessage("Lütfen ürün fiyatını yazın.");
      return;
    }

    const newProduct = {
      ...product,
      id: Date.now(),
    };

    setProducts((prev) => [...prev, newProduct]);

    setProduct({
      name: "",
      description: "",
      category: "Ana Yemekler",
      price: "",
      calories: "",
      allergens: [],
      image: "",
    });

    showMessage("Ürün menüye eklendi.");
  }

  function deleteProduct(id) {
    setProducts((prev) =>
      prev.filter((item) => item.id !== id)
    );

    showMessage("Ürün silindi.");
  }

  function toggleAllergen(name) {
    setProduct((prev) => ({
      ...prev,
      allergens: prev.allergens.includes(name)
        ? prev.allergens.filter((item) => item !== name)
        : [...prev.allergens, name],
    }));
  }

  async function analyzeMenu() {
    if (!menuPhoto) {
      showMessage("Önce menü fotoğrafını yükleyin.");
      return;
    }

    setAnalyzing(true);
    setMessage("✨ AI menüyü analiz ediyor...");

    try {
      const response = await fetch(
        "/.netlify/functions/analyze-menu",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: menuPhoto,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Menü analiz edilemedi."
        );
      }

      if (
        !data.products ||
        !Array.isArray(data.products)
      ) {
        throw new Error(
          "AI geçerli ürün listesi döndürmedi."
        );
      }

      const newProducts = data.products
        .filter((item) => item && item.name)
        .map((item, index) => ({
          id: Date.now() + index,
          name: item.name || "",
          description: item.description || "",
          category: categories.includes(item.category)
            ? item.category
            : "Ana Yemekler",
          price: String(item.price || ""),
          calories: String(item.calories || ""),
          allergens: Array.isArray(item.allergens)
            ? item.allergens
            : [],
          image: "",
        }));

      if (newProducts.length === 0) {
        throw new Error(
          "Fotoğraftan ürün bulunamadı."
        );
      }

      setProducts((prev) => [
        ...prev,
        ...newProducts,
      ]);

      if (data.restaurant) {
        setRestaurant((prev) => ({
          ...prev,
          name:
            data.restaurant.name ||
            prev.name,
          description:
            data.restaurant.description ||
            prev.description,
        }));
      }

      setActiveCategory("Tümü");

      showMessage(
        `✅ ${newProducts.length} ürün AI tarafından bulundu ve menüye eklendi.`
      );
    } catch (error) {
      console.error(error);

      showMessage(
        `❌ ${error.message || "AI menü analizinde hata oluştu."}`
      );
    } finally {
      setAnalyzing(false);
    }
  }

  function createQR() {
    showMessage(
      "QR menü bağlantısı oluşturma sistemi sonraki aşamada aktif olacak."
    );
  }

  function saveMenu() {
    localStorage.setItem(
      "menucraft_restaurant",
      JSON.stringify(restaurant)
    );

    localStorage.setItem(
      "menucraft_products",
      JSON.stringify(products)
    );

    showMessage("Menünüz kaydedildi.");
  }

  return (
    <div style={styles.page}>
      {message && (
        <div style={styles.toast}>
          {message}
        </div>
      )}

      <header style={styles.header}>
        <div>
          <div style={styles.logoText}>
            MenuCraft QR
          </div>

          <div style={styles.logoSub}>
            Dijital Menü Sistemi
          </div>
        </div>

        <button
          style={styles.headerButton}
          onClick={() =>
            document
              .getElementById("preview")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          👁️ Menü Önizleme
        </button>
      </header>

      <main style={styles.container}>
        <section style={styles.hero}>
          <div>
            <div style={styles.heroBadge}>
              ✨ QR MENÜ PLATFORMU
            </div>

            <h1 style={styles.heroTitle}>
              Menünüzü dijitale taşıyın
            </h1>

            <p style={styles.heroText}>
              Restoranınızın profesyonel dijital menüsünü
              dakikalar içinde oluşturun.
            </p>
          </div>

          <div style={styles.heroIcon}>
            QR
          </div>
        </section>

        <section style={styles.card}>
          <SectionTitle
            icon="🏪"
            title="Restoran Bilgileri"
            subtitle="Restoranınızın müşterilere gösterilecek bilgilerini girin."
          />

          <label style={styles.label}>
            Restoran Adı
          </label>

          <input
            style={styles.input}
            value={restaurant.name}
            onChange={(e) =>
              setRestaurant({
                ...restaurant,
                name: e.target.value,
              })
            }
            placeholder="Örn: Golden Restaurant"
          />

          <label style={styles.label}>
            Açıklama
          </label>

          <textarea
            style={styles.textarea}
            value={restaurant.description}
            onChange={(e) =>
              setRestaurant({
                ...restaurant,
                description: e.target.value,
              })
            }
            placeholder="Restoranınız hakkında kısa açıklama"
          />

          <div style={styles.twoColumns}>
            <div>
              <label style={styles.label}>
                Telefon
              </label>

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
            </div>

            <div>
              <label style={styles.label}>
                Adres
              </label>

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
            </div>
          </div>

          <label style={styles.label}>
            Restoran Logosu
          </label>

          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) =>
              handleImage(
                e.target.files?.[0],
                (image) =>
                  setRestaurant({
                    ...restaurant,
                    logo: image,
                  })
              )
            }
          />

          <button
            style={styles.uploadButton}
            onClick={() =>
              logoRef.current?.click()
            }
          >
            🖼️ Logo Yükle
          </button>

          {restaurant.logo && (
            <div style={styles.logoPreviewBox}>
              <img
                src={restaurant.logo}
                alt="Logo"
                style={styles.logoPreview}
              />
            </div>
          )}
        </section>

        <section style={styles.card}>
          <SectionTitle
            icon="🍔"
            title="Ürün Ekle"
            subtitle="Menünüzde bulunacak ürünleri oluşturun."
          />

          <label style={styles.label}>
            Ürün Adı
          </label>

          <input
            style={styles.input}
            value={product.name}
            onChange={(e) =>
              setProduct({
                ...product,
                name: e.target.value,
              })
            }
            placeholder="Örn: Izgara Köfte"
          />

          <label style={styles.label}>
            Ürün Açıklaması
          </label>

          <textarea
            style={styles.textarea}
            value={product.description}
            onChange={(e) =>
              setProduct({
                ...product,
                description: e.target.value,
              })
            }
            placeholder="Ürün hakkında kısa açıklama"
          />

          <div style={styles.twoColumns}>
            <div>
              <label style={styles.label}>
                Kategori
              </label>

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
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={styles.label}>
                Fiyat
              </label>

              <input
                style={styles.input}
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: e.target.value,
                  })
                }
                placeholder="250"
              />
            </div>
          </div>

          <label style={styles.label}>
            Kalori
          </label>

          <input
            style={styles.input}
            type="number"
            value={product.calories}
            onChange={(e) =>
              setProduct({
                ...product,
                calories: e.target.value,
              })
            }
            placeholder="650 kcal"
          />

          <label style={styles.label}>
            Ürün Fotoğrafı
          </label>

          <input
            ref={productPhotoRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) =>
              handleImage(
                e.target.files?.[0],
                (image) =>
                  setProduct({
                    ...product,
                    image,
                  })
              )
            }
          />

          <button
            style={styles.uploadButton}
            onClick={() =>
              productPhotoRef.current?.click()
            }
          >
            📷 Ürün Fotoğrafı Seç
          </button>

          {product.image && (
            <img
              src={product.image}
              alt="Ürün"
              style={styles.productUploadPreview}
            />
          )}

          <h3 style={styles.subTitle}>
            ⚠️ Alerjenler
          </h3>

          <div style={styles.allergenGrid}>
            {allergens.map((item) => {
              const selected =
                product.allergens.includes(item);

              return (
                <button
                  key={item}
                  onClick={() =>
                    toggleAllergen(item)
                  }
                  style={{
                    ...styles.allergenButton,
                    ...(selected
                      ? styles.allergenSelected
                      : {}),
                  }}
                >
                  {selected ? "✓ " : ""}
                  {item}
                </button>
              );
            })}
          </div>

          <button
            style={styles.primaryButton}
            onClick={addProduct}
          >
            + Ürünü Menüye Ekle
          </button>
        </section>

        <section style={styles.card}>
          <SectionTitle
            icon="📋"
            title="Menü Ürünleri"
            subtitle={`${products.length} ürün menünüzde bulunuyor.`}
          />

          {products.length === 0 ? (
            <div style={styles.empty}>
              Henüz ürün eklenmedi.
            </div>
          ) : (
            <div style={styles.productAdminList}>
              {products.map((item) => (
                <div
                  key={item.id}
                  style={styles.adminProduct}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={styles.adminProductImage}
                    />
                  ) : (
                    <div
                      style={styles.adminImagePlaceholder}
                    >
                      🍽️
                    </div>
                  )}

                  <div style={{ flex: 1 }}>
                    <strong>
                      {item.name}
                    </strong>

                    <div style={styles.adminMeta}>
                      {item.category} · {item.price} TL
                    </div>

                    {item.calories && (
                      <div
                        style={styles.adminCalories}
                      >
                        🔥 {item.calories} kcal
                      </div>
                    )}
                  </div>

                  <button
                    style={styles.deleteButton}
                    onClick={() =>
                      deleteProduct(item.id)
                    }
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={styles.card}>
          <SectionTitle
            icon="📸"
            title="Fotoğraftan Menü Oluştur"
            subtitle="Menünüzün fotoğrafını yükleyin. AI ürünleri otomatik olarak çıkarsın."
          />

          <input
            ref={menuPhotoRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) =>
              handleImage(
                e.target.files?.[0],
                (image) => {
                  setMenuPhoto(image);
                  showMessage(
                    "Menü fotoğrafı yüklendi."
                  );
                }
              )
            }
          />

          {!menuPhoto ? (
            <button
              style={styles.photoDropzone}
              onClick={() =>
                menuPhotoRef.current?.click()
              }
            >
              <div style={styles.cameraIcon}>
                📷
              </div>

              <strong>
                Menü fotoğrafı seç
              </strong>

              <span>
                JPG, PNG veya WEBP
              </span>
            </button>
          ) : (
            <div style={styles.menuPhotoBox}>
              <img
                src={menuPhoto}
                alt="Menü"
                style={styles.menuPhoto}
              />

              <div style={styles.aiOverlay}>
                ✨ AI Menü Okuma
              </div>

              <br />

              <button
                style={{
                  ...styles.primaryButton,
                  opacity: analyzing ? 0.7 : 1,
                }}
                disabled={analyzing}
                onClick={analyzeMenu}
              >
                {analyzing
                  ? "⏳ AI Menüyü Analiz Ediyor..."
                  : "✨ Fotoğrafı Analiz Et"}
              </button>
            </div>
          )}

          <div style={styles.process}>
            <ProcessStep
              number="1"
              text="Fotoğraf yükle"
            />

            <ProcessStep
              number="2"
              text="Yazıları oku"
            />

            <ProcessStep
              number="3"
              text="Ürünleri çıkar"
            />

            <ProcessStep
              number="4"
              text="Fiyatları bul"
            />

            <ProcessStep
              number="5"
              text="Kontrol et"
            />

            <ProcessStep
              number="6"
              text="Menüye ekle"
            />
          </div>
        </section>

        <section
          id="preview"
          style={styles.card}
        >
          <SectionTitle
            icon="👁️"
            title="Müşteri Menü Önizlemesi"
            subtitle="Müşterilerinizin QR kodu okuttuğunda göreceği menü."
          />

          <div style={styles.phoneFrame}>
            <div style={styles.customerMenu}>
              <div style={styles.customerHeader}>
                {restaurant.logo ? (
                  <img
                    src={restaurant.logo}
                    alt="Logo"
                    style={styles.customerLogo}
                  />
                ) : (
                  <div
                    style={
                      styles.customerLogoPlaceholder
                    }
                  >
                    🍽️
                  </div>
                )}

                <h2 style={styles.customerHeaderTitle}>
                  {restaurant.name}
                </h2>

                <p style={styles.customerHeaderText}>
                  {restaurant.description}
                </p>

                {restaurant.address && (
                  <small>
                    📍 {restaurant.address}
                  </small>
                )}
              </div>

              <div style={styles.categoryScroll}>
                <button
                  onClick={() =>
                    setActiveCategory("Tümü")
                  }
                  style={{
                    ...styles.categoryButton,
                    ...(activeCategory === "Tümü"
                      ? styles.categoryActive
                      : {}),
                  }}
                >
                  Tümü
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() =>
                      setActiveCategory(category)
                    }
                    style={{
                      ...styles.categoryButton,
                      ...(activeCategory === category
                        ? styles.categoryActive
                        : {}),
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div>
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    style={styles.customerProduct}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={
                          styles.customerProductImage
                        }
                      />
                    )}

                    <div
                      style={styles.customerProductTop}
                    >
                      <div>
                        <h3
                          style={
                            styles.customerProductTitle
                          }
                        >
                          {item.name}
                        </h3>

                        <div
                          style={
                            styles.customerCategory
                          }
                        >
                          {item.category}
                        </div>
                      </div>

                      <strong style={styles.price}>
                        {item.price} TL
                      </strong>
                    </div>

                    {item.description && (
                      <p
                        style={
                          styles.customerDescription
                        }
                      >
                        {item.description}
                      </p>
                    )}

                    <div style={styles.productInfo}>
                      {item.calories && (
                        <span>
                          🔥 {item.calories} kcal
                        </span>
                      )}

                      {item.allergens.length > 0 && (
                        <span
                          style={
                            styles.allergenText
                          }
                        >
                          ⚠️{" "}
                          {item.allergens.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.customerFooter}>
                <strong>
                  {restaurant.name}
                </strong>

                {restaurant.phone && (
                  <div>
                    📞 {restaurant.phone}
                  </div>
                )}

                <small>
                  Dijital Menü
                </small>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.actionCard}>
          <div>
            <h2>
              🚀 Menünüz Hazır
            </h2>

            <p>
              Menünüzü kaydedin ve QR menü
              oluşturma aşamasına geçin.
            </p>
          </div>

          <div style={styles.actionButtons}>
            <button
              style={styles.secondaryAction}
              onClick={saveMenu}
            >
              💾 Menüyü Kaydet
            </button>

            <button
              style={styles.primaryAction}
              onClick={createQR}
            >
              📱 QR Kod Oluştur
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
  subtitle,
}) {
  return (
    <div style={styles.sectionTitle}>
      <div style={styles.sectionIcon}>
        {icon}
      </div>

      <div>
        <h2 style={styles.sectionHeading}>
          {title}
        </h2>

        <p style={styles.sectionSubtitle}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function ProcessStep({
  number,
  text,
}) {
  return (
    <div style={styles.processStep}>
      <div style={styles.processNumber}>
        {number}
      </div>

      <span>
        {text}
      </span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f5f8",
    fontFamily: "Inter, Arial, sans-serif",
    color: "#172033",
  },

  header: {
    background: "#101827",
    color: "white",
    padding: "18px 5%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 20,
  },

  logoText: {
    fontSize: 22,
    fontWeight: 800,
  },

  logoSub: {
    color: "#98a2b3",
    fontSize: 13,
    marginTop: 3,
  },

  headerButton: {
    border: "none",
    background: "#1f2937",
    color: "white",
    padding: "12px 18px",
    borderRadius: 12,
    fontWeight: 700,
    cursor: "pointer",
  },

  container: {
    maxWidth: 1100,
    margin: "auto",
    padding: "30px 18px 60px",
  },

  hero: {
    background:
      "linear-gradient(135deg,#111827,#1d4ed8)",
    color: "white",
    borderRadius: 24,
    padding: 32,
    marginBottom: 22,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heroBadge: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1,
    opacity: 0.8,
    marginBottom: 12,
  },

  heroTitle: {
    fontSize: 38,
    margin: "0 0 10px",
  },

  heroText: {
    fontSize: 17,
    opacity: 0.8,
    margin: 0,
  },

  heroIcon: {
    width: 90,
    height: 90,
    borderRadius: 24,
    background: "rgba(255,255,255,.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    fontWeight: 900,
  },

  card: {
    background: "white",
    borderRadius: 22,
    padding: 26,
    marginBottom: 20,
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 5px 20px rgba(16,24,40,.04)",
  },

  sectionTitle: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    marginBottom: 24,
  },

  sectionIcon: {
    fontSize: 30,
  },

  sectionHeading: {
    margin: 0,
    fontSize: 24,
  },

  sectionSubtitle: {
    margin: "7px 0 0",
    color: "#667085",
    lineHeight: 1.5,
  },

  label: {
    display: "block",
    fontWeight: 700,
    marginBottom: 7,
    fontSize: 14,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    marginBottom: 15,
    borderRadius: 11,
    border: "1px solid #d0d5dd",
    fontSize: 15,
    background: "white",
  },

  textarea: {
    width: "100%",
    minHeight: 100,
    boxSizing: "border-box",
    padding: "14px",
    marginBottom: 15,
    borderRadius: 11,
    border: "1px solid #d0d5dd",
    fontSize: 15,
    resize: "vertical",
  },

  twoColumns: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: 15,
  },

  uploadButton: {
    padding: "13px 18px",
    borderRadius: 11,
    border: "1px solid #d0d5dd",
    background: "white",
    fontWeight: 700,
    cursor: "pointer",
  },

  logoPreviewBox: {
    marginTop: 15,
  },

  logoPreview: {
    width: 100,
    height: 100,
    objectFit: "contain",
    borderRadius: 15,
    border: "1px solid #eee",
  },

  subTitle: {
    marginTop: 25,
    marginBottom: 12,
  },

  allergenGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },

  allergenButton: {
    padding: "9px 13px",
    borderRadius: 30,
    border: "1px solid #d0d5dd",
    background: "white",
    cursor: "pointer",
  },

  allergenSelected: {
    background: "#fee2e2",
    borderColor: "#fca5a5",
    color: "#b91c1c",
  },

  primaryButton: {
    marginTop: 20,
    padding: "14px 20px",
    border: "none",
    borderRadius: 11,
    background: "#2563eb",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
  },

  empty: {
    padding: 30,
    textAlign: "center",
    color: "#667085",
    background: "#f8fafc",
    borderRadius: 15,
  },

  productAdminList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  adminProduct: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: 12,
    border: "1px solid #eaecf0",
    borderRadius: 15,
  },

  adminProductImage: {
    width: 65,
    height: 65,
    objectFit: "cover",
    borderRadius: 12,
  },

  adminImagePlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 12,
    background: "#f2f4f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 26,
  },

  adminMeta: {
    color: "#667085",
    fontSize: 13,
    marginTop: 4,
  },

  adminCalories: {
    color: "#b45309",
    fontSize: 12,
    marginTop: 3,
  },

  deleteButton: {
    border: "none",
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "9px 13px",
    borderRadius: 9,
    fontWeight: 700,
    cursor: "pointer",
  },

  photoDropzone: {
    width: "100%",
    minHeight: 230,
    borderRadius: 18,
    border: "2px dashed #cbd5e1",
    background: "#f8fafc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    cursor: "pointer",
    fontSize: 17,
  },

  cameraIcon: {
    fontSize: 50,
  },

  menuPhotoBox: {
    textAlign: "center",
  },

  menuPhoto: {
    width: "100%",
    maxHeight: 500,
    objectFit: "contain",
    borderRadius: 15,
    border: "1px solid #e5e7eb",
  },

  aiOverlay: {
    display: "inline-block",
    marginTop: 12,
    padding: "9px 14px",
    borderRadius: 20,
    background: "#eef2ff",
    color: "#4338ca",
    fontWeight: 800,
  },

  process: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(130px,1fr))",
    gap: 10,
    marginTop: 25,
  },

  processStep: {
    background: "#f8fafc",
    borderRadius: 13,
    padding: 12,
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    fontWeight: 700,
  },

  processNumber: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  phoneFrame: {
    maxWidth: 480,
    margin: "auto",
    padding: 10,
    borderRadius: 30,
    background: "#111827",
  },

  customerMenu: {
    background: "#fff",
    borderRadius: 22,
    overflow: "hidden",
  },

  customerHeader: {
    textAlign: "center",
    padding: "28px 20px 22px",
    background:
      "linear-gradient(180deg,#f8fafc,#ffffff)",
  },

  customerHeaderTitle: {
    margin: 0,
  },

  customerHeaderText: {
    color: "#667085",
    margin: "7px 0",
  },

  customerLogo: {
    width: 80,
    height: 80,
    objectFit: "contain",
    borderRadius: 20,
    marginBottom: 10,
  },

  customerLogoPlaceholder: {
    width: 70,
    height: 70,
    margin: "auto auto 10px",
    borderRadius: 20,
    background: "#eef2ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 32,
  },

  categoryScroll: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    padding: "12px 15px",
    borderTop: "1px solid #eee",
    borderBottom: "1px solid #eee",
  },

  categoryButton: {
    whiteSpace: "nowrap",
    border: "1px solid #e5e7eb",
    background: "white",
    borderRadius: 20,
    padding: "8px 13px",
    fontWeight: 700,
    cursor: "pointer",
  },

  categoryActive: {
    background: "#111827",
    color: "white",
  },

  customerProduct: {
    padding: 18,
    borderBottom: "1px solid #eee",
  },

  customerProductImage: {
    width: "100%",
    height: 190,
    objectFit: "cover",
    borderRadius: 15,
    marginBottom: 13,
  },

  customerProductTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
  },

  customerProductTitle: {
    margin: 0,
  },

  customerCategory: {
    color: "#667085",
    fontSize: 12,
    marginTop: 4,
  },

  price: {
    color: "#2563eb",
    whiteSpace: "nowrap",
  },

  customerDescription: {
    color: "#667085",
    fontSize: 14,
    lineHeight: 1.5,
  },

  productInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    fontSize: 12,
    color: "#667085",
  },

  allergenText: {
    color: "#b91c1c",
  },

  customerFooter: {
    textAlign: "center",
    padding: 25,
    background: "#f8fafc",
    color: "#667085",
    lineHeight: 1.8,
  },

  actionCard: {
    background: "#111827",
    color: "white",
    borderRadius: 22,
    padding: 28,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },

  actionButtons: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },

  secondaryAction: {
    padding: "14px 18px",
    borderRadius: 11,
    border: "1px solid #475467",
    background: "#1f2937",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
  },

  primaryAction: {
    padding: "14px 18px",
    borderRadius: 11,
    border: "none",
    background: "#2563eb",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
  },

  productUploadPreview: {
    display: "block",
    width: 150,
    height: 120,
    objectFit: "cover",
    borderRadius: 14,
    marginTop: 12,
  },

  toast: {
    position: "fixed",
    right: 20,
    bottom: 20,
    zIndex: 100,
    background: "#111827",
    color: "white",
    padding: "14px 18px",
    borderRadius: 12,
    boxShadow:
      "0 10px 30px rgba(0,0,0,.2)",
    fontWeight: 700,
  },
};

export default App;
