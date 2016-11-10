
import $ from 'jquery'
import _ from 'lodash'
import {Partition} from './partition'

class App{
    constructor(){
        this.hasPartitions = false;
    }

    onDeviceReady(){

    }

    displayMessage(message, msgType = "warning"){
        swal({
            title: "Damn, esé",
            text: message,
            type: msgType,
            showCancelButton: false,
            confirmButtonText: "Oooook."
        });
    }

    drawInputs(){
        let count = $('#theinterval').val();
        
        for(var i = 0; i < count; i ++){
            var element =   "<div class=\"row\">\
                                <div class=\"input-field col s12 m6 l6\">\
                                    <input placeholder=\"Ex. 5 6 8 12 etc\" id=\"partition" + i + "\" type=\"text\" class=\"validate\">\
                                    <label for=\"partition" + i + "\" class=\"active\">Partition " + (i + 1) + ":</label>\
                                </div>\
                            </div>";
            $('#partitionscontainer').append(element);
            
        }
    }

    undrawInputs(){
        $('#partitionscontainer').html("");
    }


    /**
     * @param {Partition[]} partitions
     */
    computeValues(partitions){

        let IG = partitions[0].entropy;
        let countG = partitions[0].count;

        for(var i = 1; i < _.size(partitions); i ++){
            let partition = partitions[i];
            let countP = partition.count;
            let entropy = partition.entropy;
            IG = IG - (((1.0 * countP) / (1.0 * countG)) * (1.0 * entropy));
        }

        return {
            ig: IG.toFixed(4),
            base: partitions[0],
            allpartitions: partitions
        };
    }

    submit(){
        
        let partitions = [];
        
        let baseArray = $('#baseclasses').val().toString().split(' ').filter(function(x) { return (x != undefined && x != null && x != "") ; })
        let baseCount = _.size(baseArray);
        console.log(baseArray);

        var basePartition = new Partition(baseArray);
        partitions.push(basePartition);

        // check if base classes were entered
        if(baseCount == 0){
            this.displayMessage("You must enter at least one base class for output.", "error");
            return;
        }

        // check if partitions were added
        let partitionsCount = $('#theinterval').val();
        if(partitionsCount == 0 || this.hasPartitions == false){
            this.displayMessage("You must add at least one partition.", "error");
            return;
        }

        for(var i = 0; i < partitionsCount; i++){
            let element = $('#partition' + i);
            
            if(!element){
                this.displayMessage("Partition " + (i + 1) + " does not exist. Please create / recreate the partitions.");
                return;
            }
            
            let values = element.val().split(' ').filter(function(x) { return (x != undefined && x != null && x != "") ; });
            let valCount = _.size(values);
            console.log(values);

            if(valCount != baseCount){
                this.displayMessage("Partition " + (i + 1) + " has " + valCount + " values; it should have " + baseCount + " values (the same as the base partition)." );
                return;
            }

            let tempPart = new Partition(values);
            partitions.push(tempPart);
        }

        // check for sum equality partitions - base
        let N = partitions[0].elementsCount;
        
        for(var i = 0; i < N; i++){
            let baseValue = partitions[0].getValue(i);
            let sum = 0;
            for(var j = 1; j < _.size(partitions); j++){
                let partValue = partitions[j].getValue(i);
                sum += partValue;
            }
            if (sum != baseValue){
                this.displayMessage("Sum of values for partitions (on 'columns' / 'classes') should sum up to the value of the base class (column). This does not apply on COLUMN " + (i + 1) + ".");
                return;
            }
        }

        let result = this.computeValues(partitions);
        console.log(result);

        let color = "class='green-text'";
        if(result.ig < 0.05)
            color = "class='red-text'";
        var ig = "<h5 " + color + "><b>IG: " + result.ig + "</b></h5>"; 
        $('#outputs').html(ig);
        var base = "<h5><b>H(S)</b>: " + result.base.entropy + "</h5>"; 
        $('#outputs').append(base);
        for(var i = 1; i < _.size(result.allpartitions); i ++){
            var val = "<h5><b>H(P" + i + ")</b>: " + result.allpartitions[i].entropy + "</h5>";  
            $('#outputs').append(val);
        }
    }

    handlePartitions(){
        var isit = $('#theindicator').is(":checked");

        if(!isit){
            // i am disabling it, so do the disabling technique
            this.hasPartitions = false;
            this.undrawInputs();
        }
        else{
            // i am enabling it
            this.hasPartitions = true;
            this.drawInputs();
        }
    }

    bootstrap(){
        
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        $('#theindicator').click(this.handlePartitions.bind(this));
        $('#submitBtn').click(this.submit.bind(this));
    }
}

export {App}