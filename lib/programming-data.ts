export type Program = {
  id: string;
  time: string;
  title: string;
  host: string;
  tag: string;
  description: string;
};

export const weekdayPrograms: Program[] = [
  {
    id: "wd-1",
    time: "06:00 – 09:00",
    title: "Oggendvuur",
    host: "Pieter & Marisa",
    tag: "Oggendshow",
    description:
      "Wakker word met energie, wenspeletjies en die nuutste plaaslike nuus om jou dag reg te trap.",
  },
  {
    id: "wd-2",
    time: "09:00 – 12:00",
    title: "Middagmelodie",
    host: "Elmarie Coetzee",
    tag: "Musiek",
    description:
      "Ontspanne treffers en gunstelinge om jou oggend se werk aangenaam te maak.",
  },
  {
    id: "wd-3",
    time: "12:00 – 14:00",
    title: "Kletskombuis",
    host: "Herman Smit",
    tag: "Gesels",
    description:
      "Gesprekke oor die lewe, kos en gemeenskapsnuus &mdash; ligte gesels vir die middaguur.",
  },
  {
    id: "wd-4",
    time: "14:00 – 17:00",
    title: "Skoftydmusiek",
    host: "DJ Reinier",
    tag: "Musiek",
    description:
      "'n Vrolike mengsel van ou en nuwe treffers om jou deur die middag te dra.",
  },
  {
    id: "wd-5",
    time: "17:00 – 19:00",
    title: "Ryvuur",
    host: "Chané & Willem",
    tag: "Aandprogram",
    description:
      "Die huis-toe-ry program met verkeersopdaterings, wenresultate en die beste aandmusiek.",
  },
  {
    id: "wd-6",
    time: "19:00 – 22:00",
    title: "Aandgloed",
    host: "Riaan Botha",
    tag: "Aandprogram",
    description:
      "Stadiger musiek en stories om af te skakel na 'n lang dag.",
  },
  {
    id: "wd-7",
    time: "22:00 – 00:00",
    title: "Nagverlange",
    host: "DJ Storm",
    tag: "Naguitsending",
    description:
      "Aanvrae, liefdesboodskappe en sagte musiek vir die nag-uile.",
  },
];

export const saturdayPrograms: Program[] = [
  {
    id: "sa-1",
    time: "08:00 – 11:00",
    title: "Naweekwakker",
    host: "Marisa",
    tag: "Naweek",
    description:
      "'n Rustige begin tot die Saterdag met gunsteling treffers en naweekwenke.",
  },
  {
    id: "sa-2",
    time: "11:00 – 14:00",
    title: "Boeremusiek Blok",
    host: "Oom Attie",
    tag: "Boeremusiek",
    description:
      "Klassieke en hedendaagse boeremusiek vir die egte liefhebber.",
  },
  {
    id: "sa-3",
    time: "14:00 – 17:00",
    title: "Kletskamer Naweek",
    host: "Herman Smit",
    tag: "Gesels",
    description:
      "Onderhoude met plaaslike persoonlikhede en interessante Saterdagmiddag-gesprekke.",
  },
  {
    id: "sa-4",
    time: "17:00 – 20:00",
    title: "Braaivuurklanke",
    host: "DJ Reinier",
    tag: "Naweek",
    description:
      "Die volmaakte klankbaan vir 'n Saterdagaand-braai saam met vriende.",
  },
  {
    id: "sa-5",
    time: "20:00 – 00:00",
    title: "Kroeg en Kitaar",
    host: "Riaan Botha",
    tag: "Musiek",
    description:
      "Lewendige musiek en plaaslike kunstenaars onder die kollig.",
  },
];

export const sundayPrograms: Program[] = [
  {
    id: "so-1",
    time: "08:00 – 10:00",
    title: "Sondagoggendrus",
    host: "Elmarie Coetzee",
    tag: "Naweek",
    description: "'n Sagte, kalm begin tot die Sondag met rustige musiek.",
  },
  {
    id: "so-2",
    time: "10:00 – 12:00",
    title: "Geloof en Musiek",
    host: "Ds. Johan Pretorius",
    tag: "Geloof",
    description:
      "Inspirerende gedagtes en musiek om die Sondagoggend te verryk.",
  },
  {
    id: "so-3",
    time: "12:00 – 15:00",
    title: "Sondagmiddag Aftrek",
    host: "Chané & Willem",
    tag: "Naweek",
    description:
      "Familievriendelike musiek en oproepe vir 'n ontspanne Sondagmiddag.",
  },
  {
    id: "so-4",
    time: "15:00 – 18:00",
    title: "Solank Dit Sondag Is",
    host: "DJ Storm",
    tag: "Nostalgie",
    description:
      "'n Nostalgiese trip met die gunstelinge van gister en vandag.",
  },
  {
    id: "so-5",
    time: "18:00 – 00:00",
    title: "Stilte Voor Maandag",
    host: "Riaan Botha",
    tag: "Aandprogram",
    description:
      "Stadig afskakel met sagte klanke voor die nuwe week begin.",
  },
];

export type DaySchedule = {
  day: string;
  short: string;
  programs: Program[];
};

export const schedule: DaySchedule[] = [
  { day: "Maandag", short: "Ma", programs: weekdayPrograms },
  { day: "Dinsdag", short: "Di", programs: weekdayPrograms },
  { day: "Woensdag", short: "Wo", programs: weekdayPrograms },
  { day: "Donderdag", short: "Do", programs: weekdayPrograms },
  { day: "Vrydag", short: "Vr", programs: weekdayPrograms },
  { day: "Saterdag", short: "Sa", programs: saturdayPrograms },
  { day: "Sondag", short: "So", programs: sundayPrograms },
];