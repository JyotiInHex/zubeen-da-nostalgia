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
];

const newMillennium = [
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
    artwork: sceneWide3,
  }),
];

const goldenCollection = [
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
];

const murPriyo = [
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
    year: "২০১০ – ২০২৫",
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
    id: "tumi-heartthrob",
    name: "তুমি হাৰ্টথ্ৰব",
    year: "১৯৯২ – ২০২৬",
    tracks: goldenCollection,
  },
];
