import { useRef } from 'react'
import leftLeaf from '../assets/images/hero-left-leaf.png'
import rightLeaf from '../assets/images/hero-right-leaf.png'
import { useGSAP } from '@gsap/react'
import { SplitText, ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import video1 from '../assets/videos/output.mp4'
import { useMediaQuery } from 'react-responsive'

const Hero = () => {
    const videoRef = useRef()
    const isMobile = useMediaQuery({maxWidth:767})
    useGSAP(()=>{
        const heroSplit = new SplitText('.title',{type:'chars, words'})
        const paragraphSplit = new SplitText('.subtitle',{type:'lines'})

        heroSplit.chars.forEach((char)=>{
            char.classList.add('text-gradient')
        })

        gsap.from(heroSplit.chars,{
            yPercent:'100',
            duration:1.8,
            ease:'expo.out',
            stagger:0.06
        })

        gsap.from(paragraphSplit.lines,{
            opacity:0,
            yPercent:'100',
            duration:1.8,
            ease:'expo.out',
            stagger:0.06,
            delay:1
        })

        gsap.timeline({
            scrollTrigger:{
                trigger:"#hero",
                start:'top top',
                end:'bottom top',
                scrub:true
            }
        })
        .to('.right-leaf',{y:200},0)
        .to('.left-leaf',{y:-200},0)

        const startValue = isMobile?'top 50%':'center 60%'
        const endValue = isMobile?'120% top':'bottom -18%'

        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:'video',
                scrub:true,
                pin:true,
                start:startValue,
                end:endValue
            }
        })

        videoRef.current.onloadedmetadata = ()=>{
            tl.to(videoRef.current, {
                currentTime:videoRef.current.duration
            })
        }
    },[])
  return (
    <>
        <section id='hero' className='noisy'>
            <h1 className='title mt-[80px]'>MOJITO</h1>
            <img src={leftLeaf} alt="left leaf" className='left-leaf' />
            <img src={rightLeaf} alt="right leaf" className='right-leaf' />
            <div className="body">
                <div className="content">
                    <div className='space-y-5 hidden md:block mb-[-70px]'>
                        <p>Cool. Crisp. Classic.</p>
                        <p className="subtitle">
                            Sip the Spirit <br/> of summer
                        </p>
                    </div>
                    <div className="view-cocktails mb-[-70px]">
                        <p className="subtitle">
                            Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses. 
                        </p>
                        <a href="#cocktails">view cocktails</a>
                    </div>
                </div>
            </div>
        </section>
        <div className="video absolute inset-0">
            <video src={video1} muted playsInline preload='auto' ref={videoRef}></video>
        </div>
    </>
  )
}

export default Hero
