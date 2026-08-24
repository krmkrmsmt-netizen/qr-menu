export default async (request) => {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Sadece POST kullanılabilir." }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
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
          headers: { "Content-Type": "application/json" },
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
          headers: { "Content-Type": "application/json" },
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
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const mimeType = match[1];
    const base64Data = match[2];

    const prompt = `
Bu bir restoran menüsü fotoğrafıdır.

Fotoğraftaki bütün ürünleri çıkar.

Her ürün için:
- name
- description
- category
- price
- calories
- allergens

bilgilerini çıkar.

ÖNEMLİ KALORİ KURALI:
- Fotoğrafta kalori yazıyorsa, yazan kaloriyi kullan.
- Fotoğrafta kalori yazmıyorsa, ürünün içeriği ve tahmini porsiyonuna göre yaklaşık kalori hesapla.
- Kalori alanını ASLA boş bırakma.
- Tahmini kaloriyi sayı olarak döndür.
- Örneğin: "650" veya "450".
- Kalori tahmini yaparken makul ve gerçekçi bir değer kullan.

Alerjen bilgisi fotoğrafta veya ürün içeriğinden güvenilir şekilde belirlenemiyorsa boş dizi kullan.

Ürün adını, fiyatını veya fotoğrafta açıkça görülen diğer bilgileri değiştirme.

Sadece geçerli JSON döndür.

Format:
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
          headers: { "Content-Type": "application/json" },
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
          headers: { "Content-Type": "application/json" },
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

    // Kalori boş geldiyse son kontrolde tekrar tahmin ettiriyoruz.
    if (result.products && Array.isArray(result.products)) {
      result.products = result.products.map((item) => ({
        ...item,
        calories:
          item.calories !== undefined &&
          item.calories !== null &&
          String(item.calories).trim() !== ""
            ? String(item.calories)
            : "Tahmin edilemedi",
      }));
    }

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
        error: "Menü analiz edilirken hata oluştu.",
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
