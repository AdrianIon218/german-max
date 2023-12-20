const levelsDetails = [
  {
    title: "A1 - Începător",
    description:
      "O persoană ce a terminat nivelul A1 va putea folosi expresii uzuale, să înțeleagă și să alcătuiască propoziții simple, să se poată prezenta altor persoane și să formuleze întrebări esențiale .",
  },
  {
    title: "A2 - Cunoștințe de bază",
    description:
      "O persoană ce a terminat nivelul A2 va putea înțelege propoziții și expresii folosite mai des, corelate cu mediul său apropiat, de exemplu informații despre el însuși și familia sa, cumpărături, muncă și imprejurimi. De asemnea se va putea face înțeles în situații simple, de rutină, în care este vorba despre un schimb direct de informații legate de lucruri cunoscute si comune.",
  },
  {
    title: "B1 - Cunostințe medii de limbă",
    description:
      "O persoană ce a terminat nivelul B1 se va putea descurca în aproape toate situațiile de limbaj standardizat întâlnite într-o călătorie, să vorbească despre lucruri obișnuite de la servici, școală, timp liber, etc. În plus va putea să vorbească simplu și coerent despre teme cunoscute și domenii de interes personal , cât și să poată povesti despre experiențele și întâmplările personale.",
  },
  {
    title: "B2 - Utilizarea limbii independent",
    description:
      "O persoană ce a terminat nivelul B2 va putea înțelege conținutul principal al unor texte complexe despre teme concrete și abstracte, precum și discuțiile din domeniul său de specialitate. De asemnea va putea comunica în mod spontan și cursiv, astfel încât o conversație obișnuită cu vorbitori nativi de limba germană să decurgă fără probleme.",
  },
  {
    title: "C1 - Cunoștințe de limbă la nivel de expert",
    description:
      "O persoană ce a terminat nivelul C1 va putea parcurge texte lungi și complicate dintr-un spectru larg de teme. Va putea folosi limba flexibil și efectiv în viața socială și profesională, sau în pregătirea profesională și studiu. Își va putea exprima opinia clar, structurat și detaliat despre cazuri și situații complicate.",
  }
];

export default function TestDetails() {
  return (
    <div className="panel">
      <h2 className="heading-tertiary u-margin-bottom-intermediate">
        Nivelele de cunoaștere a limbii germane
      </h2>
      {levelsDetails.map((item, index) => {
        return (
          <p className="paragraph" key={index}>
            <span className="paragraph__title">{item.title}</span>
            {item.description}
          </p>
        );
      })}
    </div>
  );
}
