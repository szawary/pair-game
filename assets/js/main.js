(function () {

    // Icons for cards.
    const icons = [
        'fa-bell',
        'fa-bank',
        'fa-bus',
        'fa-anchor',
        'fa-cab',
    ];

    /*
        <div class="col-2 offset-1">
             <div class="front">
                    <i class="fa fa-cab"></i>                </div>
            <div class="back"></div>
        </div>
    */

    const getOneCard = (icon) => {
        const div = document.createElement('div');
        div.classList.add('card', 'col-2');
        div.innerHTML = `
                <div class="card__front">
                    <i class="fa ${icon}"></i>
                </div>
                <div class="card__back">
                    <img src="../assets/img/back-card.png" alt="back">
                </div>`;
        return div;
    };

    // Shuffle an array. google: js array shuffle 

    const shuffle = (array) => {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    // Show cards.

    const iconArray = icons.concat(icons);    // 2x array
    shuffle(iconArray);                     // shuffle iconArray
    const row1 = document.querySelector('.card-row:nth-child(2)');
    const row2 = document.querySelector('.card-row:nth-child(3)');
    let i = 0;
    for (const icon of iconArray) {
        i++;
        const card = getOneCard(icon);
        if (i < 6) {
            row1.appendChild(card);
        } else {
            row2.appendChild(card);
        }
    }

    const cardClick = (ev) => {
        ev.currentTarget.classList.toggle('flipped');
    };
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', cardClick);
    })

})();