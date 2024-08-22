export const N = 9;
export const M = 3;

export function get_sudoku_str(sudoku_id)
{
	const sudokus = [
		['070000043040009610800634900094052000358460020000800530080070091902100005007040802','679518243543729618821634957794352186358461729216897534485276391962183475137945862'],
		['301086504046521070500000001400800002080347900009050038004090200008734090007208103','371986524846521379592473861463819752285347916719652438634195287128734695957268143'],
		['048301560360008090910670003020000935509010200670020010004002107090100008150834029','748391562365248791912675483421786935589413276673529814834962157296157348157834629'],
		['008317000004205109000040070327160904901450000045700800030001060872604000416070080','298317645764285139153946278327168954981453726645792813539821467872634591416579382'],
		['040890630000136820800740519000467052450020700267010000520003400010280970004050063','142895637975136824836742519398467152451328796267519348529673481613284975784951263'],
		['561092730020780090900005046600000427010070003073000819035900670700103080000000050','561492738324786195987315246659831427418279563273564819135928674746153982892647351'],
		['310450900072986143906010508639178020150090806004003700005731009701829350000645010','318457962572986143946312578639178425157294836284563791425731689761829354893645217'],
		['800134902041096080005070010008605000406310009023040860500709000010080040000401006','867134952241596783395872614978625431456318279123947865534769128619283547782451396'],
		['165293004000001632023060090009175000500900018002030049098000006000000950000429381','165293874974851632823764195489175263536942718712638549398517426241386957657429381'],
		['000003610000015007000008090086000700030800100500120309005060904060900530403701008','728493615349615827651278493186539742932847156574126389815362974267984531493751268'],
		['405001068073628500009003070240790030006102005950000021507064213080217050612300007','425971368173628594869543172241795836736182945958436721597864213384217659612359487'],
		['960405100020060504001703006100004000490130050002007601209006038070218905600079000','968425173723861594541793286157684329496132857832957641219546738374218965685379412'],
		['904520070001890240002643000070960380000108700600000010090080000000750030000312569','984521673361897245752643891175964382429138756638275914593486127216759438847312569'],
		['001408006093520741000010520602080300007060000005039060064052109020000654500607083','251478936893526741476913528642185397937264815185739462364852179728391654519647283'],
		['007300054245080900003040070070960000000020760000801002008294016609108020000007003','867319254245786931913542678472963185381425769596871342738294516659138427124657893'],
		['005346170000000050000800009502930741070000003000700020090050632207600400600420007','925346178786291354341875269562938741174562983839714526498157632217683495653429817'],
		['320090400705021800001060372218037009500480700000005000670000280000873900804000107','326798451745321896981564372218637549569482713437915628673149285152873964894256137'],
		['000030007480960501063570820009610203350097006000005094000000005804706910001040070','925831467487962531163574829749618253352497186618325794276189345834756912591243678'],
		['087002010204017003006800705508001000640008100002050670439180007020900030700023091','987532416254617983316849725578261349643798152192354678439185267821976534765423891']
	];
	return sudokus[sudoku_id % sudokus.length];
}

export function sdk_blank()
{
	let sudoku
	sudoku = []
		
	for (let i = 0; i < N; i++)
	{
		sudoku.push([])
		for (let j =0; j < N; j++)
			sudoku[i][j] = 0
	}
	return (sudoku)
}

export function sdk_copy(sdk_res, sdk_inp)
{
	sdk_res.result = sdk_inp.result;
	for (let row = 0; row < N; row++)
	{
		for (let col = 0; col < N; col++)
		{
			sdk_res[row][col] = sdk_inp[row][col];
		}
	}
	console.log("::: ::: ::: copied: ", sdk_res)
}
	
export function to_table(sudoku_str)
{
	let sudoku = [];
	sudoku.result = sudoku_str[1]; 
	sudoku_str = sudoku_str[0];
	for (let row = 0; row < N; row++)
	{
		sudoku[row] = [];
		for (let col = 0; col < N; col++)
		{
			sudoku[row][col] = {};
			sudoku[row][col].row = row;
			sudoku[row][col].col = col;
			sudoku[row][col].value = parseInt(sudoku_str[N*row + col]);
			if (sudoku[row][col].value != 0)
				sudoku[row][col].known = true;
			else
				sudoku[row][col].known = false;
		}
	}
	return (sudoku)
}

export function to_str(sudoku)
{
	let sudoku_str = "";
	for (let row = 0; row < N; row++)
	{
		for (let col = 0; col < N; col++)
		{
			sudoku_str += sudoku[row][col].value;
		}
	}
	return (sudoku_str)
}

export function get_sudoku(sudoku_id)
{
	let sudoku_str = get_sudoku_str(sudoku_id);
	let sudoku = to_table(sudoku_str)
	return (sudoku);
}
