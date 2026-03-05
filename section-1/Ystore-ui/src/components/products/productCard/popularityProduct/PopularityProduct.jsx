import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const PopularityProduct = ({ rating }) => { // score = número de 0 a 100
    console.log(rating);
 // 1. Garante que rating seja um número válido entre 0 e 100
  const safeRating = typeof rating === 'number' && !isNaN(rating)
    ? Math.max(0, Math.min(100, rating))   // clamp entre 0 e 100
    : 0;

  // 2. Converte para escala 0-5
  const stars = safeRating / 20;  // 0 → 0, 100 → 5

  // 3. Calcula as partes com segurança
  const fullStars   = Math.floor(stars);                    // 0 a 5
  const remainder   = stars - fullStars;                    // fração restante (0 a <1)
  const hasHalf     = remainder >= 0.5;                     // meia estrela
  const emptyStars  = 5 - fullStars - (hasHalf ? 1 : 0);    // sempre ≥ 0 agora

  return (
    <div className="flex items-center gap-1 text-yellow-400 text-base mt-1 mb-2">
      {/* Estrelas completas */}
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}

      {/* Meia estrela */}
      {hasHalf && <FaStarHalfAlt />}

      {/* Estrelas vazias */}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
 );
}

export default PopularityProduct