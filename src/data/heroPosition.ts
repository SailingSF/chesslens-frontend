// Stylized middle-game position used for the hero visual.
// Each inner array is a rank from 8 → 1 (top-down). Unicode chess glyphs.
export const HERO_POSITION: string[][] = [
  ['♜', '',  '♝', '♛', '♚', '',  '',  '♜'],
  ['♟', '',  '♟', '',  '',  '♟', '♟', '♟'],
  ['',  '♟', '♞', '♟', '',  '♞', '',  ''],
  ['',  '',  '',  '',  '♟', '',  '',  ''],
  ['',  '',  '♗', '♙', '♙', '',  '',  ''],
  ['',  '',  '♘', '',  '',  '♘', '',  ''],
  ['♙', '♙', '♙', '',  '',  '♙', '♙', '♙'],
  ['♖', '',  '♗', '♕', '♔', '',  '',  '♖'],
]

export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

// Decorative chess-notation strip shown in the hero ticker.
export const NOTATION_TICKER =
  '1. e4 e5  2. Nf3 Nc6  3. Bb5 a6  4. Ba4 Nf6  5. O-O Be7  6. Re1 b5  7. Bb3 d6  8. c3 O-O  9. h3 Nb8  10. d4 Nbd7  11. Nbd2 Bb7  12. Bc2 Re8  13. Nf1 Bf8  14. Ng3 g6  15. a4 c5  16. d5 c4  17. Bg5 h6'
