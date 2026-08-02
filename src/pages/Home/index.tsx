import { ProfileSection } from '@/components/home/ProfileSection'
import { ExperienceSection } from '@/components/home/ExperienceSection'
import { SkillsSection } from '@/components/home/SkillsSection'
import { EducationSection } from '@/components/home/EducationSection'

export function HomePage() {
  return (
    <>
      <ProfileSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
    </>
  )
}
