Element.prototype.triggerAnEvent = function(eventName){
    if (typeof document.createEvent != 'undefined'){
        var event = document.createEvent("HTMLEvents");
        event.initEvent(eventName, false, true);
        this.dispatchEvent(event);
    }
    else this.fireEvent("on"+eventName);
}

var a_inputSpin = {
    activeSpin:null,
    lastState:null,
    init:function(){
        Array.prototype.slice.call(document.querySelectorAll('input[type=spin]')).forEach(function(el){
            a_inputSpin.initElement(el);
        });
    },
    initElement:function(element){
        element.setAttribute('type','text');
        element.addEventListener('mousedown',this.select);
        element.addEventListener('mousewheel', this.wheel, false);
        element.addEventListener('DOMMouseScroll', this.wheel, false);
    },
    select:function(event){
        a_inputSpin.activeSpin = this;
        a_inputSpin.lastState = event;
    },
    move:function(event){
        if(!this.activeSpin)return;

        this.changeValue(this.activeSpin,this.calculateDelta(event));
    },
    deselect:function(){
        this.activeSpin=null;
    },
    wheel:function(e){
        a_inputSpin.changeValue(this,Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))));
    },
    changeValue:function(element,delta){
        if(delta==0)return;
        var step = parseFloat(element.getAttribute('step'));
        var val = parseFloat(element.value);
        element.value = isNaN(val)?0:val + (isNaN(step)?5:step)*delta;
        if(element.hasAttribute('change'))element.triggerAnEvent('change');
    },
    calculateDelta:function(event){
        if(a_inputSpin.lastState.y == event.y)return 0;
        var delta = (a_inputSpin.lastState.y > event.y) * 2 - 1;
        a_inputSpin.lastState = event;
        return delta;
    }
};

window.addEventListener('load',function(){a_inputSpin.init();});
window.addEventListener('mousemove',function(e){a_inputSpin.move(e);});
window.addEventListener('mouseup',function(){a_inputSpin.deselect();});