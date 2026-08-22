import sceneWide1 from "../assets/bg/scene-wide-1.webp";
import sceneWide2 from "../assets/bg/scene-wide-2.webp";
import sceneWide3 from "../assets/bg/scene-wide-3.webp";
import sceneWide4 from "../assets/bg/scene-wide-4.webp";
import sceneWide5 from "../assets/bg/scene-wide-5.webp";
import sceneWide6 from "../assets/bg/scene-wide-6.webp";
import sceneWide7 from "../assets/bg/scene-wide-7.webp";
import sceneWide8 from "../assets/bg/scene-wide-8.webp";
import sceneWide9 from "../assets/bg/scene-wide-9.webp";
import sceneWide10 from "../assets/bg/scene-wide-10.webp";
import sceneWide11 from "../assets/bg/scene-wide-11.webp";
import sceneWide12 from "../assets/bg/scene-wide-12.webp";
import sceneWide13 from "../assets/bg/scene-wide-13.webp";
import sceneWide14 from "../assets/bg/scene-wide-14.webp";
import sceneWide15 from "../assets/bg/scene-wide-15.webp";
import sceneWide16 from "../assets/bg/scene-wide-16.webp";
import sceneWide17 from "../assets/bg/scene-wide-17.webp";
import sceneWide18 from "../assets/bg/scene-wide-18.webp";

let trackNumber = 0;

const track = ({
  title,
  artist,
  musicId,
  album = {
    as: "",
    eg: "",
  },
  year = {
    as: "",
    eg: "",
  },
  artwork = "",
}) => ({
  id: `track-${++trackNumber}`,
  year,
  title,
  album,
  artist,
  artwork,
  musicId,
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const goldenNights = [
  track({
    title: {
      as: "অ’ মোৰ ৰণৰ তেজী ঘোঁৰা",
      eg: "O Mur Ronor Tejighura",
    },
    album: {
      as: "বৰষুণ",
      eg: "Borokhun",
    },
    year: {
      as: "২০১৮",
      eg: "2018",
    },
    musicId: "OtJ6Vmd3LLc",
    artist: "Zubeen Garg",
    artwork: sceneWide1,
  }),

  track({
    title: {
      as: "নীলিম আকাশ",
      eg: "Nilim Aakash",
    },
    album: {
      as: "মোৰ সুৰীয়া গীত",
      eg: "Mur Xuria Geet",
    },
    year: {
      as: "১৯৯৩",
      eg: "1993",
    },
    musicId: "QjKuywTgy_w",
    artist: "Zubeen Garg",
    artwork: sceneWide7,
  }),

  track({
    title: {
      as: "নিতাল নিশা",
      eg: "Nital Nixha",
    },
    album: {
      as: "সন্ধ্যা",
      eg: "Sandhya ",
    },
    year: {
      as: "২০০৬",
      eg: "2006",
    },
    musicId: "JKT7-G1l-SA",
    artist: "Zubeen Garg",
    artwork: sceneWide9,
  }),

  track({
    title: {
      as: "প্ৰতি দিনে তুমি",
      eg: "Protidine tumi",
    },
    album: {
      as: "ৰ’দৰ চিঠি",
      eg: "Rodor Sithi ",
    },
    year: {
      as: "২০১৩",
      eg: "2013",
    },
    musicId: "9j3HKaar5N0",
    artist: "Zubeen Garg",
    artwork: sceneWide4,
  }),

  track({
    title: {
      as: "ইপাৰ সিপাৰ",
      eg: "Epar Hipar",
    },
    album: {
      as: "ইপাৰ সিপাৰ",
      eg: "Epar Hipar ",
    },
    year: {
      as: "২০২৩",
      eg: "2023",
    },
    musicId: "p4-fx6rvz1U",
    artist: "Zubeen Garg",
    artwork: sceneWide8,
  }),

  track({
    title: {
      as: "বিয়পি বিয়পি",
      eg: "Biyopi Biyopi",
    },
    album: {
      as: "প্ৰেম আৰু প্ৰেম",
      eg: "Prem Aru Prem",
    },
    year: {
      as: "২০২৩",
      eg: "2023",
    },
    musicId: "Sjc2pPsJ724",
    artist: "Zubeen Garg",
    artwork: sceneWide1,
  }),

  track({
    title: {
      as: "মমৰ শিখাতি",
      eg: "Momor Hikhati",
    },
    album: {
      as: "মমৰ শিখাতি",
      eg: "Momor Hikhati",
    },
    year: {
      as: "২০২৪",
      eg: "2024",
    },
    musicId: "MWZO41AOuOw",
    artist: "Zubeen Garg",
    artwork: sceneWide14,
  }),
];

const newMillennium = [
  track({
    title: {
      as: "সপোন সপোন",
      eg: "Xopun Xopun",
    },
    album: {
      as: "ৰৈ ৰৈ বিনালে",
      eg: "Roi Roi Binale",
    },
    year: {
      as: "২০২৫",
      eg: "2025",
    },
    musicId: "9YKVapl8a3M",
    artist: "Zubeen Garg",
    artwork: sceneWide12,
  }),

  track({
    title: {
      as: "ৰৈ ৰৈ বিনালে",
      eg: "Roi Roi Binale",
    },
    album: {
      as: "ৰৈ ৰৈ বিনালে",
      eg: "Roi Roi Binale",
    },
    year: {
      as: "২০২৫",
      eg: "2025",
    },
    musicId: "QxUg1fLsiUA",
    artist: "Zubeen Garg",
    artwork: sceneWide15,
  }),

  track({
    title: {
      as: "মোৰ মন",
      eg: "Mur Mon",
    },
    album: {
      as: "ৰৈ ৰৈ বিনালে",
      eg: "Roi Roi Binale",
    },
    year: {
      as: "২০২৫",
      eg: "2025",
    },
    musicId: "SU6McXo-K6E",
    artist: "Zubeen Garg",
    artwork: sceneWide13,
  }),

  track({
    title: {
      as: "জোন জ্বলি",
      eg: "Joon Jwoli",
    },
    album: {
      as: "ৰৈ ৰৈ বিনালে",
      eg: "Roi Roi Binale",
    },
    year: {
      as: "২০২৫",
      eg: "2025",
    },
    musicId: "mx2ZGYxEeMQ",
    artist: "Zubeen Garg",
    artwork: sceneWide9,
  }),

  track({
    title: {
      as: "বাটৰে শেযতে",
      eg: "Batore Hekhote",
    },
    album: {
      as: "বাটৰে শেযতে",
      eg: "Batore Hekhote",
    },
    year: {
      as: "২০২৫",
      eg: "2025",
    },
    musicId: "8mIvwOLbe6I",
    artist: "Zubeen Garg",
    artwork: sceneWide14,
  }),

  track({
    title: {
      as: "সাতোৰঙী",
      eg: "Xaturangi",
    },
    album: {
      as: "চিকাৰ",
      eg: "Sikaar",
    },
    year: {
      as: "২০২৪",
      eg: "2024",
    },
    musicId: "zAyYhVensAM",
    artist: "Zubeen Garg",
    artwork: sceneWide9,
  }),
];

const goldenCollection = [
  track({
    title: {
      as: "এন্ধাৰ হ'ব নোৱাৰো",
      eg: "Endhar Hobo Nuwaru",
    },
    album: {
      as: "আশা",
      eg: "Aasha",
    },
    year: {
      as: "১৯৯৫",
      eg: "1995",
    },
    musicId: "cYXVtPiPERg",
    artist: "Zubeen Garg",
    artwork: sceneWide14,
  }),

  track({
    title: {
      as: "আশা",
      eg: "Aasha",
    },
    album: {
      as: "আশা",
      eg: "Aasha",
    },
    year: {
      as: "১৯৯৫",
      eg: "1995",
    },
    musicId: "10KiRvcYOzM",
    artist: "Zubeen Garg",
    artwork: sceneWide7,
  }),

  track({
    title: {
      as: "এতিয়া জোনাকে",
      eg: "Etia Junake",
    },
    album: {
      as: "শব্দ",
      eg: "Sobdo",
    },
    year: {
      as: "১৯৯৮",
      eg: "1998",
    },
    musicId: "4vgDLxR-9iQ",
    artist: "Zubeen Garg",
    artwork: sceneWide8,
  }),

  track({
    title: {
      as: "ৰ'দ আজি কেনি পাওঁ",
      eg: "Rod Aji Keni Pau",
    },
    album: {
      as: "তুমি মোৰ মাথোঁ মোৰ",
      eg: "Tumi Mur Mathu Mur",
    },
    year: {
      as: "২০০০",
      eg: "2000",
    },
    musicId: "PUeSiHxqEqg",
    artist: "Zubeen Garg",
    artwork: sceneWide3,
  }),

  track({
    title: {
      as: "কঁকাল খামুচীয়া",
      eg: "Kokal Khamusia",
    },
    album: {
      as: "শব্দ",
      eg: "Sobdo",
    },
    year: {
      as: "১৯৯৮",
      eg: "1998",
    },
    musicId: "E8nFRftKow8",
    artist: "Zubeen Garg",
    artwork: sceneWide6,
  }),

  track({
    title: {
      as: "অচিনাকী দুটি মনে",
      eg: "Osinaki Duti Mone",
    },
    album: {
      as: "অধিনায়ক",
      eg: "Adhinayak",
    },
    year: {
      as: "২০০৬",
      eg: "2006",
    },
    musicId: "3dkPq_hwxws",
    artist: "Zubeen Garg",
    artwork: sceneWide14,
  }),

  track({
    title: {
      as: "এচাতি প্ৰণয়ৰ বতাহে",
      eg: "Asati Pronoyor Botahe",
    },
    album: {
      as: "অগ্নিসাক্ষী",
      eg: "Agnisakshi",
    },
    year: {
      as: "২০০৩",
      eg: "2003",
    },
    musicId: "U9uvnoV7VjU",
    artist: "Zubeen Garg",
    artwork: sceneWide13,
  }),

  track({
    title: {
      as: "এতিয়া এন্ধাৰে",
      eg: "Aetia Endhare",
    },
    album: {
      as: "গোল্ডেন সংগ্ৰহ, ৩",
      eg: "Golden Collection, 3",
    },
    year: {
      as: "১৯৯৪",
      eg: "1994",
    },
    musicId: "tTPpsCUflOs",
    artist: "Zubeen Garg",
    artwork: sceneWide2,
  }),

  track({
    title: {
      as: "অলপ শান্তি দিয়া",
      eg: "Alop Hanti Diya",
    },
    album: {
      as: "আকৌ হিয়ামন",
      eg: "Akou Hiyamon",
    },
    year: {
      as: "২০০২",
      eg: "2002",
    },
    musicId: "onCSzR_hDRk",
    artist: "Zubeen Garg",
    artwork: sceneWide8,
  }),

  track({
    title: {
      as: "অবুজন মন",
      eg: "Abujon Mon",
    },
    album: {
      as: "অবুজন মন",
      eg: "Abujon Mon",
    },
    year: {
      as: "২০১৮",
      eg: "2018",
    },
    musicId: "IL5XOMr1d5Y",
    artist: "Zubeen Garg",
    artwork: sceneWide3,
  }),

  track({
    title: {
      as: "ৰুমাল",
      eg: "Rumal",
    },
    album: {
      as: "ৰুমাল",
      eg: "Rumaal",
    },
    year: {
      as: "২০০৮",
      eg: "2008",
    },
    musicId: "dVJkZsHUekI",
    artist: "Zubeen Garg",
    artwork: sceneWide3,
  }),
];

const murPriyo = [
  track({
    title: {
      as: "অহেতুক",
      eg: "Ahetuk",
    },
    album: {
      as: "অহেতুক",
      eg: "Ahetuk",
    },
    year: {
      as: "২০১৪",
      eg: "2014",
    },
    musicId: "95fpJlktj7k",
    artist: "Zubeen Garg",
    artwork: sceneWide15,
  }),

  track({
    title: {
      as: "ছায়াৰ দৰে",
      eg: "Sayar Dore",
    },
    album: {
      as: "ৰং",
      eg: "Rang",
    },
    year: {
      as: "২০০৪",
      eg: "2004",
    },
    musicId: "RTJ9txbHm5Q",
    artist: "Zubeen Garg",
    artwork: sceneWide17,
  }),

  track({
    title: {
      as: "উভতি চোৱা",
      eg: "Ubhoti Suwa",
    },
    album: {
      as: "চিলা",
      eg: "Sila",
    },
    year: {
      as: "২০২০",
      eg: "2020",
    },
    musicId: "5EJCNtWr2UI",
    artist: "Zubeen Garg",
    artwork: sceneWide13,
  }),

  track({
    title: {
      as: "চিলা",
      eg: "Silaa",
    },
    album: {
      as: "চিলা",
      eg: "Silaa",
    },
    year: {
      as: "২০২০",
      eg: "2020",
    },
    musicId: "XrAcwz0_0vM",
    artist: "Zubeen Garg",
    artwork: sceneWide14,
  }),
];

const eucalyptus = [
  track({
    title: {
      as: "মুুক্তি",
      eg: "Mukti",
    },
    album: {
      as: "মুুক্তি",
      eg: "Mukti",
    },
    year: {
      as: "১৯৯৭",
      eg: "1997",
    },
    musicId: "vE6ohin1KBY",
    artist: "Zubeen Garg",
    artwork: sceneWide18,
  }),
];
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const playLists = [
  {
    id: "golden-nights",
    name: "সোণালী নিশা",
    year: "১৯৯০ – ১৯৯৯",
    tracks: goldenNights,
  },
  {
    id: "new-millennium",
    name: "নতুন সহস্ৰাব্দ",
    year: "২০২০ – ২০২৫",
    tracks: newMillennium,
  },
  {
    id: "golden-collection",
    name: "সোণালী সংগ্ৰহ",
    year: "২০০০ – ২০০৮",
    tracks: goldenCollection,
  },
  {
    id: "mur-priyo",
    name: "মোৰ প্ৰিয়",
    year: "২০০২ – ২০২৬",
    tracks: murPriyo,
  },
  {
    id: "eucalyptus",
    name: "ইউকেলিপ্টাছ",
    year: "২০০০ – ২০২৬",
    tracks: eucalyptus,
  },
];
