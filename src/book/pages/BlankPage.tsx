export function BlankPage({ number, side }: { number?: number; side: 'left' | 'right' }) {
  return (
    <div className="page-paper page-blank">
      {number !== undefined && <span className={`page-num page-num-${side}`}>{number}</span>}
    </div>
  )
}
