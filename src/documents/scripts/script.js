// Variables
var names = {
    town: "",
    mayor: ""
},
wood = {
    name: "wood",
    amount: 0,
    increment: 0,
    max: 500,
    storage: 0,
    storageCost: {
        wood: 50,
        stone: 50
    }
},
stone = {
    name: "stone",
    amount: 0,
    increment: 0,
    max: 500,
    storage: 0,
    storageCost: {
        wood: 50,
        stone: 50
    }
},
food = {
    name: "food",
    amount: 0,
    increment: 0,
    max: 500,
    storage: 0,
    storageCost: {
        wood: 50,
        stone: 50
    }
},
ore = {
    name: "ore",
    increment: 0,
    amount: 0,
    max: 200,
    storage: 0,
    iron: {
        name: "iron",
        amount: 0
    },
    copper: {
        name: "copper",
        amount: 0
    },
    silver: {
        name: "silver",
        amount: 0
    },
    gold: {
        name: "gold",
        amount: 0
    },
    storageCost: {
        wood: 200,
        stone: 200,
        iron: 100
    }
},
worker = {
    name: "worker",
    amount: 0,
    lumberjack: {
        increment: 1,
        amount: 0,
        cost: 10
    },
    miner: {
        increment: 1,
        amount: 0,
        cost: 10
    },
    stonemason: {
        increment: 1,
        amount: 0,
        cost: 15
    },
    hunter: {
        increment: 1,
        amount: 0,
        cost: 10
    },
    metalurgist: {
        increment: 1,
        amount: 0,
        cost: 20
    }
}, // Buildings
tent = {
    amount: 0,
    residents: 1,
    cost: {
        wood: 30
    }
},
house = {
    amount: 0,
    residents: 4,
    cost: {
        wood: 75,
        stone: 25
    }
},
hostel = {
    amount: 0,
    residents: 10,
    cost: {
        wood: 200,
        stone: 215
    }
},
metalworks = {
    amount: 0,
    capacity: 2,
    cost: {
        wood: 200,
        stone: 200,
        iron: 100
    }
};
var maxPop = (tent.residents * tent.amount) + (house.residents * house.amount);
var clickIncrement = 1; // Consider changing this to specific materials.

// All OnLoad Functions
// Modal Commented out during development
$(document).ready(function () {
    //$('#onLoadModal').modal();
    beginTick();
    updateValues();
});

// Get town and moyor names and display them.
$('#modalClose').click(function () {
    names.town = document.getElementById('town').value;
    document.getElementById("townName").innerHTML = names.town;
    names.mayor = document.getElementById('mayor').value;
    document.getElementById("mayorName").innerHTML = names.mayor;
});

function beginTick() {
    nIntervId = setInterval(tick, 5000);
}

function tick() {
    gatherWood();
    gatherStone();
    gatherFood();
    gatherOre();
}

// Display the correct values.
function updateValues() {
    document.getElementById("woodAmount").innerHTML = wood.amount;
    document.getElementById("maxWood").innerHTML = wood.max;
    document.getElementById("woodIncrement").innerHTML = wood.increment;
    document.getElementById("stoneAmount").innerHTML = stone.amount;
    document.getElementById("maxStone").innerHTML = stone.max;
    document.getElementById("stoneIncrement").innerHTML = stone.increment;
    document.getElementById("foodAmount").innerHTML = food.amount;
    document.getElementById("maxFood").innerHTML = food.max;
    document.getElementById("foodIncrement").innerHTML = food.increment;
    document.getElementById("ironAmount").innerHTML = ore.iron.amount;
    document.getElementById("copperAmount").innerHTML = ore.copper.amount;
    document.getElementById("silverAmount").innerHTML = ore.silver.amount;
    document.getElementById("goldAmount").innerHTML = ore.gold.amount;
    document.getElementById("oreAmount").innerHTML = ore.amount;
    document.getElementById("maxOre").innerHTML = ore.max;
    document.getElementById("oreIncrement").innerHTML = ore.increment;
    document.getElementById("workerAmount").innerHTML = worker.amount;
    document.getElementById("maxPop").innerHTML = maxPop;
    document.getElementById("lumberjackAmount").innerHTML = worker.lumberjack.amount;
    document.getElementById("lumberjackCost").innerHTML = worker.lumberjack.cost;
    document.getElementById("stonemasonAmount").innerHTML = worker.stonemason.amount;
    document.getElementById("stonemasonCost").innerHTML = worker.stonemason.cost;
    document.getElementById("minerAmount").innerHTML = worker.miner.amount;
    document.getElementById("minerCost").innerHTML = worker.miner.cost;
    document.getElementById("hunterAmount").innerHTML = worker.hunter.amount;
    document.getElementById("hunterCost").innerHTML = worker.hunter.cost;
    document.getElementById("metalurgistAmount").innerHTML = worker.metalurgist.amount;
    document.getElementById("metalurgistCost").innerHTML = worker.metalurgist.cost;
    document.getElementById("tentAmount").innerHTML = tent.amount;
    document.getElementById("tentCostWood").innerHTML = tent.cost.wood;
    document.getElementById("tentResidents").innerHTML = tent.residents;
    document.getElementById("houseAmount").innerHTML = house.amount;
    document.getElementById("houseCostWood").innerHTML = house.cost.wood;
    document.getElementById("houseCostStone").innerHTML = house.cost.stone;
    document.getElementById("houseResidents").innerHTML = house.residents;
    document.getElementById("hostelAmount").innerHTML = hostel.amount;
    document.getElementById("hostelCostWood").innerHTML = hostel.cost.wood;
    document.getElementById("hostelCostStone").innerHTML = hostel.cost.stone;
    document.getElementById("hostelResidents").innerHTML = hostel.residents;
    document.getElementById("metalWorksAmount").innerHTML = metalworks.amount;
    document.getElementById("metalWorksCostWood").innerHTML = metalworks.cost.wood;
    document.getElementById("metalWorksCostStone").innerHTML = metalworks.cost.stone;
    document.getElementById("woodStorageAmount").innerHTML = wood.storage;
    document.getElementById("woodStorageCostWood").innerHTML = wood.storageCost.wood;
    document.getElementById("woodStorageCostStone").innerHTML = wood.storageCost.stone;
    document.getElementById("stoneStorageAmount").innerHTML = stone.storage;
    document.getElementById("stoneStorageCostWood").innerHTML = stone.storageCost.wood;
    document.getElementById("stoneStorageCostStone").innerHTML = stone.storageCost.stone;
    document.getElementById("foodStorageAmount").innerHTML = food.storage;
    document.getElementById("foodStorageCostWood").innerHTML = food.storageCost.wood;
    document.getElementById("foodStorageCostStone").innerHTML = food.storageCost.stone;
    document.getElementById("oreStorageAmount").innerHTML = ore.storage;
    document.getElementById("oreStorageCostWood").innerHTML = ore.storageCost.wood;
    document.getElementById("oreStorageCostStone").innerHTML = ore.storageCost.stone;
    document.getElementById("oreStorageCostIron").innerHTML = ore.storageCost.iron;
}

// Click to Chop, Mine, Gather
$('#chopWood').click(function () {
    wood.amount = wood.amount + clickIncrement;
    checkMaxWood();
    updateValues();
});

$('#mineStone').click(function () {
    stone.amount = stone.amount + clickIncrement;
    checkMaxStone();
    updateValues();
});

$('#gatherFood').click(function () {
    food.amount = food.amount + clickIncrement;
    checkMaxFood();
    updateValues();
});

$('#mineOre').click(function () {
    ores = ['i', 'i', 'i', 'i', 'c', 'c', 'c', 's', 's', 'g'];
    oreChoice = ores[Math.floor(Math.random() * ores.length)];
    if (oreChoice == 'i') {
        ore.iron.amount += clickIncrement;
    } else if (oreChoice == 'c') {
        ore.copper.amount += clickIncrement;
    } else if (oreChoice == 's') {
        ore.silver.amount += clickIncrement;
    } else {
        ore.gold.amount += clickIncrement;
    }
    ore.amount += clickIncrement;
    console.log(oreChoice);
    checkMaxOre();
    updateValues();
});

// Create Workers
$('#createLumberjack').click(function () {
    if (worker.amount < maxPop) {
        if (food.amount >= worker.lumberjack.cost) {
            food.amount -= worker.lumberjack.cost;
            worker.amount++;
            worker.lumberjack.amount++;
            worker.lumberjack.cost++;
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));
        }
    } else {
        $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
    }
});

$('#createStonemason').click(function () {
    if (worker.amount < maxPop) {
        if (food.amount >= worker.stonemason.cost) {
            food.amount -= worker.stonemason.cost;
            worker.amount++;
            worker.stonemason.amount++;
            worker.stonemason.cost++;
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));
        }
    } else {
        $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
    }
});

$('#createMiner').click(function () {
    if (worker.amount < maxPop) {
        if (food.amount >= worker.miner.cost) {
            food.amount -= worker.miner.cost;
            worker.amount++;
            worker.miner.amount++;
            worker.miner.cost++;
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));
        }
    } else {
        $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
    }
});

$('#createHunter').click(function () {
    if (worker.amount < maxPop) {
        if (food.amount >= worker.hunter.cost) {
            food.amount -= worker.hunter.cost;
            worker.amount++;
            worker.hunter.amount++;
            worker.hunter.cost++;
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));
        }
    } else {
        $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
    }
});

$('#createMetalurgist').click(function () {
    if (worker.amount < maxPop) {
        if (food.amount >= worker.metalurgist.cost) {
            food.amount -= worker.metalurgist.cost;
            worker.amount++;
            worker.metalurgist.amount++;
            worker.metalurgist.cost++;
            updateValues();
        } else {
            $("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));
        }
    } else {
        $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
    }
});

// Lumberjacks Gather Wood
function gatherWood() {
    wood.increment = worker.lumberjack.increment * worker.lumberjack.amount;
    wood.amount += wood.increment;
    checkMaxWood();
    updateValues();
}

// Miner Gather Stone
function gatherStone() {
    stone.increment = worker.stonemason.increment * worker.stonemason.amount;
    stone.amount += stone.increment;
    checkMaxStone();
    updateValues();
}

// Hunter Gather Food
function gatherFood() {
    food.increment = worker.hunter.increment * worker.hunter.amount;
    food.amount += food.increment;
    checkMaxFood();
    updateValues();
}

// Miner Mine Ore
function gatherOre() {
    ores = ['t', 't', 't', 't', 't', 'i', 'i', 'i', 'i', 'c', 'c', 'c', 's', 's', 'g'];
    oreChoice = ores[Math.floor(Math.random() * ores.length)];
    if (oreChoice == 'i') {
        ore.iron.amount += ore.increment;
    } else if (oreChoice == 'c') {
        ore.copper.amount += ore.increment;
    } else if (oreChoice == 's') {
        ore.silver.amount += ore.increment;
    } else if (oreChoice == 't') {
        stone.amount += ore.increment;
    } else {
        ore.gold.amount += ore.increment;
    }
    ore.amount += ore.increment;
    ore.increment = worker.miner.increment * worker.miner.amount;
    ore.amount += ore.increment;
    checkMaxOre();
    updateValues();
}

// Test max resources
function checkMaxWood() {
    if (wood.amount > wood.max) {
        wood.amount = wood.max;
    }
}

function checkMaxStone() {
    if (stone.amount > stone.max) {
        stone.amount = stone.max;
    }
}

function checkMaxFood() {
    if (food.amount > food.max) {
        food.amount = food.max;
    }
}

function checkMaxOre() {
    if (ore.iron.amount + ore.copper.amount + ore.silver.amount + ore.gold.amount > ore.max) {
        ore.amount = ore.max;
    }
}

// Build a tent
$('#buildTent').click(function () {
    if (wood.amount >= tent.cost.wood) {
        wood.amount -= tent.cost.wood;
        tent.amount++;
        tent.cost.wood = tent.cost.wood * 1.2;
        tent.cost.wood = tent.cost.wood.toFixed(0);
        maxPop += tent.residents;
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more wood.</p>').fadeIn('slow'));
    }
});

// Build a house
$('#buildHouse').click(function () {
    if (wood.amount >= house.cost.wood && stone.amount >= house.cost.stone) {
        wood.amount -= house.cost.wood;
        stone.amount -= house.cost.stone;
        house.amount++;
        house.cost.wood = house.cost.wood * 1.2;
        house.cost.stone = house.cost.stone * 1.2;
        house.cost.wood = house.cost.wood.toFixed(0);
        house.cost.stone = house.cost.stone.toFixed(0);
        maxPop += house.residents;
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
    }
});

// Research Hostel
$('#researchHostel').click(function () {
    if (wood.amount >= 400 && stone.amount >= 150) {
        wood.amount -= 400;
        stone.amount -= 150;

        $('#researchHostel').addClass('hidden');
        $('.progress-wrap').removeClass('hidden');

        var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
        var getProgressWrapWidth = $('.progress-wrap').width();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 25000;

        $('.progress-bar').stop().animate({
            left: progressTotal
        },
        animationLength,

        function () {
            $('#buildHostel').removeClass('hidden');
            $('.progress-wrap').addClass('hidden');
            $('.hostelInfo').removeClass('hidden');
            $('.hostelResearchInfo').addClass('hidden');
        });
    } else {
        $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
    }
});

// Build a hostel
$('#buildHostel').click(function () {
    if (wood.amount >= hostel.cost.wood && stone.amount >= hostel.cost.stone) {
        wood.amount -= hostel.cost.wood;
        stone.amount -= hostel.cost.stone;
        hostel.amount++;
        hostel.cost.wood = hostel.cost.wood * 1.2;
        hostel.cost.stone = hostel.cost.stone * 1.2;
        hostel.cost.wood = hostel.cost.wood.toFixed(0);
        hostel.cost.stone = hostel.cost.stone.toFixed(0);
        maxPop += hostel.residents;
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
    }
});

// Research metalworks
$('#researchMetalworks').click(function () {
    if (wood.amount >= 400 && stone.amount >= 150) {
        wood.amount -= 400;
        stone.amount -= 150;

        $('#researchMetalworks').addClass('hidden');
        $('.progress-wrap').removeClass('hidden');

        var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
        var getProgressWrapWidth = $('.progress-wrap').width();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 25000;

        $('.progress-bar').stop().animate({
            left: progressTotal
        },
        animationLength,

        function () {
            $('#buildMetalworks').removeClass('hidden');
            $('.progress-wrap').addClass('hidden');
            $('.metalworksInfo').removeClass('hidden');
            $('.metalworksResearchInfo').addClass('hidden');
        });
    } else {
        $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
    }
});

// Build a metalworks
$('#buildMetalworks').click(function () {
    if (wood.amount >= metalworks.cost.wood && stone.amount >= metalworks.cost.stone && ore.iron.amount >= metalworks.cost.ore.iron) {
        wood.amount -= metalworks.cost.wood;
        stone.amount -= metalworks.cost.stone;
        ore.iron.amount -= metalworks.cost.ore.iron;
        metalworks.amount++;
        metalworks.cost.wood = metalworks.cost.wood * 1.2;
        metalworks.cost.stone = metalworks.cost.stone * 1.2;
        metalworks.cost.wood = metalworks.cost.wood.toFixed(0);
        metalworks.cost.stone = metalworks.cost.stone.toFixed(0);
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
    }
});

// Build wood storage
$('#buildWoodStorage').click(function () {
    if (wood.amount >= wood.storageCost.wood && stone.amount >= wood.storageCost.stone) {
        wood.amount -= wood.storageCost.wood;
        stone.amount -= wood.storageCost.stone;
        wood.storage++;
        wood.max += 100;
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
    }
});

// Build stone storage
$('#buildStoneStorage').click(function () {
    if (wood.amount >= stone.storageCost.wood && stone.amount >= stone.storageCost.stone) {
        wood.amount -= stone.storageCost.wood;
        stone.amount -= stone.storageCost.stone;
        stone.storage++;
        stone.max += 100;
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
    }
});

// Build food storage
$('#buildFoodStorage').click(function () {
    if (wood.amount >= food.storageCost.wood && stone.amount >= food.storageCost.stone) {
        wood.amount -= food.storageCost.wood;
        stone.amount -= food.storageCost.stone;
        food.storage++;
        food.max += 100;
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
    }
});

// Build Ore Storage
$('#buildOreStorage').click(function () {
    if (wood.amount >= ore.storageCost.wood && stone.amount >= ore.storageCost.stone) {
        wood.amount -= ore.storageCost.wood;
        stone.amount -= ore.storageCost.stone;
        ore.storage++;
        ore.max += 100;
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
    }
});
// Upgrades
$('#upgradeTwoFingers').click(function () {
    if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
        wood.amount -= 100;
        stone.amount -= 100;
        food.amount -= 100;
        clickIncrement += 1;
        $('.upgradeTwoFingers').addClass('hidden');
        $('.upgradeFiveFingers').removeClass('hidden');
        $("#upgrades").prepend($('<p>Two Fingers | Two Resources Per Click</p>').fadeIn('slow'));
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    }
});

$('#upgradeFiveFingers').click(function () {
    if (wood.amount >= 450 && stone.amount >= 450 && food.amount >= 120) {
        wood.amount -= 450;
        stone.amount -= 450;
        food.amount -= 120;
        clickIncrement += 3;
        $('.upgradeFiveFingers').addClass('hidden');
        $("#upgrades").prepend($('<p>Five Fingers | Five Resources Per Click</p>').fadeIn('slow'));
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    }
});

$('#upgradeDoubleSleepingBags').click(function () {
    if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
        wood.amount -= 100;
        stone.amount -= 100;
        food.amount -= 100;
        tent.residents = 2;
        maxPop += tent.amount; //This only works because we are adding ONE resident.
        $('.upgradeDoubleSleepingBags').addClass('hidden');
        $("#upgrades").prepend($('<p>Double Sleeping Bags | Two People, One Tent</p>').fadeIn('slow'));
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    }
});

$('#upgradeBunkBeds').click(function () {
    if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
        wood.amount -= 100;
        stone.amount -= 100;
        food.amount -= 100;
        house.residents = 5;
        maxPop += house.amount; //This only works because we are adding ONE resident.
        $('.upgradeBunkBeds').addClass('hidden');
        $("#upgrades").prepend($('<p>Bunk Beds | Five People, One House</p>').fadeIn('slow'));
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    }
});

$('#upgradeSharpenAxes').click(function () {
    if (wood.amount >= 50 && stone.amount >= 100 && food.amount >= 50) {
        wood.amount -= 50;
        stone.amount -= 100;
        food.amount -= 50;
        worker.lumberjack.increment = 2;
        $('.upgradeSharpenAxes').addClass('hidden');
        $("#upgrades").prepend($('<p>Sharpen Axes | Lumberjacks Chop Two Wood Each</p>').fadeIn('slow'));
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    }
});

$('#upgradeSharpenPicks').click(function () {
    if (wood.amount >= 50 && stone.amount >= 100 && food.amount >= 50) {
        wood.amount -= 50;
        stone.amount -= 100;
        food.amount -= 50;
        worker.miner.increment = 2;
        $('.upgradeSharpenPicks').addClass('hidden');
        $("#upgrades").prepend($('<p>Sharpen Picks | Miners Mine Two Stone Each</p>').fadeIn('slow'));
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    }
});

$('#upgradeSharpenArrows').click(function () {
    if (wood.amount >= 50 && stone.amount >= 100 && food.amount >= 50) {
        wood.amount -= 50;
        stone.amount -= 100;
        food.amount -= 50;
        worker.hunter.increment = 2;
        $('.upgradeSharpenArrows').addClass('hidden');
        $("#upgrades").prepend($('<p>Sharpen Arrows | Hunters Gather Two Food Each</p>').fadeIn('slow'));
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    }
});

$('#upgradeMatesRatesWood').click(function () {
    if (stone.amount >= 150 && food.amount >= 50) {
        stone.amount -= 150;
        food.amount -= 50;
        house.cost.wood -= 20;
        tent.cost.wood -= 15;
        $('.upgradeMatesRatesWood').addClass('hidden');
        $("#upgrades").prepend($('<p>Mates Rates - Wood | Houses and Tents Cost Less Wood</p>').fadeIn('slow'));
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    }
});

$('#upgradeMatesRatesStone').click(function () {
    if (wood.amount >= 150 && food.amount >= 50) {
        wood.amount -= 150;
        food.amount -= 50;
        house.cost.stone -= 20;
        $('.upgradeMatesRatesStone').addClass('hidden');
        $("#upgrades").prepend($('<p>Mates Rates - Stone | Houses Cost Less Stone</p>').fadeIn('slow'));
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    }
});

//* TESTING VALUES
wood.amount = 300;
stone.amount = 300;
food.amount = 300;
ore.amount = 0;