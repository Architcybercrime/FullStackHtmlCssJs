function isArmstrong(n) {
    var order = 0, rem = 0;
    var sum = 0;
    var temp = n;

    while (temp > 0) {
        order += 1;
        temp = Number.parseInt(temp / 10);
    }

    temp = n;

    while (temp > 0) {
        rem = temp % 10;
        let res = 1;

        for (let j = 0; j < order; j++) {
            res = res * rem;
        }

        sum = sum + res;
        temp = Number.parseInt(temp / 10);
    }

    if (sum === n) {
        console.log(n + " is an Armstrong number");
    } else {
        console.log(n + " is not an Armstrong number");
    }
}

isArmstrong(153);