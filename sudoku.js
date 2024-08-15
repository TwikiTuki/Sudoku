import {sdk_copy, get_sudoku, to_str} from "./sdk_utils.js"
import {sdk_solve} from "./sdk_solve.js"
import {N, M} from "./sdk_utils.js"

var global_customizing = false;
var global_usr_inp = 0;

function cell_modify(value, td_cell, sdk_cell)
{
	sdk_cell.known = global_usr_inp != '0';
	sdk_cell.value = Number(global_usr_inp);
	td_cell.innerHTML = sdk_cell.known ?  global_usr_inp : "";
	if (sdk_cell.known)
		td_cell.classList.add("known");
	else
		td_cell.classList.remove("known");
}

function draw_sudoku(td_table, sudoku)
{
	console.log("drawing shudoku");
	for (let row=0; row<N; row++)
	{
		for (let col=0; col<N; col++)
		{
			let cell = td_table[row][col];
			if (sudoku[row][col].value != 0)
				cell.innerHTML = sudoku[row][col].value;
			else
				cell.innerHTML = "";
			if (sudoku[row][col].known)
				cell.classList.add("known");
			else
				cell.classList.remove("known");
			
		}
	}
}

function create_table(td_table, html_table, sudoku)
{
	console.log("creating tabler");
	for (let row=0; row<N; row++)
	{
		td_table[row] = [];
		let table_row = document.createElement("tr");
		for (let col=0; col<N; col++)
		{
			var cell = document.createElement("td");
			cell.addEventListener('click', (event) => {
				console.log("cell clichk");
				if (!global_customizing)
					return;
				cell_modify(global_usr_inp, event.target, sudoku[row][col]);
			});
			td_table[row][col] = cell; 
			table_row.appendChild(cell);
		}
		html_table.appendChild(table_row);
	}
}

function generate_input(inpnum)
{
	function clicked(event)
	{
		let inpcell = event.target;
		let inpcells = document.querySelectorAll(".inpcell")
		for (let i=0; i<inpcells.length; i++)
		{
			inpcells[i].classList.remove("highlighted_inp");
		}
		if (inpcell.innerHTML == global_usr_inp)
		{
			global_usr_inp = 0;
			return ;
		}
		inpcell.classList.add("highlighted_inp");
		global_usr_inp = inpcell.innerHTML;
	}
	for (let i=0; i<N; i++)
	{
		let inpcell = document.createElement("div");
		inpcell.classList.add("inpcell");
		inpcell.innerHTML = i + 1;
		inpcell.addEventListener("click", clicked);
		inpnum.appendChild(inpcell);
	}
}

var sudoku_ID = 0;
var sudoku = get_sudoku(sudoku_ID);
addEventListener("DOMContentLoaded", (event) => {
	console.log("Hellow sudoku");
	var inp_num = document.querySelector(".inpnum");
	let html_table = document.querySelector("table");
	var td_table = [];
	var header = document.querySelector(".main_header");
	var error_text = document.querySelector(".error");

	create_table(td_table, html_table, sudoku);
	draw_sudoku(td_table, sudoku);
	inp_num.style.display = "none";
	generate_input(inp_num);
	
	document.querySelectorAll("button").forEach((button) =>{
		console.log("foreaching");
		if (button.classList.contains("solve"))
		{
			return ;
		}
		button.addEventListener("click", (event) =>{
			error_text.classList.add("hidden");
			header.classList.remove("error");
		});	
	});

	var solve_button = document.querySelector(".solve");
	solve_button.addEventListener("click", (event) => {
		console.log("Solve click");
		sdk_solve(sudoku);
		if (sdk_solve(sudoku) == null)
		{
			console.log("nice try");
			error_text.classList.remove("hidden");	
			header.classList.add("error");	
		}
		draw_sudoku(td_table, sudoku);
		console.log("drawn shudoku");
		global_customizing = false;
		inp_num.style.display = "none";
	});

	var next_button = document.querySelector(".another");
	next_button.addEventListener("click", (event) => {
		let _sudoku = get_sudoku(++sudoku_ID);
		sdk_copy(sudoku, _sudoku);
		draw_sudoku(td_table, sudoku);
		global_customizing = false;
		inp_num.style.display = "none";
	});

	var custom_button = document.querySelector(".custom");
	custom_button.addEventListener("click", (event) => {
		console.log("custom click");
		global_customizing = true;
		inp_num.style.display = "flex";
	});
});

