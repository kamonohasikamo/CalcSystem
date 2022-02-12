class mainModel {
	// コンストラクタ
	constructor() {
		this.incomeValue = 0;
		this.spendObj = [];
		this.saveObj = [];
	}

	// セッタ
	setIncome(value) {
		this.incomeValue = Number(value);
	}

	setSpendObj(obj) {
		this.spendObj = obj;
	}

	setSaveObj(obj) {
		this.saveObj = obj;
	}

	// ゲッタ
	getIncome() {
		return this.incomeValue;
	}

	// 支出データの取得
	getSpendObj() {
		return this.spendObj;
	}

	// 貯金データ
	getSaveObj() {
		return this.saveObj;
	}

	//------------------------------------------
	// 支出データ
	//------------------------------------------
	// 支出データの登録
	setSpend(id, name, value) {
		// 存在しない=>登録，データが存在する=>編集
		var idx = this.getSpendIdById(id);
		if (idx == -1) {
			var obj = { "id": id, "name": name, "value": Number(value) };
			this.spendObj.push(obj);
		} else {
			this.spendObj[idx].name = name;
			this.spendObj[idx].value = Number(value);
		}
	}

	// 支出データの削除
	delSpend(id) {
		this.spendObj.forEach((item, idx) => {
			if (item.id == id) {
				this.spendObj.splice(idx, 1);
			}
		});
	}

	// 支出データの検索
	getSpendIdById(id) {
		for (var i = 0; i < this.spendObj.length; i++) {
			if (this.spendObj[i].id == id) {
				return i;
			}
		}
		return -1;
	}

	// 支出データの合計金額
	getSpendTotal() {
		var total = 0;
		this.spendObj.forEach(element => {
			total += element.value;
		});
		return total;
	}

	// 支出データの全体に対する割合
	getAllRateSpend() {
		return Math.ceil(parseFloat(this.getSpendTotal() / this.incomeValue) * 100);
	}

	// 円グラフで使う支出データ
	getPieDataSpendObj() {
		var obj = { "nameList": [], "valueList": [] };
		var total = this.getSpendTotal();
		this.spendObj.forEach(element => {
			obj.nameList.push(element.name);
			obj.valueList.push(Math.ceil(parseFloat(element.value / total) * 100));
		});
		return obj;
	}

	//------------------------------------------
	// 貯金データ
	//------------------------------------------

	// 貯金データの登録
	setSave(id, name, value) {
		// 存在しない=>登録，データが存在する=>編集
		var idx = this.getSaveIdById(id);
		if (idx == -1) {
			var obj = { "id": id, "name": name, "value": Number(value) };
			this.saveObj.push(obj);
		} else {
			this.saveObj[idx].name = name;
			this.saveObj[idx].value = Number(value);
		}
	}

	// 貯金データの削除
	delSave(id) {
		this.saveObj.forEach((item, idx) => {
			if (item.id == id) {
				this.saveObj.splice(idx, 1);
			}
		});
	}

	// 貯金データの検索
	getSaveIdById(id) {
		for (var i = 0; i < this.saveObj.length; i++) {
			if (this.saveObj[i].id == id) {
				return i;
			}
		}
		return -1;
	}

	// 貯金金額の合計
	getSaveTotal() {
		var total = 0;
		this.saveObj.forEach(element => {
			total += element.value;
		});
		return total;
	}

	// 貯金データの全体に対する割合
	getAllRateSave() {
		return Math.ceil(parseFloat(this.getSaveTotal() / this.incomeValue) * 100);
	}

	// 円グラフで使う貯金データ
	getPieDataSaveObj() {
		var obj = { "nameList": [], "valueList": [] };
		var total = this.getSaveTotal();
		this.saveObj.forEach(element => {
			obj.nameList.push(element.name);
			obj.valueList.push(Math.ceil(parseFloat(element.value / total) * 100));
		});
		return obj;
	}

	// 貯金シミュレーターに使うデータ
	getSaveSimuData(year) {
		var obj = [];
		this.saveObj.forEach(element => {
			var tmp = {};
			tmp.name = element.name;
			tmp.valueList = [];

			for (var i = 1; i <= year; i++) {
				tmp.valueList.push(element.value * i * 12);
			}
			obj.push(tmp);
		});
		return obj;
	}

	// 色リスト
	// @param : 要素数
	// @return : その要素数に合わせた色配列
	getColorByCount(count) {
		var defineColorList = [
			"#c97586",
			"#bbbcde",
			"#93b881",
			"#e6b422",
			"#ff4500",
			"#2e8b57",
			"#696969",
			"#ffd700",
			"#98fb98",
			"#ffa500",
			"#dda0dd",
			"#a52a2a",
			"#9acd32",
			"#00ced1"
		];
		var length = defineColorList.length;
		var obj = [];
		for (var i = 0; i < count; i++) {
			obj.push(defineColorList[i % length]);
		}
		return obj;
	}

	//----------------------------------------------------
	// CSVデータの作成
	//----------------------------------------------------
	getCSVData() {
		var csv = "収入\n";
		csv += ",手取り金額," + this.incomeValue + "\n\n";
		var total = this.getSpendTotal();
		csv += "支出,合計," + total + ",割合," + this.getAllRateSpend() + "%\n\n";
		csv += ",支出名,金額,支出内割合,\n";
		for (var i = 0; i < this.spendObj.length; i++) {
			csv += "," + this.spendObj[i].name + "," + this.spendObj[i].value + "," + (Math.ceil(parseFloat(this.spendObj[i].value / total) * 100)) + "%,\n";
		}
		csv += "\n";

		total = this.getSaveTotal();
		csv += "貯金,合計," + this.getSaveTotal() + ",割合," + this.getAllRateSave() + "%\n\n";
		csv += ",貯金名,金額,貯金内割合,\n";
		for (var i = 0; i < this.saveObj.length; i++) {
			csv += "," + this.saveObj[i].name + "," + this.saveObj[i].value + "," + (Math.ceil(parseFloat(this.saveObj[i].value / total) * 100)) + "%,\n";
		}
		csv += "\n";
		return csv;
	}

	//----------------------------------------------------
	// JSONデータの作成
	//----------------------------------------------------
	getJSONData() {
		var json = {};
		json.incomeValue = this.incomeValue;
		json.spendObj = this.spendObj;
		json.saveObj = this.saveObj;
		return json;
	}
}