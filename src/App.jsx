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
  const [menuTemplate, setMenuTemplate] = useState("classic");
  const [activeCategory, setActiveCategory] = useState("Tümü");

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
    "Çorbalar",
    "Burgerler",
    "Pizza",
    "Makarna",
    "Salatalar",
    "Tatlılar",
    "İçecekler",
  ];

  const templates = {
    classic: {
      name: "Klasik",
      background: "#f5f7fa",
      menu: "#ffffff",
      text: "#172033",
      secondary: "#667085",
      accent: "#2563eb",
      border: "#e5e7eb",
    },
    dark: {
      name: "Premium Dark",
      background: "#090d16",
      menu: "#111827",
      text: "#ffffff",
      secondary: "#cbd5e1",
      accent: "#f59e0b",
      border: "#374151",
    },
    elegant: {
      name: "Elegant",
      background: "#f7f2eb",
      menu: "#fffdf9",
      text: "#3f3025",
      secondary: "#786b61",
      accent: "#8b5e3c",
      border: "#e6d8c9",
    },
  };

  const theme = templates[menuTemplate];

  function addProduct() {
    if (!product.name.trim() || !product.price.trim()) {
      alert("Lütfen ürün adı ve fiyat girin.");
      return;
    }

    const newProduct = {
      ...product,
      id: Date.now(),
    };

    setProducts([...products, newProduct]);

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

  function deleteProduct(id) {
    setProducts(products.filter((item) => item.id !== id));
  }

  function toggleAllergen(name) {
    setProduct((current) => ({
      ...current,
      allergens: current.allergens.includes(name)
        ? current.allergens.filter((item) => item !== name)
        : [...current.allergens, name],
    }));
  }

  function handleProductImage(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProduct((current) => ({
      ...current,
      image: imageUrl,
    }));
  }

  function handleMenuPhoto(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setMenuPhoto(imageUrl);
  }

  function generateQR() {
    alert(
      "QR menü oluşturma sistemi hazırlandı. Bir sonraki aşamada restoranınıza özel gerçek QR bağlantısını oluşturacağız."
    );
  }

  const visibleProducts =
    activeCategory === "Tümü"
      ? products
      : products.filter((item) => item.category === activeCategory);

  const uniqueCategories = [
    "Tümü",
    ...new Set(products.map((item) => item.category)),
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        fontFamily:
          "Inter, Arial, Helvetica, sans-serif",
        color: "#172033",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background: "#111827",
          color: "#fff",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 15,
          position: "sticky",
          top: 0,
          zIndex: 20,
          boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            MenuCraft QR
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#9ca3af",
              marginTop: 3,
            }}
          >
            Dijital Menü Sistemi
          </div>
        </div>

        <div
          style={{
            background: "#1f2937",
            padding: "10px 15px",
            borderRadius: 10,
            fontSize: 14,
          }}
        >
          Yönetim Paneli
        </div>
      </header>

      <main
        style={{
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
          padding: "30px 16px 60px",
          boxSizing: "border-box",
        }}
      >
        {/* TITLE */}
        <div
          style={{
            marginBottom: 25,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              margin: 0,
              marginBottom: 8,
            }}
          >
            Menünüzü Oluşturun
          </h1>

          <p
            style={{
              color: "#667085",
              fontSize: 17,
              margin: 0,
            }}
          >
            Restoranınızın dijital menüsünü dakikalar içinde
            hazırlayın.
          </p>
        </div>

        {/* RESTAURANT */}
        <section style={cardStyle}>
          <SectionTitle
            icon="🏪"
            title="Restoran Bilgileri"
          />

          <label style={labelStyle}>
            Restoran Adı
          </label>

          <input
            style={inputStyle}
            value={restaurant.name}
            onChange={(e) =>
              setRestaurant({
                ...restaurant,
                name: e.target.value,
              })
            }
            placeholder="Restoran adı"
          />

          <label style={labelStyle}>
            Açıklama
          </label>

          <textarea
            style={{
              ...inputStyle,
              minHeight: 100,
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

          <div style={responsiveGrid}>
            <div>
              <label style={labelStyle}>
                Telefon
              </label>

              <input
                style={inputStyle}
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
              <label style={labelStyle}>
                Adres
              </label>

              <input
                style={inputStyle}
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
        </section>

        {/* MENU PHOTO */}
        <section style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 15,
              marginBottom: 10,
            }}
          >
            <SectionTitle
              icon="📸"
              title="Fotoğraftan Menü Oluştur"
            />

            <div
              style={{
                background: "#eef2ff",
                color: "#4f46e5",
                padding: "12px 16px",
                borderRadius: 14,
                fontWeight: 800,
              }}
            >
              ✨ AI
            </div>
          </div>

          <p
            style={{
              color: "#667085",
              lineHeight: 1.6,
            }}
          >
            Menü fotoğrafınızı yükleyin. Sistem ilerleyen
            aşamada fotoğraftaki ürünleri, kategorileri ve
            fiyatları otomatik olarak okuyacaktır.
          </p>

          <label
            style={{
              display: "block",
              border: "2px dashed #cbd5e1",
              borderRadius: 18,
              padding: 30,
              textAlign: "center",
              background: "#f8fafc",
              cursor: "pointer",
              marginTop: 20,
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleMenuPhoto}
              style={{ display: "none" }}
            />

            {menuPhoto ? (
              <div>
                <img
                  src={menuPhoto}
                  alt="Yüklenen menü"
                  style={{
                    width: "100%",
                    maxHeight: 400,
                    objectFit: "contain",
                    borderRadius: 12,
                  }}
                />

                <div
                  style={{
                    marginTop: 12,
                    fontWeight: 700,
                    color: "#2563eb",
                  }}
                >
                  ✓ Menü fotoğrafı yüklendi
                </div>
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontSize: 50,
                    marginBottom: 10,
                  }}
                >
                  📷
                </div>

                <strong
                  style={{
                    fontSize: 18,
                  }}
                >
                  Menü fotoğrafı seç
                </strong>

                <div
                  style={{
                    marginTop: 8,
                    color: "#667085",
                  }}
                >
                  JPG, PNG veya WEBP
                </div>
              </>
            )}
          </label>
        </section>

        {/* PRODUCT */}
        <section style={cardStyle}>
          <SectionTitle
            icon="🍔"
            title="Ürün Ekle"
          />

          <label style={labelStyle}>
            Ürün Adı
          </label>

          <input
            style={inputStyle}
            placeholder="Örneğin: Karışık Pizza"
            value={product.name}
            onChange={(e) =>
              setProduct({
                ...product,
                name: e.target.value,
              })
            }
          />

          <label style={labelStyle}>
            Açıklama
          </label>

          <textarea
            style={{
              ...inputStyle,
              minHeight: 80,
              resize: "vertical",
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

          <div style={responsiveGrid}>
            <div>
              <label style={labelStyle}>
                Kategori
              </label>

              <select
                style={inputStyle}
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
              <label style={labelStyle}>
                Fiyat (TL)
              </label>

              <input
                style={inputStyle}
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

            <div>
              <label style={labelStyle}>
                Kalori (kcal)
              </label>

              <input
                style={inputStyle}
                type="number"
                value={product.calories}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    calories: e.target.value,
                  })
                }
                placeholder="650"
              />
            </div>
          </div>

          {/* PRODUCT PHOTO */}
          <label style={labelStyle}>
            Ürün Fotoğrafı
          </label>

          <label
            style={{
              display: "block",
              padding: 18,
              border: "1px dashed #cbd5e1",
              borderRadius: 12,
              background: "#f8fafc",
              cursor: "pointer",
              marginBottom: 20,
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleProductImage}
              style={{ display: "none" }}
            />

            {product.image ? (
              <img
                src={product.image}
                alt="Ürün"
                style={{
                  width: "100%",
                  maxHeight: 220,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "#667085",
                }}
              >
                📷 Ürün fotoğrafı seç
              </div>
            )}
          </label>

          {/* ALLERGENS */}
          <h3
            style={{
              marginBottom: 12,
            }}
          >
            ⚠️ Alerjenler
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {allergens.map((item) => {
              const selected =
                product.allergens.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    toggleAllergen(item)
                  }
                  style={{
                    padding: "10px 13px",
                    borderRadius: 22,
                    border: selected
                      ? "1px solid #ef4444"
                      : "1px solid #d0d5dd",
                    background: selected
                      ? "#fee2e2"
                      : "#fff",
                    color: selected
                      ? "#b91c1c"
                      : "#344054",
                    cursor: "pointer",
                    fontWeight: selected
                      ? 700
                      : 400,
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
            style={primaryButtonStyle}
          >
            + Ürünü Menüye Ekle
          </button>
        </section>

        {/* PRODUCTS LIST */}
        <section style={cardStyle}>
          <SectionTitle
            icon="📋"
            title="Eklenen Ürünler"
          />

          {products.length === 0 ? (
            <div
              style={{
                padding: 30,
                textAlign: "center",
                color: "#667085",
              }}
            >
              Henüz ürün eklenmedi.
            </div>
          ) : (
            <div>
              {products.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 15,
                    padding: "15px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      minWidth: 0,
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 10,
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 10,
                          background: "#f1f5f9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 25,
                        }}
                      >
                        🍽️
                      </div>
                    )}

                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <strong>{item.name}</strong>

                      <div
                        style={{
                          fontSize: 13,
                          color: "#667085",
                          marginTop: 4,
                        }}
                      >
                        {item.category}
                        {item.calories
                          ? ` • ${item.calories} kcal`
                          : ""}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <strong
                      style={{
                        color: "#2563eb",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.price} TL
                    </strong>

                    <button
                      onClick={() =>
                        deleteProduct(item.id)
                      }
                      style={{
                        border: "none",
                        background: "#fee2e2",
                        color: "#b91c1c",
                        padding: "8px 10px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* TEMPLATE */}
        <section style={cardStyle}>
          <SectionTitle
            icon="🎨"
            title="Menü Tasarımı"
          />

          <p
            style={{
              color: "#667085",
            }}
          >
            Restoranınızın menüsünde kullanılacak tasarımı
            seçin.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 12,
              marginTop: 18,
            }}
          >
            {Object.entries(templates).map(
              ([key, item]) => (
                <button
                  key={key}
                  onClick={() =>
                    setMenuTemplate(key)
                  }
                  style={{
                    padding: 18,
                    borderRadius: 14,
                    border:
                      menuTemplate === key
                        ? `3px solid ${item.accent}`
                        : "1px solid #d0d5dd",
                    background:
                      item.background,
                    color: item.text,
                    cursor: "pointer",
                    fontWeight: 700,
                    minHeight: 80,
                  }}
                >
                  {item.name}
                </button>
              )
            )}
          </div>
        </section>

        {/* MENU PREVIEW */}
        <section style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 15,
              marginBottom: 18,
            }}
          >
            <SectionTitle
              icon="👁️"
              title="Müşteri Menü Önizleme"
            />

            <span
              style={{
                background: theme.accent,
                color: "#fff",
                padding: "7px 11px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {theme.name}
            </span>
          </div>

          {/* MOBILE MENU */}
          <div
            style={{
              maxWidth: 500,
              margin: "0 auto",
              background: theme.background,
              borderRadius: 22,
              overflow: "hidden",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.12)",
            }}
          >
            <div
              style={{
                padding: "28px 20px",
                textAlign: "center",
                background: theme.menu,
                borderBottom:
                  `1px solid ${theme.border}`,
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  margin: "0 auto 12px",
                  borderRadius: "50%",
                  background: theme.accent,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  fontWeight: 800,
                }}
              >
                {restaurant.name
                  ? restaurant.name
                      .charAt(0)
                      .toUpperCase()
                  : "R"}
              </div>

              <h2
                style={{
                  margin: 0,
                  color: theme.text,
                }}
              >
                {restaurant.name}
              </h2>

              <p
                style={{
                  color: theme.secondary,
                  marginBottom: 0,
                  lineHeight: 1.5,
                }}
              >
                {restaurant.description}
              </p>
            </div>

            {/* CATEGORIES */}
            <div
              style={{
                padding: "12px",
                display: "flex",
                gap: 8,
                overflowX: "auto",
                background: theme.menu,
              }}
            >
              {uniqueCategories.map(
                (category) => (
                  <button
                    key={category}
                    onClick={() =>
                      setActiveCategory(category)
                    }
                    style={{
                      flexShrink: 0,
                      padding:
                        "9px 13px",
                      borderRadius: 20,
                      border: "none",
                      background:
                        activeCategory ===
                        category
                          ? theme.accent
                          : theme.background,
                      color:
                        activeCategory ===
                        category
                          ? "#fff"
                          : theme.text,
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    {category}
                  </button>
                )
              )}
            </div>

            {/* PRODUCTS */}
            <div
              style={{
                padding: "10px 16px 25px",
              }}
            >
              {visibleProducts.map(
                (item) => (
                  <div
                    key={item.id}
                    style={{
                      background: theme.menu,
                      borderRadius: 16,
                      marginBottom: 12,
                      overflow: "hidden",
                      border:
                        `1px solid ${theme.border}`,
                    }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: 190,
                          objectFit: "cover",
                        }}
                      />
                    )}

                    <div
                      style={{
                        padding: 16,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          gap: 15,
                        }}
                      >
                        <strong
                          style={{
                            color: theme.text,
                            fontSize: 17,
                          }}
                        >
                          {item.name}
                        </strong>

                        <strong
                          style={{
                            color: theme.accent,
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          {item.price} TL
                        </strong>
                      </div>

                      {item.description && (
                        <p
                          style={{
                            color:
                              theme.secondary,
                            fontSize: 14,
                            lineHeight: 1.5,
                            margin:
                              "8px 0",
                          }}
                        >
                          {item.description}
                        </p>
                      )}

                      <div
                        style={{
                          color:
                            theme.secondary,
                          fontSize: 12,
                        }}
                      >
                        {item.category}

                        {item.calories &&
                          ` • ${item.calories} kcal`}
                      </div>

                      {item.allergens.length >
                        0 && (
                        <div
                          style={{
                            marginTop: 9,
                            color: "#dc2626",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          ⚠️{" "}
                          {item.allergens.join(
                            " • "
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            <div
              style={{
                textAlign: "center",
                padding: 18,
                color: theme.secondary,
                fontSize: 11,
              }}
            >
              Dijital Menü • MenuCraft QR
            </div>
          </div>
        </section>

        {/* QR */}
        <section style={cardStyle}>
          <SectionTitle
            icon="📱"
            title="QR Menü"
          />

          <p
            style={{
              color: "#667085",
              lineHeight: 1.6,
            }}
          >
            Menünüz hazır olduğunda restoranınıza özel
            QR kod oluşturulacak. Müşteriler QR kodu
            okutarak menünüze ulaşabilecek.
          </p>

          <div
            style={{
              background: "#f8fafc",
              borderRadius: 16,
              padding: 25,
              textAlign: "center",
              marginTop: 15,
            }}
          >
            <div
              style={{
                width: 150,
                height: 150,
                margin: "0 auto 15px",
                background:
                  "repeating-linear-gradient(45deg,#111 0,#111 5px,#fff 5px,#fff 10px)",
                border: "10px solid white",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.15)",
              }}
            />

            <div
              style={{
                fontWeight: 700,
                marginBottom: 5,
              }}
            >
              {restaurant.name}
            </div>

            <div
              style={{
                color: "#667085",
                fontSize: 13,
              }}
            >
              QR Menü önizlemesi
            </div>
          </div>

          <button
            onClick={generateQR}
            style={{
              ...primaryButtonStyle,
              width: "100%",
              marginTop: 20,
            }}
          >
            📲 QR Kod Oluştur
          </button>
        </section>

        {/* FUTURE FEATURES */}
        <section
          style={{
            ...cardStyle,
            background:
              "linear-gradient(135deg,#111827,#1e293b)",
            color: "#fff",
          }}
        >
          <h2
            style={{
              marginTop: 0,
            }}
          >
            🚀 Sistem Özellikleri
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
            {[
              "📸 Menü fotoğrafından otomatik oluşturma",
              "🤖 AI ürün ve fiyat okuma",
              "🔥 Kalori bilgisi",
              "⚠️ Alerjen bilgileri",
              "🎨 Otomatik menü tasarımı",
              "📱 Mobil uyumlu QR menü",
              "🔗 Restorana özel bağlantı",
              "💳 Abonelik sistemi",
            ].map((feature) => (
              <div
                key={feature}
                style={{
                  background:
                    "rgba(255,255,255,0.08)",
                  padding: 15,
                  borderRadius: 12,
                  fontSize: 14,
                }}
              >
                {feature}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <h2
      style={{
        marginTop: 0,
        marginBottom: 18,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 24,
      }}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </h2>
  );
}

const cardStyle = {
  background: "#fff",
  padding: 24,
  borderRadius: 20,
  marginBottom: 20,
  border: "1px solid #e5e7eb",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontWeight: 700,
  fontSize: 14,
  marginBottom: 7,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px 15px",
  marginBottom: 15,
  borderRadius: 11,
  border: "1px solid #d0d5dd",
  fontSize: 15,
  background: "#fff",
  color: "#172033",
  outline: "none",
};

const responsiveGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 12,
};

const primaryButtonStyle = {
  marginTop: 22,
  padding: "14px 20px",
  border: "none",
  borderRadius: 11,
  background: "#2563eb",
  color: "#fff",
  fontWeight: 800,
  fontSize: 15,
  cursor: "pointer",
};

export default App;
