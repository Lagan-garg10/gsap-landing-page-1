import React, { useRef, useState } from 'react'
import img1 from '../assets/images/slider-left-leaf.png'
import img2 from '../assets/images/slider-right-leaf.png'
import { sliderLists } from '../constants/index'
import rightArrow from '../assets/images/right-arrow.png'
import leftArrow from '../assets/images/left-arrow.png'
import cocktail1 from '../assets/images/drink1.png'
import cocktail2 from '../assets/images/drink2.png'
import cocktail3 from '../assets/images/drink3.png'
import cocktail4 from '../assets/images/drink4.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Menu = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const contentRef = useRef()
    const totalCocktails = sliderLists.length
    const goToSlide = (index)=>{
        const newIndex = (index+totalCocktails)%totalCocktails
        setCurrentIndex(newIndex)
    }
    const getCocktailAt = (indexOffSet)=>{
        return sliderLists[(currentIndex+indexOffSet+totalCocktails)%totalCocktails]
    }
    const currentCocktail = getCocktailAt(0)
    const prevCocktail = getCocktailAt(-1)
    const nextCocktail = getCocktailAt(1)

    useGSAP(()=>{
        gsap.fromTo('#title',{opacity:0},{opacity:1, duration:1})
        gsap.fromTo('.cocktail img',{opacity:0,xPercent:-100},{
            opacity:1,
            xPercent:0,
            duration:1,
            ease:'power1.inOut'
        })
        gsap.fromTo('.details h2',{yPercent:100,opacity:0},{
            yPercent:0,
            opacity:1,
            ease:'power1.inOut'
        })
        gsap.fromTo('.details p',{yPercent:100,opacity:0},{
            yPercent:0,
            opacity:1,
            ease:'power1.inOut'
        })
    },[currentIndex])
    return (
        <section id="menu" aria-labelledby='menu-heading'>
            <img src={img1} alt="left leaf" id='m-left-leaf' />
            <img src={img2} alt="right leaf" id='m-right-leaf' />
            <h2 id="menu-heading" className='sr-only'>Cocktail Menu</h2>
            <nav className="cocktail-tabs" aria-label='Cocktail Navigation'>
                {
                    sliderLists.map((cocktail, index) => {
                        const isActive = index == currentIndex
                        return <button key={cocktail.id} onClick={()=>goToSlide(index)} className={`${isActive ? 'text-white border-white' : 'border-white/50 text-white/50'}`}>
                            {cocktail.name}
                        </button>
                    })
                }
            </nav>
            <div className="content">
                <div className='arrows'>
                    <button className="text-left ml-10" onClick={()=>goToSlide(currentIndex-1)}>
                        <span>{prevCocktail.name}</span>
                        <img src={rightArrow} alt="right arrow" aria-hidden="true"/>
                    </button>
                    <button className="text-left mr-10" onClick={()=>goToSlide(currentIndex+1)}>
                        <span>{nextCocktail.name}</span>
                        <img src={leftArrow} alt="left arrow" aria-hidden="true"/>
                    </button>
                </div>
            </div>
            <div className='cocktail'>
                <img src={currentCocktail.image=='cocktail1'?cocktail1:currentCocktail.image=='cocktail2'?cocktail2:currentCocktail.image=='cocktail3'?cocktail3:cocktail4} alt="cocktail img" className='object-contain'/>
            </div>
            <div className="recipe">
                <div ref={contentRef} className='info ml-40'>
                    <p>Recipe For:</p>
                    <p id="title">{currentCocktail.name}</p>
                </div>
                <div className="details">
                    <h2>{currentCocktail.title}</h2>
                    <p>{currentCocktail.description}</p>
                </div>
            </div>
        </section>
    )
}

export default Menu
