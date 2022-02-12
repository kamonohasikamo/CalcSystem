let model;
var allRate;
var spendRate;
var saveRate;


window.onload = function () {
	model = new mainModel();
}

// 収入設定ボタン押下時の処理
function onPressIncomeValue() {
	var incomeValue = document.getElementById("incomeValue").value;
	model.setIncome(incomeValue);
	this.showRemainTotal();
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
	this.showData();
}

// 支出表の1行のデータ削除
function onPressDelSpend(id, obj) {
	// データの削除
	model.delSpend(id);
	// 表示の更新
	this.showData();
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
	this.showData();
}

// 貯金表の1行のデータ削除
function onPressDelSave(id, obj) {
	// データの削除
	model.delSave(id);
	// データ更新
	this.showData();
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
}

//------------------------------------------
// 残り金額表示
//------------------------------------------
function showRemainTotal() {
	var div = document.getElementById("remain");
	div.innerHTML = "残り金額：";
	var remain = model.incomeValue - (model.getSpendTotal() + model.getSaveTotal());
	if (remain > 0) {
		div.innerHTML += remain;
	} else {
		div.innerHTML += '<font  size="5" color="red">' + remain + '</font>';
	}
}

//------------------------------------------
// 割合
//------------------------------------------
// グラフ全体のメソッド呼び出し
function showData() {
	// 表示の更新
	this.showSaveTotal();
	this.showSpendTotal();
	this.showRemainTotal();

	// 円グラフの更新
	if (allRate) {
		allRate.destroy();
	}
	if (spendRate) {
		spendRate.destroy();
	}
	if (saveRate) {
		saveRate.destroy();
	}
	this.showAllRate();
	this.showSpendRate();
	this.showSaveRate();
}

var dataLabelPlugin = {
	afterDatasetsDraw: function (chart, easing) {
		var ctx = chart.ctx;
		chart.data.datasets.forEach(function (dataset, i) {
			var meta = chart.getDatasetMeta(i);
			if (!meta.hidden) {
				meta.data.forEach(function (element, index) {
					ctx.fillStyle = 'rgb(0, 0, 0)';

					var fontSize = 16;
					var fontStyle = 'normal';
					var fontFamily = 'Helvetica Neue';
					ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

					var dataString = chart.data.labels[index] + ' : ' + dataset.data[index].toString() + "%";

					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';

					var padding = 5;
					var position = element.tooltipPosition();
					ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
				})
			}
		})
	}
}

// 円グラフの表示
function showAllRate() {
	var div = document.getElementById("allRate");
	allRate = new Chart(div, {
		type: 'pie',
		data: {
			labels: ["支出", "貯金"], //データ項目のラベル
			datasets: [{
				backgroundColor: [
					"#93b881",
					"#e6b422"
				],
				data: [model.getAllRateSpend(), model.getAllRateSave()] //グラフのデータ
			}]
		},
		plugins: [dataLabelPlugin],
		options: {
			tooltips: {
				enabled: false
			}
		},
	});
}

// 支出割合円グラフ表示
function showSpendRate() {
	var div = document.getElementById("spendRate");
	var obj = model.getPieDataSpendObj();
	var colorList = model.getColorByCount(obj.nameList.length);
	spendRate = new Chart(div, {
		type: 'pie',
		data: {
			labels: obj.nameList, //データ項目のラベル
			datasets: [{
				backgroundColor: colorList,
				data: obj.valueList //グラフのデータ
			}]
		},
		options: {
			plugins: {
				datalabels: {
					color: '#000',
					font: {
						weight: 'bold',
						size: 20,
					},
					formatter: (value, ctx) => {
						let label = ctx.chart.data.labels[ctx.dataIndex];
						return label + '\n' + value + '%';
					},
				}
			}
		},
		plugins: [dataLabelPlugin],
		options: {
			tooltips: {
				enabled: false
			}
		},
	});
}

// 貯金割合円グラフ表示
function showSaveRate() {
	var div = document.getElementById("saveRate");
	var obj = model.getPieDataSaveObj();
	var colorList = model.getColorByCount(obj.nameList.length);
	saveRate = new Chart(div, {
		type: 'pie',
		data: {
			labels: obj.nameList, //データ項目のラベル
			datasets: [{
				backgroundColor: colorList,
				data: obj.valueList //グラフのデータ
			}]
		},
		options: {
			plugins: {
				datalabels: {
					color: '#000',
					font: {
						weight: 'bold',
						size: 20,
					},
					formatter: (value, ctx) => {
						let label = ctx.chart.data.labels[ctx.dataIndex];
						return label + '\n' + value + '%';
					},
				}
			}
		},
		plugins: [dataLabelPlugin],
		options: {
			tooltips: {
				enabled: false
			}
		},
	});
}

// CSVファイルの作成
function downloadCSV() {
	var target = document.getElementById("download");
	target.download = "data.csv";
	var bom = new Uint8Array([0xEF, 0xBB, 0xBF]); //文字コードをBOM付きUTF-8に指定
	var data_csv = ""; //ここに文字データとして値を格納していく

	data_csv = model.getCSVData();
	var blob = new Blob([bom, data_csv], { "type": "text/csv" }); //data_csvのデータをcsvとしてダウンロードする関数
	if (window.navigator.msSaveBlob) { //IEの場合の処理
		window.navigator.msSaveBlob(blob, "test.csv");
		//window.navigator.msSaveOrOpenBlob(blob, "test.csv");// msSaveOrOpenBlobの場合はファイルを保存せずに開ける
	} else {
		document.getElementById("download").href = window.URL.createObjectURL(blob);
	}

	delete data_csv;//data_csvオブジェクトはもういらないので消去してメモリを開放
}

function saveSimulator() {
	var toYear = document.getElementById("toYear").value;
	var obj = model.getSaveSimuData(toYear);
	var div = document.getElementById("saveSimu");

	if (div.hasChildNodes()) {
		var clone = div.cloneNode(false);
		div.parentNode.replaceChild(clone, div);
	}

	obj.forEach(element => {
		div.appendChild(createTable(element));
		div.appendChild(document.createElement("br"));
	});
}

function createTable(data) {
	var table = document.createElement("table");
	var tr = document.createElement("tr");

	// 1行目
	// 名前欄の登録
	var nameTd = document.createElement("td");
	nameTd.innerHTML = data.name;
	tr.appendChild(nameTd);

	// 金額欄の登録
	var valTd = document.createElement("td");
	tr.appendChild(valTd);

	table.appendChild(tr);

	// 2行目以降
	for (var i = 0; i < data.valueList.length; i++) {
		tr = document.createElement("tr");
		var yearTd = document.createElement("td");
		yearTd.innerHTML = (i + 1) + "年後";
		tr.appendChild(yearTd);

		var valueTd = document.createElement("td");
		valueTd.innerHTML = data.valueList[i] + "円";
		tr.appendChild(valueTd);

		table.appendChild(tr);
	}
	return table;
}
