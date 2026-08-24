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
        JSON.stringify({ error: "Menü fotoğrafı gönderilmedi." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "OPENAI_API_KEY bulunamadı.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          input: [
            {
              role: "user",
              content: [
                {
                  type: "input_text",
                  text: `
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

Fotoğrafta yazmayan bilgileri uydurma.
Kalori yoksa boş bırak.
Alerjen bilgisi yoksa boş dizi kullan.

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
`,
                },
                {
                  type: "input_image",
                  image_url: body.image,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: data?.error?.message || "AI servisi hata verdi.",
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const text =
      data?.output
        ?.flatMap((item) => item.content || [])
        ?.find((item) => item.type === "output_text")?.text || "";

    if (!text) {
      return new Response(
        JSON.stringify({
          error: "AI menüden sonuç çıkaramadı.",
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

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: "Menü analiz edilirken hata oluştu.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
