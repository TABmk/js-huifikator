String.prototype.huifikacia = function (prefix = 'ху') {
	let doHui = word => {
        /** @type {String} перевод текущей строки в нижний регистр */
        str = word.toLowerCase();
        /** @type {Object} Хардкод гласных. И мне и железу легче просто брать их из объекта */
        let g = { 'а' : 'я', 'о' : 'ё', 'э' : 'е', 'ы' : 'и', 'у' : 'ю', 'я' : 'а', 'ё' : 'о', 'е' : 'е', 'и' : 'ы', 'ю' : 'у' };
        /** @type {?Array} регулярка на гласные */
        let firstGl = str.match(/([аоэыуяёеию])/gi);
        if (firstGl && firstGl.length) {
            // Первые 2 гласные могут быть одинаковые, поэтому просто удаляем первую, чтобы все работало нормально
            if (firstGl.length >= 3 && firstGl[0] === firstGl[1]) str = str.replace(firstGl[0], '');
            /** @type {Number} Делим слово на слоги. Если 3+, то начинаем хуефикацию со второго */
            let s = firstGl.length >= 3 ? 1 : 0;
            /** @type {String} Первая гласная в нижнем регистре */
            let para = firstGl[s].toLowerCase()
            // строка 'префикс + новая дифтонговая гласная, либо наоборот + продолжение строки'
            return `${prefix}${g[para]}${str.slice(str.indexOf(para)+1)}`;
        }
	}

	return this.split(' ').map(w => doHui(w)).join(' ');
	
};
