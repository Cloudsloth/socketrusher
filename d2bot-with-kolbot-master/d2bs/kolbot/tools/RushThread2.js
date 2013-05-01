/**
*	@filename	RushThread.js
*	@author		kolton
*	@desc		Second half of the Rusher script
*/

js_strict(true);

include("json2.js");
include("NTItemParser.dbl");
include("OOG.js");
include("Gambling.js");
include("AutoMule.js");
include("common/Attack.js");
include("common/Cubing.js");
include("common/Config.js");
include("common/CollMap.js");
include("common/Loader.js");
include("common/Misc.js");
include("common/Pickit.js");
include("common/Pather.js");
include("common/Precast.js");
include("common/Prototypes.js");
include("common/Runewords.js");
include("common/Storage.js");
include("common/Town.js");

var gidList = [];

function main() {
	this.playerIn = function (area) {
		if (!area) {
			area = me.area;
		}

		var party = getParty();

		if (party) {
			do {
				if (party.name !== me.name && party.area === area) {
					return true;
				}
			} while (party.getNext());
		}

		return false;
	};

	this.playersInAct = function (act) {
		var area, party,
			areas = [0, 1, 40, 75, 103, 109];

		if (!act) {
			act = me.act;
		}

		area = areas[act];
		party = getParty();

		if (party) {
			do {
				if (party.name !== me.name && party.area !== area) {
					return false;
				}
			} while (party.getNext());
		}

		return true;
	};

	this.andariel = function () {
		delay(5000);
		say("momiaa quest");
		delay(100);
		say("momiab quest");
		delay(100);
		say("momiac quest");
		delay(100);
		say("momiad quest");
		delay(100);
		say("momiae quest");
		delay(100);
		say("momiaf quest");
		delay(100);
		say("momiag quest");
		delay(100);
		say("momiah quest");
		Town.doChores();
		Pather.useWaypoint(35);
		Precast.doPrecast(true);

		if (!Pather.moveToExit([36, 37], true) || !Pather.moveTo(22582, 9612)) {
			throw new Error("andy failed");
		}

		Pather.makePortal();
		Attack.clear(25);
		say("1");

		while (!this.playerIn()) {
			Pather.moveTo(22582, 9612);
			delay(250);
		}

		Pather.moveTo(22579, 9593);
		Attack.kill(156);
		Pather.moveTo(22582, 9612);
		Pather.usePortal(null, me.name);
		say("a2");
		Pather.useWaypoint(40);

		while (!this.playersInAct(2)) {
			delay(250);
		}

		return true;
	};
	

	this.cube = function () {
		if (me.diff === 0) {
			Pather.useWaypoint(57);
			Precast.doPrecast(true);

			if (!Pather.moveToExit(60, true) || !Pather.moveToPreset(me.area, 2, 354)) {
				throw new Error("cube failed");
			}

			Pather.makePortal();
			Attack.clear(25);
			delay(500);
			say("1");

			while (!this.playerIn()) {
				Attack.clear(20);
				delay(250);
			}

			while (this.playerIn()) {
				delay(250);
			}

			Pather.usePortal(null, me.name);
		}

		return true;
	};

	this.amulet = function () {
		Town.doChores();
		Pather.useWaypoint(44);
		Precast.doPrecast(true);

		if (!Pather.moveToExit([45, 58, 61], true) || !Pather.moveTo(15044, 14045)) {
			throw new Error("amulet failed");
		}

		Pather.makePortal();
		say("1");

		var altaMonsta = getUnit(1),
			monList = [];

		if (altaMonsta) {
			do {
				if (Attack.checkMonster(altaMonsta) && (!checkCollision(me, altaMonsta, 1) && getDistance(me, altaMonsta) <= 15)) {
					monList.push(copyUnit(altaMonsta));
				}
			} while (altaMonsta.getNext());
		}

		Attack.clearList(monList);

		while (!this.playerIn()) {
			delay(250);
		}

		while (this.playerIn()) {
			delay(250);
		}

		Pather.usePortal(null, me.name);

		return true;
	};

	this.staff = function () {
		Town.doChores();
		Pather.useWaypoint(43);
		Precast.doPrecast(true);

		if (!Pather.moveToExit([62, 63, 64], true) || !Pather.moveToPreset(me.area, 2, 356)) {
			throw new Error("staff failed");
		}

		Pather.makePortal();
		Attack.clear(25);
		say("1");

		while (!this.playerIn()) {
			Pather.moveToPreset(me.area, 2, 356);
			delay(250);
		}

		while (this.playerIn()) {
			delay(250);
		}

		Pather.usePortal(null, me.name);

		return true;
	};

	this.summoner = function () {
		// right up 25449 5081 (25431, 5011)
		// left up 25081 5446 (25011, 5446)
		// right down 25830 5447 (25866, 5431)
		// left down 25447 5822 (25431, 5861)

		Town.doChores();
		Pather.useWaypoint(74);
		Precast.doPrecast(true);

		var i, journal,
			preset = getPresetUnit(me.area, 2, 357),
			spot = {};

		switch (preset.roomx * 5 + preset.x) {
		case 25011:
			spot = {x: 25081, y: 5446};
			break;
		case 25866:
			spot = {x: 25830, y: 5447};
			break;
		case 25431:
			switch (preset.roomy * 5 + preset.y) {
			case 5011:
				spot = {x: 25449, y: 5081};
				break;
			case 5861:
				spot = {x: 25447, y: 5822};
				break;
			}

			break;
		}

		if (!Pather.moveToUnit(spot)) {
			throw new Error("summoner failed");
		}

		Pather.makePortal();
		Attack.clear(25);
		say("1");

		while (!this.playerIn()) {
			Pather.moveToUnit(spot);
			Attack.clear(20);
			delay(250);
		}

		Pather.moveToPreset(me.area, 2, 357);
		Attack.clear(15, 0, 250);

		while (this.playerIn()) {
			delay(250);
		}

		Pather.moveToPreset(me.area, 2, 357);

		journal = getUnit(2, 357);

		for (i = 0; i < 5; i += 1) {
			journal.interact();
			delay(1000);
			me.cancel();

			if (Pather.getPortal(46)) {
				break;
			}
		}

		if (i === 5) {
			throw new Error("summoner failed");
		}

		Pather.usePortal(46);

		return true;
	};

	this.duriel = function () {
		if (me.inTown) {
			Town.doChores();
			Pather.useWaypoint(46);
		}

		Precast.doPrecast(true);

		if (!Pather.moveToExit(getRoom().correcttomb, true) || !Pather.moveToPreset(me.area, 2, 152)) {
			throw new Error("duriel failed");
		}

		Pather.makePortal();
		Attack.clear(25);
		say("1");

		while (!this.playerIn()) {
			Pather.moveToPreset(me.area, 2, 152, 0, -5);
			delay(250);
		}

		while (this.playerIn()) {
			delay(250);
		}

		while (!getUnit(2, 100)) {
			delay(250);
		}

		Pather.useUnit(2, 100, 73);
		Attack.kill(211);
		// duriel's cave is... awkward. it allows tele only to specific spots
		Pather.moveTo(22629, 15712);
		Pather.moveTo(22612, 15709);
		Pather.moveTo(22579, 15705);
		Pather.moveTo(22577, 15649);
		Pather.moveTo(22577, 15614);
		Pather.makePortal();
		say("1");

		while (!this.playerIn()) {
			delay(250);
		}

		Pather.usePortal(null, me.name);
		say("a3");
		Pather.useWaypoint(75);

		while (!this.playersInAct(3)) {
			delay(250);
		}

		return true;
	};


	this.travincal = function () {
		Town.doChores();
		Pather.useWaypoint(83);
		Precast.doPrecast(true);

		var coords = [me.x, me.y];

		Pather.moveTo(coords[0] - 24, coords[1]);
		Pather.moveTo(coords[0] - 24, coords[1] - 135);
		Pather.moveTo(coords[0] + 81, coords[1] - 135);
		Pather.makePortal();
		Attack.clear(25);
		delay(5000);
		say("1");

		while (!this.playerIn()) {
			Pather.moveTo(coords[0] + 81, coords[1] - 135);
			delay(250);
		}

		Pather.moveTo(coords[0] + 97, coords[1] - 68);
		Attack.kill(getLocaleString(2863));
		Attack.kill(getLocaleString(2862));
		Attack.kill(getLocaleString(2860));
		Pather.moveTo(coords[0] + 81, coords[1] - 135);
		Pather.usePortal(null, me.name);

		return true;
	};

	this.mephisto = function () {
		Town.doChores();
		Pather.useWaypoint(101);
		Precast.doPrecast(true);
		Pather.moveToExit(102, true);
		Pather.moveTo(17591, 8070);
		Pather.makePortal();

		var monsta,
			monList = [];

		monsta = getUnit(1);

		if (monsta) {
			do {
				if (Attack.checkMonster(monsta) && getDistance(me, monsta) <= 25) {
					monList.push(copyUnit(monsta));
				}
			} while (monsta.getNext());
		}

		Attack.clearList(monList);
		say("1");

		while (!this.playerIn()) {
			Pather.moveTo(17591, 8070);
			delay(250);
		}

		Attack.kill(242);
		say("a4");
		Pather.moveTo(17591, 8070);
		delay(2000);
		Pather.usePortal(null);

		return true;
	};

	
	this.diablo = function () {
		this.getLayout = function (seal, value) {
			var sealPreset = getPresetUnit(108, 2, seal);

			if (!seal) {
				throw new Error("Seal preset not found. Can't continue.");
			}

			if (sealPreset.roomy * 5 + sealPreset.y === value || sealPreset.roomx * 5 + sealPreset.x === value) {
				return 1;
			}

			return 2;
		};

		this.initLayout = function () {
			this.vizLayout = this.getLayout(396, 5275);
			this.seisLayout = this.getLayout(394, 7773);
			this.infLayout = this.getLayout(392, 7893);
		};

		this.getBoss = function (name) {
			var i, boss,
				glow = getUnit(2, 131);

			for (i = 0; i < (name === getLocaleString(2853) ? 14 : 12); i += 1) {
				boss = getUnit(1, name);

				if (boss) {
					if (name === getLocaleString(2852)) {
						this.chaosPreattack(getLocaleString(2852), 8);
					}

					Attack.kill(name);
					Pickit.pickItems();

					return true;
				}

				delay(250);
			}

			return !!glow;
		};

		this.chaosPreattack = function (name, amount) {
			var i, n, target, positions;

			switch (me.classid) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				target = getUnit(1, name);

				if (!target) {
					return;
				}

				positions = [[6, 11], [0, 8], [8, -1], [-9, 2], [0, -11], [8, -8]];

				for (i = 0; i < positions.length; i += 1) {
					if (Attack.validSpot(target.x + positions[i][0], target.y + positions[i][1])) { // check if we can move there
						Pather.moveTo(target.x + positions[i][0], target.y + positions[i][1]);
						Skill.setSkill(Config.AttackSkill[2], 0);

						for (n = 0; n < amount; n += 1) {
							Skill.cast(Config.AttackSkill[1], 1);
						}

						break;
					}
				}

				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
			}
		};

		this.openSeal = function (id) {
			Pather.moveToPreset(108, 2, id, 4);

			var i, tick,
				seal = getUnit(2, id);

			if (seal) {
				for (i = 0; i < 3; i += 1) {
					seal.interact();

					tick = getTickCount();

					while (getTickCount() - tick < 500) {
						if (seal.mode) {
							return true;
						}

						delay(10);
					}
				}
			}

			return false;
		};

		Town.doChores();
		Pather.useWaypoint(107);
		Precast.doPrecast(true);
		Pather.moveTo(7790, 5544);
		this.initLayout();

		if (!this.openSeal(395) || !this.openSeal(396)) {
			throw new Error("Failed to open seals");
		}

		if (this.vizLayout === 1) {
			Pather.moveTo(7691, 5292);
		} else {
			Pather.moveTo(7695, 5316);
		}

		if (!this.getBoss(getLocaleString(2851))) {
			throw new Error("Failed to kill Vizier");
		}

		if (!this.openSeal(394)) {
			throw new Error("Failed to open seals");
		}

		if (this.seisLayout === 1) {
			Pather.moveTo(7771, 5196);
		} else {
			Pather.moveTo(7798, 5186);
		}

		if (!this.getBoss(getLocaleString(2852))) {
			throw new Error("Failed to kill de Seis");
		}

		if (!this.openSeal(392) || !this.openSeal(393)) {
			throw new Error("Failed to open seals");
		}

		if (this.infLayout === 1) {
			delay(1);
		} else {
			Pather.moveTo(7928, 5295); // temp
		}

		if (!this.getBoss(getLocaleString(2853))) {
			throw new Error("Failed to kill Infector");
		}

		Pather.moveTo(7763, 5267);
		Pather.makePortal();
		say("1");

		while (!this.playerIn()) {
			delay(250);
		}

		while (!getUnit(1, 243)) {
			delay(500);
		}

		Attack.kill(243);

		if (!Pather.usePortal(null, me.name)) {
			Town.goToTown();
		}

		return true;
	};

	

	this.shenk = function () {
		Town.doChores();
		Pather.useWaypoint(111);
		Precast.doPrecast(true);
		
		Pather.moveTo(3862, 5124);
		
		Attack.clear(15);
		Pather.makePortal();
		say("1");

		while (!this.playerIn()) {
			delay(250);
		}
		
		Pather.moveTo(3876, 5130);
		
		Attack.clear(15, 0, getLocaleString(22435)); // Shenk the Overseer
				
		Pickit.pickItems();

		Pather.usePortal(null, me.name);

		return true;
	};

	this.clearArea = function (area) {
		Pather.journeyTo(area);
		Attack.clearLevel(0);
		say("Done clearing area: " + area);
	};

	var command,
		current = 0,
		thisThread = getScript("tools/rushthread.js"),
		sequence = ["andariel", "cube", "amulet", "staff", "summoner", "duriel", "travincal", "mephisto", "diablo", "shenk"];

	this.scriptEvent = function (msg) {
		command = msg;
	};

	addEventListener("scriptmsg", this.scriptEvent);

	// Start
	Config.init(false);
	Pickit.init();
	Attack.init();
	Storage.Init();

	while (true) {
		if (command) {
			switch (command) {
			case "go":
				if (current >= sequence.length) {
					say("bye ~");
					quit();

					break;
				}

				try {
					this[sequence[current]]();
				} catch (sequenceError) {
					say(sequenceError.message);
					Town.goToTown();
				}

				current += 1;

				thisThread.send("go");

				break;
			default:
				if (command.split(" ")[0] !== undefined && command.split(" ")[0] === "clear") {
					this.clearArea(Number(command.split(" ")[1]));
				} else if (sequence.indexOf(command) > -1) {
					current = sequence.indexOf(command);

					Town.goToTown();
					thisThread.send("go");
				}

				break;
			}

			command = false;
		}

		delay(100);
	}

	return true;
}