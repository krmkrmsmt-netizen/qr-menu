import React, { useState } from "react";

function App() {
  const [restaurant, setRestaurant] = useState({
    name: "Restoranınız",
    description: "Lezzetli yemekler ve özel tatlar",
  });

  const [products, setProducts] = useState([
    {
      name: "Örnek Burger",
      category: "Burgerler",
      price: "250",
      calories: "650",
      allergens: ["Gluten", "Süt"],
    },
  ]);

  const [product, setProduct] = useState({
    name: "",
    category: "Ana Yemekler",
    price: "",
    calories: "",
    allergens: [],
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

  function addProduct() {
    if (!product.name || !product.price) return;

    setProducts([...products, product]);

    setProduct({
      name: "",
      category: "Ana Yemekler",
      price: "",
      calories: "",
      allergens: [],
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
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        fontFamily: "Arial, sans-serif",
        color: "#172033",
      }}
    >
      <header
        style={{
          background: "#111827",
          color: "white",
          padding: "18px 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong style={{ fontSize: 22 }}>MenuCraft QR</strong>
        <span>Yönetim Paneli</span>
      </header>

      <main
        style={{
          maxWidth: 1100,
          margin: "auto",
          padding: "30px 18px",
        }}
      >
        <h1>Menünüzü Oluşturun</h1>
        <p style={{ color: "#667085" }}>
          Restoran bilgilerinizi ve ürünlerinizi ekleyin.
        </p>

        <section style={card}>
          <h2>🏪 Restoran Bilgileri</h2>

          <input
            style={input}
            value={restaurant.name}
            onChange={(e) =>
              setRestaurant({ ...restaurant, name: e.target.value })
            }
            placeholder="Restoran adı"
          />

          <textarea
            style={input}
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

        <section style={card}>
          <h2>🍔 Ürün Ekle</h2>

          <input
            style={input}
            placeholder="Ürün adı"
            value={product.name}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
          />

          <select
            style={input}
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          >
            <option>Ana Yemekler</option>
            <option>Başlangıçlar</option>
            <option>Burgerler</option>
            <option>Pizza</option>
            <option>Tatlılar</option>
            <option>İçecekler</option>
          </select>

          <input
            style={input}
            type="number"
            placeholder="Fiyat (TL)"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />

          <input
            style={input}
            type="number"
            placeholder="Kalori (kcal)"
            value={product.calories}
            onChange={(e) =>
              setProduct({ ...product, calories: e.target.value })
            }
          />

          <h3>⚠️ Alerjenler</h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {allergens.map((item) => (
              <button
                key={item}
                onClick={() => toggleAllergen(item)}
                style={{
                  padding: "9px 12px",
                  borderRadius: 20,
                  border: "1px solid #d0d5dd",
                  background: product.allergens.includes(item)
                    ? "#fee2e2"
                    : "white",
                  color: product.allergens.includes(item)
                    ? "#b91c1c"
                    : "#344054",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <button onClick={addProduct} style={primaryButton}>
            + Ürünü Menüye Ekle
          </button>
        </section>

        <section style={card}>
          <h2>👁️ Menü Önizleme</h2>

          <div
            style={{
              background: "white",
              borderRadius: 18,
              padding: 25,
              border: "1px solid #e5e7eb",
            }}
          >
            <h2>{restaurant.name}</h2>
            <p style={{ color: "#667085" }}>
              {restaurant.description}
            </p>

            {products.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "18px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <strong>{item.name}</strong>
                  <strong>{item.price} TL</strong>
                </div>

                <small style={{ color: "#667085" }}>
                  {item.category}
                  {item.calories &&
                    ` • ${item.calories} kcal`}
                </small>

                {item.allergens.length > 0 && (
                  <div
                    style={{
                      marginTop: 7,
                      fontSize: 13,
                      color: "#b91c1c",
                    }}
                  >
                    ⚠️ {item.allergens.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={card}>
          <h2>📸 Menü Fotoğrafından Otomatik Oluştur</h2>
          <p style={{ color: "#667085" }}>
            Restoran menüsünün fotoğrafını yükleyin.
            İlerleyen aşamada sistem fotoğraftaki ürünleri
            otomatik olarak menüye aktaracak.
          </p>

          <button style={secondaryButton}>
            📷 Menü Fotoğrafı Yükle
          </button>
        </section>

        <section style={card}>
          <h2>📱 QR Menü</h2>
          <p style={{ color: "#667085" }}>
            Menünüz hazır olduğunda restoranınıza özel QR
            kod oluşturulacak.
          </p>

          <button style={primaryButton}>
            QR Kod Oluştur
          </button>
        </section>
      </main>
    </div>
  );
}

const card = {
  background: "white",
  padding: 24,
  borderRadius: 18,
  marginBottom: 20,
  border: "1px solid #e5e7eb",
};

const input = {
  width: "100%",
  boxSizing: "border-box",
  padding: 13,
  marginBottom: 12,
  borderRadius: 10,
  border: "1px solid #d0d5dd",
  fontSize: 15,
};

const primaryButton = {
  marginTop: 20,
  padding: "13px 20px",
  border: "none",
  borderRadius: 10,
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
  fontSize: 15,
};

const secondaryButton = {
  padding: "13px 20px",
  border: "1px solid #d0d5dd",
  borderRadius: 10,
  background: "white",
  fontWeight: "bold",
  fontSize: 15,
};

export default App;
