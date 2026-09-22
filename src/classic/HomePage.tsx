import { SITE } from '@/config/site.config'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { Highlights } from '@/highlights/Highlights'

/** Classic home: the journey one-pager, ending on the thanks line; the site footer follows. */
export function HomePage() {
  useDocumentTitle(SITE.title, SITE.description)
  return <Highlights variant="page" />
}
