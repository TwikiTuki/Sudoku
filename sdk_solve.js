import {get_sudoku, to_str} from "./sdk_utils.js"
var flr = Math.floor;
export const	N = 9;
export const	M = 3;

function sdk_check(sudoku, cell)
{
	const _sri = flr(cell.row / M) * M;
	const _sci = flr(cell.col / M) * M;
	var row = cell.row;
	var col = cell.col;
	var value = cell.value;

	if (cell.value == 0)
		return (0);
	if (cell.value > N)
		return (1);
	for (let i = 0; i < N; i++)
	{
		let sri = _sri + flr(i/M);
		let sci = _sci + i%M;
		if (sudoku[sri][sci].value == value && !(sri == row && sci == col))
			return (0);
		if (sudoku[row][i].value == value && i != col)
			return (0);
		if (sudoku[i][col].value == value && i != row)
			return (0);
	}
	return (1);
}

export function sdk_solve(sudoku)
{
	var unknown = [];
	var	i;

	for (let row=0; row < N; row++)
	{
		for (let col=0; col < N; col++)
		{
			if (sudoku[row][col].value == 0)
				unknown.push(sudoku[row][col]);
		}
	}
	i = 0;
	while (i >= 0 && i < unknown.length)
	{
		while (!sdk_check(sudoku, unknown[i]))
		{
			unknown[i].value += 1;
		}
		if (unknown[i].value > N)
		{
			unknown[i].value = 0;		
			i--;
			if (i < 0)
				break;
			unknown[i].value += 1;		
		}
		else
			i++;
	}
	if (i < 0)
	{
		console.log("What a pitie doesnt looks good: ");
		return (null);
	}
	else
		console.log("Congragts here is the solution: ");
	return (sudoku);
}
