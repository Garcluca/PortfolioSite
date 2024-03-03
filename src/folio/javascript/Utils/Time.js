import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter
{
    /**
     * Constructor
     */
    constructor()
    {
        super()

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        // binds tick to the most current instance of the class, letting the recursion run with updated values without the need to pass
        //otherwise the this variable will be undefined
        this.tick = this.tick.bind(this)  //binding this actually lets the sim go forward 
        this.tick()
    }

    /**
     * Tick
     */
    tick()
    {
        //could probably just be done wiht parameters as well
        this.ticker = window.requestAnimationFrame(this.tick)

        const current = Date.now()

        this.delta = current - this.current +10
        this.elapsed = current - this.start
        this.current = current

       // if(this.elapsed > 10000) {return}         //stops the sim after like 10 seconds

        if(this.delta > 60)
        {
            this.delta = 60
        }

        this.trigger('tick')
    }

    /**
     * Stop
     */
    stop()
    {
        window.cancelAnimationFrame(this.ticker)
    }
}
