
interface IQueuable {
    //adds value to queue and returns new queue
    enqueue(value: string): string[];
    //removes item from queue, and returns the item removed
    dequeue(): string;
    //returns a list of all the items in the queue
    getQueue(): string[];
    //returns the number of items in the queue
    size():number;
}


class QUEUE implements IQueuable {
    readonly QUEUE_DEFAULT_LENGTH = 32;
    
    private queueData:string[];
    private queueSize:number;
    private queueLength:number;
    private topPointer:number;
    private bottomPointer:number
    


    constructor(start_length?:number) {
        //setting startLength to a default value if not inputed
        const startLength = start_length || this.QUEUE_DEFAULT_LENGTH;
        
        //initializing values
        this.queueData = new Array(startLength);
        this.queueSize = 0;
        this.queueLength = startLength;
        this.topPointer = 0;
        this.bottomPointer = 0;
    }
    
    dequeue(): string {
        //check if queue is empty
        if (this.queueSize === 0) {
            throw new Error("queue is empty");
        }
        //get output
        const output = this.queueData[this.bottomPointer];
        
        //shrink queue
        this.bottomPointer = (this.bottomPointer+1)%this.queueLength;
        this.queueSize--;

        return output;
    }


    enqueue(value:string):string[] {
        //check if queue is full
        if (this.queueSize === this.queueLength) {
            //resize if full
            this.resizeQueue();
        }
        //add item to queue
        this.queueData[this.topPointer] = value;

        //enlarge queue
        this.queueSize++;
        this.topPointer = (this.topPointer+1) % this.queueLength;

        return this.getQueue();
    }

    /**
     * returns size of the queue
     * @returns queue size
     */
    size(): number {
        return this.queueSize;
    }

    /**
     * returns a copy of the queue's data from first in to last in
     * @returns queue data copy
     */
    getQueue(): string[] {
        let output:string[] = new Array(this.queueSize);
        let printingPointer = this.bottomPointer;
        for (let index = 0; index < this.queueSize; index++){
            output[index] = this.queueData[printingPointer];
            printingPointer = (printingPointer+1)%this.queueLength;
        }
        return output;
    }

    
    /**
     * a function that doubles the size of the queue for when it is full
     * must be called when queue is full only
     */
    private resizeQueue() {
        if (this.queueSize !== this.queueLength){
            throw new Error("queue is not full");
        }


        //create a new queue of double the size
        const newLength = this.queueLength * 2;
        let newQueueData:string[] = new Array(newLength);

        //copy data from all queue to the new queue
        for (let index = 0; index < this.queueLength; index++) {
            newQueueData[index] = this.queueData[this.bottomPointer];

            this.bottomPointer = (this.bottomPointer+1) % this.queueLength;

        }
        
        //reset top and bottom pointers
        this.topPointer = this.queueSize
        this.bottomPointer = 0; 

        this.queueLength = newLength; // set queue to a new length
        this.queueData = newQueueData; // in C I would have freed the memory, but in typescript we leave this to the GC
    }
}

class STACK implements IQueuable {
    
    private stackData:string[];
    stackSize:number;
    private stackLength:number;



    constructor(){
        this.stackData = [];
        this.stackSize = 0;
        this.stackLength = 0;
        
    }

    enqueue(value: string): string[] {
        //check if stack is full
        if (this.stackSize === this.stackLength) {
            this.stackLength++;
            this.stackSize++;
            this.stackData.push(value)
            
        } else{
            
            this.stackData[this.stackSize] = value;
            this.stackSize++;
        }
        
        return this.getQueue();
    }

    dequeue(): string {
        if (this.stackSize === 0) {
            throw new Error("stack is empty");
        }
        
        this.stackSize--;

        const output = this.stackData[this.stackSize];        

        return output;
    }
    getQueue(): string[] {
        return this.stackData.slice(0, this.stackSize);
    }
    size(): number {
        return this.stackSize;
    }

}

