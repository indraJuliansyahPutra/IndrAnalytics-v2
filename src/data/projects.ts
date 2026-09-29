import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "asl",
    title: "ASL Hand Gesture Detection",
    category: "Computer Vision",
    thumbnail: "/images/projects/asl.png",
    description:
      "Deteksi gesture tangan Bahasa Isyarat Amerika menggunakan MediaPipe dan Python.",
    images: [
      { src: "/images/projects/asl/step-1.png", alt: "ASL Detection Step 1" },
      { src: "/images/projects/asl/step-2.png", alt: "ASL Detection Step 2" },
      { src: "/images/projects/asl/step-3.png", alt: "ASL Detection Step 3" },
      { src: "/images/projects/asl/step-4.png", alt: "ASL Detection Step 4" },
    ],
    link: "https://github.com/indraJuliansyahPutra/ASL-Hand-Gesture",
    visible: true,
  },
  {
    id: "cake",
    title: "Cake Image Classification",
    category: "Machine Learning",
    thumbnail: "/images/projects/cake.png",
    description:
      "Klasifikasi gambar kue tradisional Indonesia menggunakan Convolutional Neural Network.",
    images: [
      {
        src: "/images/projects/cake/step-1.png",
        alt: "Cake Classification Step 1",
      },
      {
        src: "/images/projects/cake/step-2.png",
        alt: "Cake Classification Step 2",
      },
    ],
    link: "https://github.com/indraJuliansyahPutra/Klasifikasi-Kue-CNN",
    visible: true,
  },
  {
    id: "scraping",
    title: "Web Scraping",
    category: "Web Development",
    thumbnail: "/images/projects/web-scraping.png",
    description:
      "Web scraping data statistik Liga 1 Indonesia dari situs resmi menggunakan Python dan BeautifulSoup, lalu disimpan dalam format terstruktur untuk analisis dan visualisasi lanjutan.",
    images: [
      {
        src: "/images/projects/scraping/scrap-data-lib.gif",
        alt: "Scraping Library Data",
      },
      {
        src: "/images/projects/scraping/scrap-data-sofa.gif",
        alt: "Scraping Sofascore Data",
      },
      {
        src: "/images/projects/scraping/scrap-data-trans.gif",
        alt: "Scraping Transfermarkt Data",
      },
    ],
    link: "https://github.com/indraJuliansyahPutra/Liga-1-Indonesia",
    visible: true,
  },
  {
    id: "bps",
    title: "BPS Dashboard",
    category: "Data Visualization",
    thumbnail: "/images/projects/dashboard-bps.png",
    description:
      "Dashboard ini menggunakan Tableau untuk menampilkan data sektor-sektor utama di Provinsi Sumatera Selatan berdasarkan data BPS, mencakup kependudukan, pendidikan, kesehatan, serta pertanian dan perkebunan.",
    images: [
      { src: "/images/projects/bps/video.gif", alt: "BPS Dashboard Demo" },
    ],
    link: "https://public.tableau.com/app/profile/indra.juliansyah.putra/viz/DashboardBPSSumateraSelatan/Kependudukan",
    visible: false,
  },
  {
    id: "liga1",
    title: "Statistics Dashboard Liga 1 Indonesia",
    category: "Data Visualization, Data Analytics",
    thumbnail: "/images/projects/dashboard-liga-1.png",
    description:
      "Dashboard statistik Liga 1 Indonesia menggunakan Power BI yang menampilkan performa pemain, distribusi gol, assist, kartu, dan metrik lainnya, hasil dari data hasil scraping yang telah dibersihkan.",
    images: [
      {
        src: "/images/projects/liga-1/video.gif",
        alt: "Liga 1 Dashboard Demo",
      },
    ],
    link: "https://github.com/indraJuliansyahPutra/Liga-1-Indonesia",
    visible: false,
  },
];
