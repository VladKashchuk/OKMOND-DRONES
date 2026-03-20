interface SectionSepProps {
  num: string
  label: string
}

export default function SectionSep({ num, label }: SectionSepProps) {
  return (
    <div className="section-sep" data-reveal="fade">
      <span>{num}</span>
      <div className="sep-line"></div>
      <span>{label}</span>
      <div className="sep-line"></div>
    </div>
  )
}
