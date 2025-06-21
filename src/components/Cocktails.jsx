import { useGSAP } from '@gsap/react'
import {ScrollTrigger} from 'gsap/all'
import cocktailLeftLeaf from '../assets/images/cocktail-left-leaf.png'
import cocktailRightLeaf from '../assets/images/cocktail-right-leaf.png'
import { cocktailLists, mockTailLists } from '../constants'
import gsap from 'gsap'

const Cocktails = () => {
    useGSAP(()=>{
        const parllaxTimeline = gsap.timeline({
            scrollTrigger:{
                trigger:'#cocktails',
                start:'top 30%',
                end:'bottom 80%',
                scrub:true
            }
        })

        parllaxTimeline
        .from('#c-left-leaf',{
            x:-100,
            y:100
        })
        .from('#c-right-leaf',{
            x:100,
            y:100
        })
    })
  return (
    <section className="noisy" id="cocktails">
        <img src={cocktailLeftLeaf} alt="cocktail left leaf" id='c-left-leaf'/>
        <img src={cocktailRightLeaf} alt="cocktail right leaf" id='c-right-leaf'/>
        <div className="list mb-[250px]">
            <div className="popular">
                <h2>Most Popular Cocktails</h2>
                <ul>
                    {
                        cocktailLists.map(({name,country,detail,price})=>{
                            return <li key={name}>
                                <div className='md:me-28'>
                                    <h3>{name}</h3>
                                    <p>{country} | {detail}</p>
                                </div>
                                <span>- {price}</span>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="loved">
                <h2>Most Loved Mocktails</h2>
                <ul>
                    {
                        mockTailLists.map(({name,country,detail,price})=>{
                            return <li key={name}>
                                <div className='me-28'>
                                    <h3>{name}</h3>
                                    <p>{country} | {detail}</p>
                                </div>
                                <span>- {price}</span>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    </section>
  )
}
export default Cocktails
