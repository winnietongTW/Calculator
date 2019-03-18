//Keyboard
document.onkeydown = keyPress;
var calInput = document.querySelector(".calInput");
var calOutput = document.querySelector(".calOutput");
var cache = "";
var lastCha = "";
var outputScreen = "";
function keyPress(){
    var witchPress = event.keyCode;
    if(event.shiftKey){//shift pressing
        switch(witchPress){
            case 56://×
            case 187://+
                continueCalc();
                if(calInput.innerHTML == "" || isNaN(Number(lastCha)))
                    return;
                if(witchPress == 56)
                    btnInput("*", "×");
                else if(witchPress == 187)
                    btnInput("+", "+");
                break;
        }
    }else{
        switch(witchPress){
            case 27://esc
            case 67://c
                reset();
                break;
            case 108://enter
            case 13:
            case 187://=
                if(cache == "")
                    return;
                if(isNaN(Number(lastCha))){
                    if(lastCha != ".")
                        return;
                }
                if(eval(cache) % 1 == 0)
                    var result = eval(cache);
                else
                    var result = eval(cache).toFixed(2);
                reset();
                calOutput.innerHTML = result;
                break;
            case 8://backspace
                deleteLast();
                break;
            case 48://0
            case 96:
                if(calInput.innerHTML == "0")
                    return;
                if(lastCha == "0"){
                    var preCha = cache.substr(cache.length-2,1);
                    if(isNaN(Number(preCha)) && preCha != ".")
                        return;
                }
                btnInput("0", "0");
                break;
            case 49://1
            case 97:
            case 50://2
            case 98:
            case 51://3
            case 99:
            case 52://4
            case 100:
            case 53://5
            case 101:
            case 54://6
            case 102:
            case 55://7
            case 103:
            case 56://8
            case 104:
            case 57://9
            case 105:
                if(calInput.innerHTML == "0")
                    deleteLast();
                isLastZero();
                if(witchPress == 49 || witchPress == 97)
                    btnInput("1", "1");
                else if(witchPress == 50 || witchPress == 98)
                    btnInput("2", "2");
                else if(witchPress == 51 || witchPress == 99)
                    btnInput("3", "3");
                else if(witchPress == 52 || witchPress == 100)
                    btnInput("4", "4");
                else if(witchPress == 53 || witchPress == 101)
                    btnInput("5", "5");
                else if(witchPress == 54 || witchPress == 102)
                    btnInput("6", "6");
                else if(witchPress == 55 || witchPress == 103)
                    btnInput("7", "7");
                else if(witchPress == 56 || witchPress == 104)
                    btnInput("8", "8");
                else if(witchPress == 57 || witchPress == 105)
                    btnInput("9", "9");
                break;
            case 111://÷
            case 191:
            case 106://×
            case 107://+
            case 109://-
            case 189:
                continueCalc();
                if((witchPress == 109 || witchPress == 189) && calInput.innerHTML == "")
                    btnInput("-", "-");
                if(calInput.innerHTML == "" || isNaN(Number(lastCha)))
                    return;
                if(witchPress == 111 || witchPress == 191)
                    btnInput("/", "÷");
                else if(witchPress == 106)
                    btnInput("*", "×");
                else if(witchPress == 107)
                    btnInput("+", "+");
                else if(witchPress == 109 || witchPress == 189)
                    btnInput("-", "-");
                break;
            case 190://.
                if(calInput.innerHTML == ""){
                    cache += "0";
                    outputScreen += "0";
                }
                if(isNaN(Number(lastCha))){
                    if(lastCha == ".")
                        return;
                    else{
                        cache += "0";
                        outputScreen += "0";
                    }
                }else{
                    for(var i = 0; i<cache.length; i++){
                        var preCha = cache.substr(cache.length-(i+1),1);
                        if(isNaN(Number(preCha))){
                            if(preCha == ".")
                                return;
                            else{
                                btnInput(".", ".");
                                return;
                            }
                        }
                    }
                }
                btnInput(".", ".");
                break;
        }
    }
}

//Mouse
function btnClick(e){
    switch(e){
        case "0":
            if(calInput.innerHTML == "0")
                return;
            if(lastCha == "0"){
                var preCha = cache.substr(cache.length-2,1);
                if(isNaN(Number(preCha)) && preCha != ".")
                    return;
            }
            btnInput(e, e);
            break; 
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if(calInput.innerHTML == "0")
                deleteLast();
            isLastZero();
            btnInput(e, e);
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            continueCalc();
            if(e == "-" && calInput.innerHTML == "")
                btnInput(e, e);
            if(calInput.innerHTML == "" || isNaN(Number(lastCha)))
                return;
            if(e == "*")
                btnInput(e, "×");
            else if(e == "/")
                btnInput(e, "÷");
            else
                btnInput(e, e);
            break; 
        case ".":
            if(calInput.innerHTML == ""){
                cache += "0";
                outputScreen += "0";
            }
            if(isNaN(Number(lastCha))){
                if(lastCha == ".")
                    return;
                else{
                    cache += "0";
                    outputScreen += "0";
                }
            }else{
                for(var i = 0; i<cache.length; i++){
                    var preCha = cache.substr(cache.length-(i+1),1);
                    if(isNaN(Number(preCha))){
                        if(preCha == ".")
                            return;
                        else{
                            btnInput(e, e);
                            return;
                        }
                    }
                }
            }
            btnInput(e, e);
            break; 
        case "c":
            reset();
            break; 
        case "backspace":
            deleteLast();
            break;
        case "=":
            if(cache == "")
                return;
            if(isNaN(Number(lastCha))){
                if(lastCha != ".")
                    return;
            }
            if(eval(cache) % 1 == 0)
                var result = eval(cache);
            else
                var result = eval(cache).toFixed(2);
            reset();
            calOutput.innerHTML = result;
            break;
    }
}

function btnInput(number, unique){
    lastCha = number;
    cache += number;
    outputScreen += unique;
    calInput.innerHTML = outputScreen;
    calOutput.innerHTML = "";
}
function continueCalc(){
    if(calOutput.innerHTML != "" && calInput.innerHTML == ""){
        calInput.innerHTML = calOutput.innerHTML;
        cache = outputScreen = calOutput.innerHTML;
    }
}
function reset(){
    cache = "";
    outputScreen = "";
    calInput.innerHTML = "";
    calOutput.innerHTML = "";
    lastCha = "";
}
function deleteLast(){
    outputScreen = outputScreen.substr(0,outputScreen.length-1);
    cache = cache.substr(0,cache.length-1);
    calInput.innerHTML = outputScreen;
}
function isLastZero(){
    if(lastCha == "0"){
        for(var i = 0; i<cache.length; i++){
            var preCha = cache.substr(cache.length-(i+1),1);
            if(isNaN(Number(preCha))){
                if(preCha != ".")
                    deleteLast();
                    return;
            }
        }
    }
}