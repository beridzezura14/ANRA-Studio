import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const items = [
  "Python",
  "HTML",
  "CSS",
  "SCSS",
  "Javascript",
  "DOM Manipulation",
  "Tailwind CSS",
  "Python",
  "HTML",
  "CSS",
  "SCSS",
  "Javascript",
  "DOM Manipulation",
  "Tailwind CSS",  
  "Python",
  "HTML",
  "CSS",
  "SCSS",
  "Javascript",
  "DOM Manipulation",
  "Tailwind CSS",  
  "Python",
  "HTML",
  "CSS",
  "SCSS",
  "Javascript",
  "DOM Manipulation",
  "Tailwind CSS",  
  "Python",
  "HTML",
  "CSS",
  "SCSS",
  "Javascript",
  "DOM Manipulation",
  "Tailwind CSS",
]

export default function Map() {
  const containerRef = useRef(null)
  const listRef = useRef(null)
  const animationRef = useRef(null)
  const baseSpeed = 0.3 // საწყისი სიჩქარე

  useEffect(() => {
    const totalWidth = listRef.current.scrollWidth

    const animation = gsap.to(listRef.current, {
      x: -totalWidth / 2,
      duration: 40,
      ease: "linear",
      repeat: -1,
    })

    animation.timeScale(baseSpeed)
    animationRef.current = animation

    let targetScale = baseSpeed
    let currentScale = baseSpeed

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const velocity = self.getVelocity()
        const speedUp = Math.min(Math.abs(velocity) * 0.05, 5) // მაქსიმუმ 5-ის დაყენება შეგვიძლია
        targetScale = velocity > 0 ? speedUp : -speedUp
      }

    })

    gsap.ticker.add(() => {
      currentScale = lerp(currentScale, targetScale, 0.1)
      animationRef.current?.timeScale(currentScale)

      targetScale = baseSpeed
    })
  }, [])


  return (
      <div ref={containerRef} className="relative z-10 overflow-hidden w-[110%] ml-[-5%] rotate-[0deg] py-6  bg-[#F9CB99]">
          <ul ref={listRef} className="flex gap-0 whitespace-nowrap w-max text-[#222831] font-medium" >
              {items.map((item, i) => (
                  <li key={i}  className="stroke text-3xl py-2 px-4 font-poppins font-bold uppercase stroke-black">
                      {item} <span className="ml-6">&#10022;</span>
                  </li>
              ))}
          </ul>
      </div>
  )
}
