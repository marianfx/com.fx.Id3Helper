
import _ from 'lodash'

class Partition{
    constructor(array){
        this.elementsCount = _.size(array);
        this.array = _.cloneDeep(array);
        this.entropy = 0;
        this.count = 0;

        this.countPartition();
        this.computeEntropy();
    }
    

    countPartition(){
        for(var i = 0; i < this.elementsCount; i ++){
            var value = parseInt(this.array[i]);
            this.count += value;
        }
    }
    

    computeEntropy(){
        for(var i = 0; i < this.elementsCount; i ++){
            let value = parseInt(this.array[i]) / this.count;
            if(value != 0)
                this.entropy += value * Math.log2(1.0 / value);
        }
        
    }
}

export {Partition}