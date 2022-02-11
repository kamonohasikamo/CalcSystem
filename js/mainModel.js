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

	// ゲッタ
	getIncome() {
		return this.incomeValue;
	}

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
		console.log(JSON.stringify(this.spendObj));
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
		console.log(JSON.stringify(this.saveObj));
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
}