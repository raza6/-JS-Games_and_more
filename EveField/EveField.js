var startHTML = document.getElementById("start"),
    timeSpentHTML = document.getElementById("timeSpent"),
    gameTickHTML = document.getElementById("gameTick"),
    impPointHTML = document.getElementById("impPoint"),
    moneyHTML = document.getElementById("money"),
    incomeHTML = document.getElementById("income"),
    newsFeedHTML = document.getElementById("newsFeed"),
    upVar = 0,
    upTick = 0,
    gameEnded = false,
    gameStarted = false,
    //GameVar
    moneyTotal = 50000,
    income = 0;
    buildingTotal = 0,
    RNGEvent = 0,
    rEventPending = false;

const factField = 10;

/*
Objet building
*/
function Building(name, total, cost, mod){
    this.name = name;
    this.HTML = document.getElementById(name);
    this.HTMLU = document.getElementById(name + "U");
    this.HTMLD = document.getElementById(name + "D");
    this.total = total;
    this.cost = cost;
    this.mod = mod;
    this.addOne = addOne;
    this.deleteOne = deleteOne;
    var self = this; //IMMONDE
    this.HTMLU.addEventListener("click", function(){
        if(gameStarted && !gameEnded){
            self.addOne();
        }
    }, false);
    this.HTMLD.addEventListener("click", function(){
        if(gameStarted && !gameEnded){
            self.deleteOne();
        }
    }, false);
}

var CarrotField = new Building("carrotField", 0, 500, 1),
    AppleField = new Building("appleField", 0, 500, 1),
    WheatField = new Building("wheatField", 0, 500, 1),
    CarrotHangar = new Building("carrotHangar", 0, 5000, 1),
    AppleHangar = new Building("appleHangar", 0, 5000, 1),
    WheatHangar = new Building("wheatHangar", 0, 5000, 1),
    Bakery = new Building("bakery", 0 , 30000, 0),
    Windmill = new Building("windmill", 0, 30000, 0),
    Factory = new Building("factory", 0, 100000, 0);

function addOne(){
    //Check money
    if(moneyTotal >= this.cost){
        //Check building
        if(buildingTotal < 30){
            this.total++;
            this.HTML.innerHTML = this.total;
            moneyTotal -= this.cost;
            moneyHTML.innerHTML = displayMoney(moneyTotal);
            buildingTotal++;
            impPointHTML.innerHTML = 30-buildingTotal;
            if(this.total == 1){
                var tempImgHTML = document.getElementById("F" + this.name);
                tempImgHTML.style.display = "inherit";        
            }
        }else{
            messaging("You don't have enough improvement point to upgrade the " + this.name + " !", ("add_noImpPoint_" + this.name));
        }
    }else{
        messaging("You don't have enough money to afford a " + this.name + " !", ("add_noMoney_" + this.name));
    }
}

function deleteOne(){
    //Check money
    if(moneyTotal >= this.cost/2){
        //Check building
        if(this.total > 0){
            this.total--;
            this.HTML.innerHTML = this.total;
            moneyTotal -= this.cost/2;
            moneyHTML.innerHTML = displayMoney(moneyTotal);
            buildingTotal--;
            impPointHTML.innerHTML = 30-buildingTotal;
            if(this.total == 0){
                var tempImgHTML = document.getElementById("F" + this.name);
                tempImgHTML.style.display = "none";        
            }
        }
    }else{
        messaging("You don't have enough money to bulldoze a " + this.name + " !", ("delete_noMoney_" + this.name));
    }
}

function calculateMod(){
    //Basic synergy
    if(WheatField.total/CarrotField.total <= 2.5 && WheatField.total/CarrotField.total >= 1.5 && WheatField.total/AppleField.total <= 2.5 && WheatField.total/AppleField.total >= 1.5){
        WheatField.mod = 1.5;
        AppleField.mod = 1.5;
        CarrotField.mod = 1.5;
    }else{
        WheatField.mod = 1;
        AppleField.mod = 1;
        CarrotField.mod = 1;
    }
    //Calculate Hangar modificator
    AppleHangar.mod = 1 + Math.ceil(1.8*(Math.log(1+AppleHangar.total)/Math.log(1.2)));
    CarrotHangar.mod = 1 + Math.ceil(1.8*(Math.log(1+CarrotHangar.total)/Math.log(1.2)));
    WheatHangar.mod = 1 + Math.ceil(1.8*(Math.log(1+WheatHangar.total)/Math.log(1.2)));

    //Calculate Special Building modificator
    if(Windmill.total > 0){
        if((WheatField.total)-(2*Windmill.total) >= 0){ //If there is 2 times more field than windmill -> +200/windmill
            Windmill.mod = 200*Windmill.total;
        }else{ //Else -> +200/windmill - 200/useless windmill part
            Windmill.mod = (200*Windmill.total) + (200*((WheatField.total)-(2*Windmill.total)));
        }
    }
    
    if(Bakery.total > 0 && Windmill.total > 0){
        if((AppleField.total+CarrotField.total)-(4*Bakery.total) >= 0){ //If there is 4 times more field than bakery -> +200/bakery
            Bakery.mod = 200*Bakery.total;
        }else{ //Else -> +200/bakery - 150/useless bakery part
            Bakery.mod = (200*Bakery.total) + (150*((AppleField.total+CarrotField.total)-(4*Bakery.total)));
        }
        if(Factory.total > 0){
            if((Bakery.total+Windmill.total)-(2*Factory.total) >= 0){ //If there is 2 times more bakery-windmill than factory -> +1000/factory
                Factory.mod = 1000*Factory.total;
            }else{ //Else -> +1000/factory - 500/useless factory part
                Factory.mod = (1000*Factory.total) + (500*((Bakery.total+Windmill.total)-(2*Factory.total)));
            }
        }
    }
}

function calculateIncome(){
    income = Math.ceil(
        WheatField.total*factField*WheatField.mod*WheatHangar.mod + 
        AppleField.total*factField*AppleField.mod*AppleHangar.mod + 
        CarrotField.total*factField*CarrotField.mod*CarrotHangar.mod +
        Bakery.mod + Windmill.mod + Factory.mod);
}

function calculateMoney(){
    moneyTotal += income;
    moneyTotal = Math.ceil(moneyTotal);
    moneyHTML.innerHTML = displayMoney(moneyTotal);
    incomeHTML.innerHTML = displayMoney(income);
}

function displayMoney(number){//Display money properly
    var group1, group2; 
    if(number%1000 < 10){
        group1 = "00" + number%1000;
    }else if(number%1000 < 100){
        group1 = "0" + number%1000;
    }else{
        group1 = number%1000;
    }

    if((Math.trunc((number%1000000)/1000)) < 10){
        group2 = "00" + (Math.trunc((number%1000000)/1000));
    }else if((Math.trunc((number%1000000)/1000)) < 100){
        group2 = "0" + (Math.trunc((number%1000000)/1000));
    }else{
        group2 = (Math.trunc((number%1000000)/1000));
    }


    if(number >= 1000000){
        return (Math.trunc(number/1000000))+ "," + group2 + "," + group1;
    }else if(number >= 1000){
        return (Math.trunc(number/1000)) + "," + group1;
    }else{
        return number;
    }
}

function Event(name, id, length){
    this.name = name;
    this.id = id;
    this.length = length;
    this.alreadyOccured = false;
    this.launchEvent = launchEvent;
    this.managementEvent = managementEvent;
}    

MoneyHeist1 = new Event("Money Heist 1", 1, 1);
MoneyHeist2 = new Event("Money Heist 2", 2, 1);
Mole = new Event("Mole", 3, 10);
Accident = new Event("Accident", 4, 10);
Strike = new Event("Strike", 5, 10);
Storm = new Event("Storm", 6, 10);
RabbitInvasion = new Event("Rabbit Invasion", 7, 10);
LocustInvasion = new Event("Locust Invasion", 8, 10);
Debt = new Event("Debt", 9, 10);
Aliens = new Event("Aliens", 10, 10);

var Events = [MoneyHeist1, MoneyHeist2, Mole, Accident, Strike, Storm, RabbitInvasion, LocustInvasion, Debt, Aliens];

function launchEvent(){
    switch (this.id){
        case 1 :
            if(!this.alreadyOccured){ //This event never occured before
                messaging("Someone broke into the farm and stole $" + (Math.ceil(moneyTotal*0.7)) + " !", "event_moneyHeist1");
                moneyTotal -= (moneyTotal*0.7);
                console.log("Money Heist 1 !");
                this.managementEvent();
            }
            break;
        case 2 :
            if(!this.alreadyOccured){
                messaging("Someone broke into the farm and stole $" + (Math.ceil(moneyTotal*0.8)) + " !", "event_moneyHeist2");
                moneyTotal -= (moneyTotal*0.8);
                console.log("Money Heist 2 !");
                this.managementEvent();
            }
            break;
        case 3 :
            if(!this.alreadyOccured){
                messaging("Our fields are invaded by mole for " + (this.length-1) + " days ! ", "event_mole");
                WheatField.mod -= 0.6;
                CarrotField.mod -= 0.6;
                AppleField.mod -= 0.6;
                calculateIncome();
                console.log("Mole !");
                this.managementEvent();
            }
            break;
        case 4 :
            if(!this.alreadyOccured){
                messaging("Accidents happened in the hangars, it will take " + (this.length-1) + " days to repair it ! ", "event_accident");
                AppleHangar.mod -= AppleHangar.mod*0.5;
                CarrotHangar.mod -= CarrotHangar.mod*0.5;
                WheatHangar.mod -= WheatHangar.mod*0.5;
                calculateIncome();
                console.log("Accident !");
                this.managementEvent();
            }
            break;
        case 5 :
            if(!this.alreadyOccured){
                messaging("Our employes are on strike for " + (this.length-1) + " days ! ", "event_strike");
                bakery.mod -= Bakery.mod*0.8;
                Windmill.mod -= Windmill.mod*0.8;
                Factory.mod -= Factory.mod*0.8;
                calculateIncome();
                console.log("Strike !");
                this.managementEvent();
            }
            break;
        case 6 :
            if(!this.alreadyOccured){
                messaging("There is a storm in the region. It will affect our production for " + (this.length-1) + " days ! ", "event_storm");
                Windmill.mod += Windmill.mod*2;
                WheatField.mod -= 0.6;
                CarrotField.mod -= 0.6;
                AppleField.mod -= 0.6;
                calculateIncome();
                console.log("Storm !");
                this.managementEvent();
            }
            break;
        case 7 :
            if(!this.alreadyOccured){
                messaging("Damnit, we are invaded by rabbits ! I guess they will leave in " + (this.length-1) + " days ! ", "event_rabbitInvasion");
                CarrotField.mod = 0;
                Bakery.mod -= Bakery.mod*0.5;
                calculateIncome();
                console.log("Rabbit Invasion !");
                this.managementEvent();
            }
            break;
        case 8 :
            if(!this.alreadyOccured){
                messaging("Is this a plague of Egypt ? We are invaded by locusts ! It will probably end in " + (this.length-1) + " days ! ", "event_locustInvasion");
                WheatField.mod = 0;
                Windmill.mod -= Windmill.mod*0.75;
                calculateIncome();
                console.log("Locust Invasion !");
                this.managementEvent();
            }
            break;
        case 9 :
            if(!this.alreadyOccured){
                messaging("The bank realized that you have unpaid invoices ! They will take all of your income for " + (this.length-1) + " days ! ", "event_debt");
                income = 0;
                console.log("Debt !");
                this.managementEvent();
            }
            break;
        case 10 :
            if(!this.alreadyOccured){
                messaging("Are these aliens ?", "event_aliens");
                income = Math.floor(Math.random() * (income - 1));
                console.log("Aliens ?");
                this.managementEvent();
            }
            break;
    } 
}

function managementEvent(){
    rEventPending = true;//An event is pending
    this.length--;
    if(this.length == 0){//When this event is about to end, we consider that it has occured and there is no more ongoing event
        this.alreadyOccured = true;
        rEventPending = false;
    }
}

function randomEvent(){
    if(!rEventPending){ //We can generate new random number if there is no ongoing event
        RNGEvent= Math.floor(Math.random() * (200 - 1));
    }
    console.log("rand : " + RNGEvent);
    if(upTick > 30 && upTick < 355 && RNGEvent < Events.length){ //We can launch event if we are in the time interval
        Events[RNGEvent].launchEvent();
    }
}

function messaging(message, id){
    if(!gameEnded){
        var messageHTML = document.createElement("span");
        messageHTML.id = id;
        messageHTML.innerHTML = "Day " + (365-upTick) + " - " + message;
        if(newsFeedHTML.lastChild.id == id){ //Last message identical -> update
            newsFeedHTML.lastChild.remove();
            newsFeedHTML.appendChild(messageHTML);
        }else{
            if(newsFeedHTML.childNodes.length == 5){ //Too many messages -> delete first
                newsFeedHTML.firstChild.remove();
                newsFeedHTML.appendChild(messageHTML);
            }else{
                newsFeedHTML.appendChild(messageHTML);
            }
        }
    }
}

/*
GameLoop
*/
function update () {
    upVar++;
    timeSpentHTML.innerHTML = upVar/10;
    //GameTick
    if(upVar%5 == 0){
        //Update gameTick
        upTick++;
        gameTickHTML.innerHTML = 365-upTick;
        //Update Mod
        calculateMod();
        //calculate income
        calculateIncome();
        //Update random event (may update income)
        randomEvent();
        //Update money
        calculateMoney();
        if(moneyTotal >= 1000000 || upTick >= 365){
            if(moneyTotal >= 1000000){
                messaging("Congratulation ! Now the farm is safe, thank you so much !", "win");
            }else{
                messaging("Too bad ! You didn't succeed to save the farm. I guess this place will become a ruin...", "lose");
            }
            gameEnded = true;
        }
    }

    if(!gameEnded){
        setTimeout(update, 100);
    }
}

messaging("I hope you're ready to save this farm from bankruptcy ! We need to earn $1,000,000 within a year to be safe. You can read the economy handbook if needed. Press start when you're ready.", "start");
startHTML.addEventListener("click", function(){
    update();
    gameStarted = true;
    startHTML.remove();
}, false);
