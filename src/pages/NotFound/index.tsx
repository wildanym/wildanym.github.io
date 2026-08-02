import { Link } from 'react-router'
import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <Section className="flex flex-col items-center text-center">
      <Container>
        <h1 className="text-6xl font-bold text-brand-600 dark:text-brand-400">404</h1>
        <p className="mt-4 text-lg text-ink dark:text-ink-dark-soft">
          Halaman yang Anda cari tidak ditemukan.
        </p>
        <Link to="/" className="mt-8 inline-block">
          <Button size="lg">Kembali ke Home</Button>
        </Link>
      </Container>
    </Section>
  )
}
