import React from "react";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        color: "#111827",
      }}
    >
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "18px 7%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>MenuCraft QR</h2>

        <button
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "10px",
            background: "#111827",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Giriş Yap
        </button>
      </header>

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "60px" }}>📱</div>

        <h1
          style={{
            fontSize: "48px",
            lineHeight: "1.15",
            margin: "20px 0",
          }}
        >
          Restoranınız için
          <br />
          <span style={{ color: "#2563eb" }}>
            Dijital QR Menü
          </span>
        </h1>

        <p
          style={{
            maxWidth: "650px",
            margin: "0 auto 30px",
            fontSize: "19px",
            lineHeight: "1.6",
            color: "#6b7280",
          }}
        >
          Menülerinizi kolayca dijitalleştirin.
          Müşterileriniz QR kodu okutarak menünüze
          hızlıca ulaşsın.
        </p>

        <button
          style={{
            padding: "16px 28px",
            border: "none",
            borderRadius: "12px",
            background: "#2563eb",
            color: "white",
            fontSize: "17px",
            fontWeight: "bold",
          }}
        >
          Ücretsiz Menü Oluştur 🚀
        </button>

        <section
          style={{
            marginTop: "70px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: "35px" }}>📲</div>
            <h3>QR Kod Menü</h3>
            <p>
              Müşterileriniz menünüze saniyeler içinde
              ulaşsın.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: "35px" }}>⚡</div>
            <h3>Kolay Yönetim</h3>
            <p>
              Ürünlerinizi ve fiyatlarınızı kolayca
              güncelleyin.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: "35px" }}>📱</div>
            <h3>Mobil Uyumlu</h3>
            <p>
              Şık ve mobil uyumlu dijital menünüzü
              müşterilerinize sunun.
            </p>
          </div>
        </section>
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "30px",
          color: "#6b7280",
        }}
      >
        © 2026 MenuCraft QR
      </footer>
    </div>
  );
}

export default App;
