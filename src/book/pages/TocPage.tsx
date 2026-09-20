import type { Page } from '../buildPages'
import type { PageContext } from './PageFace'

type TocPageData = Extract<Page, { kind: 'toc' }>

export function TocPage({ page, ctx }: { page: TocPageData; ctx: PageContext }) {
  return (
    <div className="page-paper page-toc">
      <p className="page-kicker toc-heading">
        Table of contents{page.parts > 1 ? ` · ${page.part}/${page.parts}` : ''}
      </p>
      {page.items.length === 0 ? (
        <p className="page-body page-muted">Nothing matches those filters. Clear them to see everything.</p>
      ) : (
        <ol className="toc-list">
          {page.items.map((item) => (
            <li key={item.pageIndex}>
              <button type="button" className="toc-row" onClick={(e) => { e.stopPropagation(); ctx.goToPage(item.pageIndex) }}>
                <span className="toc-title">
                  {item.title}
                  {item.subtitle && <span className="toc-sub">{item.subtitle}</span>}
                </span>
                <span className="toc-leader" aria-hidden="true" />
                <span className="toc-num">{item.number}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
      <span className={`page-num page-num-${ctx.side}`}>{page.number}</span>
    </div>
  )
}
