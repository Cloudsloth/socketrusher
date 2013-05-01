/**
*	@filename	MuleLogger.js
*	@author		kolton
*	@desc		Log items on configurable accounts/characters
*/

var MuleLogger = {
	LogAccounts: {


"shopdump1/itsatrap/uswest": ["all"],
"shopdump2/itsatrap/uswest": ["all"],
"cloudump17/itsatrap/uswest": ["all"],
"cloudump18/itsatrap/uswest": ["all"],
"cloudump19/itsatrap/uswest": ["all"],
"cloudump20/itsatrap/uswest": ["all"]


/*
"cloudump13/itsatrap/uswest": ["all"],
"cloudump14/itsatrap/uswest": ["all"],
"cloudump15/itsatrap/uswest": ["all"],
"cloudump1/itsatrap/uswest": ["all"],

"cloudump2/itsatrap/uswest": ["all"],
"cloudump3/itsatrap/uswest": ["all"],
"cloudump4/itsatrap/uswest": ["all"],
"cloudump5/itsatrap/uswest": ["all"],
"cloudump6/itsatrap/uswest": ["all"],
"cloudump7/itsatrap/uswest": ["all"],
"cloudump8/itsatrap/uswest": ["all"],
"cloudump9/itsatrap/uswest": ["all"],
"cloudump10/itsatrap/uswest": ["all"],
"cloudump11/itsatrap/uswest": ["all"],
"cloudump12/itsatrap/uswest": ["all"],


"cloudsale2/itsatrap/uswest": ["all"],

"cloudchar2/itsatrap/uswest": ["all"]


"cloudm1/itsatrap/uswest": ["all"],
"cloudm2/itsatrap/uswest": ["all"],
"cloudm3/itsatrap/uswest": ["all"],
"cloudm4/itsatrap/uswest": ["all"],
"cloudm5/itsatrap/uswest": ["all"],
"cloudy/itsatrap/uswest": ["all"],
"cloudlld/itsatrap/uswest": ["all"],
"cloudlld2/itsatrap/uswest": ["all"],
"cloudimbue/itsatrap/uswest": ["all"],
"cloudimb2/itsatrap/uswest": ["all"],
"cloudimb3/itsatrap/uswest": ["all"],
"cloudshop/itsatrap/uswest": ["all"],
"cloudshopb/itsatrap/uswest": ["all"],
"cloudbuff/itsatrap/uswest": ["all"],
"redwarcry/itsatrap/uswest": ["all"],
"bluewarcry/itsatrap/uswest": ["all"],
"greenwarcry/itsatrap/uswest": ["all"],
"blackwarcry/itsatrap/uswest": ["all"],
"goldwarcry/itsatrap/uswest": ["all"]
"cloudcraft/itsatrap/uswest": ["all"],
"cloudcraft2/itsatrap/uswest": ["all"],
"cloudjunk/itsatrap/uswest": ["all"],
"cloudsale/itsatrap/uswest": ["all"],
"cloudchar/itsatrap/uswest": ["all"],
*/





	/* Format: 
			"account1/password1/realm": ["charname1", "charname2 etc"],
			"account2/password2/realm": ["charnameX", "charnameY etc"],
			"account3/password3/realm": ["all"]

			To log a full account, put "accountname/password/realm": ["all"]

			realm = useast, uswest, europe or asia
		*/

		
	},

	LogGame: ["muleloggame", "password"], // ["gamename", "password"]
	LogNames: true, // Put account/character name on the picture
	LogItemLevel: true, // Add item level to the picture
	SaveScreenShot: false, // Save pictures in jpg format (saved in 'Images' folder)
	IngameTime: 20, // Time to wait after leaving game

	// don't edit
	getItemDesc: function (unit) {
		var i, desc,
			stringColor = "";

		desc = unit.description.split("\n");

		// Lines are normally in reverse. Add color tags if needed and reverse order.
		for (i = 0; i < desc.length; i += 1) {
			if (desc[i].indexOf(getLocaleString(3331)) > -1) { // Remove sell value
				desc.splice(i, 1);
			} else {
				if (desc[i].match(/^�/)) {
					stringColor = desc[i].substring(0, 3);
				} else {
					desc[i] = stringColor + desc[i];
				}
			}

			desc[i] = desc[i].replace("�", "\\xff", "g").replace("\xFF", "\\xff", "g");
		}

		if (this.LogItemLevel && desc[desc.length - 1]) {
			desc[desc.length - 1] += (" (" + unit.ilvl + ")");
		}

		desc = desc.reverse().join("\\n");

		return desc;
	},

	// Log kept item stats in the manager.
	logItem: function (unit) {
		var i, code, desc, sock,
			header = "",
			gid = "",
			color = -1,
			name = unit.fname.split("\n").reverse().join(" ").replace(/�c[0-9!"+<;.*]|^ /, "");

		desc = this.getItemDesc(unit);
		color = unit.getColor();

		// experimental
		switch (unit.quality) {
		case 5: // Set
			switch (unit.classid) {
			case 27: // Angelic sabre
				code = "inv9sbu";

				break;
			case 74: // Arctic short war bow
				code = "invswbu";

				break;
			case 308: // Berserker's helm
				code = "invhlmu";

				break;
			case 330: // Civerb's large shield
				code = "invlrgu";

				break;
			case 31: // Cleglaw's long sword
			case 227: // Szabi's cryptic sword
				code = "invlsdu";

				break;
			case 329: // Cleglaw's small shield
				code = "invsmlu";

				break;
			case 328: // Hsaru's buckler
				code = "invbucu";

				break;
			case 306: // Infernal cap / Sander's cap
				code = "invcapu";

				break;
			case 30: // Isenhart's broad sword
				code = "invbsdu";

				break;
			case 309: // Isenhart's full helm
				code = "invfhlu";

				break;
			case 333: // Isenhart's gothic shield
				code = "invgtsu";

				break;
			case 326: // Milabrega's ancient armor
			case 442: // Immortal King's sacred armor
				code = "invaaru";

				break;
			case 331: // Milabrega's kite shield
				code = "invkitu";

				break;
			case 332: // Sigon's tower shield
				code = "invtowu";

				break;
			case 325: // Tancred's full plate mail
				code = "invfulu";

				break;
			case 3: // Tancred's military pick
				code = "invmpiu";

				break;
			case 113: // Aldur's jagged star
				code = "invmstu";

				break;
			case 234: // Bul-Kathos' colossus blade
				code = "invgsdu";

				break;
			case 372: // Grizwold's ornate plate
				code = "invxaru";

				break;
			case 366: // Heaven's cuirass
			case 215: // Heaven's reinforced mace
			case 449: // Heaven's ward
			case 426: // Heaven's spired helm
				code = "inv" + unit.code + "s";

				break;
			case 357: // Hwanin's grand crown
				code = "invxrnu";

				break;
			case 195: // Nalya's scissors suwayyah
				code = "invskru";

				break;
			case 395: // Nalya's grim helm
			case 465: // Trang-Oul's bone visage
				code = "invbhmu";

				break;
			case 261: // Naj's elder staff
				code = "invcstu";

				break;
			case 375: // Orphan's round shield
				code = "invxmlu";

				break;
			case 12: // Sander's bone wand
				code = "invbwnu";

				break;
			}

			break;
		case 7: // Unique
			for (i = 0; i < 401; i += 1) {
				if (unit.fname.split("\n").reverse()[0].indexOf(getLocaleString(getBaseStat(17, i, 2))) > -1) {
					code = getBaseStat(17, i, "invfile");

					break;
				}
			}

			break;
		}

		if (!code) {
			if (["ci2", "ci3"].indexOf(unit.code) > -1) { // Tiara/Diadem
				code = unit.code;
			} else {
				code = getBaseStat(0, unit.classid, 'normcode') || unit.code;
			}

			code = code.replace(" ", "");

			if ([10, 12, 58, 82, 83, 84].indexOf(unit.itemType) > -1) {
				code += (unit.gfx + 1);
			}
		}

		sock = unit.getItems();

		if (sock) {
			for (i = 0; i < sock.length; i += 1) {
				if (sock[i].itemType === 58) {
					desc += "\n\n";
					desc += this.getItemDesc(sock[i]);
				}
			}
		}

		if (this.LogNames && me.account) {
			header = me.account + " / " + me.name;
		}

		// d2bot# optimization for runes, gems and set/unique items
		if ([5, 7].indexOf(unit.quality) > -1 || [74, 96, 97, 98, 99, 100, 101, 102].indexOf(unit.itemType) > -1) {
			gid = unit.gid;
		}

		return (name + "$" + desc + "$" + code + "$" + header + "$" + gid);
	},

	logChar: function () {
		while (!me.gameReady) {
			delay(500);
		}

		var i, folder,
			items = me.getItems(),
			color = -1,
			realm = me.realm || "Single Player",
			finalString = "",
			screenShot = "";

		if (!FileTools.exists("mules/" + realm)) {
			folder = dopen("mules");

			folder.create(realm);
		}

		if (!FileTools.exists("mules/" + realm + "/" + me.account)) {
			folder = dopen("mules/" + realm);

			folder.create(me.account);
		}

		if (!items || !items.length) {
			return;
		}

		for (i = 0; i < items.length; i += 1) {
			if (items[i].mode === 0) {
				color = items[i].getColor();
				finalString += (this.logItem(items[i]) + ";" + "0" + ";" + color + "\n");

				if (this.SaveScreenShot) {
					screenShot = items[i].itemType + this.logItem(items[i]) + ";" + color;
					sendCopyData(null, "D2Bot #", 0, "saveItem;" + screenShot);
					delay(500);
				}
			}
		}

		FileTools.writeText("mules/" + realm + "/" + me.account + "/" + me.name + ".txt", finalString);
	}
};