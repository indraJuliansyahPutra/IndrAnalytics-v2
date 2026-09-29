import type { APIRoute } from "astro";

const aboutMe = `
Indra Juliansyah Putra adalah seorang lulusan Teknik Informatika dari Universitas Sriwijaya dengan IPK 3.91/4.00. Ia lahir di Tangerang pada 28 Juli 2003 dan berdomisili di Palembang. Ia dikenal sebagai pribadi yang disiplin, tekun, dan memiliki semangat tinggi dalam bidang teknologi, khususnya data science, machine learning, dan pengembangan kecerdasan buatan.

Riwayat pendidikan formalnya meliputi:
- Universitas Sriwijaya (2021–2025), Teknik Informatika
- SMAN Sumatera Selatan (2018–2021), jurusan MIPA dengan nilai akhir 92.44/100
- SMPN 1 Muara Pinang (2015–2018)
- SDN 03 Muara Pinang (2010–2015)
- SDN Ciputat 05 (2009–2010)

Ia juga mengikuti pelatihan bergengsi seperti:
- Bangkit Academy 2023 (Machine Learning Cohort)
- Google Data Analytics oleh Startup Campus x Google Career Certificate

Dalam bidang profesional, Indra pernah menjadi Asisten Laboratorium di Lab Pengenalan Pola & Pengolahan Citra Fasilkom Unsri (Agustus–Desember 2024), serta aktif dalam organisasi sebagai anggota Machine Learning team GDSC Unsri (2023–2024), Wakil Ketua ROHIS ROMANSA (2019–2020), Wakil Ketua OSIS SMP (2016–2017), dan Pradana Pramuka (2017–2018).

Proyek unggulan yang pernah ia kerjakan:
1. Klasifikasi Citra Kue Tradisional menggunakan CNN – Mencapai akurasi 97% dengan model VGG19 dan Xception.
   Repo: https://github.com/indraJuliansyahPutra/Klasifikasi-Kue-CNN
2. ASL Hand Gesture Detection dengan YOLOv8 – Sistem real-time pengenalan gerakan tangan.
   Repo: https://github.com/indraJuliansyahPutra/ASL-Hand-Gesture-Recognition
3. Dashboard Liga 1 Indonesia – Scraping dan analisis data 550+ pemain, divisualisasikan dalam Power BI.
   Repo: https://github.com/indraJuliansyahPutra/Liga-1-Indonesia
4. Dashboard BPS Sumatera Selatan – Visualisasi data BPS dalam Tableau.
   Link: https://public.tableau.com/app/profile/indra.juliansyah.putra/viz/DashboardBPSSumateraSelatan/Kependudukan

Sertifikasi: TensorFlow Developer Certificate (2024–2027), Google Data Analytics (2023), DeepLearning.AI TensorFlow Developer & ML (2023), Dicoding Data Scientist & ML Engineer.

Kontak:
- Email: indra.juliansyah.putra.career@gmail.com
- Medium: https://medium.com/@mrindrajuliansyahputra10
- GitHub: https://github.com/indraJuliansyahPutra
`;

const systemPrompt = `Kamu adalah asisten pribadi dari Indra Juliansyah Putra. Berikut informasi tentang dia:\n\n${aboutMe}\n\nJawablah pertanyaan tentang Indra dengan singkat, jelas, dan profesional. Gunakan sudut pandang orang ketiga (gunakan 'Indra', bukan 'saya'). Batasi jawaban maksimal 3-4 kalimat.`;

// --- Security: simple in-memory rate limiter ---
const MAX_MESSAGE_LENGTH = 500;
const MAX_TOKENS = 256;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

const ipRequests = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

async function callApi(
  baseUrl: string | undefined,
  apiKey: string | undefined,
  model: string,
  message: string,
): Promise<string> {
  if (!baseUrl || !apiKey) {
    throw new Error("Missing API credentials");
  }
  const url = `${baseUrl.replace(/\/+$/, "")}/chat/completions`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: MAX_TOKENS,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

export const prerender = false;

export const GET: APIRoute = () => {
  return new Response(JSON.stringify({ status: "ok" }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Rate limiting
  const ip = clientAddress || "unknown";
  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ reply: "Terlalu banyak pesan. Coba lagi nanti." }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  // Input validation
  let message: string;
  try {
    const body = await request.json();
    message = typeof body.message === "string" ? body.message.trim() : "";
  } catch {
    return new Response(
      JSON.stringify({ reply: "Format pesan tidak valid." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return new Response(
      JSON.stringify({ reply: `Pesan harus 1-${MAX_MESSAGE_LENGTH} karakter.` }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Env vars (process.env for dev, import.meta.env for Netlify production)
  const openaiBaseUrl = process.env.OPENAI_API_BASE_URL || import.meta.env.OPENAI_API_BASE_URL;
  const openaiKey = process.env.OPENAI_API_KEY || import.meta.env.OPENAI_API_KEY;
  const openaiModel = process.env.OPENAI_MODEL || import.meta.env.OPENAI_MODEL || "gpt-4o-mini";
  const groqBaseUrl = process.env.GROQ_API_BASE_URL || import.meta.env.GROQ_API_BASE_URL;
  const groqKey = process.env.GROQ_API_KEY || import.meta.env.GROQ_API_KEY;
  const groqModel = process.env.GROQ_MODEL || import.meta.env.GROQ_MODEL || "llama-3.1-8b-instant";

  // Try primary provider, fallback to secondary
  try {
    const reply = await callApi(openaiBaseUrl, openaiKey, openaiModel, message);
    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (openaiError) {
    console.error("Primary failed:", (openaiError as Error).message);

    try {
      const reply = await callApi(groqBaseUrl, groqKey, groqModel, message);
      return new Response(JSON.stringify({ reply }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (groqError) {
      console.error("Fallback failed:", (groqError as Error).message);
      return new Response(
        JSON.stringify({
          reply: "Maaf, tidak dapat menjawab sekarang. Silakan coba lagi nanti.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }
};
