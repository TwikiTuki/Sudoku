import {sdk_copy, get_sudoku, to_str, sdk_blank} from "./sdk_utils.js"
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

function sdk_check_initial_sudoku(sudoku)
{
	for (let i = 0; i < (N - 1); i++)
	{
		for (let j = 0; j < (N - 1); j++)
		{
			if (sudoku[i][j].value == 0) 
				continue
			else if (!sdk_check(sudoku, sudoku[i][j]))
				return (0)
		}
	}
	return (1);
}

export function sdk_solve(sudoku)
{
	var unknown = [];
	var	i;
	let bkp_sudoku = sdk_blank();
	let result = sdk_blank();
	let solved = false;

	
	//sdk_copy(sudoku, orig_sudoku)

	if (!sdk_check_initial_sudoku(sudoku))
		return (null)
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
		else if (i == (unknown.length - 1))
		{
			if (solved)
				return (null)
			//sdk_copy(reuslt, sudoku)
			console.log("saved: ", result);
			solved = true
			i++
		}
		else
			i++;
	}
	if (i < 0 && !solved)
	{
		console.log("What a pitie doesnt looks good: ");
		return (null);
	}
	else
		console.log("Congragts here is the solution: ");
	console.log(" returning saved: ", result);
	//sdk_copy(orig_sudoku, result)
	return (sudoku);
}

