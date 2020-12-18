(function () {

    // Icons for cards.
    const icons = [
        'fa-bell',
        'fa-bank',
        'fa-bus',
        'fa-anchor',
        'fa-cab',
    ];

    let points = 0;

    /*
        <div class="col-2 offset-1">
             <div class="front">
                    <i class="fa fa-cab"></i>                </div>
            <div class="back"></div>
        </div>
    */


    // Clock
    let timerIsRunning = false;
    let currentTime = 0;
    setInterval(() => {
        if (!timerIsRunning) { // if timerIsRuning false -> return 
            return;
        }
        currentTime++;
        showCurrentTime();
    }, 1000);

    // Show current time
    const showCurrentTime = () => {
        let minutes = Math.floor(currentTime / 60);
        let seconds = currentTime % 60;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        document.querySelector('.current-time').textContent =
            `${minutes}:${seconds}`;
    };


    // Generati a card
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
    const startGame = () => {

        const iconArray = icons.concat(icons);    // 2x array
        let i = 0;
        shuffle(iconArray);                     // shuffle iconArray
        const row1 = document.querySelector('.card-row:nth-child(2)');
        const row2 = document.querySelector('.card-row:nth-child(3)');
        row1.innerHTML = '';
        row2.innerHTML = '';
        for (const icon of iconArray) {
            i++;
            const card = getOneCard(icon);
            if (i < 6) {
                row1.appendChild(card);
            } else {
                row2.appendChild(card);
            }
        }
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', cardClick);
        });

    };


    let blockClicks = false;
    let clickNum = 0;
    const cardClick = (ev) => {
        if (blockClicks) {
            return;
        }

        if (ev.currentTarget.classList.contains('found')) {
            return;
        }

        const showClick = (clickNum) => {
            document.querySelector('.click-number').textContent = clickNum;
        }
        clickNum++;
        showClick(clickNum);

        if (clickNum === 1) {
            timerIsRunning = true;
        }



        ev.currentTarget.classList.toggle('flipped');
        const flippedCard = document.querySelectorAll('.card.flipped');
        if (flippedCard.length > 1) {
            blockClicks = true;
            const to = setTimeout(() => {
                clearTimeout(to);
                blockClicks = false;
                document.querySelectorAll('.card').forEach(card => {
                    card.classList.remove('flipped');
                });
            }, 1000);

            checkPair();
        }
    };

    const showPoints = (points) => {
        document.querySelector('.user-points').textContent = points;
    }

    const checkPair = () => {
        const firstCardIcon = document.querySelector('.card.flipped i');
        if (firstCardIcon) {
            const firstIconClass = firstCardIcon.className.split(' ');
            const pair = document.querySelectorAll(`.card.flipped .${firstIconClass.pop()}`);
            if (pair.length == 2) {
                points++;
                showPoints(points);
                document.querySelectorAll(`.card.flipped`).forEach(
                    card => card.classList.add('found')
                );
                const founds = document.querySelectorAll('.found');

                // Won. :-)
                if (points === icons.length) {
                    timerIsRunning = false;
                    const to = setTimeout(() => {
                        currentTime = 0;
                        showCurrentTime();
                        points = 0;
                        showPoints(points);
                        clickNum = 0;

                        startGame();

                    }, 5000);

                }
            }
        }
    }

    startGame();
})();