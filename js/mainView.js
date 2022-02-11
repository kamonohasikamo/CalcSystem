let model;

window.onload = function () {
	model = new mainModel();
}

// 収入設定ボタン押下時の処理
function onPressIncomeValue() {
	var incomeValue = document.getElementById("incomeValue").value;
	model.setIncome(incomeValue);
}

//------------------------------------------
// 支出データ
//------------------------------------------

// 支出表の1行のデータ登録
function onPressSetSpend(id) {
	var name = document.getElementById("spend_" + id + "_name").value;
	var value = document.getElementById("spend_" + id + "_value").value;
	model.setSpend(id, name, value);
	// 表示の更新
	this.showSpendTotal();
}

// 支出表の1行のデータ削除
function onPressDelSpend(id, obj) {
	// データの削除
	model.delSpend(id);
	// 表示の更新
	this.showSpendTotal();
	// 削除ボタンを押下された行を取得
	tr = obj.parentNode.parentNode;
	// trのインデックスを取得して行を削除する
	tr.parentNode.deleteRow(tr.sectionRowIndex);
}

// 支出表に行を追加
function onPressInsRowSpend() {
	var table = document.getElementById("spendTable");
	var id = table.rows.length;
	var newID = "spend_" + id;
	var tr = document.createElement("tr");

	// 名前入力欄の登録
	var nameTd = document.createElement("td");
	var inputName = document.createElement("input");
	inputName.type = "text";
	inputName.id = newID + "_name";
	nameTd.appendChild(inputName);
	tr.appendChild(nameTd);

	// 金額入力欄の登録
	var valueTd = document.createElement("td");
	var inputVal = document.createElement("input");
	inputVal.type = "text";
	inputVal.id = newID + "_value";
	valueTd.appendChild(inputVal);
	tr.appendChild(valueTd);

	// ボタン
	var btnTd = document.createElement("td");
	var setBtn = document.createElement("input");
	setBtn.type = "button";
	setBtn.value = "登録";
	var func = "onPressSetSpend(" + id + ")";
	setBtn.setAttribute("onclick", func);
	btnTd.appendChild(setBtn);
	var delBtn = document.createElement("input");
	delBtn.type = "button";
	delBtn.value = "削除";
	func = "onPressDelSpend(" + id + ", this)";
	delBtn.setAttribute("onclick", func);
	btnTd.appendChild(delBtn);
	tr.appendChild(btnTd);

	// テーブルに追加
	table.appendChild(tr);
}

// 合計金額の表示
function showSpendTotal() {
	var div = document.getElementById("spendTotal");
	div.innerHTML = "支出合計金額：" + model.getSpendTotal();
	// 円グラフの反映
	this.showAllRage();
}

//------------------------------------------
// 貯金データ
//------------------------------------------

// 貯金表の1行のデータ登録
function onPressSetSave(id) {
	var name = document.getElementById("save_" + id + "_name").value;
	var value = document.getElementById("save_" + id + "_value").value;
	model.setSave(id, name, value);
	// 表示の更新
	this.showSaveTotal();
}

// 貯金表の1行のデータ削除
function onPressDelSave(id, obj) {
	// データの削除
	model.delSave(id);
	// 表示の更新
	this.showSaveTotal();
	// 削除ボタンを押下された行を取得
	tr = obj.parentNode.parentNode;
	// trのインデックスを取得して行を削除する
	tr.parentNode.deleteRow(tr.sectionRowIndex);
}

// 貯金表に行を追加
function onPressInsRowSave() {
	var table = document.getElementById("saveTable");
	var id = table.rows.length;
	var newID = "save_" + id;
	var tr = document.createElement("tr");

	// 名前入力欄の登録
	var nameTd = document.createElement("td");
	var inputName = document.createElement("input");
	inputName.type = "text";
	inputName.id = newID + "_name";
	nameTd.appendChild(inputName);
	tr.appendChild(nameTd);

	// 金額入力欄の登録
	var valueTd = document.createElement("td");
	var inputVal = document.createElement("input");
	inputVal.type = "text";
	inputVal.id = newID + "_value";
	valueTd.appendChild(inputVal);
	tr.appendChild(valueTd);

	// ボタン
	var btnTd = document.createElement("td");
	var setBtn = document.createElement("input");
	setBtn.type = "button";
	setBtn.value = "登録";
	var func = "onPressSetSave(" + id + ")";
	setBtn.setAttribute("onclick", func);
	btnTd.appendChild(setBtn);
	var delBtn = document.createElement("input");
	delBtn.type = "button";
	delBtn.value = "削除";
	func = "onPressDelSave(" + id + ", this)";
	delBtn.setAttribute("onclick", func);
	btnTd.appendChild(delBtn);
	tr.appendChild(btnTd);

	// テーブルに追加
	table.appendChild(tr);
}

// 合計金額の表示
function showSaveTotal() {
	var div = document.getElementById("saveTotal");
	div.innerHTML = "貯金合計金額：" + model.getSaveTotal();
	// 円グラフの反映
	this.showAllRage();
}


//------------------------------------------
// 割合
//------------------------------------------
// 円グラフの表示
function showAllRage() {
	var div = document.getElementById("allRate");
	// TODO:データを変更する
	var allRate = new Chart(div, {
		type: 'pie',
		data: {
			labels: ["賛成", "反対", "わからない", "未回答"], //データ項目のラベル
			datasets: [{
				backgroundColor: [
					"#c97586",
					"#bbbcde",
					"#93b881",
					"#e6b422"
				],
				data: [45, 32, 18, 5] //グラフのデータ
			}]
		},
		options: {
			title: {
				display: true,
				//グラフタイトル
				text: '新法案賛否'
			}
		}
	});
}