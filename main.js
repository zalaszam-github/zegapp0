require("./common.js");
require("./freetime.js");
require("./ereport.js");

var page = tabris.create("Page", {
	title: "ZegAppDemo",
	topLevel: true,
	image: "res/images/inditoikon.png",
});

var pageHeight = tabris.ui.pageCreateSurrounds(page);

var icons = [
	{
		label: "Info",
		image: "res/images/info.png",
		opener: tabris.ui.openPageFreetime,
	},
	{
		label: "Turizmus",
		image: "res/images/turizmus.png",
		opener: tabris.ui.openPageFreetime,
	},

	{
		label: "Programok",
		image: "res/images/programok.png",
		opener: tabris.ui.openPageFreetime,
	},
	{
		label: "Szabadidő",
		image: "res/images/szabadido.png",
		opener: tabris.ui.openPageFreetime,
	},

	{
		label: "E-bejelentés",
		image: "res/images/ebejelentes.png",
		opener: tabris.ui.openPageEreport,
	},
	{
		label: "Szavazás",
		image: "res/images/chart.png",
		opener: tabris.ui.openPageFreetime,
	},
	
];

page.set("iconColumns", 2);
tabris.ui.pageCreateIcons({icons: icons, page: page, pageHeight: pageHeight, columns: page.get("iconColumns"), rows: 3, top: 7, left: 10});

page.open();