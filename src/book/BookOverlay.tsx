import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import type { Topic } from '@/data/types'
import { entriesByTopic, filterEntries } from '@/data'
import { SITE, TOPIC_LABEL } from '@/config/site.config'
import { useSiteStore } from '@/store/useSiteStore'
import { useAudioStore } from '@/store/useAudioStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useWheelFlip } from '@/hooks/useWheelFlip'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { Icon } from '@/components/Icon'
import { buildBook, currentForPage } from './buildPages'
import { FilterBar } from './FilterBar'
import { FlipBook } from './FlipBook'
import { PageStack } from './PageStack'

/** Full-screen dialog holding one topic's flip-book. */
export default function BookOverlay({ topic }: { topic: Topic }) {
  const navigate = useNavigate()
  const filters = useSiteStore((s) => s.filters)
  const playForTopic = useAudioStore((s) => s.playForTopic)
  const entries = useMemo(() => filterEntries(entriesByTopic[topic], filters), [topic, filters])
  const book = useMemo(() => buildBook(topic, entries), [topic, entries])
  const single = useMediaQuery('(max-width: 767px), (orientation: portrait)')
  useDocumentTitle(`${TOPIC_LABEL[topic]} · ${SITE.name}`)

  // spread state = leaves turned; single-page state = page index
  const [current, setCurrent] = useState(0)
  const [page, setPage] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const filtersKey = filters.join(',')
  const lastFilters = useRef(filtersKey)

  // open on the cover, then turn to the contents
  useEffect(() => {
    setCurrent(0)
    setPage(0)
    const t = window.setTimeout(() => {
      setCurrent(1)
      setPage(book.tocPageIndex)
    }, 650)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic])

  // filters changed → back to the contents page (ref comparison survives StrictMode's double effects)
  useEffect(() => {
    if (lastFilters.current === filtersKey) return
    lastFilters.current = filtersKey
    setCurrent(1)
    setPage(book.tocPageIndex)
  }, [filtersKey, book.tocPageIndex])

  // keep both cursors in range when the book shrinks
  useEffect(() => {
    setCurrent((c) => Math.min(c, book.leaves.length))
    setPage((p) => Math.min(p, book.pages.length - 1))
  }, [book])

  useEffect(() => {
    playForTopic(topic)
  }, [topic, playForTopic])

  const close = useCallback(() => navigate('/'), [navigate])
  useFocusTrap(stageRef)

  const goToPage = useCallback(
    (pageIndex: number) => {
      setPage(pageIndex)
      setCurrent(currentForPage(pageIndex))
    },
    [],
  )
  const next = useCallback(() => {
    if (single) setPage((p) => Math.min(book.pages.length - 1, p + 1))
    else setCurrent((c) => Math.min(book.leaves.length, c + 1))
  }, [single, book])
  const prev = useCallback(() => {
    if (single) setPage((p) => Math.max(0, p - 1))
    else setCurrent((c) => Math.max(0, c - 1))
  }, [single])

  useWheelFlip(stageRef, { next, prev, enabled: !single })

  const onKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement
    if (/^(INPUT|TEXTAREA)$/.test(target.tagName)) return
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault()
        next()
        break
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault()
        prev()
        break
      case 'Home':
        e.preventDefault()
        goToPage(book.tocPageIndex)
        break
      case 'End':
        e.preventDefault()
        goToPage(book.pages.length - 1)
        break
      case 'Escape':
        e.preventDefault()
        close()
        break
    }
  }

  const ctx = useMemo(() => ({ topic, goToPage }), [topic, goToPage])
  const spreadLabel = current === 0 ? 'Cover' : current >= book.leaves.length ? 'Back cover' : `Pages ${current * 2 - 1}–${current * 2}`

  return (
    <div className="book-overlay" role="dialog" aria-modal="true" aria-label={`${TOPIC_LABEL[topic]} book`}>
      <div className="book-backdrop" onClick={close} />
      <div className="book-stage" ref={stageRef} tabIndex={-1} onKeyDown={onKeyDown}>
        <button type="button" className="book-close glass" onClick={close} aria-label="Close the book">
          <Icon name="close" size={18} />
        </button>
        <div className="book-top">
          <p className="font-hud text-[11px] uppercase tracking-[0.22em] text-fg/60">
            {TOPIC_LABEL[topic]} · {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
          </p>
          <FilterBar tone="dark" />
        </div>
        {single ? (
          <PageStack book={book} page={page} onPageChange={setPage} ctx={ctx} />
        ) : (
          <FlipBook book={book} current={current} onCurrentChange={setCurrent} ctx={ctx} />
        )}
        <div className="book-chrome">
          <button type="button" className="glass rounded-full px-4 py-2 font-hud text-[11px] text-fg/85 transition hover:bg-white/10" onClick={() => goToPage(book.tocPageIndex)}>
            Back to contents
          </button>
          {!single && <span className="font-hud text-[11px] text-fg/60">{spreadLabel} · click a page, scroll or use ← →</span>}
        </div>
      </div>
    </div>
  )
}
