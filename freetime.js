tabris.ui.openPageFreetime = function() {

var page = tabris.create("Page", {
	title: "Szabadidő",
	topLevel: false,
	image: "res/images/szabadido.png",
});
var pageHeight = tabris.ui.pageCreateSurrounds(page);

var icons = [
	{
		label: "Mozi",
		image: "res/images/mozi.png",
		opener: tabris.ui.openPageFreetime,
	},
	{
		label: "Színház",
		image: "res/images/szinhaz.png",
		opener: tabris.ui.openPageFreetime,
	},
	{
		label: "Sportlehetőségek",
		image: "res/images/sportolasilehetoseg.png",
		opener: tabris.ui.openPageFreetime,
	},

	{
		label: "Szórakozóhelyek",
		image: "res/images/szorakozohelyek.png",
		opener: tabris.ui.openPageFreetime,
	},
	{
		label: "Bevásárlás",
		image: "res/images/shop.png",
		opener: tabris.ui.openPageFreetime,
	},
	{
		label: "Felüdülés",
		image: "res/images/vendeglatas.png",
		opener: tabris.ui.openPageFreetime,
	},

	{
		label: "Múzeumok",
		image: "res/images/muzeum.png",
		opener: tabris.ui.openPageFreetime,
	},
	{
		label: "Kiállítóhelyek",
		image: "res/images/kiallitohelyek.png",
		opener: tabris.ui.openPageFreetime,
	},
	{
		label: "Építészet",
		image: "res/images/epiteszetilatnivalok.png",
		opener: tabris.ui.openPageFreetime,
	},
	
	{
		label: "Természeti érték",
		image: "res/images/latnivalok.png",
		opener: tabris.ui.openPageFreetime,
	},
	
];

page.set("iconColumns", 3);
tabris.ui.pageCreateIcons({icons: icons, page: page, pageHeight: pageHeight, columns: page.get("iconColumns"), rows: 4, top: 3, left: 3});


page.open();

}
