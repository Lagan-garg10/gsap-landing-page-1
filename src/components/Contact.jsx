import React from 'react'
import leaf1 from '../assets/images/footer-left-leaf.png'
import leaf2 from '../assets/images/footer-right-leaf.png'
import { openingHours, socials } from '../constants'
import insta from '../assets/images/insta.png'
import twitter from '../assets/images/x.png'
import facebook from '../assets/images/fb.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'

const Contact = () => {
    useGSAP(()=>{
        const titleSplit = SplitText.create('#content h2',{type:'words'})
        const timeline = gsap.timeline({
            scrollTrigger:{
                start:'top center',
                trigger:'#contact',
            },
            ease:'power1.inOut'
        })
        timeline
            .from(titleSplit.words,{
                opacity:0,
                yPercent:100,
                stagger:0.02
            })
            .from('#contact h3, #contact p',{
                opacity:0,
                yPercent:100,
                stagger:0.02
            })
            .to('#f-right-leaf',{
                y:-50,
                duration:1,
                ease:'power1.inOut'
            })
            .to('#f-left-leaf',{
                y:-50,
                duration:1,
                ease:'power1.inOut'
            },'<')
    })
  return (
    <footer id="contact">
        <img src={leaf2} alt="right leaf" id='f-right-leaf'/>
        <img src={leaf1} alt="left leaf" id='f-left-leaf'/>
        <div className="content">
            <h2>Where To Find Us</h2>
            <div>
                <h3>Visit Our Bar</h3>
                <p>456, Raq Blvd, #404, Los Angeles, CA 90210</p>
            </div>
            <div>
                <h3>Contact Us</h3>
                <p>(555) 987-6543</p>
                <p>hello@velvetPour.gmail.com</p>
            </div>
            <div>
                <h3>Open Every Day</h3>
                {
                    openingHours.map((time)=>{
                        return <p key={time.day}>
                            {time.day} : {time.time}
                        </p>
                    })
                }
            </div>
            <div>
                <h3>Socials</h3>
                <div className='flex-center gap-5'>
                    {
                        socials.map((social)=>{
                            return <a href={social.url} key={social.name} target='_blank' rel="noopener norefferer" aria-label={social.name}>
                                <img src={social.icon=='insta'?insta:social.icon=='facebook'?facebook:twitter} alt="" />
                            </a>
                        })
                    }
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Contact
