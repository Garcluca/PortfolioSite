import { TweenLite } from 'gsap/TweenLite'

export default class ThreejsJourney
{
    constructor(_options)
    {
        // Options
        this.config = _options.config
        this.time = _options.time
        this.world = _options.world

        // Setup
        this.$container = document.querySelector('.js-threejs-journey')
        this.$messages = [...this.$container.querySelectorAll('.js-message')]
        this.$yes = this.$container.querySelector('.js-yes')
        this.$no = this.$container.querySelector('.js-no')
        this.step = 0
        this.maxStep = this.$messages.length - 1
        this.seenCount = window.localStorage.getItem('threejsJourneySeenCount') || 0
        this.seenCount = parseInt(this.seenCount)
        this.shown = false
        this.traveledDistance = 0
        this.minTraveledDistance = (this.config.debug ? 5 : 75) * (this.seenCount + 1)
        this.prevent = !!window.localStorage.getItem('threejsJourneyPrevent')

        if(this.config.debug)
            this.start()
        
        if(this.prevent)
            return

        this.setYesNo()
        this.setLog()

        this.time.on('tick', () =>
        {
            if(this.world.physics)
            {
                this.traveledDistance += this.world.physics.car.forwardSpeed

                if(!this.config.touch && !this.shown && this.traveledDistance > this.minTraveledDistance)
                {
                    this.start()
                }
            }
        })
    }

    setYesNo()
    {
    //     // Clicks
    //     this.$yes.addEventListener('click', () =>
    //     {
    //         TweenLite.delayedCall(2, () =>
    //         {
    //             this.hide()
    //         })
    //         window.localStorage.setItem('threejsJourneyPrevent', 1)
    //     })

    //     this.$no.addEventListener('click', () =>
    //     {
    //         this.next()

    //         TweenLite.delayedCall(5, () =>
    //         {
    //             this.hide()
    //         })
    //     })

    //     // Hovers
    //     this.$yes.addEventListener('mouseenter', () =>
    //     {
    //         this.$container.classList.remove('is-hover-none')
    //         this.$container.classList.remove('is-hover-no')
    //         this.$container.classList.add('is-hover-yes')
    //     })

    //     this.$no.addEventListener('mouseenter', () =>
    //     {
    //         this.$container.classList.remove('is-hover-none')
    //         this.$container.classList.add('is-hover-no')
    //         this.$container.classList.remove('is-hover-yes')
    //     })

    //     this.$yes.addEventListener('mouseleave', () =>
    //     {
    //         this.$container.classList.add('is-hover-none')
    //         this.$container.classList.remove('is-hover-no')
    //         this.$container.classList.remove('is-hover-yes')
    //     })

    //     this.$no.addEventListener('mouseleave', () =>
    //     {
    //         this.$container.classList.add('is-hover-none')
    //         this.$container.classList.remove('is-hover-no')
    //         this.$container.classList.remove('is-hover-yes')
    //     })
    }

    setLog()
    {
//         console.log(
//             `%c 
// ▶
// ▶▶▶▶
// ▶▶▶▶▶▶▶
// ▶▶▶▶▶▶▶▶▶▶
// ▶▶▶▶▶▶▶▶     ▶
// ▶▶▶▶      ▶▶▶▶▶▶▶▶
// ▶     ▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶
//    ▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶
//       ▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶      
// ▶▶        ▶▶▶▶▶▶▶▶▶▶     ▶   ▶▶▶
// ▶▶▶▶▶▶        ▶      ▶▶▶▶▶   ▶▶▶▶▶▶
// ▶▶▶▶▶▶▶▶▶▶▶       ▶▶▶▶▶▶▶▶   ▶▶▶▶▶▶▶▶▶
// ▶▶▶▶▶▶▶▶▶▶▶▶▶   ▶▶▶▶▶▶▶▶▶▶   ▶▶▶▶▶▶▶
// ▶▶▶▶▶▶▶▶▶▶▶▶▶   ▶▶▶▶▶▶▶▶▶▶   ▶▶▶▶
// ▶▶▶▶▶▶▶▶▶▶▶▶▶   ▶▶▶▶▶▶▶▶▶▶   ▶
//  ▶▶▶▶▶▶▶▶▶▶▶▶   ▶▶▶▶▶▶▶▶▶▶
//      ▶▶▶▶▶▶▶▶   ▶▶▶▶▶▶▶
// ▶▶▶▶     ▶▶▶▶   ▶▶▶
// ▶▶▶▶▶▶▶     ▶   
// ▶▶▶▶▶▶▶▶▶▶
// ▶▶▶▶▶▶▶
// ▶▶
//             `,
//             'color: #705df2;'
//         )
        
        console.log('%cHey there, look like you know your way around the dev tools', 'color: #32ffce');
        console.log('%cI\'n not gonna lie, I learned a lot but diving through obsfucated bytecode and nonsense dependencies from a pre-2020 codebase was the most tedious thing I\'ve ever done', 'color: #32ffce');
        console.log('%c I added a bunch of new code, models, physics, and collision but I bootstaped this from bruno simon\s original site', 'color: #32ffce');
        console.log('%cCheck out his course here https://threejs-journey.com?c=p2', 'color: #32ffce');
        console.log('%cI didn\'t end up using the course but if you are starting from scratch it\'s probably an easier stert', 'color: #32ffce');

    }

    hide()
    {
        for(const _$message of this.$messages)
        {
            _$message.classList.remove('is-visible')
        }

        TweenLite.delayedCall(0.5, () =>
        {
            this.$container.classList.remove('is-active')
        })
    }

    start()
    {
        this.$container.classList.add('is-active')

        window.requestAnimationFrame(() =>
        {
            this.next()

            TweenLite.delayedCall(4, () =>
            {
                this.next()
            })
            TweenLite.delayedCall(7, () =>
            {
                this.next()
            })
        })

        this.shown = true
        
        window.localStorage.setItem('threejsJourneySeenCount', this.seenCount + 1)
    }

    updateMessages()
    {
        let i = 0

        // Visibility
        for(const _$message of this.$messages)
        {
            if(i < this.step)
                _$message.classList.add('is-visible')

            i++
        }

        // Position
        this.$messages.reverse()

        let height = 0
        i = this.maxStep
        for(const _$message of this.$messages)
        {
            const messageHeight = _$message.offsetHeight
            if(i < this.step)
            {
                _$message.style.transform = `translateY(${- height}px)`
                height += messageHeight + 20
            }
            else
            {
                _$message.style.transform = `translateY(${messageHeight}px)`
            }

            i--
        }


        this.$messages.reverse()
    }

    next()
    {
        if(this.step > this.maxStep)
            return

        this.step++

        this.updateMessages()
    }
}