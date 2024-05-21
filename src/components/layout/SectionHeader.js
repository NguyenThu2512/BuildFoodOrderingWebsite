
export default function SectionHeader({subTitle, mainTitle}) {
  return (
    <div className="text-center mt-4 uppercase">
        <h3 className="font-bold text-xl text-gray-500">{subTitle}</h3>
        <h2 className="text-bold font-extrabold text-4xl text-primary italic">{mainTitle}</h2>
    </div>
  )
}
