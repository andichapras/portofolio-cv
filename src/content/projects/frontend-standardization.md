---
title: Frontend Engineering Standardization
organization: Mandiri Utama Finance
role: Software Engineer
draft: false
order: 4
focus:
  en: Reusability · Standards · Developer experience
  id: Reusabilitas · Standar · Pengalaman developer
summary:
  en: Standardizing frontend development through a Next.js 16 and Tailwind CSS 4 template currently in use, alongside R&D for an internal React 19 library.
  id: Menstandardisasi pengembangan frontend melalui template Next.js 16 dan Tailwind CSS 4 yang saat ini digunakan, serta R&D untuk library React 19 internal.
technologies: [Next.js 16, Tailwind CSS 4, React 19, Nx, tsdown]
sections:
  - heading:
      en: Application template currently in use
      id: Template aplikasi yang saat ini digunakan
    text:
      en: The current standardization approach uses a Next.js 16 application template, with Tailwind CSS upgraded to version 4. Provided technical guidance for the IT Solution Division, which includes six departments.
      id: Pendekatan standardisasi yang saat ini digunakan berbasis template aplikasi Next.js 16, dengan Tailwind CSS yang telah ditingkatkan ke versi 4. Memberikan panduan teknis untuk Divisi IT Solution yang mencakup enam departemen.
  - heading:
      en: Internal library research and development
      id: Riset dan pengembangan library internal
    text:
      en: The second workstream is an internal library that is still in R&D, built on React 19 and Tailwind CSS 4. Nx manages the monorepo, while tsdown is used as the bundler. This library is being explored separately from the application template currently in use.
      id: Bagian kedua adalah library internal yang masih dalam tahap R&D, dengan fondasi React 19 dan Tailwind CSS 4. Nx digunakan untuk mengelola monorepo, sedangkan tsdown sebagai bundler. Pengembangan library ini dilakukan terpisah dari template aplikasi yang saat ini digunakan.
  - heading:
      en: UI activity logging for error investigation
      id: Pencatatan aktivitas UI untuk investigasi error
    text:
      en: UI-side logging captures the API requests made before an error occurs, helping trace the user's activity leading up to the issue. The UI integrates with a Spring Boot service using Java 21 and Elasticsearch. The focus is on recording activity from the UI, rather than only logging backend errors.
      id: Logging dari sisi UI mencatat API yang dipanggil sebelum terjadi error, sehingga aktivitas pengguna yang mendahului kendala dapat ditelusuri. UI diintegrasikan dengan layanan Spring Boot menggunakan Java 21 dan Elasticsearch. Fokusnya adalah pencatatan aktivitas dari sisi UI, bukan hanya log error backend.
stack:
  - label: { en: Application template (in use), id: Template aplikasi (digunakan saat ini) }
    tools: Next.js 16 · Tailwind CSS 4
  - label: { en: Internal library (R&D), id: Library internal (R&D) }
    tools: React 19 · Tailwind CSS 4 · Nx (monorepo) · tsdown (bundler)
  - label: { en: UI logging integration, id: Integrasi logging UI }
    tools: Java 21 · Spring Boot · Elasticsearch
---
