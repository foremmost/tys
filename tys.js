class _EventBus{
    constructor(){
        const _ = this;
        _.events = {};
    }
    on (eventName, listener) {
        const _ = this;
        if (!_.events[eventName]) {
            _.events[eventName] = []
        }
        console.warn(`Подписка на событие ${eventName} с ф-ей ${listener.name}`);
        _.events[eventName].push(listener)
    };
    trigger (eventName, data) {
        const _ = this;
        const event = this.events[eventName];
        console.warn(`Событие ${eventName} с данными ${data}`)
        if (!event || !event.length) {
            return
        }
        event.forEach(listener => listener(data))
    }
}
let EventBus = new _EventBus();
class Tys{
    constructor(view){
        const _ = this;
        _.questions = [];
        _.answers = [];
        _.name = '';
        _.view = view;
        // ratings
        //EventBus.trigger('inputName',null);
        EventBus.on('saveQuestion',_.saveQuestion.bind(this));
    }
    // методы
    addName(){

    }
    saveQuestion(data){
        const _ = this;
        _.questions.push(data);
    }
    loadQuestions(){}
    chooseAnswer(){}
    calcAnswers(){}
    inputName(){}
    saveResult(){}
    getRatings(){}
}

class TysCtrlHTML{
    constructor(){
        const _ = this;
        _.handler();
    }
    handler(){
        let form = document.querySelector('#questForm');

        if(!form) return;
        form.addEventListener('click',function (e) {
           e.preventDefault();
           let elem = e.target;
           if(elem.tagName != 'BUTTON') return;
           switch (elem.dataset.action) {
               case 'addQuestion':{
                   EventBus.trigger('addQuestion',null);
               }break;
           }
        });
    }
}


class TysViewConsole{
    constructor(){
        const _ = this;
        EventBus.on('inputName',_.consoleInputName);
        //console.log('#- Отображение из консоли -#');
    }
    consoleInputName(){
        console.log('Здоров: '+prompt('Введите ваше имя'));
    }
}
class TysViewHTML{
    constructor(){
        const _ = this;
        //EventBus.on('inputName',_.inputName);
        EventBus.on('addQuestion',_.addQuestion.bind(this));
    }
    createElement(tag){
        return document.createElement(tag);
    }
    append(parent,child){
        parent.appendChild(child);
    }
    inputName(){
        const _ = this;
        let name = prompt('Введите ваше имя');
        let div = _.createElement('DIV');
        div.id = 'name';
        div.textContent = name;
        _.append(document.body,div);
    }
    addQuestion(){
        const _ = this;
        let form = document.querySelector('#questForm'),
            li = _.createElement('LI');
        li.id = 'name';
        let data = questCat.options[questCat.selectedIndex].textContent+' '+question.value;
        EventBus.trigger('saveQuestion',data);
        li.textContent = data;
        _.append(document.querySelector('#questList'),li);
        form.reset();
    }
}



new TysViewHTML();
new TysCtrlHTML();
//new TysViewConsole();
var tys = new Tys();


/*let test = {
    a : 4, b: 6,
    add : function(){
        return (function f() {
            return this.a +this.b;
        }).bind(this)();
    }
}
test.add();*/ // 10