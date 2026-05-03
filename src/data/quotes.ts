export const DISNEY_QUOTES = [
  { q: 'Recuerda quien eres.', a: 'Mufasa — El Rey Leon' },
  { q: 'Solo hay una cosa que hacer con un sueno: hacerlo realidad.', a: 'Gusteau — Ratatouille' },
  { q: 'Sigue nadando. Sigue nadando.', a: 'Dory — Buscando a Nemo' },
  { q: 'Eres mas valiente de lo que crees, mas fuerte de lo que pareces.', a: 'Winnie the Pooh' },
  { q: 'El pasado puede doler. Pero puedes aprender de el.', a: 'Rafiki — El Rey Leon' },
  { q: 'Sin importar cuanto te hagan dano, nunca pierdas la bondad.', a: 'Cenicienta' },
  { q: 'Una familia no tiene que ser perfecta. Solo tiene que ser una familia.', a: 'Lilo & Stitch' },
  { q: 'La magia que buscas esta dentro de ti.', a: 'Abuela Madrigal — Encanto' },
  { q: 'El amor es ponerse en el lugar del otro.', a: 'Elsa — Frozen' },
  { q: 'Hasta el infinito y mas alla.', a: 'Buzz Lightyear — Toy Story' },
  { q: 'A veces el camino correcto no es el mas facil.', a: 'Abuela — Pocahontas' },
  { q: 'La familia es la brujula que nos guia a casa.', a: 'Coco' },
  { q: 'Lo que nos hace unicos es exactamente lo que nos hace fuertes.', a: 'Encanto' },
  { q: 'No mires atras. Solo sigue avanzando.', a: 'Buscando a Nemo' },
  { q: 'El secreto es no darse por vencida.', a: 'Tiana — La Princesa y el Sapo' },
  { q: 'Ser valiente no significa no tener miedo. Significa hacerlo aunque lo tengas.', a: 'Merida — Brave' },
  { q: 'Dentro de cada una hay algo poderoso esperando salir.', a: 'Moana' },
  { q: 'No hay nada mas poderoso que una mujer que decide ser ella misma.', a: 'Mulan' },
  { q: 'El esfuerzo de hoy es el resultado que veras manana.', a: 'Judy Hopps — Zootopia' },
  { q: 'Eres capaz de cosas increibles. Siempre lo has sido.', a: 'Helen — Los Increibles' },
  { q: 'Los suenos no tienen fecha de vencimiento.', a: 'Lilo & Stitch' },
  { q: 'Cada dia es una nueva oportunidad de ser exactamente quien quieres ser.', a: 'Ratatouille' },
  { q: 'Tu historia aun no ha terminado. Lo mejor esta por escribirse.', a: 'Coco' },
  { q: 'Confia en el proceso. Confia en ti.', a: 'Doc Hudson — Cars' },
  { q: 'Eres la heroina de tu propia historia.', a: 'Moana' },
];

export const getDailyQuote = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return DISNEY_QUOTES[dayOfYear % DISNEY_QUOTES.length];
};
