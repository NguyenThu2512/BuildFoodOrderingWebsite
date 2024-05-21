import SectionHeader from "./SectionHeader";

export default function Introduction() {
  return (
    <div className="mt-8" id="about">
        <SectionHeader subTitle={'Our story'} mainTitle={'About us'}/>
        <div className="text-center max-w-2xl mx-auto flex-col mt-4">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum totam laborum cumque velit blanditiis magni. Nobis esse cum porro sequi labore! Nam molestiae cum pariatur voluptas, doloremque aliquid voluptate odit.</p>
            <p className="mt-4"> Repellat nihil sed ratione qui saepe recusandae ipsa quo eius doloribus alias, quos suscipit? Perferendis molestias modi dolor magnam rerum veniam repellat!</p>
            <p className="mt-4"> Velit cupiditate maiores expedita earum aut deleniti quos iusto. Quidem quo, aliquam et explicabo nulla commodi.</p>
        </div>
    </div>
  )
}
