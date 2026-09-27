---
title: AROA — Bank SMBCI
organization: Nusantara Duta Solusindo
role: Software Engineer
draft: false
order: 2
focus:
  en: Client collaboration · Full-stack · Investigation
  id: Kolaborasi klien · Full-stack · Investigasi
summary:
  en: Progressed from junior full-stack implementation to on-site client coordination, requirements analysis, and security and performance investigation across two delivery phases.
  id: Berkembang dari implementasi full-stack sebagai junior hingga koordinasi klien on-site, analisis kebutuhan, serta investigasi keamanan dan performa dalam dua fase proyek.
technologies: [Next.js 13, Spring Boot, Redis, JMeter]
sections:
  - heading:
      en: Phase 1 — Building across the stack
      id: Fase 1 — Pengembangan lintas stack
    text:
      en: Started as a junior engineer assigned to backend tasks. With an understanding of both sides of the application, also took on outstanding frontend work to help the team complete features.
      id: Memulai sebagai junior engineer dengan tugas backend. Dengan pemahaman kedua sisi aplikasi, turut mengerjakan tugas frontend yang belum selesai untuk membantu tim menyelesaikan fitur.
  - heading:
      en: Phase 2 — On-site technical coordination
      id: Fase 2 — Koordinasi teknis on-site
    text:
      en: Working for NDS as the bank's IT consulting partner, served as an on-site technical point of contact during SIT and UAT. Explained issues to clients, investigated frontend, backend, and data-related causes against the FSD, and assessed fix complexity and possible workarounds. Helped distribute fixing work together with the Technical Lead, supporting the Project Manager.
      id: Sebagai bagian dari NDS, mitra konsultan IT bank, menjadi kontak teknis on-site selama SIT dan UAT. Menjelaskan issue kepada klien, menganalisis penyebab pada frontend, backend, dan data berdasarkan FSD, serta menilai kompleksitas perbaikan dan kemungkinan solusi sementara. Membantu pembagian pekerjaan fixing bersama Technical Lead untuk mendukung Project Manager.
  - heading:
      en: Keeping requirements and specifications aligned
      id: Menyelaraskan kebutuhan dan spesifikasi
    text:
      en: Developed a deep understanding of the FSD to support issue analysis and client discussions. Analyzed revisions to the BRD and updated the existing FSD across multiple versions as requirements changed.
      id: Mendalami FSD untuk mendukung analisis issue dan diskusi klien. Menganalisis revisi BRD dan memperbarui FSD mengikuti format yang ada dalam beberapa versi perubahan kebutuhan.
  - heading:
      en: Performance investigation and Redis R&D
      id: Investigasi performa dan R&D Redis
    text:
      en: Contributed to a performance investigation lasting approximately four months, learning and using JMeter for testing. Conducted R&D during NDS's first Redis adoption in AROA, exploring caching for frequently accessed parameter data previously retrieved through APIs directly from the database. The team ultimately released AROA to production within the planned timeline; no quantified performance improvement is claimed here.
      id: Berkontribusi dalam investigasi performa selama sekitar empat bulan, mempelajari dan menggunakan JMeter untuk pengujian. Melakukan R&D pada penerapan pertama Redis oleh NDS di AROA, mengeksplorasi caching data parameter yang sering diakses melalui API dan sebelumnya diambil langsung dari database. Tim akhirnya merilis AROA ke production sesuai timeline; tidak ada klaim angka peningkatan performa di sini.
  - heading:
      en: Validating security findings with the team
      id: Memvalidasi temuan keamanan bersama tim
    text:
      en: Learned Burp Suite independently with a teammate and from the bank's external penetration-testing vendor to reproduce reported findings. Worked with the development team on fixes. The external vendor performed the formal penetration test.
      id: Mempelajari Burp Suite secara mandiri bersama seorang rekan tim dan belajar dari vendor pentest eksternal bank untuk mereproduksi temuan. Bekerja bersama tim pengembang untuk memperbaikinya. Pentest formal dilakukan oleh vendor eksternal.
stack:
  - label: { en: Frontend, id: Frontend }
    tools: Next.js 13 · Tailwind CSS
  - label: { en: Backend, id: Backend }
    tools: Microservices · Java 8 & 11 · Spring Boot · MySQL · Redis · OAuth
  - label: { en: Testing, id: Pengujian }
    tools: Burp Suite · JMeter
  - label: { en: Delivery environment, id: Lingkungan deployment }
    tools: OpenShift Container Platform (OCP) · Bank-managed CI/CD
---
