var body = document.body;

function myfun00(){
    document.addEventListener('mousemove', (e) => {
        var elem = document.createElement('div');
        var elem2 = document.createElement('div')
        // var elem3 = document.createElement('div')
    
        elem.setAttribute('class', 'trail')
        elem2.setAttribute('class','trail2')
    
        elem.setAttribute('style', `left: ${e.clientX - 10}px; top: ${e.clientY - 10}px;`);
        elem2.setAttribute('style', `left: ${e.clientX - 10}px; top: ${e.clientY - 10}px;`);
    
        // if (body.style.cursor = "pointer") {
        //     elem.remove();
        //     elem2.remove();
        // }
    
        elem.onanimationend = () => {
            elem.remove();
            elem2.remove();
        }
    
        body.insertAdjacentElement('beforeend', elem);
        body.insertAdjacentElement('beforeend', elem2);
    })
}

function myfun01() {
    document.getElementById("srch").style.color = "yellow"
    document.getElementById("srch").style.borderColor = "aliceblue"
    document.getElementById("srch").style.textShadow = "0 0 8px yellow"
    document.getElementById("srch").style.cursor = "none"

}

function fade0(qArr, currentQuestion, setCurrentQuestion) {
    var message = "Hello..." + qArr[currentQuestion].answer;
    document.getElementById('reghead0').style.animation = "fade-out 3s ease-out forwards";
    document.getElementById('reghead1').style.animation = "fade-out 3s ease-out forwards";
    document.getElementById('input01').style.animation = "fade-out 3s ease-out forwards";
    document.getElementById('nbdiv').style.animation = "fade-out 3s ease-out forwards";
    setTimeout(function () {
        document.getElementById('reghead0').textContent = message;
        document.getElementById('reghead0').style.animation = "fade-in 3s ease-out forwards";
        document.getElementById('reghead1').style.animation = "fade-in 3s ease-out 3s forwards";
        document.getElementById('input01').style.animation = "fade-in 3s ease-out 3s forwards";
        document.getElementById('nbdiv').style.animation = "fade-in 3s ease-out 3s forwards";
        setCurrentQuestion(currentQuestion + 1);
        // document.getElementById('nextbut02').style.animation = "fade-in 3s ease-out 3s forwards";
    }, 4000)
}


export default {
    myfun00,
    myfun01,
    fade0
};