// import leaf1 from "./assets/leaf5.png"
// import leaf2 from "./assets/leaf21.png"
import birds from "./assets/birds1.png"
import astronaut from "./assets/astronaut11.png"
import bgImg from "./assets/background-img.png"
import clouds from "./assets/clouds.png"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const App = () => {
    const [translateX, setTranslateX] = useState(0)
    const [translateY, setTranslateY] = useState(0)
    const [translateZ, setTranslateZ] = useState(0)
    const [zDirection, setZDirection] = useState(2)
    const [scale, setScale] = useState(1)
    const [scaleDirection, setScaleDirection] = useState(0.002)
    const [rotationDegree, setRotationDegree] = useState(0)
    const coludsRef = useRef<HTMLImageElement>(null)
    const astronautRef = useRef<HTMLImageElement>(null)
    const birdsRef = useRef<HTMLImageElement>(null)
    const smallTextRef = useRef<HTMLHeadingElement>(null)
    const BigTextRef = useRef<HTMLHeadingElement>(null)
    const tl = useRef<gsap.core.Timeline | null>(null)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (tl.current?.isActive()) return
            setTranslateX(e.clientX - window.innerWidth / 2)
            setTranslateY(e.clientY - window.innerHeight / 2)
            setRotationDegree(
                (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
            )
        }
        document.addEventListener("mousemove", handleMouseMove)

        return () => document.removeEventListener("mousemove", handleMouseMove)
    }, [])
    useEffect(() => {
        const timeout = setInterval(() => {
            if (tl.current?.isActive()) return
            setScale((prev) => prev + scaleDirection)
            setTranslateZ((prev) => prev + zDirection)
            if (scale >= 1.2) {
                setScaleDirection(-0.002)
            } else if (scale <= 1) {
                setScaleDirection(0.002)
            }
            if (translateZ >= 200) {
                setZDirection(-2)
            } else if (translateZ <= 0) {
                setZDirection(2)
            }
        }, 100)

        return () => clearInterval(timeout)
    }, [scale, scaleDirection, zDirection, translateZ])
    useGSAP(() => {
        tl.current = gsap
            .timeline()
            .from(coludsRef.current, {
                bottom: -window.innerHeight / 2,
                ease: "power3.out",
                duration: 1.5,
            })
            .from(astronautRef.current, { top: "130%", duration: 2 }, "<")
            .from(birdsRef.current, { top: "120%", duration: 1.5 }, "<")
            .from(
                smallTextRef.current,
                { y: -300, opacity: 0, delay: 1, duration: 2.5 },
                "<"
            )
            .from(
                BigTextRef.current,
                { y: window.innerHeight / 2 + 200, duration: 3 },
                "<"
            )
    })
    return (
        <div className="h-screen relative pointer-events-none overflow-hidden">
            <nav className="max-w-screen-lg mx-auto flex text-white justify-between items-center py-6 px-8 pointer-events-auto">
                <h1 className="text-2xl font-bold cursor-pointer">Majding</h1>
                <div>
                    <ul className="flex gap-3 lg:gap-6">
                        <li className="hover:text-black transition duration-300">
                            <a href="#">login</a>
                        </li>
                        <li className="hover:text-black transition duration-300">
                            <a href="#">signup</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <img
                src={bgImg}
                alt="background"
                className="absolute inset-0 min-w-[1920px] w-full h-full -z-10"
            />
            <img
                src={clouds}
                ref={coludsRef}
                alt="clouds"
                className="absolute -bottom-24 left-1/2 w-full min-w-[max(1530px,calc(100vw+230px))] transition duration-300 ease-custom-cubic"
                style={{
                    transform: `translateX(-50%) perspective(2300px) translateZ(-${translateZ}px)`,
                }}
            />
            <img
                src={birds}
                ref={birdsRef}
                alt="birds"
                className="absolute left-1/2 top-[74.69%] -translate-x-1/2 -translate-y-1/2 max-w-[325px] w-4/5 md:max-w-[470px] xl:max-w-[572px] xl:w-auto 3xl:max-w-none transition duration-300 ease-custom-cubic"
                style={{
                    transform: `translateX(calc(-50% + ${
                        translateX * 0.009
                    }px)) translateY(calc(-50% + ${translateY * 0.005}px))`,
                }}
            />
            <img
                src={astronaut}
                ref={astronautRef}
                alt="astronaut"
                className={
                    "transition-transform duration-300 ease-custom-cubic absolute left-1/2 top-1/2 max-w-48 w-5/12 md:max-w-52"
                }
                style={{
                    transform: `perspective(2300px) rotateY(${rotationDegree}deg) translateX(calc(-50% + ${
                        -translateX * 0.006
                    }px)) translateY(calc(-50% + ${
                        -translateY * 0.005
                    }px)) scale(${scale})`,
                }}
            />
            <div
                className="transition duration-300 ease-custom-cubic absolute left-1/2 top-1/2"
                style={{
                    transform: `perspective(2300px) translateX(-50%) translateY(-50%) rotateY(${
                        rotationDegree * 4
                    }deg)`,
                }}
            >
                <h2
                    className="text-4xl md:text-5xl lg:text-7xl text-neutral-800 text-center font-extralight tracking-widest"
                    ref={smallTextRef}
                >
                    Website for
                </h2>
                <h1
                    className="text-6xl md:text-7xl lg:text-9xl text-neutral-800 text-center font-bold tracking-widest"
                    ref={BigTextRef}
                >
                    Majd
                </h1>
            </div>
        </div>
    )
}

export default App

// <div className="h-screen relative overflow-hidden">
//                 {/* botton left */}
//                 <img
//                     src={leaf1}
//                     alt="leaf"
//                     className="absolute size-[630px] -left-60 rotate-[70deg] -bottom-28"
//                 />
//                 {/* top right */}
//                 <img
//                     src={leaf1}
//                     alt="leaf"
//                     className="absolute size-[500px] -right-48 -rotate-[130deg] -top-48"
//                 />
//                 {/* botton right */}
//                 <img
//                     src={leaf2}
//                     alt="leaf"
//                     className="absolute size-[700px] -right-0 -rotate-[25deg] -bottom-64"
//                 />
//                 {/* top */}
//                 <img
//                     src={leaf2}
//                     alt="leaf"
//                     className="absolute size-[600px] -left-44 rotate-[135deg] -top-60"
//                 />
//             </div>
