export default async (request) => {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Sadece POST kullanılabilir.",
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const body = await request.json();

    if (!body.image) {
      return new Response(
        JSON.stringify({
          error: "Menü fotoğrafı gönderilmedi.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "GEMINI_API_KEY bulunamadı.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const imageData = body.image;

    const match = imageData.match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/
    );

    if (!match) {
      return new Response(
        JSON.stringify({
          error:
            "Geçersiz görsel formatı. Lütfen JPG, PNG veya WEBP yükleyin.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const mimeType = match[1];
    const base64Data = match[2];

    const prompt = `
Bu bir restoran menüsü fotoğrafıdır.

Fotoğraftaki TÜM ürünleri dikkatlice oku ve çıkar.

Her ürün için şu bilgileri üret:

- name
- description
- category
- price
- calories
- allergens

ÖNEMLİ KURALLAR:

1. Fotoğrafta yazan ürün adını doğru şekilde oku.
2. Fotoğrafta yazan fiyatı doğru şekilde oku.
3. Fotoğrafta açıklama varsa onu kullan.
4. Açıklama yoksa kısa ve makul bir açıklama oluşturabilirsin.
5. Fotoğrafta kalori yazıyorsa onu kullan.
6. Fotoğrafta kalori YAZMIYORSA calories alanını BOŞ BIRAKMA.
   Ürünün adı, içeriği ve porsiyonuna göre makul bir TAHMİN yap.
7. Tahmini kalori değerini sadece sayı olarak ver.
   Örnek: "650 kcal" veya "650" yerine "650" kullan.
8. Alerjen bilgisi fotoğrafta yoksa ürünün bilinen içeriğine göre makul
   alerjenleri tahmin edebilirsin.
9. Emin olunmayan fiyatları uydurma. Fotoğraftaki fiyatı kullan.
10. Fotoğraftaki bütün ürünleri çıkarmaya çalış.
11. Aynı ürünü iki kez ekleme.
12. Sadece geçerli JSON döndür.
13. Markdown, açıklama veya kod bloğu kullanma.

Kategori için mümkün olduğunca şu kategorilerden birini kullan:

- Ana Yemekler
- Başlangıçlar
- Burgerler
- Pizza
- Salatalar
- Tatlılar
- İçecekler

Kalori tahmini yapılmışsa bunu ayrıca JSON içinde belirt:

"caloriesEstimated": true

Fotoğrafta kalori açıkça yazıyorsa:

"caloriesEstimated": false

Her ürünün formatı:

{
  "name": "",
  "description": "",
  "category": "",
  "price": "",
  "calories": "",
  "caloriesEstimated": false,
  "allergens": []
}

Çıktı formatı:

{
  "restaurant": {
    "name": "",
    "description": ""
  },
  "products": [
    {
      "name": "",
      "description": "",
      "category": "",
      "price": "",
      "calories": "",
      "caloriesEstimated": true,
      "allergens": []
    }
  ]
}
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error:
            data?.error?.message ||
            "Gemini AI servisi hata verdi.",
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!text) {
      return new Response(
        JSON.stringify({
          error: "Gemini menüden sonuç çıkaramadı.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      const cleaned = text
        .replace(/^```json/i, "")
        .replace(/^```/i, "")
        .replace(/```$/i, "")
        .trim();

      result = JSON.parse(cleaned);
    }

    if (!result.products || !Array.isArray(result.products)) {
      return new Response(
        JSON.stringify({
          error: "AI geçerli ürün listesi döndürmedi.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    result.products = result.products.map((item) => ({
      name: item?.name || "",
      description: item?.description || "",
      category: item?.category || "Ana Yemekler",
      price: item?.price || "",
      calories: item?.calories || "0",
      caloriesEstimated:
        item?.caloriesEstimated !== false,
      allergens: Array.isArray(item?.allergens)
        ? item.allergens
        : [],
    }));

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error:
          error?.message ||
          "Menü analiz edilirken hata oluştu.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
