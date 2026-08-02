import { Container } from '@/components/common/Container'
import { PageTitle } from '@/components/common/PageTitle'
import { Section } from '@/components/common/Section'

export function DetailPage() {
  return (
    <>
      <Section>
        <Container>
          <PageTitle
            title="Detail"
            subtitle="Halaman detail untuk menampilkan informasi lebih lengkap — misalnya detail proyek."
          />
          <p className="max-w-2xl text-base leading-relaxed text-ink dark:text-ink-dark-soft">
            Halaman ini masih berupa placeholder dan akan diisi konten pada
            tahap berikutnya.
          </p>
        </Container>
      </Section>
    </>
  )
}
