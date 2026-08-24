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
          padding: "20px 7%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ margin: 0 }}>QR Menü</h2>

        <button
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            border: "none",
            background: "#111827",
            color: "#ffffff",
            fontWeight: "bold",
            cursor: "pointer",
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
            margin: "20px 0",
            lineHeight: "1.15",
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
            fontSize: "19px",
            color: "#6b7280",
            maxWidth: "650px",
            margin: "0 auto 30px",
            lineHeight: "1.6",
          }}
        >
          Menülerinizi kolayca dijitalleştirin.
          Müşterileriniz QR kodu okutarak menünüze
          hızlıca ulaşsın.
        </p>

        <button
          style={{
            padding: "16px 28px",
            borderRadius: "12px",
            border: "none",
            background: "#2563eb",
            color: "#ffffff",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: "pointer",
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
              background: "#ffffff",
              padding: "30px",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: "35px" }}>📲</div>

            <h3>QR Kod Menü</h3>

            <p>
              Müşterileriniz menünüze saniyeler
              içinde ulaşsın.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
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
              background: "#ffffff",
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

        <section
          style={{
            marginTop: "60px",
            padding: "40px 20px",
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2>Restoranınızı dijitalleştirin</h2>

          <p
            style={{
              color: "#6b7280",
              fontSize: "17px",
              lineHeight: "1.6",
            }}
          >
            QR Menü ile müşterilerinize hızlı,
            modern ve kolay bir menü deneyimi sunun.
          </p>

          <button
            style={{
              marginTop: "15px",
              padding: "14px 24px",
              borderRadius: "10px",
              border: "none",
              background: "#111827",
              color: "#ffffff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Hemen Başla
          </button>
        </section>
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "30px",
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        © 2026 QR Menü - Dijital Menü Sistemi
      </footer>
    </div>
  );
}

export default App;
